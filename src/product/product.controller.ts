import { Controller, Get } from '@nestjs/common';
import { UtilityService } from '../shared/utility/utility.service';
@Controller('product')
export class ProductController {
  constructor(private readonly utilityService: UtilityService) {}

  @Get('/') //http://localhost:3000/product
  getProducts(): any[] {
    return [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
      },
      {
        id: 2,
        name: 'Product 2',
        price: 200,
      },
    ];
  }

  @Get('/date') //http://localhost:3000/product/date
  getDate(): string {
    return this.utilityService.getServerDate();
  }
}
