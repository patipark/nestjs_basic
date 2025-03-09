/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  // Inject the Customer model into the CustomerService class at the constructor
  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    // return 'This action adds a new customer';
    return await this.customerModel.create(
      createCustomerDto as Partial<Customer>,
    );
  }

  async findAll() {
    // return `This action returns all customer`;
    return await this.customerModel.findAll();
  }

  async findOne(id: number) {
    // return `This action returns a #${id} customer`;
    const customer = await this.customerModel.findByPk(id);
    if (!customer) {
      throw new NotFoundException(); // 404
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    // return `This action updates a #${id} customer`;
    const [affectedCount] = await this.customerModel.update(updateCustomerDto, {
      where: { id: id },
    });
    return affectedCount;
  }

  async remove(id: number) {
    // return `This action removes a #${id} customer`;
    const numberOfDestroyRow = await this.customerModel.destroy({
      where: { id: id },
    });
    return numberOfDestroyRow;
  }
}
