import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UtilityModule } from './shared/utility/utility.module';
import { GlobalHelperModule } from './shared/global-helper/global-helper.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [ProductModule, UtilityModule, GlobalHelperModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
