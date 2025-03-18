import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register') //http://localhost:3000/api/v1/auth/register
  async register(@Body() userRegisterDto: UserRegisterDto) {
    const user = await this.authService.register(userRegisterDto);
    return {
      message: 'ลงทะเบียนสำเร็จ',
      data: user,
    };
  }

  @Post('login') //http://localhost:3000/api/v1/auth/login
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.authService.login(userLoginDto);
    return {
      message: 'เข้าสู่ระบบสำเร็จ',
      user: user,
    };
  }
}
