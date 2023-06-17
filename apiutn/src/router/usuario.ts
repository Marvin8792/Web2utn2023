import { Router } from "express";

import UsuarioController from "../controller/UsuarioController";

const routes= Router();

routes.get('', UsuarioController.getAll);
routes.get('/getById/:id', UsuarioController.apply);
routes.post('',UsuarioController.apply);
routes.patch('',UsuarioController.apply);
routes.delete('/:id',UsuarioController.apply);
export default routes;