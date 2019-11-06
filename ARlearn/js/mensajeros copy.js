
var destino=new Map();
var origen=new Map();
var driverspositions=new Map();
var mensajeros=[];
var pointPedidos=null;
var map = null;
var layerpedidos,layermensajeros=null;

$(document).ready(function () 
{
	map = L.map('map').
	setView([-34.6131516, -58.3772316],6);

	layerpedidos=L.layerGroup().addTo(map);
	layermensajeros=L.layerGroup().addTo(map);

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
			

			for(var i=0;i<result['requests'].length;i++)
			{
				var id=result['requests'][i].id;
				
				$("#pedidos").append('<option value='+id+'>Pedido Nº '
				+id+'</option>');
				var od=result['requests'][i];
				var ad=od.availableDrivers;

				origen.set(id,od.sender);
				destino.set(id,od.receiver);
				
				
				for (var i=0;i<ad.length;i++)
				{
					var mens=ad[i]['driver_id'];
					var posiciones=ad[i]['position'];
					driverspositions.set(mens,posiciones);
				

				}
				console.log(driverspositions)
				
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
		
			var olat=origen.get(parseInt(urlpedido)).lat
			var olong=origen.get(parseInt(urlpedido)).lon;
			var dlat=destino.get(parseInt(urlpedido)).lat;
			var dlong=destino.get(parseInt(urlpedido)).lon;

			
			

		
		map.setView([olat, olong],15);

		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
						{
							attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,'
							+'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,'
							+'Imagery © <a href="http://cloudmade.com">CloudMade</a>',
							maxZoom: 18
						}).addTo(map);

						L.control.scale().addTo(map);
						layerpedidos.clearLayers();
						layermensajeros.clearLayers();

					

						var op=L.marker([olat, olong], {draggable: true}).bindPopup("Origen pedido Nº "+urlpedido);
						var dp=L.marker([dlat, dlong], {draggable: true}).bindPopup("Destino pedido Nº "+urlpedido);
						

						layerpedidos.addLayer(op);
						layerpedidos.addLayer(dp);
						

            			
		
			$("#mensajeros").empty();
			$("#mensajeros").append('<option value="default">Buscando mensajeros...</option>');
			$.ajax(
				{
					url : 'https://entregasya.herokuapp.com/api/requests/'+urlpedido,
				
					type : 'GET',
					dataType : 'json',
					success : function(json) 
					{

					result = JSON.parse(JSON.stringify(json));		
					drivers=result['request'].availableDrivers;
				
			
					$("#mensajeros").empty();
					$("#mensajeros").append('<option value="default">Seleccione un mensajero...</option>');

						for (var i=0;i<drivers.length;i++)
						{
							var dr=driverspositions.get(drivers[i].driver_id);
							var mlat=dr.lat;
							var mlong=dr.lon;
							var mp=



							

							$.ajax(
								{
									url : 'https://entregasya.herokuapp.com/api/deliveryDrivers/'+drivers[i].driver_id,
								
									type : 'GET',
									dataType : 'json',
									success : function(json) 
									{
				
									result = JSON.parse(JSON.stringify(json));		
									
									var driver=result['driver'];
									mensajeros.push(driver);
									
									var car=driver['car'].description
									var carcolor=driver['car'].color;
									
									$("#mensajeros").append('<option value='+driver.id+'>'
											+driver.name+' '+driver.surname+' ('+car +')  </option>');

									var me=L.marker([mlat, mlong], {draggable: true}).bindPopup("holis");
									layermensajeros.addLayer(me);
								},
									error : function(jqXHR, status, error) 
									{
										alert('Disculpe, existió un problema');
									}
								});	


						
							
							
							
						}
					
								
					
						
				},
					error : function(jqXHR, status, error) 
					{
						alert('Disculpe, existió un problema');
					}
				});	
		}




	
		
