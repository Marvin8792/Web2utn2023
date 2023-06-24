import { AppDataSource } from "../data-source";
import { Request, Response } from 'express';
import { Factura } from '../Entity/Factura';
import { DetalleFactura } from '../Entity/DetalleFactura';

class FacturaController{
// Obtener todas las facturas
 static obtenerFacturas = async (req: Request, res: Response): Promise<Response> => {
  const facturaRepository = AppDataSource.getRepository(Factura);
  const facturas = await facturaRepository.find({ relations: ['detalles'] });
  return res.json(facturas);
};

// Obtener una factura por su id
 static obtenerFactura = async (req: Request, res: Response): Promise<Response> => {
  const facturaRepository = AppDataSource.getRepository(Factura);
  const factura = await facturaRepository.findOne.call(req.params.id, { relations: ['detalles'] });
  if (factura) {
    return res.json(factura);
  } else {
    return res.status(404).json({ error: 'Factura no encontrada' });
  }
};

// Crear una nueva factura con sus detalles
 static crearFactura = async (req: Request, res: Response): Promise<Response> => {
  const { cliente, detalles } = req.body;

  const facturaRepository = AppDataSource.getRepository(Factura);
  const detalleFacturaRepository = AppDataSource.getRepository(DetalleFactura);

  const factura = new Factura();
  factura.cliente = cliente;

  const detallesGuardados: DetalleFactura[] = [];

  for (const detalle of detalles) {
    const detalleFactura = new DetalleFactura();
    detalleFactura.producto = detalle.producto;
    detalleFactura.cantidad = detalle.cantidad;
    detalleFactura.precio = detalle.precio;
    detalleFactura.factura = factura;

    await detalleFacturaRepository.save(detalleFactura);
    detallesGuardados.push(detalleFactura);
  }

  factura.detalles = detallesGuardados;
  await facturaRepository.save(factura);

  return res.status(201).json(factura);
};

// Modificar una factura existente
static modificarFactura = async (req: Request, res: Response): Promise<Response> => {
  const { cliente, detalles } = req.body;
  const facturaId = req.params.id;

  const facturaRepository = AppDataSource.getRepository(Factura);
  const detalleFacturaRepository = AppDataSource.getRepository(DetalleFactura);

  const factura = await facturaRepository.findOne.call(facturaId, { relations: ['detalles'] });
  if (!factura) {
    return res.status(404).json({ error: 'Factura no encontrada' });
  }

  factura.cliente = cliente;

  const detallesGuardados: DetalleFactura[] = [];

  // Actualizar detalles existentes y agregar nuevos
  for (const detalle of detalles) {
    if (detalle.id) {
      const detalleExistente = factura.detalles.find(d => d.id === detalle.id);
      if (detalleExistente) {
        detalleExistente.producto = detalle.producto;
        detalleExistente.cantidad = detalle.cantidad;
        detalleExistente.precio = detalle.precio;
        await detalleFacturaRepository.save(detalleExistente);
        detallesGuardados.push(detalleExistente);
      }
    } else {
      const nuevoDetalle = new DetalleFactura();
      nuevoDetalle.producto = detalle.producto;
      nuevoDetalle.cantidad = detalle.cantidad;
      nuevoDetalle.precio = detalle.precio;
      nuevoDetalle.factura = factura;

      await detalleFacturaRepository.save(nuevoDetalle);
      detallesGuardados.push(nuevoDetalle);
    }
  }

  // Eliminar detalles que no están en la lista actualizada
  factura.detalles = factura.detalles.filter(d => detallesGuardados.some(g => g.id === d.id));

  await facturaRepository.save(factura);

  return res.json(factura);
};

};

export default FacturaController;