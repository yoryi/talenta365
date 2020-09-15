//IMPORTACION DE MODULOS
const express = require('express');
const morgan = require('morgan');

//DEFINICIONES GLOBALES
const PORT = process.env.PORT || 3000;

//CONFIGURACION SERVER
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//IMPORTACION DE RUTAS
const api = require('./routes/api.js');

//RUTAS
app.use('/', api);

//PUERTO 3000
app.listen(PORT, () => {
    console.log(`Servidor en el puerto: ${PORT}`);
});