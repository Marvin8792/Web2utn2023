import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    cedula: string;
  
    @Column()
    nombre: string;
  
    @Column()
    apellido1: string;
  
    @Column()
    apellido2: string;
  
    @Column()
    fechaNacimiento: Date;
  
    @Column()
    genero: string;
  
    @Column()
    estado: boolean;

}