import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHome() {
    return {
      message: 'Welcome to my NestJS API',
      version: process.env.API_VERSION ?? '1.0.0',
    };
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
