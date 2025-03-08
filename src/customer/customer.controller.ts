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
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get() //http://localhost:3000/api/v1/customer
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id') //http://localhost:3000/api/v1/customer/1
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id') //http://localhost:3000/api/v1/customer/1
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id') //http://localhost:3000/api/v1/customer/1
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
