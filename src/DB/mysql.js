//tambien se puede utilizar
//import mysql from 'mysql';
//import config from '../config';

const mysql = require("mysql");
const config = require("../config");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user, //viene de nuestro archivo config
  password: config.mysql.password,
  database: config.mysql.database,
};
let conexion;

//conexion a la base de datos
function conMysql() {
  conexion = mysql.createConnection(dbconfig);

  conexion.connect((err) => {
    if (err) {
      console.log("[db err]", err);
      setTimeout(conMysql, 200);
    } else {
      console.log("DB Conectada!");
    }
  });
//error en la conexion
  conexion.on("error", (err) => {
    console.log("[db.err]");
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      conMysql();
    } else {
      throw err;
    }
  });
}
//iniciamos la conexion
conMysql();
//declaramos las funciones que necesitamos para la base de datos, desde leer todo hasta eliminar
function todos(tabla) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function uno(tabla, id) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${tabla} WHERE ID=${id}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}
function agregar(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`,
      [data, data],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function eliminar(tabla, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `DELETE FROM ${tabla} WHERE id = ?`,
      data.id,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function query(tabla, consulta) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE ?`,
      consulta,
      (error, result) => {
        return error ? reject(error) : resolve(result[0]);
      }
    );
  });
}

module.exports = {
  todos,
  uno,
  agregar,
  eliminar,
  query,
};
