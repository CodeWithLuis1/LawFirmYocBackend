import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import LegalService from './LegalServices.model.js';

@Table({
  tableName: 'servicesCategories',
  timestamps: false,
})
class ServiceCategory extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id_category: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  // Relación con servicios legales
  @HasMany(() => LegalService)
  declare legalServices: LegalService[];
}

export default ServiceCategory;
