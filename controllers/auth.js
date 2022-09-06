const { response } = require('express'); 
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJSW } = require('../helpers/jwt');

 // REGISTRO
const crearUser = async(req , res = response) => {
    const {email, password} = req.body;
    try {
        // Comprobamos si el email ya se esta usando con la funcion de mongoose findOne
        let usuario = await Usuario.findOne({email});
        /* Si findOne devuelve un user, entrara en el if y devolvera status 400 por que el usuario
         ya esta en uso */
        if( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }
        // Guardamos en bd
        usuario = new Usuario( req.body ); // Creamos el registro con lo recibido (request)
        // Antes de guardar en BD debemos encriptar la contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password , salt );
        // save(): Guarda en mongo la req como un nuevo registro.
        await usuario.save(); 
        
        // GENERAR JSW
        const token = await generarJSW( usuario.id , usuario.name )

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el adm'
        });
    }

   
}

// LOGIN
const loginUser = async(req , res = response) => {
    const { email, password} = req.body;
    try {
        // Confirmar si el email existe o no
        const usuario = await Usuario.findOne({email});
        // Si no existe vamos a devolver status 400 y salimos de la funcion
        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario con ese email'
            });
        }
        // Confirmar los password
        /* Se compara el password ingresado con el password de la BD, esta funcion
        devueve un true si es correcto y falso en caso contrario */
        const validPassword = bcrypt.compareSync(password , usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'La contrasena no es correcta'
            });
        }
        // GENERAR JSW
        const token = await generarJSW( usuario.id , usuario.name )

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el adm'
        });
    }
}

// NUEVO TOKEN
const revalidarToken = async(req , res = response) => {

    const {uid , name} = req;

    // GENERAR JSW
    const token = await generarJSW( uid , name )

    res.json({
        ok: true,
        msg: 'renew',
        token,
        uid,
        name
    });
}



module.exports = {
    crearUser,
    loginUser,
    revalidarToken
}