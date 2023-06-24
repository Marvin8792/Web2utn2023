import { IsEmail, IsNotEmpty, MaxLength, length, maxLength } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Producto {
  @PrimaryColumn()
  id: number;
  @Column({length:5})
  @MaxLength(50)
  nombre: string;
  @Column()
  @IsNotEmpty({message: ""})
  precio: number;
  @Column()
  @IsNotEmpty()
  stock: number;
  @Column()
  @IsNotEmpty()
  fechaIngreso: Date;
  @Column()
  @IsNotEmpty()
  estado: boolean;
}