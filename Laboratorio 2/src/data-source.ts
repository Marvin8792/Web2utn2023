import "reflect-metadata"
import { DataSource } from "typeorm"
import { Producto } from "./entity/Producto"
import { Cliente } from "./entity/Cliente"
import { Proveedor } from "./entity/Proveedor"
import { Vendedor } from "./entity/Vendedor"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "pruebautn",
    synchronize: true,
    logging: false,
    entities: [Producto,Cliente,Proveedor,Vendedor],
    migrations: [],
    subscribers: [],
})
