const express = require('express'); // Importamos express
const { dbConnection } = require('./db/config');
const cors = require('cors');
require('dotenv').config();

// console.log(process.env);

// Crear el servidor express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use( cors());

// Directorio publico
// app.use = middleware
app.use( express.static('public') ); // Con esto cargamos los archivos de la carpeta public

// Lectura del body
app.use( express.json() );

// Rutas
// auth: login, register , renew
app.use('/api/auth', require('./routes/auth') );
// CRUD: create, read , update, delete
app.use('/api/events', require('./routes/events') );
// Escuchar peticiones
app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})