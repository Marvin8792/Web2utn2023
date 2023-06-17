import { maxLength } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vendedor {
  @PrimaryColumn()
  id_vendedor: number
  @Column()
  Nombre_vendedor: string;
  @Column()
  Apellidos_vendedor: string;
  @Column()
  Direccion_vendedor: string;
  @Column()
  Telefono_vendedor: number;
  @Column()
  Celular_vendedor: number;
}