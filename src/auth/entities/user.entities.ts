// import { DataTypes } from 'sequelize';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { DataType, Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: false,
  paranoid: false,
})
export class User extends Model {
  @IsNotEmpty()
  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    unique: true,
  })
  username: string;

  @IsNotEmpty()
  @Column({
    type: DataType.STRING(400),
    allowNull: false,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    type: DataType.TEXT,
  })
  password: string;

  @Column({
    defaultValue: false,
  })
  isActive: boolean;
}
