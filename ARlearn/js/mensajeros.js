var Mensajeros = function (elemento,
	origen,
	destino,
	sdriverspositions) {

	var capaPedidos, capaMensajeros, map = null;
	var driverspositions = sdriverspositions;

    var deliveryinfo = new Map();

    //Diccionario utilizado para traducir lo que se trae del json
	var diccionario = new Map();
	diccionario.set("gray", "Gris");
	diccionario.set("red", "Rojo");
	diccionario.set("black", "Negro");
	diccionario.set("green", "Verde");

	var posicionConductor = new Object();
	var ListaMarcadores = new Array();

	var inicio = iconsMaker('images/inicio.png', 50);
	var fin = iconsMaker('images/destino.png', 50);

    //Recupero el contenedor de mensajeros y su select para jugar con sus tamaños
	var mensajeros = document.getElementById("mensajeros");
	var contenedorMensajeros = document.getElementById("contenedormensajeros")

	return {
		listarMensajeros: listarMensajeros,
		guardarInfoMapa: guardarInfoMapa,
		seleccionarMensajero: seleccionarMensajero,
		moverMensajero: moverMensajero
	}

	function listarMensajeros() {
		var urlpedido = elemento[elemento.selectedIndex].value;
		var req = parseInt(urlpedido);

		if (req != 404) {


			var alto = ficha.offsetHeight;
			if (alto != 140) {
				if (alto == 440) {
					ficha.style.height = "140px";
				} else {
					ficha.style.height = (alto + 70) + "px"

				}

			}


            //limpio lo que tenga en ficha del pedido para actualizar la informacion
            reiniciarFicha(req);

			mensajeros.size = 1;
			contenedorMensajeros.style.height = "16px";
			var start = origen.get(req);
			var end = destino.get(req);

			//Seteo la vista desde el origen del pedido
			map.setView([start.lat, start.lon], 15);

			//Limpio lo los layers
			capaPedidos.clearLayers();
			capaMensajeros.clearLayers();

			//Inicializo lo markers de inicio y de fin
			var startMarker = markerMaker(start, inicio, "Origen pedido Nº " + urlpedido)
			var endMarker = markerMaker(end, fin, "Destino pedido Nº " + urlpedido)

			capaPedidos.addLayer(startMarker);
            capaPedidos.addLayer(endMarker);
            
			var candidates = driverspositions.get(req);

            //carga la opcion default en la ficha de pedido
            opcionDefault();
		
			for (var i = 0; i < candidates.length; i++) {
				var id1 = candidates[i].driver_id;
				var position = candidates[i].position;


				$.ajax({

					url: 'https://entregasya.herokuapp.com/api/deliveryDrivers/' + id1,
					async: false,
					type: 'GET',
					dataType: 'json',
					success: function (json) {

						result = JSON.parse(JSON.stringify(json));

						var driver = result['driver'];
						var car = driver['car'].description
						var carcolor = driver['car'].color;

                        //Agrego los id de los mensajeros a los option
                        
						$("#mensajeros").append('<option value=' + driver.id +'> -Nº ' + driver.id + ' ' +
							driver.name + ' ' + driver.surname + ' (' + car + ')   Puntacion:  ' + driver.score+ '/5</option>');

						var eyicon = iconsMaker('images/' + carcolor + '.png', 50);
						var marker = markerMaker(position, eyicon, driver.id + '-' + driver.name + ' ' + driver.surname);

						posicionConductor.id = driver.id;
						posicionConductor.marker = marker;

						ListaMarcadores.push(posicionConductor);
						capaMensajeros.addLayer(marker);

						//Agrego un Escuchador al marker para cambiar el estado del select de mensajeros (recurso grafico)
						marker.addEventListener('click', function () {
							var contenido = this._popup._content.split("-");
							var id = parseInt(contenido[0]);

							var mensajeros = document.getElementById("mensajeros");
							mensajeros.value = id;

							listar(id);


						});

                        //Creo el mensajero con los datos obtenidos de la consulta y lo guardo en la lista de informacion
						var info = crearMensajero(driver.id, driver.name, driver.surname, car, carcolor, marker,driver.score);
                        deliveryinfo.set(driver.id, info);
                        
                        
						mensajeros.size = mensajeros.size + 1;
						var e = contenedorMensajeros.offsetHeight + 30;
						contenedorMensajeros.style.height = e + "px";


					},
					error: function (jqXHR, status, error) {
						alert('Disculpe, existió un problema');
					}
				})
				posicionConductor = new Object();
			}
		} else {

			$('#ficha').empty();
			$('#ficha').append('<h1 style="margin-left:auto;margin-right:6em; font-size: 1.5em;" ><i class="fas fa-truck " style="color: white;"></i>Ficha del pedido</h1>');

			capaPedidos.clearLayers();
			capaMensajeros.clearLayers();
			ficha.style.height = "70px"

			mensajeros.size = 1;

			contenedorMensajeros.style.height = "36px";
			opcionDefault();
		}
	}

	function guardarInfoMapa(mapa) {
		map = mapa.obtenerMapa();
		capaPedidos = mapa.obtenerPedidos();
		capaMensajeros = mapa.obtenerMensajeros();

	}

	function seleccionarMensajero(elemento) {
		var urlpedido = elemento[elemento.selectedIndex].value;
		var req = parseInt(urlpedido);

		listar(req);
	}

	function listar(req) {


        //Obtengo la informacion del mensajero con id=req
		var mens = deliveryinfo.get(req);


        //Si el id del mensajero es igual a 404 (default) limpio la ficha
        if (req == 404) 
        {
			$('p').remove(".mensajero");
			ficha.style.height = "140px";


		} else {
            //sino obtengo el alto de ficha para trabajar con el y el color del auto para traducirlo.
			var alto = ficha.offsetHeight;
			var color = diccionario.get(mens.color);


            //Si el alto no es 440px tengo una  ficha incompleta y modifico su tamaño y su informacion 
			if (alto != 440) {
                ficha.style.height = (alto + 300) + "px"
                actualizarFicha(mens.id,mens.name,mens.surname,mens.car,color,mens.score);
				
			} else {
            //Si el alto ya es 440px entonces esta completa siginifica que tengo que modificar la ficha
				$('p').remove(".mensajero")
                actualizarFicha(mens.id,mens.name,mens.surname,mens.car,color,mens.score);
			}
             //Despues de todo modifico la vista del mapa
			var marker = mens.marker;
			var latlong = marker._latlng;
			map.setView([latlong.lat, latlong.lng], 15);
		}
	}

	function moverMensajero() {
		var movimientosMensajeros = null;

		elemento = document.getElementById("mensajeros");
		var deliveryIndice = null;
		var contador = 0;
		ListaMarcadores.forEach(function (element) {
			if (element.id == elemento[elemento.selectedIndex].value) {

				deliveryIndice = contador;
			} else {
				capaMensajeros.removeLayer(element.marker);
			}
			contador++;
		});
		$.ajax({

			url: 'https://entregasya.herokuapp.com/api/deliverydrivers/' + elemento[elemento.selectedIndex].value + '/positions/',
			async: false,
			type: 'GET',
			dataType: 'json',
			success: function (json) {

				result = JSON.parse(JSON.stringify(json));

				movimientosMensajeros = result['positions'];

			},
			error: function (jqXHR, status, error) {
				alert('Disculpe, existió un problema');
			}
		});

		var indice = 0;

		function dibujarLayer(indice, indiceDelivery) {
			ListaMarcadores[deliveryIndice].marker.setLatLng([movimientosMensajeros[indice].lat, movimientosMensajeros[indice].lon]);
			console.log("dibujar");
			if (indice + 1 < movimientosMensajeros.length) {
				setTimeout(function () {
					dibujarLayer(indice + 1, indiceDelivery);
				}, 500);
			}


		}

		dibujarLayer(indice, deliveryIndice);

	}


	//funcion encargada de crear un icono con el url y size pasados como parametro
	function iconsMaker(url, size) {

		var icon = L.icon({
			iconUrl: url,
			iconSize: [size, size],
			iconAnchor: [22, 94],
			shadowAnchor: [4, 62],
			popupAnchor: [-3, -76]
		});

		return icon;


	}

	//funcion encargada de crear un marker con un punto un icono y un nombre para el bindpopup
	function markerMaker(point, icono, name) {
		var om = L.marker([point.lat, point.lon], {
			icon: icono
		}).bindPopup(name);

		return om;

	}

	//
	function crearMensajero(id, name, surname, car, color, marker,score) {
		var mensajero = new Object();
		mensajero.id = id;
		mensajero.name = name;
		mensajero.surname = surname;
		mensajero.car = car;
		mensajero.color = color;
        mensajero.marker = marker;
        mensajero.score=score
		return mensajero;


    }
    
    function reiniciarFicha(req){
        $('#ficha').empty();
		$('#ficha').append('<h1 style="margin-left:auto;margin-right:6em; font-size: 1.5em;" ><i class="fas fa-truck " style="color: white;"></i>Ficha del pedido</h1>');
		$('#ficha').append('<p>Pedido Nº:' + req + '</p>');
    }

    function opcionDefault(){
        $("#mensajeros").empty();
        $("#mensajeros").append('<option value="404">Seleccione un mensajero... </option>');
    }

    function actualizarFicha(id,name,surname,car,color,score)
        {
            var puntaje=dibujarEstrellas(score,"white");

            
            
                $('#ficha').append('<p class="mensajero">Mensajero Nº: ' + id + '</p>');
                $('#ficha').append('<p class="mensajero">Puntaje: ' + puntaje + '</p>');

				$('#ficha').append('<p class="mensajero">Nombre: ' + name + ' ' + surname + '</p>');
                $('#ficha').append('<p class="mensajero">Informacion del vehiculo: ' + car + ' (' + color + ')</p>');
                
                

    }

    function dibujarEstrellas(score,color){
        var puntaje="";
            var noscore=5-score;
            console.log(score+" "+noscore)

            for (var i=0;i<score;i++)
            {
               
               puntaje=puntaje+"<i class='fas fa-star' style='color:white'"+color+"></i>\n"; 
               
            }
            for (var i=0;i<noscore;i++)
            {

               puntaje+="<i class='far fa-star' style='color:white'"+color+"></i>\n"; 
              
            }
            console.log(puntaje);
            return puntaje;
            
    }

}

