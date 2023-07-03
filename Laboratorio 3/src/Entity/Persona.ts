import { length } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity()
export class Persona{
    @PrimaryColumn()
    cedula : string;
    @Column({length:50})
    nombre : string;
    @Column({length:60})
    apellido1 : string;
    @Column()
    apellido2 : string;
    @Column()
    FechaNac : Date;
}