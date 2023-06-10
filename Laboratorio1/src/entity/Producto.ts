import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Producto{
@PrimaryColumn()
    id:number;
    @Column()
    nombre:string;
    @Column()
    precio:number;
    @Column()
    stock:number;
    @Column()
    fechaingreso:Date;
    @Column()
    estado:boolean;

}