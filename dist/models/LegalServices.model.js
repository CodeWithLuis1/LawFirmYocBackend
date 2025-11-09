var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import ServiceCategory from './ServiceCategory.js';
let LegalService = class LegalService extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], LegalService.prototype, "id_service", void 0);
__decorate([
    Column({
        type: DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], LegalService.prototype, "name", void 0);
__decorate([
    ForeignKey(() => ServiceCategory),
    Column({
        type: DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], LegalService.prototype, "id_category", void 0);
__decorate([
    Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    }),
    __metadata("design:type", Number)
], LegalService.prototype, "price", void 0);
__decorate([
    Column({
        type: DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], LegalService.prototype, "duration", void 0);
__decorate([
    Column({
        type: DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], LegalService.prototype, "description", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], LegalService.prototype, "status", void 0);
__decorate([
    BelongsTo(() => ServiceCategory),
    __metadata("design:type", ServiceCategory)
], LegalService.prototype, "category", void 0);
LegalService = __decorate([
    Table({
        tableName: 'legalServices',
        timestamps: false,
    })
], LegalService);
export default LegalService;
//# sourceMappingURL=LegalServices.model.js.map