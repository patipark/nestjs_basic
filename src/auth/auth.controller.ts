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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('authentication')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: UserRegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully registered',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'ลงทะเบียนสำเร็จ' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            username: { type: 'string', example: 'johndoe' },
            email: { type: 'string', example: 'john.doe@example.com' },
          },
        },
      },
    },
  })
  @Post('register') // http://localhost:3000/api/v1/auth/register
  async register(@Body() userRegisterDto: UserRegisterDto) {
    const user = await this.authService.register(userRegisterDto);
    return {
      message: 'ลงทะเบียนสำเร็จ',
      user: user,
    };
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: UserLoginDto })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully logged in',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'เข้าสู่ระบบสำเร็จ' },
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            username: { type: 'string', example: 'johndoe' },
            email: { type: 'string', example: 'john.doe@example.com' },
          },
        },
      },
    },
  })
  @Post('login') // http://localhost:3000/api/v1/auth/login
  @HttpCode(HttpStatus.OK)
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.authService.login(userLoginDto);
    return {
      message: 'เข้าสู่ระบบสำเร็จ',
      ...user,
    };
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Returns the user profile',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        username: { type: 'string', example: 'johndoe' },
        email: { type: 'string', example: 'john.doe@example.com' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get('profile') // http://localhost:3000/api/v1/auth/profile
  async getProfile(@Request() req: { user: { user_id: number } }) {
    return await this.authService.getUserProfile(Number(req.user.user_id));
  }
}
