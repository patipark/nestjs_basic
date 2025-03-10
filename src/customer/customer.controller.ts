import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller({
  path: 'customer',
  version: '1',
})
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post() //http://localhost:3000/api/v1/customer
  @UsePipes(new ValidationPipe({ transform: true })) //https://docs.nestjs.com/techniques/validation#transform-payload-objects
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    // return this.customerService.create(createCustomerDto);
    const customer = await this.customerService.create(createCustomerDto);
    return {
      message: 'เพิ่มข้อมูลสำเร็จ',
      data: customer,
    };
  }

  @Get() //http://localhost:3000/api/v1/customer
  findAll() {
    return this.customerService.findAll2();
  }

  @Get(':id') //http://localhost:3000/api/v1/customer/1
  async findOne(@Param('id') id: string) {
    const customer = await this.customerService.findOne(+id);
    if (!customer) {
      throw new NotFoundException(); // 404
    }
    return customer;
  }

  @Patch(':id') //http://localhost:3000/api/v1/customer/1
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    const affectedCount = await this.customerService.update(+id, updateCustomerDto);
    if (affectedCount === 0) {
      throw new BadRequestException(`แก้ไขข้อมูลไม่สำเร็จ`); // 400
    }
    return { message: 'แก้ไขข้อมูลสำเร็จ' };
  }

  @Delete(':id') //http://localhost:3000/api/v1/customer/1
  async remove(@Param('id') id: string) {
    const numberOfDestroyRow = await this.customerService.remove(+id);
    if (numberOfDestroyRow === 0) {
      throw new NotFoundException('ไม่พบข้อมูลที่ต้องการลบ'); // 404
    }
    return { message: 'ลบข้อมูลสำเร็จ' };
  }
}
