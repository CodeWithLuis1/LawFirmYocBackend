var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, ForeignKey, BelongsTo, DataType, } from "sequelize-typescript";
import Appointment from "./Appointment.model.js";
let AppointmentTasks = class AppointmentTasks extends Model {
};
__decorate([
    Column({
        type: DataType.STRING(255),
        allowNull: false,
    }),
    __metadata("design:type", String)
], AppointmentTasks.prototype, "description", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], AppointmentTasks.prototype, "completed", void 0);
__decorate([
    Column({
        type: DataType.ENUM("pendiente", "en_proceso", "completada", "cancelada", "retrasada"),
        allowNull: false,
        defaultValue: "pendiente",
    }),
    __metadata("design:type", String)
], AppointmentTasks.prototype, "status", void 0);
__decorate([
    ForeignKey(() => Appointment),
    Column,
    __metadata("design:type", Number)
], AppointmentTasks.prototype, "appointmentId", void 0);
__decorate([
    BelongsTo(() => Appointment),
    __metadata("design:type", Appointment)
], AppointmentTasks.prototype, "appointment", void 0);
AppointmentTasks = __decorate([
    Table({
        tableName: "appointment_tasks",
        timestamps: true,
    })
], AppointmentTasks);
export default AppointmentTasks;
//# sourceMappingURL=AppointmentTasks.model.js.map