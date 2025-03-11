import { IsEmail, IsNotEmpty } from 'class-validator';
import { DataType, Column, Model, Table } from 'sequelize-typescript';
@Table({
  tableName: 'users',
  timestamps: false,
  paranoid: false,
})
export class User extends Model {
  //   @Column({
  //     type: DataType.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //   })
  //   declare id: number;

  // https://stackoverflow.com/questions/57542074/sequelize-findone-returned-instance-row-is-in-datavalues-but-direct-properties
  // https://sequelize.org/docs/v6/core-concepts/model-basics/#caveat-with-public-class-fields
  // Sequelize findOne returned instance. Row is in dataValues, but direct properties on instance are undefined
  // ต้องทำการใส่ keyword declare ด้านหน้า property ทุกครั้งที่เราใช้ TypeScript และ Sequelize ร่วมกัน
  @IsNotEmpty()
  @Column({
    type: DataType.STRING(400),
    allowNull: false,
    unique: true,
  })
  @IsEmail()
  declare email: string;

  @Column({
    type: DataType.TEXT,
  })
  declare password: string;

  @Column({
    defaultValue: false,
  })
  declare isActive: boolean;
}
