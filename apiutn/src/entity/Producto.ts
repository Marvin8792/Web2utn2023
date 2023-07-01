import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { DetalleFactura } from "./DetalleFactura";
@Entity()
export class Producto {
  @PrimaryColumn()
  id: number;
  @Column({length:5})
  @MaxLength(50)
  nombre: string;
  @Column()
  @IsNotEmpty({message: "ddd"})
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

  @OneToMany(()=>DetalleFactura, (detalle) => detalle.producto)
  detalleFactura : DetalleFactura[];
}