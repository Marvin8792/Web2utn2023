import { Router } from "express";
import producto from "./Productos";
import usuario from "./usuario";
import Auth from "./Auth";
const routes = Router();

routes.use("/Producto", producto);
routes.use("/Usuario", usuario);
routes.use("/Auth", Auth);
export default routes;