import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "appointments",
  timestamps: true,
})
class Appointment extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare clientName: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare clientEmail: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  declare clientPhone: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare appointmentDate: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  declare appointmentTime: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare reason: string;
}

export default Appointment;
