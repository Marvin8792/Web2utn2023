import { maxLength } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Producto {
  @PrimaryColumn()
  id_proveedor: number
  @Column()
  Nombre_proveedor: string;
  @Column()
  Apellidos_proveedor: string;
  @Column()
  Direccion_proveedor: string;
  @Column()
  Provincia_proveedor: string;
  @Column()
  Telefono_proveedor: number;
}