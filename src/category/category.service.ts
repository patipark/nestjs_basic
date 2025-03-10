import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryModel.create(createCategoryDto as Partial<Category>);
  }

  async findAll() {
    return await this.categoryModel.findAll({
      include: [Customer], // ดึงข้อมูลทุกอย่างที่เกี่ยวข้อง
    });
  }

  async findOne(id: number) {
    return await this.categoryModel.findByPk(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const [affectedCount] = await this.categoryModel.update(updateCategoryDto, {
      where: { id: id },
    });
    return affectedCount;
  }

  remove(id: number) {
    const removeRowCount = this.categoryModel.destroy({
      where: { id: id }, // ลบแถวที่มี id ตามที่ระบุ
    });
    return removeRowCount;
  }
}
