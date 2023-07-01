import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Factura } from './Factura';
import { Producto } from './Producto';

@Entity()
export class DetalleFactura {
  @Column({primary:true})
  idfactura: number;

  @Column({primary:true})
  idproducto: number;

  @Column()
  cant: number;

  @ManyToOne(() => Factura, factura => factura.detalles)
  @JoinColumn({name: "idfactura"})
  factura: Factura;

  @ManyToOne(()=> Producto, (producto) => producto.detalleFactura)
  @JoinColumn({name : "idproducto"})
  producto : Producto;
}