// tenemos acceso a base de datos
const db = require("../../DB/mysql");
const TABLA = "productos";

//exportamos todas las funciones a tra ves de mysql y la variable "db"
module.exports = function (dbinyectada) {

    let db = dbinyectada;

    if(!db){
        db = require ("../../DB/mysql");
    }
  function todos() {
    return db.todos(TABLA);
  }
  function uno(id) {
    return db.uno(TABLA, id);
  }
  function agregar(body) {
    return db.agregar(TABLA, body);
  }
  function eliminar(body) {
    return db.eliminar(TABLA, body);
  }
  return {
    todos,
    uno,
    agregar,
    eliminar,
  };
};
