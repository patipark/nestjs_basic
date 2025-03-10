import { IsNotEmpty } from 'class-validator';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Customer } from 'src/customer/entities/customer.entity';

@Table({
  tableName: 'categories',
  timestamps: false,
  paranoid: false,
})
export class Category extends Model {
  @IsNotEmpty()
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  remark: string;

  @HasMany(() => Customer)
  customers: Customer[];
}
