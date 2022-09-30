require('dotenv').config();


module.exports = {
    app:{
        //creamos puerto en nuestras variables de entornoe puerto en el defecto si no que lo asigne en el 4000
        port: process.env.PORT || 4000,
    },
    jwt:{
        secret: process.env.JET_SECRET || 'notasecreta'
    },
    mysql: {
        //creamos la dependencia para conectar la base de datos
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || 'ejemplo',


    }
}