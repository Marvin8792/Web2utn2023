import { Router } from "express";

import ProductosController from "../controller/FacturaController";
import FacturaController from "../controller/FacturaController";

const routes= Router();

routes.get('', FacturaController.obtenerFacturas);
routes.get('', FacturaController.modificarFactura);
routes.post('',FacturaController.crearFactura);
routes.post('',FacturaController.obtenerFacturaPorID);

export default routes;