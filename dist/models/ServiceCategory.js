var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import LegalService from './LegalServices.model.js';
let ServiceCategory = class ServiceCategory extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], ServiceCategory.prototype, "id_category", void 0);
__decorate([
    Column({
        type: DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], ServiceCategory.prototype, "name", void 0);
__decorate([
    HasMany(() => LegalService),
    __metadata("design:type", Array)
], ServiceCategory.prototype, "legalServices", void 0);
ServiceCategory = __decorate([
    Table({
        tableName: 'servicesCategories',
        timestamps: false,
    })
], ServiceCategory);
export default ServiceCategory;
//# sourceMappingURL=ServiceCategory.js.map