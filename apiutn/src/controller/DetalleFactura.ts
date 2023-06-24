import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Factura } from '../Entity/Factura';
import { DetalleFactura } from '../Entity/DetalleFactura';


// Obtener detalles de una factura por su id
export const obtenerDetallesFactura = async (req: Request, res: Response): Promise<Response> => {
  const facturaId = req.params.facturaId;

  const detalleFacturaRepository = AppDataSource.getRepository(DetalleFactura);
  const detalles = await detalleFacturaRepository.find({ where: { factura : facturaId } });

  return res.json(detalles);
};

// Agregar detalle a una factura existente
export const agregarDetalleFactura = async (req: Request, res: Response): Promise<Response> => {
  const facturaId = req.params.facturaId;
  const { producto, cantidad, precio } = req.body;


  const facturaRepository = AppDataSource.getRepository(Factura);
  const detalleFacturaRepository = AppDataSource.getRepository(DetalleFactura);

  const factura = await facturaRepository.findOne(facturaId);
  if (!factura) {
    return res.status(404).json({ error: 'Factura no encontrada' });
  }

  const detalle = new DetalleFactura();
  detalle.producto = producto;
  detalle.cantidad = cantidad;
  detalle.precio = precio;
  detalle.factura = factura;

  await detalleFacturaRepository.save(detalle);

  return res.status(201).json(detalle);
};

// Modificar detalle de una factura existente
static modificarDetalleFactura = async (req: Request, res: Response): Promise<Response> => {
  const facturaId = req.params.facturaId;
  const detalleId = req.params.detalleId;
  const { producto, cantidad, precio } = req.body;

  const detalleFacturaRepository = AppDataSource.getRepository(DetalleFactura);

  const detalle = await detalleFacturaRepository.findOne(detalleId, { relations: ['factura'] });
  if (!detalle || detalle.factura.id !== facturaId) {
    return res.status(404).json({ error: 'Detalle de factura no encontrado' });
  }

  detalle.producto = producto;
  detalle.cantidad = cantidad;
  detalle.precio = precio;

  await detalleFacturaRepository.save(detalle);

  return res.json(detalle);
};

// Eliminar detalle de una factura existente
 static eliminarDetalleFactura = async (req: Request, res: Response): Promise<Response> => {
  const facturaId = req.params.facturaId;
  const detalleId = req.params.detalleId;

  const detalleFacturaRepository = AppDataSource.getRepository(DetalleFactura);

  const detalle = await detalleFacturaRepository.findOne(detalleId, { relations: ['factura'] });
  if (!detalle || detalle.factura.facturaId !== facturaId) {
    return res.status(404).json({ error: 'Detalle de factura no encontrado' });
  }

  await detalleFacturaRepository.remove(detalle);

  return res.json({ message: 'Detalle de factura eliminado' });
};