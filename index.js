const express = require('express');
require('dotenv').config();
const cors = require('cors'); 

const { dbConnection } = require('./database/condfig');

//console.log(process.env);

// Crear el servidor de express
const app = express();
//Configurar cors
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

// Base de Datos
dbConnection();


//Rutas
const usuarios = require('./routes/usuarios');
const auth = require('./routes/auth');
const hospital = require('./routes/hospitales');
const medico = require('./routes/medicos')
const busqueda =  require('./routes/busquedas');
const upload = require('./routes/uploads');

app.use('/api/uploads',upload);
app.use('/api/todo',busqueda);
app.use('/api/usuarios', usuarios);
app.use('/api/login',auth);
app.use('/api/hospitales',hospital);
app.use('/api/medicos',medico);




app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto " + process.env.PORT);
});