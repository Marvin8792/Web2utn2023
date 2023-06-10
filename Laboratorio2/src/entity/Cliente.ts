import { maxLength } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {
  @PrimaryColumn()
  id_cliente: number
  @Column()
  Nombre_cliente: string;
  @Column()
  Apellidos_cliente: string;
  @Column()
  Direccion_cliente: string;
  @Column()
  Telefono_cliente: number;
}