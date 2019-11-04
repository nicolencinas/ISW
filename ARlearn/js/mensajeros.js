
$(document).ready(function () 
{

	var map = L.map('map').
	setView([-34.6131516, -58.3772316],6);

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
				console.log("algo");
			result = JSON.parse(JSON.stringify(json));		
			

			for(var i=0;i<result['requests'].length;i++)
			{
				var id=result['requests'][i].id;
				$("#pedidos").append('<option value='+id+'>Pedido Nº '
				+id+'</option>');
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
			console.log(urlpedido);
		
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
					console.log(drivers)
					console.log(drivers[0].driver_id)
			
					$("#mensajeros").empty();
					$("#mensajeros").append('<option value="default">Seleccione un mensajero...</option>');

						for (var i=0;i<drivers.length;i++)
						{

							$.ajax(
								{
									url : 'https://entregasya.herokuapp.com/api/deliveryDrivers/'+drivers[i].driver_id,
								
									type : 'GET',
									dataType : 'json',
									success : function(json) 
									{
				
									result = JSON.parse(JSON.stringify(json));		
									console.log(result)
									
									var driver=result['driver'];
									var car=driver['car'].description
									var carcolor=driver['car'].color;
									
									$("#mensajeros").append('<option value='+driver.id+'>'
											+driver.name+' '+driver.surname+' ('+car +')  </option>');
											
									
									
												
									
										
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

	
		
