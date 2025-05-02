import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';
import { Op } from 'sequelize';
import { Category } from 'src/category/entities/category.entity';

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
    return await this.customerModel.findAll({
      include: [Category],
    });
  }

  async findAll2() {
    // return `This action returns all customer`;
    return await this.customerModel.findAll({
      where: {
        [Op.and]: [{ categoryId: 2 }, { isActive: false }],
      },
    });
    // SELECT * FROM customers  WHERE (`category_id` = 2 AND `isActive` = false);
  }

  async findOne(id: number) {
    // return `This action returns a #${id} customer`;
    return await this.customerModel.findByPk(id);
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
