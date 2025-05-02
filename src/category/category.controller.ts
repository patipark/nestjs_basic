import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller({
  path: 'category',
  version: '1',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return {
      message: 'เพิ่มข้อมูลสำเร็จ',
      data: category,
    };
  }

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(+id);
    if (!category) {
      throw new NotFoundException(); // 404
    }
    return category;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const effectedCount = await this.categoryService.update(
      +id,
      updateCategoryDto,
    );
    if (effectedCount === 0) {
      throw new BadRequestException(`แก้ไขข้อมูลไม่สำเร็จ`); // 400
    }
    return { message: 'แก้ไขข้อมูลสำเร็จ' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const numberOfDestroyRow = await this.categoryService.remove(+id);
    if (numberOfDestroyRow === 0) {
      throw new NotFoundException('ไม่พบข้อมูลที่ต้องการลบ'); // 404
    }
    return { message: 'ลบข้อมูลสำเร็จ' };
  }
}
