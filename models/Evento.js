const {Schema , model}  = require("mongoose");

const EventoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, // Referenciamos al id del usuario que guarda el evento
        ref: 'Usuario',
        required: true
    }
});

// Configuraciones adicionales al modelo:
EventoSchema.method('toJSON' , function(){
   const { __v , _id, ...object} =  this.toObject(); // Obtenemos todo el objeto que se esta serializando (el modelo)
    object.id = _id;
    return object;
});

module.exports = model('Evento' , EventoSchema);
