'use strict'

const colors = require('colors');

const argv = require('./configuracion/yargs').argv;

const porHacer = require('./modelo/por-hacer');

//console.log(argv);

let comando = argv._[0];

switch(comando){
	case 'crear':
		console.log(porHacer.crear(argv.descripcion));
		break;

	case 'listar':
		
		let listado = porHacer.getListado(argv.filtrado);

		for (let tarea of listado) {
			console.log('=================================='.green);
			console.log('TAREA: ', tarea.descripcion);
			console.log('Estado: ', tarea.completado);
			console.log('=================================='.green);
		}

		break;

	case 'actualizar':
		let fueActualizado = porHacer.actualizar(argv.descripcion, argv.completado);
		console.log("Actualizado: ",fueActualizado==true ? 'Si' : 'No');
		break;

	case 'borrar':
		let fueBorrado = porHacer.borrar(argv.descripcion);
		console.log("Borrado: ",fueBorrado==true ? 'Si' : 'No');
		break;

	default: console.log("Comando no reconocido, para ver la ayuda por favor ingrese: node app --help".green);
}









