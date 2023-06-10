import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import cors = require("cors")
import helmet from "helmet"
import { Producto } from "./entity/Producto"
import routes from "./router/Productos"

const PORT= process.env.port || 3000;

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    // start express server

    app.use(``,routes);
    app.listen(PORT,()=>{console.log(`servidor corriendo en el puerto: ${PORT}`)})

    


}).catch(error => console.log(error))
