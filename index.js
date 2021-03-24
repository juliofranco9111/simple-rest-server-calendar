const express = require('express');
const { dbConnection } = require('./db/config');
const cors = require('cors');



require('dotenv').config();
//console.log( process.env );

const app = express();

// Database
dbConnection();

// CORS
app.use( cors() );

//Directorio publico
app.use( express.static('public') );

//Bodyparser (formData)
app.use( express.json() );



// Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// TODO: CRUD// Eventos 





//Escuchar peticiones

app.listen( process.env.PORT , () => console.log(`Example app listening on port ${ process.env.PORT }`));