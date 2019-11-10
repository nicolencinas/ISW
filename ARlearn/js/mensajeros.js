var destino = new Map();
var origen = new Map();
var driverspositions = new Map();
var map = null;
var layerpedidos, layermensajeros = null;

var inicio = iconsMaker('images/inicio.png', 33);
var fin = iconsMaker('images/destino.png', 33);






$(document).ready(function() {
    var ficha=document.getElementById("ficha");
    map = L.map('map').
    setView([-34.6131516, -58.3772316], 6);

    layerpedidos = L.layerGroup().addTo(map);
    layermensajeros = L.layerGroup().addTo(map);
    $("#pedidos").empty();
    $("#pedidos").append('<option>Buscando pedidos... </option>');

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(map);



    $.ajax({
        url: 'https://entregasya.herokuapp.com/api/requests',
        type: 'GET',
        dataType: 'json',
        success: function(json) {

            result = JSON.parse(JSON.stringify(json));

            $("#pedidos").empty();
            $("#pedidos").append('<option value="404">Seleccione el numero de pedido... </option>');

            for (var i = 0; i < result['requests'].length; i++) {
                var id = result['requests'][i].id;

                $("#pedidos").append('<option value=' + id + '>Pedido Nº ' +
                    id + '</option>');
                var od = result['requests'][i];

                origen.set(id, od.sender);
                destino.set(id, od.receiver);
                driverspositions.set(id, od.availableDrivers);
            }


        },
        error: function(jqXHR, status, error) {
            alert('Disculpe, existió un problema');
        }
    });
});

function obtenerMensajeros(elemento) {

    var urlpedido = elemento[elemento.selectedIndex].value;
    console.log(urlpedido)
    var req = parseInt(urlpedido);

    if (req!=404)
    {
        console.log("Entre igual gato")
        
       

        var aux=ficha.offsetHeight;
        if (aux!=140)
        {
            ficha.style.height=(aux+70)+"px"

        }
        $('#ficha').empty();
        $('#ficha').append('<h1 style="margin-left:auto;margin-right:auto; font-size: 1.5em;" >Ficha del pedido</h1>');
        $('#ficha').append('<p>Pedido Nº: '+req+'</p>');
    
        
        var start=origen.get(req);
        var end=destino.get(req);
    
        //Seteo la vista desde el origen del pedido
        map.setView([ start.lat, start.lon], 15);
    
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
        $("#mensajeros").append('<option value="default">Seleccione un mensajero... </option>');
    
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
    
                    var eyicon = iconsMaker('images/' + carcolor + '.png', 40);
                    var marker = markerMaker(position, eyicon, driver.name + ' ' + driver.surname);
                    layermensajeros.addLayer(marker);
    
                },
                error: function(jqXHR, status, error) {
                    alert('Disculpe, existió un problema');
                }
            })
        }

   

  
    
    $('#ficha').empty();
    $('#ficha').append('<h1 style="margin-left:auto;margin-right:auto; font-size: 1.5em;" >Ficha del pedido</h1>');
    $('#ficha').append('<p>Pedido Nº:'+req+'</p>');

    
    var start=origen.get(req);
    var end=destino.get(req);

    //Seteo la vista desde el origen del pedido
    map.setView([ start.lat, start.lon], 15);

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
    $("#mensajeros").append('<option value="default">Seleccione un mensajero... </option>');

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

                var eyicon = iconsMaker('images/' + carcolor + '.png', 40);
                var marker = markerMaker(position, eyicon, driver.name + ' ' + driver.surname);
                layermensajeros.addLayer(marker);

            },
            error: function(jqXHR, status, error) {
                alert('Disculpe, existió un problema');
            }
        })
    }
}

else{
    $('#ficha').empty();
    $('#ficha').append('<h1 style="margin-left:auto;margin-right:auto; font-size: 1.5em;" >Ficha del pedido</h1>');
    
    layerpedidos.clearLayers();
    layermensajeros.clearLayers();
    ficha.style.height="70px"

}
}



function obtenerRutas(elemento) 
{
    var id = elemento[elemento.selectedIndex].value;

    $.ajax(
        {
        url: 'https://entregasya.herokuapp.com/api/deliveryDrivers/' + id + '/positions',
        type: 'GET',
        dataType: 'json',
        success: function(json) {
            result = JSON.parse(JSON.stringify(json));
            result = result.positions;

            for (var i = 0; i < result.length; i++) 
            {

                var mlat = result[i].lat
                var mlong = result[i].lon
                var om = L.marker([mlat, mlong]);
                om.bindPopup("hola")
                layermensajeros.addLayer(om);
            }
        },
        error: function(jqXHR, status, error) {
            alert('Disculpe, existió un problema');
        }
    });


}

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

function markerMaker(point, icono, name) {
    var om = L.marker([point.lat, point.lon], {
        icon: icono
    }).bindPopup(name);

    return om;

}

