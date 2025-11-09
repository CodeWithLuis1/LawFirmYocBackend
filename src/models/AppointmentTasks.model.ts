import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import Appointment from "./Appointment.model.js";

@Table({
  tableName: "appointment_tasks",
  timestamps: true,
})
class AppointmentTasks extends Model {
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare completed: boolean;

  // ✅ Nueva columna para manejar el estado de la tarea
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

  @ForeignKey(() => Appointment)
  @Column
  declare appointmentId: number;

  @BelongsTo(() => Appointment)
  declare appointment: Appointment;
}

export default AppointmentTasks;
