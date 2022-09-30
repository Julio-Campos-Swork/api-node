const jwt = require("jsonwebtoken");
const config = require("../config.js");
const error = require('../middleware/errors.js')

//mediante secret asignamos lo que tenemos en config jwt secret
const secret = config.jwt.secret;


function asignarToken(data) {
  return jwt.sign(data, secret);
}

function verificarToken(token){

  return jwt.verify(token, secret);
}

const chequearToken = {
  confirmarToken: function(req, id){
    const decodificado = decodificarCabecera(req);
//hacemos una comparacion de id para saber si el usuario puede realizar ciertas tareas o restringirlo
      if(decodificado.id !== id){ 
        throw error ('Acceso denegado',401);
      }
// //aqui hay restricciones
  }
} 
function obtenerToken(autorizacion){  
  if(!autorizacion){
    throw error('Sin token, sorry',401);
  }
  if(autorizacion.indexOf('Bearer') === -1){
    throw error('Formato incorrecto',401);
  }

  let token = autorizacion.replace('Bearer ', '');
  return token
}
//decodificar el header
function decodificarCabecera(req){
  const autorizacion = req.headers.authorization || '';
  const token = obtenerToken(autorizacion);
  const decodificado = verificarToken(token);

  req.user = decodificado;

  return decodificado;
}
module.exports = {
  asignarToken,
  chequearToken,
};
