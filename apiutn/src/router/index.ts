import { Router } from "express";
import producto from "./Productos"
import usuario from "./usuario";

const routes= Router();

routes.use('/Producto',producto);
routes.use("/usuario",usuario);

export default routes;