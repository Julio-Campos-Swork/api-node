const express = require("express");

//llamado a respuestas
const seguridad = require('./seguridad')
const respuesta = require("../../red/respuestas");

//hacemos llamado a la base en controlador
const controlador = require('./index')
//creamos ruta router
const router = express.Router();


router.get('/', todos);
router.get('/:id', uno);
router.post('/', seguridad(), agregar);
router.put('/', seguridad(), eliminar);

async function todos(req, res, next) {
  try {
    const items = await controlador.todos() //asignamos los valores a todos para poder mostrarlos
    respuesta.sucess(req, res, items, 200); // asignamos la respuesta que viene desde respuestas
  } catch (error) {
    next(error);

    
  }
  
};
async function uno(req, res, next) {
  try {
    const items = await controlador.uno(req.params.id) //asignamos los valores a todos para poder mostrarlos
    respuesta.sucess(req, res, items, 200); // asignamos la respuesta que viene desde respuestas

  } catch (error) {
    next(error);

  }
};
async function agregar(req, res, next) {
  try {
    const items = await controlador.agregar(req.body) //asignamos los valores a todos para poder mostrarlos
    if(req.body.id == 0){
      mensaje = 'Item Guardado con exito';
    }else{
      mensaje = 'Item Actualizado con exito';

    }
    respuesta.sucess(req, res, mensaje, 201); // asignamos la respuesta que viene desde respuestas
  } catch (error) {
    next(error);
  }
};

async function eliminar(req, res, next) {
  try {
    const items = await controlador.eliminar(req.body) //asignamos los valores a todos para poder mostrarlos
    respuesta.sucess(req, res, 'Eliminado satisfactoriamente', 200); // asignamos la respuesta que viene desde respuestas
  } catch (error) {
    next(error);
  }
};

module.exports = router;
