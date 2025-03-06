import { Controller, Get } from '@nestjs/common';

@Controller('product')
export class ProductController {
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
}
