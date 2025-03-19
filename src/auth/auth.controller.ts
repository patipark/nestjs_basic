import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') //http://localhost:3000/api/v1/auth/register
  async register(@Body() userRegisterDto: UserRegisterDto) {
    const user = await this.authService.register(userRegisterDto);
    return {
      message: 'ลงทะเบียนสำเร็จ',
      user: user,
    };
  }

  @Post('login') //http://localhost:3000/api/v1/auth/login
  @HttpCode(HttpStatus.OK) // https://stackoverflow.com/questions/76915921/nestjs-controller-always-return-201-created-when-it-works-with-httpclient
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.authService.login(userLoginDto);
    return {
      message: 'เข้าสู่ระบบสำเร็จ',
      ...user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile') //http://localhost:3000/api/v1/auth/profile
  // async getProfile(@Request() req: any) {
  async getProfile(@Request() req: { user: { user_id: number } }) {
    return await this.authService.getUserProfile(Number(req.user.user_id));
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/env')
  // getEnv(): any {
  //   return process.env;
  // }
}
