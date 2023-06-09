import "reflect-metadata"
import { DataSource } from "typeorm"
import { Producto } from "./Entity/Producto"
import { Usuarios } from "./Entity/usuario"
import { DetalleFactura } from "./Entity/DetalleFactura"
import { Factura } from "./Entity/Factura"
import { Persona } from "./Entity/Persona"
import { Cliente } from "./Entity/Cliente"
import { TipoCliente } from "./Entity/TipoCliente"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "pruebautn",
    synchronize: true,
    logging: false,
    entities: [Producto,Usuarios,DetalleFactura,Factura,Persona,Cliente,TipoCliente],
    migrations: [],
    subscribers: [],
})
