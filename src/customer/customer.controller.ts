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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('customers')
@Controller({
  path: 'customer',
  version: '1',
})
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Create a new customer' })
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({
    status: 201,
    description: 'The customer has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'เพิ่มข้อมูลสำเร็จ' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john.doe@example.com' },
            isActive: { type: 'boolean', example: true }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 422, description: 'Validation failed' })
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

  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({
    status: 200,
    description: 'Returns all customers',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'john.doe@example.com' },
          isActive: { type: 'boolean', example: true }
        }
      }
    }
  })
  @Get() //http://localhost:3000/api/v1/customer
  async findAll() {
    return await this.customerService.findAll();
  }

  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns the customer',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john.doe@example.com' },
        isActive: { type: 'boolean', example: true }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  @Get(':id') //http://localhost:3000/api/v1/customer/1
  async findOne(@Param('id') id: string) {
    const customer = await this.customerService.findOne(+id);
    if (!customer) {
      throw new NotFoundException(); // 404
    }
    return customer;
  }

  @ApiOperation({ summary: 'Update a customer' })
  @ApiParam({ name: 'id', description: 'Customer ID', type: 'number' })
  @ApiBody({ type: UpdateCustomerDto })
  @ApiResponse({
    status: 200,
    description: 'The customer has been successfully updated.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'แก้ไขข้อมูลสำเร็จ' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 422, description: 'Validation failed' })
  @Patch(':id') //http://localhost:3000/api/v1/customer/1
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    const affectedCount = await this.customerService.update(+id, updateCustomerDto);
    if (affectedCount === 0) {
      throw new BadRequestException(`แก้ไขข้อมูลไม่สำเร็จ`); // 400
    }
    return { message: 'แก้ไขข้อมูลสำเร็จ' };
  }

  @ApiOperation({ summary: 'Delete a customer' })
  @ApiParam({ name: 'id', description: 'Customer ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The customer has been successfully deleted.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'ลบข้อมูลสำเร็จ' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  @Delete(':id') //http://localhost:3000/api/v1/customer/1
  async remove(@Param('id') id: string) {
    const numberOfDestroyRow = await this.customerService.remove(+id);
    if (numberOfDestroyRow === 0) {
      throw new NotFoundException('ไม่พบข้อมูลที่ต้องการลบ'); // 404
    }
    return { message: 'ลบข้อมูลสำเร็จ' };
  }
}
