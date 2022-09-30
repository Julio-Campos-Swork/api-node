const express = require ('express'); // bus
const morgan = require('morgan');
const config = require('./config'); 
const cors = require('cors')

const productos = require('./modulos/productos/rutas')
const usuarios = require('./modulos/usuarios/rutas')
const auth = require('./modulos/auth/rutas')


const error = require('./red/errors')


const app = express();

//middlewere
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true }));

//use cors
app.use(cors())

app.set('port', config.app.port); // el mismo puerto que configuramos en index


//rutas
app.use('/api/productos', productos);
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);


app.use(error);
//exportamos app



module.exports = app;