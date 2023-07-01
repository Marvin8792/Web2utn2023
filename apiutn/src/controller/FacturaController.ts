import { AppDataSource } from "../data-source";
import { Request, Response } from 'express';
import { Factura } from '../Entity/Factura';
import { validate } from "class-validator";
import { getRepository } from "typeorm";

class ProductosController {
  static getAll = async (req: Request, resp: Response) => {
  try {
    const repoFact = AppDataSource.getRepository(Factura);
    let lista;
    try {
      lista = await repoFact.find({where: {estado:true},relations:{detalles : {producto:true}, cliente:{persona:true}}})
    } catch (error) {
      return resp.status(404).json({mensaje: "Nos se encontro datos"})
    }
    if(lista.length == 0){
      return resp.status(404).json({mensaje: "Nos se encontro datos"})
    }

    return resp.status(200).json(lista)
    
  } catch (error) {
    return resp.status(400).json({mensaje: "Error al cargar"})
  }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const idfactura = parseInt(req.params["idfactura"]);

      if (!idfactura) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      const FacturaRepo = AppDataSource.getRepository(Factura);

      let Facturas;
      try {
        Facturas = await FacturaRepo.findOneOrFail({ where: { idfactura } });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro la factura con ese ID" });
      }

      return resp.status(200).json(Factura);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  }

  static add = async (req: Request, resp: Response) => {
    try {
      const { idfactura, idcliente, detalles, estado } = req.body;

      if (!idfactura) {
        return resp.status(404).json({ mensaje: "Debe indicar el ID de la factura" });
      }
      if (!idcliente) {
        return resp.status(404).json({ mensaje: "Debe indicar el id del cliente" });
      }
      if (estado) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el estado de la factura" });
      }

      const FacturaRepo = AppDataSource.getRepository(Factura);
      const pro = await FacturaRepo.findOne({ where: { idfactura } });

      if (pro) {
        return resp
          .status(404)
          .json({ mensaje: "La factura ya existe en la base datos." });
      }

      const fecha = new Date();

      let Facturas = new Factura();
      Facturas.idfactura = idfactura;
      Facturas.idcliente = idcliente;
      Facturas.fecha = fecha;
      Facturas.estado = true;


      const errors= await validate(Factura, {validationError: { target: false, value: false}});
      if (errors.length > 0){
        return resp
      }
      await FacturaRepo.save(Facturas);
      return resp.status(201).json({ mensaje: "Factura Agregada" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };


  static update = async (req: Request, resp: Response) => {

    const { idfactura, fecha, idcliente, estado } = req.body;

    //validacion de datos de entrada
    if (!idfactura) {
      return resp.status(404).json({ mensaje: "Debe indicar el ID de la factura" });
    }

    if (!fecha) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar la fecha de ingreso" });
    }
    if (!idcliente) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el id del cliente" });
    }

    const FacturaRepo = AppDataSource.getRepository(Factura);
    let pro: Factura;
    try {
     pro = await FacturaRepo.findOneOrFail({ where: { idfactura } });
    } catch (error) {
      return resp.status(404).json({mensaje: "No existe la factura"})
    }

    pro.idfactura= idfactura ;
    pro.idcliente= idcliente;
    pro.fecha= fecha;
    pro.estado=true;

    try {
      await FacturaRepo.save(pro);
      return resp.status(200).json({mensaje: "Se guardo correctamente"})
    } catch (error) {
      return resp.status(400).json({mensaje: "No se pudo guardar"})
    }
  };

  static delete = async (req: Request, resp: Response) => {
    try {
      const idfactura = parseInt(req.params["idfactura"]);
      if (!idfactura) {
        return resp.status(404).json({ mensaje: "Debe indicar el ID" });
      }

      const facturaRepo = AppDataSource.getRepository(Factura);
      let pro: Factura;
      try {
        pro = await facturaRepo.findOneOrFail({
          where: { idfactura: idfactura, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encuentra la factura con ese ID" });
      }

      pro.estado = false;
      try {
        await facturaRepo.save(pro);
        return resp.status(200).json({ mensaje: "Se eliminó correctamente" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se pudo eliminar." });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "No se pudo eliminar" });
    }
  };
}

export default ProductosController;