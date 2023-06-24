import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuarios } from "../Entity/usuario";
import { validate } from "class-validator";

class UsuariosController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const repoUsuario = AppDataSource.getRepository(Usuarios);
      const listaUsuario = await repoUsuario.find({ where: { estado: true } });

      if (listaUsuario.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: "No hay registros de usuarios" });
      }

      return resp.status(200).json(listaUsuario);
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: "Error desconocido. PAGUE 50MIL DOLARES" });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);

      if (!id) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      const usuarioRepo = AppDataSource.getRepository(Usuarios);

      let usuario;
      try {
        usuario = await usuarioRepo.findOneOrFail({ where: {id, estado: true}});
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el producto con ese ID" });
      }

      return resp.status(200).json(usuario);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const { id, nombre, apellido1, apellido2, correo, rol, contrasena } =
        req.body;

      // typescript
      let fecha: Date;

      let usuario =  new Usuarios();
      usuario.id = id;
      usuario.nombre = nombre;
      usuario.apellido1 = apellido1;
      usuario.apellido2 = apellido2;
      usuario.fecha_ingreso = fecha;
      usuario.correo = correo;
      usuario.contrasena = contrasena;
      usuario.rol = rol;
      usuario.estado = true;

      //validacion de datos de entrada
      const validateOpt = { validationError: { target: false, value: false } };
      const errores = await validate(usuario, validateOpt);

      if (errores.length != 0) {
        return resp.status(400).json(errores);
      }
      // reglas de negocio
      // valiando que el usuario o haya sido creado anteriormente
      const repoUsuario = AppDataSource.getRepository(Usuarios);
      let usuarioExist = await repoUsuario.findOne({
        where: { id: id },
      });
      if (usuarioExist) {
        resp.status(400).json({ mensaje: "El usuario ya existe" });
      }

      // valiado que el correo no este registrado a algun usuario ya creado
      usuarioExist = await repoUsuario.findOne({ where: { correo: correo } });
      if (usuarioExist) {
        resp
          .status(400)
          .json({ mensaje: "Ya existe un usuario registrado con el correo" });
      }

      usuario.hashPassword();

      try {
        await repoUsuario.save(usuario);
        return resp.status(201).json({ mensaje: "Se ha creado el usuario" });
      } catch (error) {
        resp.status(400).json(error);
      }
    } catch (error) {
      resp.status(400).json({ mensaje: "Error desconocido." });
    }
  };
}
export default UsuariosController;
