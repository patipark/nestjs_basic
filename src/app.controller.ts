import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/')
  getHome() {
    return {
      message: 'Welcome to my NestJS API',
      version: this.configService.get<string>('API_VERSION') ?? '1.0.0',
    };
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
