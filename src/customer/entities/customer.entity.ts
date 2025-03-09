import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

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
    type: DataTypes.STRING(200),
    allowNull: false,
  })
  name: string;

  @Column
  email: string;

  @Column
  isActive: boolean;
}
