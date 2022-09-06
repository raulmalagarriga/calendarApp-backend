const { response } = require('express'); 
const Evento = require("../models/Evento");

const getEventos = async(req , res = response) => {

    const eventos = await Evento.find()
                                .populate('user','name');


    res.status(200).json({
        ok: true,
        eventos
    });
}

const crearEventos = async(req , res = response) => {

    const evento = new Evento( req.body); // Referenciamos el evento con la request

    try {
        // Indicamos el usuario 
        evento.user = req.uid; // El campo user lo vamos a llenar con el uid de la request
        // Guardamos el evento
        const eventoGuardado =  await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardado  
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adm'
        });
    }

}

const actualizarEventos = async(req , res = response) => {
    // Obtenemos el id del evento que hace la request
    const eventoId = req.params.id;
    // ID del usuario
    const uid = req.uid;
    try {
        // Verificamos si el evento existe en BD
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'El evento que se desea modificar no existe'
            })
        }
        // Verificamos si el usuario que quiere actualizar es el dueno del evento
        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no esta autorizado para modificar este evento'
            });
        }
        // Hacemos la referencia del evento actualizado, para luego grabar en Mongo
        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        // Guardamos en Mongo: (ID del evento, nueva referencia del evento, configuraciones)
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new:true});
        res.status(201).json({
            ok: true,
            evento: eventoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adm'
        });
    }

}

const eliminarEventos = async(req , res = response) => {
    // Obtenemos el id del evento que hace la request
    const eventoId = req.params.id;
    // ID del usuario
    const uid = req.uid;
    try {
        // Verificamos si el evento existe en BD
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'El evento que se desea eliminar no existe'
            })
        }
        // Verificamos si el usuario que quiere actualizar es el dueno del evento
        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no esta autorizado para eliminar este evento'
            });
        }
        // Guardamos en Mongo: (ID del evento, nueva referencia del evento, configuraciones)
        const eventoEliminar = await Evento.findByIdAndDelete(eventoId);
        res.status(201).json({
            ok: true,
            evento: eventoEliminar
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adm'
        });
    }
}

module.exports = {
    getEventos,
    crearEventos,
    actualizarEventos,
    eliminarEventos
}