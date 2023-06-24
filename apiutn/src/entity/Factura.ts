import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DetalleFactura } from './DetalleFactura';

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  facturaId: number;

  @Column()
  cliente: string;

  @OneToMany(() => DetalleFactura, detalle => detalle.factura, { cascade: true })
  detalles: DetalleFactura[];
}