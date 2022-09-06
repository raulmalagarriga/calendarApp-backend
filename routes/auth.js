const { Router } = require('express');
const { crearUser , loginUser , revalidarToken } = require('../controllers/auth');
// midleware que valida campos
const { check } = require( 'express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { validateJSW } = require('../middlewares/validar-jwt');
const router = Router();


// Creamos la ruta
router.post(
        '/new' ,
        [
            // Middlewares
            check( 'name' , 'El nombre es obligatorio').not().isEmpty(), // Verifica si esta vacio
            check( 'email' , 'El email es obligatorio').isEmail(),
            check( 'password' , 'El password debe tener 6 caracteres').isLength(min = 6),
            fieldValidator

        ],
        crearUser 
    );

router.post(
        '/', 
        [
            check( 'email' , 'El email es obligatorio').isEmail(),
            check( 'password' , 'El password debe tener 6 caracteres').isLength(min = 6),
            fieldValidator
        ],
        loginUser 
        );

router.get(
    '/renew', 
    // Middlewares
    validateJSW, 

    revalidarToken 
    );

// Habilitamos y exportamos la ruta
module.exports = router;
