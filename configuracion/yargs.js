'use strict'

const descripcion = {
	demand: true,
	alias: 'd',
	desc: "Descripción de la tarea por hacer."
};

const completado = {
	alias: 'c',
	default: true,
	desc: 'Marca como completado o pendiente la tarea.'
};

const filtrado = {
	alias: 'f',
	desc: 'Filtra la búsqueda de tareas por hacer, por [true|false].'
};

const argv = require('yargs')
			.command('crear','Crea un elemento o tarea por hacer',{descripcion})
			.command('listar','Lista las tareas por hacer',{filtrado})
			.command('actualizar','Actualiza el estado completado de una tarea por hacer',{descripcion,completado})
			.command('borrar','Borrar una tarea por hacer',{descripcion})
			.help()
			.argv;

module.exports = {
	argv	
}