const app = require('./app.js'); // se crea constante app que se requiere a si misma para inicializar
//inicializamo servidor
app.listen(app.get('port'), () => {
    console.log("Servidor escuchando en el puerto", app.get("port"));
});
