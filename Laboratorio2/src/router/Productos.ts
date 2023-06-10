import { Router } from "express";

import ProductosController from "../controller/ProductoController";

const routes= Router();

routes.get('/producto', ProductosController.getAll);
routes.get('/getById/:id', ProductosController.getById);
routes.post('',ProductosController.add);

export default routes;