
import ProductosController from "./controller/ProductoController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: ProductosController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: ProductosController
    ,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: ProductosController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: ProductosController,
    action: "remove"
}]