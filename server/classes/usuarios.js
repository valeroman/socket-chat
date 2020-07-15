class Usuarios {

    // Inicializar el arreglo de personas
    constructor() {
        this.personas = [];
    }

    ///////// Metodos ////////////

    // Agregar persona a la sala del chat
    agregarPersona(id, nombre, sala) {

        let persona = { id, nombre, sala };

        // agregar persona al arreglo de personas
        this.personas.push(persona);

        // devuelvo todas las personas
        return this.personas;
    }

    // Obtener persona por su Id
    getPersona(id) {

        // buscar en el arreglo de personas si alguien coincide con el id
        // la funcion filter siempre regresa un nuevo arreglo, por eso se necesita
        // siempre la primera posicion [0], un unico registro
        let persona = this.personas.filter(persona => {
            return persona.id === id
        })[0];

        return persona;
    }

    // Obtener a todas las personas
    getPersonas() {
        return this.personas;
    }

    // Obtener personas por sala
    getPersonasPorSala(sala) {

        // obtengo un nuevo arreglo de personas activas de una sala con el filter,  
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);

        return personasEnSala;
    }

    // Borrar persona
    borrarPersona(id) {

        // obtengo la persona antes de eliminarla
        let personaBorrada = this.getPersona(id);

        // obtengo un nuevo arreglo de personas activas con el filter,  
        // eliminando a la persona por el id
        this.personas = this.personas.filter(persona => persona.id != id);

        return personaBorrada;
    }
}





module.exports = {
    Usuarios
}