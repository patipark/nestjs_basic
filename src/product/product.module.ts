import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { UtilityModule } from '../shared/utility/utility.module';
@Module({
  imports: [UtilityModule],
  controllers: [ProductController],
})
export class ProductModule {}
