
var destino=new Map();
var origen=new Map();
var driverspositions=new Map();
var pointPedidos=null;
var map = null;
var layerpedidos,layermensajeros=null;

var eyicon = L.icon({
	iconUrl: 'images/Entregas2.png',

	iconSize:     [40, 40], // size of the icon
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


$(document).ready(function () 
{
	map = L.map('map').
	setView([-34.6131516, -58.3772316],6);

	layerpedidos=L.layerGroup().addTo(map);
	layermensajeros=L.layerGroup().addTo(map);
	$("#pedidos").empty();
	$("#pedidos").append('<option>Buscando pedidos... </option>');

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
		{
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom: 18
		}).addTo(map);


	
	$.ajax(
		{
			url : 'https://entregasya.herokuapp.com/api/requests',
			type : 'GET',
			dataType : 'json',
			success : function(json) 
			{

			result = JSON.parse(JSON.stringify(json));		
			
			$("#pedidos").empty();
			$("#pedidos").append('<option>Seleccione el numero de pedido... </option>');

			for(var i=0;i<result['requests'].length;i++)
			{
				var id=result['requests'][i].id;
				
				
				
				$("#pedidos").append('<option value='+id+'>Pedido Nº '
				+id+'</option>');
				var od=result['requests'][i];
				var ad=od.availableDrivers

				origen.set(id,od.sender);
				destino.set(id,od.receiver);
				driverspositions.set(id,od.availableDrivers);
			}	


		},
			error : function(jqXHR, status, error) 
			{
				alert('Disculpe, existió un problema');
			}
		});	
});

function obtenerMensajeros(elemento)
		{
			


			var urlpedido=elemento[elemento.selectedIndex].value;

			var req=parseInt(urlpedido);
			var olat=origen.get(req).lat
			var olong=origen.get(req).lon;
			var dlat=destino.get(req).lat;
			var dlong=destino.get(req).lon;

		map.setView([olat, olong],15);

		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
						{
							attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,'
							+'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,'
							+'Imagery © <a href="http://cloudmade.com">CloudMade</a>',
							maxZoom: 18
						}).addTo(map);

						layerpedidos.clearLayers();
						layermensajeros.clearLayers();

						
						var op=L.marker([olat, olong]).bindPopup("Origen pedido Nº "+urlpedido);
						var dp=L.marker([dlat, dlong]).bindPopup("Destino pedido Nº "+urlpedido);
						
						layerpedidos.addLayer(op);
						layerpedidos.addLayer(dp);

					//	console.log(driverspositions)

			
			var candidates=driverspositions.get(req);
			console.log(candidates);
			$("#mensajeros").empty();
			$("#mensajeros").append('<option value="default">Seleccione un mensajero... </option>');

			
				for (var i=0;i<candidates.length;i++)
				{
					var id1=candidates[i].driver_id;
					var position=candidates[i].position;
					var mlat=position.lat;
					var mlong=position.lon;

					
									

								$.ajax(
								{
									
									url : 'https://entregasya.herokuapp.com/api/deliveryDrivers/'+id1,
									async:false,
									type : 'GET',
									dataType : 'json',
									success : function(json) 
									{
										
									result = JSON.parse(JSON.stringify(json));		
	
									var driver=result['driver'];
									var car=driver['car'].description
									var carcolor=driver['car'].color;
								
									$("#mensajeros").append('<option value='+driver.id+'> -Nº '+driver.id+' '
											+driver.name+' '+driver.surname+' ('+car +')  </option>');

											
										

									 var om=L.marker([mlat, mlong], {icon:eyicon});
									 
			
        
											om.bindPopup(driver.name+' '+driver.surname)
											layermensajeros.addLayer(om);
									
								},
									error : function(jqXHR, status, error) 
									{
										alert('Disculpe, existió un problema');
									}
								})

							
								
								
				}
			
			
		}




	
		
