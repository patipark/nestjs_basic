// import { DataTypes } from 'sequelize';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { DataType, Column, Model, Table, Is, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Category } from 'src/category/entities/category.entity';

@Table({
  tableName: 'customers',
  timestamps: false,
  paranoid: false,
})
export class Customer extends Model {
  //   @Column({
  //     primaryKey: true,
  //     autoIncrement: true,
  //   })
  //   id: number;

  @IsNotEmpty()
  @Column({
    type: DataType.STRING(400),
    allowNull: false,
  })
  name: string;

  @Column
  @IsEmail()
  email: string;

  @ForeignKey(() => Category)
  @Column({
    field: 'category_id',
  })
  categoryId: number;

  @Column({
    defaultValue: true,
  })
  isActive: boolean;

  @BelongsTo(() => Category)
  category: Category;
}
