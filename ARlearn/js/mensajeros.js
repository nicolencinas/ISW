var Mensajeros = function(elemento,
    origen,
    destino,
    sdriverspositions) {

    var urlpedido = elemento[elemento.selectedIndex].value;
    var req = parseInt(urlpedido);
    var start = origen.get(req)
    var end = destino.get(req)
    var layerpedidos, layermensajeros = null;
    var driverspositions = sdriverspositions;

    var deliveryinfo = new Map();
    var diccionario = new Map();
    diccionario.set("gray", "Gris");
    diccionario.set("red", "Rojo");
    diccionario.set("black", "Negro");
    diccionario.set("green", "Verde");

    var driverPosition = new Object();
    var listaMarker = new Array();

    var inicio = iconsMaker('images/inicio.png', 50);
    var fin = iconsMaker('images/destino.png', 50);
    var map = null;

    return {
        listarMensajeros: listarMensajeros,
        guardarInfoMapa: guardarInfoMapa,
        listarRutas: listarRutas,
        moverMensajero: moverMensajero
    }

    function listarMensajeros() {
        var urlpedido = elemento[elemento.selectedIndex].value;
        var req = parseInt(urlpedido);

        if (req != 404) {



            var aux = ficha.offsetHeight;
            if (aux != 140) {
                if (aux == 340) {
                    ficha.style.height = "140px";
                } else {
                    ficha.style.height = (aux + 70) + "px"

                }

            }


           
            //limpio lo que tenga en ficha del pedido para actualizar la informacion
            $('#ficha').empty();
            $('#ficha').append('<h1 style="margin-left:auto;margin-right:6em; font-size: 1.5em;" ><i class="fas fa-truck " style="color: white;"></i>Ficha del pedido</h1>');
            $('#ficha').append('<p>Pedido Nº:' + req + '</p>');


            var start = origen.get(req);
            var end = destino.get(req);

            //Seteo la vista desde el origen del pedido
            map.setView([start.lat, start.lon], 15);

            //Limpio lo los layers
            layerpedidos.clearLayers();
            layermensajeros.clearLayers();

            //Inicializo lo markers de inicio y de fin
            var startMarker = markerMaker(start, inicio, "Origen pedido Nº " + urlpedido)
            var endMarker = markerMaker(end, fin, "Destino pedido Nº " + urlpedido)

            layerpedidos.addLayer(startMarker);
            layerpedidos.addLayer(endMarker);

            //	console.log(driverspositions)


            var candidates = driverspositions.get(req);

            $("#mensajeros").empty();
            $("#mensajeros").append('<option value="404">Seleccione un mensajero... </option>');

            for (var i = 0; i < candidates.length; i++) {
                var id1 = candidates[i].driver_id;
                var position = candidates[i].position;


                $.ajax({

                    url: 'https://entregasya.herokuapp.com/api/deliveryDrivers/' + id1,
                    async: false,
                    type: 'GET',
                    dataType: 'json',
                    success: function(json) {

                        result = JSON.parse(JSON.stringify(json));

                        var driver = result['driver'];
                        var car = driver['car'].description
                        var carcolor = driver['car'].color;

                        //Agrego los id de los mensajeros a los option
                        $("#mensajeros").append('<option value=' + driver.id + '> -Nº ' + driver.id + ' ' +
                            driver.name + ' ' + driver.surname + ' (' + car + ')  </option>');

                        var eyicon = iconsMaker('images/' + carcolor + '.png', 50);
                        var marker = markerMaker(position, eyicon, driver.id + '-' + driver.name + ' ' + driver.surname);

                        driverPosition.id = driver.id;
                        driverPosition.marker = marker;
            
                        listaMarker.push(driverPosition);
                        layermensajeros.addLayer(marker);

                        //Agrego un Escuchador al marker para cambiar el estado del select de mensajeros (recurso grafico)
                        marker.addEventListener('click', function() 
                        {
                            var contenido = this._popup._content.split("-");
                            var id = parseInt(contenido[0]);
                            
                            var mensajeros=document.getElementById("mensajeros");
                            mensajeros.value=id;

                          listar(id);

                          
                           
                        });

                        var info = new Mensajero(driver.id, driver.name, driver.surname, car, carcolor, marker)
                        deliveryinfo.set(driver.id, info);


                    },
                    error: function(jqXHR, status, error) {
                        alert('Disculpe, existió un problema');
                    }
                })
                driverPosition = new Object();
            }
        } else {
            $('#ficha').empty();
            $('#ficha').append('<h1 style="margin-left:auto;margin-right:6em; font-size: 1.5em;" ><i class="fas fa-truck " style="color: white;"></i>Ficha del pedido</h1>');

            layerpedidos.clearLayers();
            layermensajeros.clearLayers();
            ficha.style.height = "70px"

        }
    }

    function guardarInfoMapa(mapa) 
    {
        map = mapa.obtenerMapa();
        layerpedidos = mapa.obtenerPedidos();
        layermensajeros = mapa.obtenerMensajeros();

    }

    function listarRutas(elemento)
     {
        var urlpedido = elemento[elemento.selectedIndex].value;
        var req = parseInt(urlpedido);

        listar(req);
    }

    function listar(req) {


        var mens = deliveryinfo.get(req);


        if (req == 404)
         {
            $('p').remove(".mensajero");
            ficha.style.height = "140px";


        } else {
            var aux = ficha.offsetHeight;
            var color = diccionario.get(mens.color);


            if (aux != 340) {
                ficha.style.height = (aux + 200) + "px"
                $('#ficha').append('<p class="mensajero">Mensajero Nº: ' + mens.id + '</p>');
                $('#ficha').append('<p class="mensajero">Nombre: ' + mens.name + ' ' + mens.surname + '</p>');
                $('#ficha').append('<p class="mensajero">Informacion del vehiculo: ' + mens.car + ' (' + color + ')</p>');

            } else {

                $('p').remove(".mensajero")
                $('#ficha').append('<p class="mensajero">Mensajero Nº: ' + mens.id + '</p>');
                $('#ficha').append('<p class="mensajero">Nombre: ' + mens.name + ' ' + mens.surname + '</p>');
                $('#ficha').append('<p class="mensajero">Informacion del vehiculo: ' + mens.car + ' (' + color + ')</p>');


            }

            var marker = mens.marker;
            marker.openPopup();
            console.log(marker);

            var latlong = marker._latlng;
            map.setView([latlong.lat, latlong.lng], 15);
        }
    }

    function moverMensajero(){
        var movimientosMensajeros = null;
        
        elemento = document.getElementById("mensajeros");
        var deliveryIndice = null;
        var contador = 0;
        listaMarker.forEach(function(element) {
            if(element.id == elemento[elemento.selectedIndex].value){
                deliveryIndice = contador;
            }
            contador++;
        });
        $.ajax({
    
            url: 'https://entregasya.herokuapp.com/api/deliverydrivers/'+elemento[elemento.selectedIndex].value+'/positions/',
            async: false,
            type: 'GET',
            dataType: 'json',
            success: function(json) {
    
                result = JSON.parse(JSON.stringify(json));
    
                movimientosMensajeros = result['positions'];
    
            },
            error: function(jqXHR, status, error) {
                alert('Disculpe, existió un problema');
            }
        });
    
        var indice = 0;
        
        function dibujarLayer(indice,indiceDelivery){
            listaMarker[deliveryIndice].marker.setLatLng([movimientosMensajeros[indice].lat, movimientosMensajeros[indice].lon]);
            console.log("dibujar");
            if(indice+1 < movimientosMensajeros.length){
                setTimeout(function(){ dibujarLayer(indice+1,indiceDelivery );}, 500);
            }
    
    
        }
    
        dibujarLayer(indice,deliveryIndice);
    
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

}


