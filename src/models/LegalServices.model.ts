import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "services",
  timestamps: true,
})
class Service extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare category: string;

@Column({
  type: DataType.DECIMAL(10, 2), // permite valores como 2500.00
  allowNull: false,
})
declare price: number;


  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare duration: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @Column({
    type: DataType.ENUM("Activo", "Pausado"),
    allowNull: false,
  })
  declare status: "Activo" | "Pausado";
}

export default Service;
