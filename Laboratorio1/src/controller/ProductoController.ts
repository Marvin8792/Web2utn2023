import { Request, Response } from "express";

class ProductosController{
    static add(arg0: string, add: any) {
        throw new Error("Method not implemented.");
    }

    static GetAll = async (req:Request, resp:Response)=>{

        return resp.status(200).json({mensaje: `ok`})
    }

    static getb = async(req:Request, resp:Response)=>{

    }
}

export default ProductosController;