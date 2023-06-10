import { Router } from "express";
import { Producto } from "../entity/Producto";
import ProductosController from "../controller/ProductoController";

const routes= Router();

routes.get(``, ProductosController.GetAll);
routes.post(`create`, ProductosController.add)

export default routes;