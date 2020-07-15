// Funcion que recibe el nombre del usuario y mensaje del usuario
// retorna el usuario, mensaje y la fecha del mensaje enviado
const crearMensaje = (nombre, mensaje) => {

    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    };
}

module.exports = {
    crearMensaje
}