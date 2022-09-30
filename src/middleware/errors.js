//mensajes de error
function error(mensaje, code){
    let e = new Error(mensaje);

    if(code){
        e.StatusCode = code;
    }
    return error
}

module.exports = error;