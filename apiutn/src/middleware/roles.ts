import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuarios } from "../Entity/usuario";

export const checkRoles = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = res.locals.payload;

    const usuarioRepo = AppDataSource.getRepository(Usuarios);

    let usuario: Usuarios;
    try {
      usuario = await usuarioRepo.findOne({ where: { id: id } });
    } catch (error) {
      res.status(400).json({ mensaje: "Error en roles" });
    }

    if (roles.includes(usuario.rol)) {
      next();
    }
    return res.status(401).json("Acceso no autorizado.");
  };
};