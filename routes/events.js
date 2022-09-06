const { getEventos, crearEventos, actualizarEventos, eliminarEventos } = require("../controllers/events");
const { validateJSW } = require("../middlewares/validar-jwt");
const { Router } = require('express');
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/fieldValidator");
const { isDate } = require('../helpers/isDate');
const router = Router();
// CRUD

// Deben pasar por la validacion del JWT
// Cualquier peticion debajo de este middleware va a hacer uso del mismo
router.use( validateJSW );

// Obtener eventos
router.get(
        // Ruta
        '/',
        // validateJSW, 
        // Controlador
        getEventos
    );

// Crear eventos
router.post(
        '/',
        // validateJSW,
        [
                check('title' , 'Titulo es obligatorio').not().isEmpty(),
                check('start' , 'Fecha de inicio es obligatorio').custom( isDate ),
                check('end' , 'Fecha final es obligatorio').custom( isDate ),
                fieldValidator
                
        ], 
        crearEventos
        );

// Actualizar eventos
router.put(
        '/:id', 
        // validateJSW
        [
                check('title' , 'Titulo es obligatorio').not().isEmpty(),
                check('start' , 'Fecha de inicio es obligatorio').custom( isDate ),
                check('end' , 'Fecha final es obligatorio').custom( isDate ),
                fieldValidator
                
        ],  
        actualizarEventos
        );

// Borrar eventos
router.delete(
        '/:id', 
        // validateJSW,
        eliminarEventos
        );

// Habilitamos y exportamos la ruta
module.exports = router;        

