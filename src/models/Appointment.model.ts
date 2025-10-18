import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Task  from "./AppointmentTasks.model.js";

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
    type: DataType.DATEONLY, // Solo la fecha (YYYY-MM-DD)
    allowNull: false,
  })
  declare appointmentDate: string;

  @Column({
    type: DataType.TIME, // Solo la hora (HH:MM:SS)
    allowNull: false,
  })
  declare appointmentTime: string;
  @Column({
    type: DataType.STRING(255), // Razón de la cita
    allowNull: true,
  })
  declare reason: string;

  //  Relación uno a muchos
  @HasMany(() => Task)
  declare tasks: Task[];
}

export default Appointment;
