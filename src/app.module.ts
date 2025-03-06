import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UtilityModule } from './shared/utility/utility.module';

@Module({
  imports: [ProductModule, UtilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
