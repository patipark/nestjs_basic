import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UtilityModule } from './shared/utility/utility.module';
import { GlobalHelperModule } from './shared/global-helper/global-helper.module';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Customer } from './customer/entities/customer.entity';
import { CategoryModule } from './category/category.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      // sync: {},// สร้างเฉพาะ table ที่ไม่มีเท่านั้น
      // sysc : { force: true }, // ลบ table ทิ้งแล้วสร้างใหม่
      sync: {
        alter: true, // แก้ไข column ที่มีอยู่แล้ว ไม่ลบ table ทิ้ง
      },
      pool: {
        max: 10, // จำนวน connection สูงสุดใน pool
        min: 0, // จำนวน connection ขั้นต่ำใน pool
        idle: 30000, // ปล่อย connection ถ้าไม่ได้ใช้งานเกิน 30 วินาที
      },
      models: [Customer],
    }),
    ProductModule,
    UtilityModule,
    GlobalHelperModule,
    CustomerModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
