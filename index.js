const express = require('express');
require('dotenv').config();
const cors = require('cors'); 

const { dbConnection } = require('./database/condfig');

//console.log(process.env);

// Crear el servidor de express
const app = express();
//Configurar cors
app.use( cors() );

// Base de Datos

dbConnection();

//Rutas
app.get('/', (req,res) => {
    res.status(200).json({
        ok: true,
        msg: 'Hola Mundo'
    });
});


app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto " + process.env.PORT);
});