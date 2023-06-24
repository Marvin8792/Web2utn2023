import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Factura } from './Factura';

@Entity()
export class DetalleFactura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  producto: string;

  @Column()
  cantidad: number;

  @Column()
  precio: number;

  @ManyToOne(() => Factura, factura => factura.detalles)
  factura: Factura;
}