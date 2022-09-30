const express = require("express");

//llamado a respuestas
const respuesta = require("../../red/respuestas");

//hacemos llamado a la base en controlador
const controlador = require('./index')
//creamos ruta router
const router = express.Router();

router.get('/login', login);

async function login(req, res, next){
    try {
        const token = await controlador.login(req.body.usuario , req.body.password);
        respuesta.sucess(req, res, token, 200)
    } catch (error) {
        next(error);
    }
}

module.exports = router;
