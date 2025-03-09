/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { DataTypes } from 'sequelize';
import { DataType, Column, Model, Table } from 'sequelize-typescript';

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

  @Column({
    type: DataType.STRING(400),
    allowNull: false,
  })
  name: string;

  @Column
  email: string;

  @Column
  isActive: boolean;
}
