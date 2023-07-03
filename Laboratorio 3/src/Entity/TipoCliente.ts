import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Persona } from './Persona';
import { Cliente } from './Cliente';

@Entity()
export class TipoCliente{
    @PrimaryColumn()
    id:number;
    @Column()
    nombre:string
    @Column()
    estado:boolean

    @OneToMany(() => Cliente, (Cliente) => Cliente.tipoCliente)
    cliente : Cliente[]
}