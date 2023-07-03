import { Router } from "express";

import FacturaController from "../controller/FacturaController";

const routes= Router();

routes.use("", FacturaController.getAll);
routes.use("/getById/:idfactura", FacturaController.getById)
routes.use("", FacturaController.add)
routes.use("", FacturaController.update)
routes.delete("/:idfactura", FacturaController.delete)

export default routes;