import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Get API home information' })
  @ApiResponse({
    status: 200,
    description: 'Returns welcome message and API version',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Welcome to my NestJS API' },
        version: { type: 'string', example: '1.0.0' },
      },
    },
  })
  @Get('/')
  getHome() {
    return {
      message: 'Welcome to my NestJS API',
      version: this.configService.get<string>('API_VERSION') ?? '1.0.0',
    };
  }

  @ApiOperation({ summary: 'Get hello message' })
  @ApiResponse({
    status: 200,
    description: 'Returns hello message',
    type: String,
  })
  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
