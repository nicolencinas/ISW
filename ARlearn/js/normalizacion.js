
$(document).ready(function () 
{

	

	var normalizada1=document.getElementById("normalizada1");
	var normalizada2=document.getElementById("normalizada2");
	var norm=document.getElementById("norm1");
	var norm2=document.getElementById("norm2");



	var origenx=0;
	var origeny=0;
	var destinox=0;
	var destinoy=0;

	//ajax para obtener las coordenadas
	var map = L.map('map').
	setView([-34.6131516, -58.3772316],6);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
		{
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom: 18
		}).addTo(map);

		
	$("#calle1").keyup(function(e)
	{


			var calle1=document.getElementById("calle1");
			var value=calle1.value.toString();
			var largo=Object.keys(value).length;

			if(e.which == 13)
			{
				$("#submit1").click();
			}
			if (largo==0)
			{
				normalizada1.style.opacity=0;
				norm.style.height="0px";
				normalizada1.style.height="0px";
			}
			if (largo>=3)
			{
			$.ajax(
			{
				url : 'http://servicios.usig.buenosaires.gob.ar/normalizar/',
				data : { 'direccion':'"'+$("#calle1").val()},
				type : 'GET',
				dataType : 'json',
				success : function(json) {
				var result = null;
				var x = 0;
				var y = 0;
				var srid = 0;
				result = JSON.parse(JSON.stringify(json));		
								
				if (result['errorMessage']!="" && result['errorMessage']!=undefined )	
				{
					$("#normalizada1").empty();
					$("#normalizada1").append('<option >'+'Sin resultados'+'</option>');
				}
				else
				{
					normalizada1.style.opacity=1;
					norm.style.height="100px";
					normalizada1.style.height="100px";
					$("#normalizada1").empty();
					$("#normalizada1").append('<option value="default">Se encontraron los siguientes resultados.... </option>');

					$.each(result, function(i, item)
					{
						for (var i in item)
						{
						$("#normalizada1").append('<option value='+result['direccionesNormalizadas'][i].cod_partido+'>'
						+result['direccionesNormalizadas'][i].direccion+'</option>');
						}
					});						
				}
					
			},
				error : function(jqXHR, status, error) 
				{
					alert('Disculpe, existió un problema');
				}
			});	}	
	});
				

	$("#calle2").keyup(function(e)
	{
			

		var calle1=document.getElementById("calle2");
		var value=calle1.value.toString();
		var largo=Object.keys(value).length;


		if(e.which == 13) 
		{
			$("#submit2").click();
		}

		if (largo==0)
		{
			normalizada2.style.opacity=0;
					norm2.style.height="0px";
					normalizada2.style.height="0px";
		}
					
		if (largo>=3)
		{
			$.ajax(
			{
				url : 'http://servicios.usig.buenosaires.gob.ar/normalizar/',
				data : { 'direccion':'"'+$("#calle2").val()},
				type : 'GET',
				dataType : 'json',
				success : function(json) 
				{
					var result = null;
					var x = 0;
					var y = 0;
					var srid = 0;
					result = JSON.parse(JSON.stringify(json));		
					
					if (result['errorMessage']!="" && result['errorMessage']!=undefined )
					{
						$("#normalizada2").empty();
						$("#normalizada2").append('<option >'+'Sin resultados'+'</option>');
					}
					else
					{
						norm2.style.height="100px";
						normalizada2.style.height="100px";
						normalizada2.style.opacity=1;
						$("#normalizada2").empty();
						$("#normalizada2").append('<option value="default">Se encontraron los siguientes resultados </option>');
						


						$.each(result, function(i, item)
						{
							for (var i in item)
							{
								$("#normalizada2").append('<option value='+result['direccionesNormalizadas'][i].cod_partido+'>'
								+result['direccionesNormalizadas'][i].direccion+'</option>');
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
	});

	$("#submit1").click(function()
	{
			$.ajax(
			{
				url : 'http://servicios.usig.buenosaires.gob.ar/normalizar/',
				data : { 'direccion':'"'+$("#calle1").val()},
				type : 'GET',
				dataType : 'json',
				success : function(json) 
				{
					var result = null;
					var x = 0;
					var y = 0;
					var srid = 0;
					result = JSON.parse(JSON.stringify(json));		

					if (result['errorMessage']!="" && result['errorMessage']!=undefined )
					{
						alert(result['errorMessage'])
					}
					else
					{
						x = result['direccionesNormalizadas'][0].coordenadas.x;
						y = result['direccionesNormalizadas'][0].coordenadas.y;
						origenx=x;
						origeny=y;
						srid = result['direccionesNormalizadas'][0].coordenadas.srid;
						map.setView([y, x],srid);
						L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
						{
							attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,'
							+'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,'
							+'Imagery © <a href="http://cloudmade.com">CloudMade</a>',
							maxZoom: 18
						}).addTo(map);

						L.control.scale().addTo(map);
						L.marker([y, x], {draggable: true}).addTo(map);
					}
				},
				error : function(jqXHR, status, error) 
				{
					alert('Disculpe, existió un problema');
				}
			});
	});


	$("#submit2").click(function()
	{
			
		$.ajax(
		{
			url : 'http://servicios.usig.buenosaires.gob.ar/normalizar/',
			data : { 'direccion':'"'+$("#calle2").val()},
			type : 'GET',
			dataType : 'json',
				success : function(json) 
				{
					var result = null;
					var x = 0;
					var y = 0;
					var srid = 0;
					result = JSON.parse(JSON.stringify(json));		
				
					if (result['errorMessage']!="" && result['errorMessage']!=undefined )
					{
						alert(result['errorMessage'])
					}
					else
					{
						x = result['direccionesNormalizadas'][0].coordenadas.x;
						y = result['direccionesNormalizadas'][0].coordenadas.y;
						destinox=x;
						destinoy=y;
						srid = result['direccionesNormalizadas'][0].coordenadas.srid;
						map.setView([y, x],srid);
						L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
						{
							attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,'
							+' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,'
							+'Imagery © <a href="http://cloudmade.com">CloudMade</a>',
							maxZoom: 18
						}).addTo(map);
						L.control.scale().addTo(map);
						L.marker([y, x], {draggable: true}).addTo(map);
					}
				},
				error : function(jqXHR, status, error) 
				{
					alert('Disculpe, existió un problema');
				}
		});
	});

	$("#submit3").click(function()
	{		
		L.Routing.control(
		{
			waypoints: 
			[
				L.latLng(origenx, origeny),
				L.latLng(destinox, destinoy)
			]
		}).addTo(map);
	});

});


function esconder(selector,element,input)
{
	var nor=document.getElementById(selector);
	var norm=document.getElementById(element);
	if (element.value=="")
	{
		$('#'+selector).empty();
		nor.style.opacity=0;
		norm.style.height=0;
		nor.style.height=0;
	}
		
	
}

function mostrarValor(input,valor,contenedor)
{

	var input=document.getElementById(input);
	var selected=valor.options[valor.selectedIndex].text;
	var contenedor=document.getElementById(contenedor);

	input.value=selected;
	$('#'+valor.id).empty();
	valor.style.opacity=0;
	valor.style.height=0;
	
	contenedor.style.height=0;

}

function normalizarOrigen()
{
	$("#submit1").click();
}

function normalizarDestino()
{
	$("#submit2").click();


}




