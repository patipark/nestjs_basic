/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Version,
} from '@nestjs/common';
import { UtilityService } from '../shared/utility/utility.service';
import { GlobalHelperService } from 'src/shared/global-helper/global-helper.service';

//การทำ VersioningType แบบ URIโดยการเพิ่ม version ใน path ของ controller
//http://localhost:3000/api/v1/product/
@Controller({
  path: 'product',
  version: '1',
})
export class ProductController {
  constructor(
    private readonly utilityService: UtilityService,
    private readonly globalHelperService: GlobalHelperService,
  ) {}

  @Get('/') //http://localhost:3000/api/v1/product
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

  @Get('/date') //http://localhost:3000/api/v1/product/date
  getDate(): any {
    // throw new HttpException('ทดสอบโยน Error', HttpStatus.BAD_REQUEST);
    // throw new BadRequestException('ทดสอบโยน Error');
    return {
      server_date: this.utilityService.getServerDate(),
    };
  }

  // @Get('/thaidate') //http://localhost:3000/api/v1/product/thaidate
  // getThaiDate(): string {
  //   return this.globalHelperService.getServerThaiDate();
  // }

  @Version('2') //http://localhost:3000/api/v2/product/thaidate
  @Get('/thaidate')
  getThaiDate2(): any {
    return {
      server_thai_date: this.globalHelperService.getServerThaiDate(),
    };
  }
}
