import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entities';
import { InjectModel } from '@nestjs/sequelize';
import { UserRegisterDto } from './dto/user-register.dto';
import { hash, genSalt, compare, compareSync } from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    // console.log(
    //   '====> JWT_EXPIRES_IN:',
    //   this.configService.get<string>('JWT_EXPIRES_IN'),
    // );
  }

  async register(userRegisterDto: UserRegisterDto) {
    const user = await this.userModel.findOne({
      where: { email: userRegisterDto.email },
    });
    // console.log(typeof user);
    if (user) {
      //   console.log(user.email);
      throw new BadRequestException('Email already exists');
    }
    const salt = await genSalt(10);
    const hashPassword = await hash(userRegisterDto.password, salt);
    const newUser = await this.userModel.create({
      ...userRegisterDto,
      password: hashPassword,
    });
    return newUser;
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await this.userModel.findOne({
      where: { email: userLoginDto.email },
    });

    if (!user) {
      throw new NotFoundException('Email not found in the system');
    }

    // console.log(typeof user);
    // console.log(user);
    // const userId = user.id;
    // const passwordHash = user.password;
    // const isActive = user.isActive;
    // const isMatch = compareSync(userLoginDto.password, passwordHash);
    const isMatch = await compare(userLoginDto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password is incorrect');
    }

    const payload = { user_id: user.id };
    const token = await this.jwtService.signAsync(payload, {
      // secret: process.env.JWT_SECRET,
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });
    // payload when decode token
    // {
    //   "user_id": 3,
    //   "iat": 1742309657,
    //   "exp": 1742396057
    // }
    return { access_token: token };
  }

  // get user profile
  async getUserProfile(id: number) {
    return await this.userModel.findByPk(id, {
      attributes: ['id', 'email', 'isActive'],
    });
  }
}
