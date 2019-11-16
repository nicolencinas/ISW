var Incidencias = function (layermensajeros) {
    var tipoIncidencias;
    return {
        listarIncidencias: listarIncidencias
    }

    function listarIncidencias() {
        var incidencias;
       
        $.ajax({

            url: 'https://entregasya.herokuapp.com/api/incidents/',
            async: false,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                incidencias = JSON.parse(JSON.stringify(json)).incidents;

            },
            error: function (jqXHR, status, error) {
                alert('Disculpe, error al obtener las incidencias');
            }
        });

        tipoIncidencias = obtenerTipoIncidencias();


        for (var i = 0; i < incidencias.length; i++) {

            var eyicon = iconsMaker('images/oscar.png', 50);
            var marker = markerMaker(incidencias[i].coordinate, eyicon, obtenerTipo(incidencias[i].type_id));

            layermensajeros.addLayer(marker);

        }

    }
    function obtenerTipoIncidencias(){
        var result;
        $.ajax({

            url: 'https://entregasya.herokuapp.com/api/incidenttypes/',
            async: false,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                result = JSON.parse(JSON.stringify(json));

            },
            error: function (jqXHR, status, error) {
                alert('Disculpe, error al obtener los tipo de incidencias');
            }
        });
        return result.incidenttypes;
    }
    function obtenerTipo(id){

        for (var i = 0; i < tipoIncidencias.length; i++) {
            if(tipoIncidencias[i].id == id){
                return tipoIncidencias[i].description;
            }
            
        }
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
    
    //funcion encargada de crear un marker con un punto un icono y un nombre para el bindpopup
    function markerMaker(point, icono, name) {
        var om = L.marker([point.lat, point.lon], {
            icon: icono
        }).bindPopup(name);
    
        return om;
    
    }

}


