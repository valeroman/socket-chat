var socket = io();

// Leer por parametro lo que venga como usuario
var params = new URLSearchParams(window.location.search);

// Preguntar si viene el nombre y / o sala en los params, si no viene lo redirecciono al index.html
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesario');
}

// construir el usuario con el nombre y la sala
var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    // cuando un usuario se conecta, necesito disparar un evento personalizado
    // que le diga al backend quien soy yo
    // se ejecuta un callback, para que el servidor regrese todos los usuarios conectados
    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados ', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Roman',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información de que un usuario a abandonado el chat
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {
    console.log(personas);
});

// Mensaje Privado
// Accion del cliente de escuchar el mensaje privado
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado', mensaje);
});