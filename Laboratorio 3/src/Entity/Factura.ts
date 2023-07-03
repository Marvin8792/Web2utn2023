import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { DetalleFactura } from './DetalleFactura';
import { Cliente } from './Cliente';

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  idfactura: number;

  @Column()
  fecha: Date

  @Column()
  idcliente: string;

  @ManyToOne(()=> Cliente, (cliente)=> cliente.facturas)
  @JoinColumn({name: "idcliente"})
  cliente : Cliente

  @OneToMany(() => DetalleFactura, (detalle) => detalle.factura, { cascade: ["insert","update"] })
  detalles: DetalleFactura[];

  @Column({default: true})
  estado : boolean
}