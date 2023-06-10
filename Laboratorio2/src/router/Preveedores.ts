import { Router } from "express";
import ProveedorController from "../controller/ProveedorController";

const routes= Router();

routes.get('', ProveedorController.getAll);
routes.get('/getById/:id', ProveedorController.getById);
routes.post('',ProveedorController.add);

export default routes;