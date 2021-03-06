var origen = new Map();
var destino = new Map();
var driverspositions = new Map();
var map = null;
var mensajeros = null;
var incidencias = null;
var urlPedido = 'https://entregasya.herokuapp.com/api/requests';

var bootstrap = function() {



    map = crearMapa('map');

    $.ajax({
        url: urlPedido,
        type: 'GET',
        dataType: 'json',
        success: function(json) {

            result = JSON.parse(JSON.stringify(json));

            $("#pedidos").empty();
            $("#pedidos").append('<option value="404">Seleccione el numero de pedido... </option>');

			var id = null;
			var od = null;
            for (var i = 0; i < result['requests'].length; i++) {
                
				id = result['requests'][i].id;
				 
                $("#pedidos").append('<option value=' + id + '>Pedido Nº ' +
                    id + '</option>');
                
				od = result['requests'][i];

                origen.set(id, od.sender);
                destino.set(id, od.receiver);
                driverspositions.set(id, od.availableDrivers);
            }


        },
        error: function(jqXHR, status, error) {
            alert('Disculpe, existió un problema');
        }
    });

}


function obtenerMensajeros(elemento)
{
	mensajeros = Mensajeros(elemento,origen,destino,driverspositions);
	mensajeros.guardarInfoMapa(map);
    mensajeros.listarMensajeros();

    incidencias = Incidencias(map.obtenerMensajeros());
    incidencias.listarIncidencias();
}

function seleccionarMensajero(elemento){
    mensajeros.seleccionarMensajero(elemento);
}

function iniciarPedido(){
    mensajeros.moverMensajero();
}
$(bootstrap);