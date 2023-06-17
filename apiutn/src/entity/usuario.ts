import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryColumn, Unique } from "typeorm";

@Entity()
export class Usuario {
  @PrimaryColumn()
  id: number;

  @Column({ length: 50 })
  @MaxLength(50)
  nombre: string;

  @Column()
  @MaxLength(50)
  apellido1: string;

  @Column()
  @MaxLength(50)
  apellido2: string;

  @Column()
  fecha_ingreso: Date;

  @Column({ unique: true })
  @IsEmail()
  @MaxLength(50)
  correo: string;

  @Column()
  rol: string;

  @Column()
  @MaxLength(30)
  @MinLength(5)
  contrasena: string;

  @Column({ default: true })
  estado: boolean;
}