import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import ServiceCategory from './ServiceCategory.js';

@Table({
  tableName: 'legalServices',
  timestamps: false,
})
class LegalService extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id_service: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  // Relación con la categoría
  @ForeignKey(() => ServiceCategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id_category: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare duration: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare status: boolean;

  @BelongsTo(() => ServiceCategory)
  declare category: ServiceCategory;
}

export default LegalService;
