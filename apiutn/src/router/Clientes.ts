import { Router } from "express";
import ClienteController from "../controller/ClienteControllers";

const routes= Router();

routes.get('/producto', ClienteController.getAll);
routes.get('/getById/:id', ClienteController.getById);
routes.post('',ClienteController.add);

export default routes;