const { io } = require('../server');

const { Usuarios } = require('../classes/usuarios')

const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    // Configurar el listener entrarChat
    client.on('entrarChat', (data, callback) => {

        // Verifico si tengo el nombre del usuario
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre o sala es necesario'
            });
        }

        // Conectar un usuario a una sala
        client.join(data.sala);

        // agrego el usuario
        // id = id del socket que es unico
        // nombre = data.nombre
        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        // Se agrega un nuevo evento, para que todas las personas conectadas a una misma sala
        // escuchen que se conecto un usuario o se desconecto
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

        // en el callback retorno las personas conectadas al chat
        callback(usuarios.getPersonasPorSala(data.sala));
    });

    // El servidor necesita estar escuchando cuando algun usuario llame el metodo de
    // crearMensaje
    client.on('crearMensaje', (data) => {

        // obtengo la persona que envia el mensaje
        let persona = usuarios.getPersona(client.id);

        // se crea el mensaje
        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        // emito el mensaje a todos de una misma sala
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    // Trabajar la desconexion, no tenemos ningun parametro asi que ejecutamos una funcion
    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);

        // Cuando una persona se va del chat emito un evento, para informar a todos los usuarios de una sala
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } salió`));

        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    // El servidor escucha cuando se emitan esos mensajes privados y recibe la data ( mensaje)
    // Mensaje Privados
    client.on('mensajePrivado', data => {

        // obtengo la persona que esta mandando el mensaje privado
        let persona = usuarios.getPersona(client.id);

        // mandamos el mensaje a la persona con un id especifico usando 
        // el .broadcast.to(data.para)
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });

});