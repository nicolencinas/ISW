
var crearMapa = function(mapaId){
	var map = null;
	var layerpedidos,layermensajeros = null;
	map = L.map(mapaId).
	setView([-34.6131516, -58.3772316],6);

	layerpedidos = L.layerGroup().addTo(map);
	layermensajeros = L.layerGroup().addTo(map);
	$("#pedidos").empty();
	$("#pedidos").append('<option>Buscando pedidos... </option>');

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
		{
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom: 18
		}).addTo(map);

	return {obtenerMapa:obtenerMapa,
		    obtenerPedidos:obtenerPedidos,
			obtenerMensajeros:obtenerMensajeros}
	
	function obtenerPedidos() {        
		return layerpedidos;
    }
	function obtenerMensajeros() {        
		return layermensajeros;
    }
	function obtenerMapa(){
		return map;
	}
}