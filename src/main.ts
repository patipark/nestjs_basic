import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common/enums';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // localhost:3000/api/
  app.setGlobalPrefix('api');

  // localhost:3000/api/v1/ (asign version on controller)
  // example: http://localhost:3000/api/v1/product/
  // @Controller({
  //   path: 'product',
  //   version: '1',
  // })
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // enable auto validation
  app.useGlobalPipes(new ValidationPipe());
  // listen port
  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
