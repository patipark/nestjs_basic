import { Controller, Get, Version } from '@nestjs/common';
import { UtilityService } from '../shared/utility/utility.service';
import { GlobalHelperService } from 'src/shared/global-helper/global-helper.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// URI versioning example: http://localhost:3000/api/v1/product/
@ApiTags('products')
@Controller({
  path: 'product',
  version: '1',
})
export class ProductController {
  constructor(
    private readonly utilityService: UtilityService,
    private readonly globalHelperService: GlobalHelperService,
  ) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Returns all products',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Product 1' },
          price: { type: 'number', example: 100 },
        },
      },
    },
  })
  @Get('/') // http://localhost:3000/api/v1/product
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

  @ApiOperation({ summary: 'Get server date' })
  @ApiResponse({
    status: 200,
    description: 'Returns server date',
    schema: {
      type: 'object',
      properties: {
        server_date: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
      },
    },
  })
  @Get('/date') // http://localhost:3000/api/v1/product/date
  getDate(): any {
    return {
      server_date: this.utilityService.getServerDate(),
    };
  }

  // @Get('/thaidate') //http://localhost:3000/api/v1/product/thaidate
  // getThaiDate(): string {
  //   return this.globalHelperService.getServerThaiDate();
  // }

  @ApiOperation({ summary: 'Get Thai date format (v2)' })
  @ApiResponse({
    status: 200,
    description: 'Returns server date in Thai format',
    schema: {
      type: 'object',
      properties: {
        server_thai_date: { type: 'string', example: '1 มกราคม 2566' },
      },
    },
  })
  @Version('2') // http://localhost:3000/api/v2/product/thaidate
  @Get('/thaidate')
  getThaiDate2(): any {
    return {
      server_thai_date: this.globalHelperService.getServerThaiDate(),
    };
  }
}
