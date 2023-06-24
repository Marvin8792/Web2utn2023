import { Router } from "express";

import UsuarioController from "../controller/UsuarioController";

const routes= Router();

routes.get('', UsuarioController.getAll);
//routes.get('/getById/:id', UsuarioController.getById);
routes.post("",UsuarioController.add);
export default routes;