// import { DataTypes } from 'sequelize';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { DataType, Column, Model, Table, Is } from 'sequelize-typescript';

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

  @Column({
    field: 'category_id',
  })
  categoryId: number;

  @Column({
    defaultValue: true,
  })
  isActive: boolean;
}
