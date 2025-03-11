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
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

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
    const userId = user.id;
    const passwordHash = user.password;
    const isActive = user.isActive;
    // const isMatch = compareSync(userLoginDto.password, passwordHash);
    const isMatch = await compare(userLoginDto.password, passwordHash);
    if (!isMatch) {
      throw new BadRequestException('Password is incorrect');
    }

    return {
      userId: userId,
      password: userLoginDto.password,
      passwordHash: passwordHash,
      isActive: isActive,
      isMatch: isMatch,
      user: user,
    };
  }
}
