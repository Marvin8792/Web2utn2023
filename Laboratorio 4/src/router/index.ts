import { Router } from "express";
import producto from "./Productos";
import usuario from "./usuario";
import Auth from "./Auth";
import Factura  from "./Factura";
const routes = Router();

routes.use("/Producto", producto);
routes.use("/Usuario", usuario);
routes.use("/Auth", Auth);
routes.use("/Factura", Factura);
export default routes;