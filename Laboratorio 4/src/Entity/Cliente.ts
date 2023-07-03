import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Persona } from './Persona';
import { TipoCliente } from './TipoCliente';
import { Factura } from './Factura';

@Entity()
export class Cliente{

    @PrimaryColumn()
    cedula : string;
    @ManyToOne(() => TipoCliente, (tipoCliente) => tipoCliente.cliente)
    tipoCliente:TipoCliente;
    @Column()
    FechaIngreso:Date;
    @OneToOne(() => Persona, {cascade: ["insert","update"]})
    @JoinColumn({name: "cedula"})
    persona : Persona;

    @OneToMany(() => Factura,(Factura) => Factura.cliente)
    facturas : Factura
}