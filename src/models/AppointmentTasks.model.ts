import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Appointment  from "./Appointment.model.js";

@Table({
  tableName: "tasks",
  timestamps: true,
})
export default class Task extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @Column({
    type: DataType.ENUM(
      "pendiente",
      "en_proceso",
      "completada",
      "cancelada",
      "retrasada"
    ),
    allowNull: false,
    defaultValue: "pendiente",
  })
  declare status: string;

  // Clave foránea a la cita
  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare appointmentId: number;

  @BelongsTo(() => Appointment)
  declare appointment: Appointment;
}
