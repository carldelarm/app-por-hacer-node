'use strict'

//Importa un módulo que provee una API que nos permite interactuar con el sistema de archivos
const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const guardarDB = () => {

	let data = JSON.stringify(listadoPorHacer);

	return new Promise((resolve, reject) => {

		fs.writeFile(`db/data.json`, data, (err) => {
		  if (err) reject(err);

		  else resolve(data);
		});
	});
}

const cargarDB = () => {
	try{
		listadoPorHacer = require('../db/data.json');

	} catch(err){
		listadoPorHacer = [];
	}
}

const crear = (descripcion) => {

	cargarDB();

	let porHacer = {
		descripcion,
		completado: false
	}

	listadoPorHacer.push(porHacer);

	//Persiste la informacion en el archivo data.json
	guardarDB()
	.then(resultado => {
		console.log('Archivo creado........................[OK]'.red);
		//console.log(`Datos: ${resultado.green}`)
	})
	.catch(err=>console.log(err));

	return porHacer;
}

const getListado = (filtro) => {

	cargarDB();

	if(filtro != undefined){

		console.log('Tipo: ',typeof filtro);

		if(filtro == 'true' || filtro == 'false' || filtro==true){
			console.log('Entro por aqui..., Filtrado por: '.red, filtro);
			if(filtro == 'true') filtro = true;
			if(filtro == 'false') filtro = false;

			let nuevoListado = listadoPorHacer.filter(tarea => {
				return tarea.completado === filtro;
			});

			if(listadoPorHacer.length !== nuevoListado.length){
				listadoPorHacer = nuevoListado;
			}

		}else{
			console.log(`Se ha ingresado un valor de filtro no válido [${filtro}], por tal motivo se ha regresado toda la lista.`.red);
		}
	}
	
	return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
	cargarDB();

	let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

	if(index>=0){
		listadoPorHacer[index].completado = completado;
		guardarDB();
		return true;
	}else{
		return false;
	}

}

const borrar = (descripcion) => {
	cargarDB();

	//Forma #1:
	/*
	let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

	if(index>=0){
		listadoPorHacer.splice(index, 1);
		guardarDB();
		return true;
	}else{
		return false;
	}*/

	//Forma #2:
	let nuevoListado = listadoPorHacer.filter(tarea => {
		return tarea.descripcion !== descripcion;
	});

	if(listadoPorHacer.length === nuevoListado.length){
		return false;
	}else{
		listadoPorHacer = nuevoListado;
		guardarDB();
		return true;
	}
}

module.exports = {
	crear,
	getListado,
	actualizar,
	borrar
}

