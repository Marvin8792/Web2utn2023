const express = require('express');
const router = express.Router();
const clienteController = require('../controller/ClienteController');

// Ruta para obtener todos los clientes
router.get('/clientes', clienteController.getAllClientes);

// Ruta para obtener un cliente por su cédula
router.get('/clientes/:cedula', clienteController.getClienteByCedula);

module.exports = router;

