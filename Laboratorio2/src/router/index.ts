import { Router } from "express";
import producto from "./Productos"

const routes= Router();

routes.use('/Productos',producto);


export default routes;