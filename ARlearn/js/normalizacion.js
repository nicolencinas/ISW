var bootstrap = function () {

	var normalizada1 = document.getElementById("normalizada1");
	var normalizada2 = document.getElementById("normalizada2");
	var norm = document.getElementById("norm1");
	var norm2 = document.getElementById("norm2");
	var origenx = 0;
	var origeny = 0;
	var destinox = 0;
	var destinoy = 0;
	var urlNormalizacion = "http://servicios.usig.buenosaires.gob.ar/normalizar/";

	//ajax para obtener las coordenadas
	var map = L.map('map').
		setView([-34.6131516, -58.3772316], 6);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		{
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
			maxZoom: 18
		}).addTo(map);


	function normalizar(normalizada, norm, numeroCalle, e) {


		var calle = document.getElementById("calle" + numeroCalle);
		var value = calle.value.toString();
		var largo = Object.keys(value).length;


		if (e.which == 13) {
			$("#submit" + numeroCalle).click();
		}

		if (largo == 0) {
			normalizada.style.opacity = 0;
			norm.style.height = "0px";
			normalizada.style.height = "0px";
		}

		if (largo >= 3) {
			$.ajax(
				{
					url: urlNormalizacion,
					data: { 'direccion': '"' + $("#calle" + numeroCalle).val() },
					type: 'GET',
					dataType: 'json',
					success: function (json) {
						var result = null;
						var x = 0;
						var y = 0;
						var srid = 0;
						result = JSON.parse(JSON.stringify(json));
						//muestra error
						if (result['errorMessage'] != "" && result['errorMessage'] != undefined) {
							$("#normalizada" + numeroCalle).empty();
							$("#normalizada" + numeroCalle).append('<option >' + 'Sin resultados' + '</option>');
						}
						//muestra resultado en el cuadro
						else {
							norm.style.height = "100px";
							normalizada.style.height = "100px";
							normalizada.style.opacity = 1;
							$("#normalizada" + numeroCalle).empty();
							$("#normalizada" + numeroCalle).append('<option value="default">Se encontraron los siguientes resultados </option>');


							//recorre los resultados y los muestra
							$.each(result, function (i, item) {
								for (var i in item) {
									$("#normalizada" + numeroCalle).append('<option value=' + result['direccionesNormalizadas'][i].cod_partido + '>'
										+ result['direccionesNormalizadas'][i].direccion + '</option>');
								}
							});
						}
					},
					error: function (jqXHR, status, error) {
						alert('Disculpe, existió un problema');
					}
				});
		}

	}

	$("#calle1").keyup(function (e) {

		normalizar(normalizada1, norm, "1", e);

	});


	$("#calle2").keyup(function (e) {

		normalizar(normalizada2, norm2, "2", e);
	});

	function dibujarNormalizacion(numeroCalle, puntox, puntoy) {
		$.ajax(
			{
				url: urlNormalizacion,
				data: { 'direccion': '"' + $("#calle" + numeroCalle).val() },
				type: 'GET',
				dataType: 'json',
				success: function (json) {
					var result = null;
					var x = 0;
					var y = 0;
					var srid = 0;
					result = JSON.parse(JSON.stringify(json));

					if (result['errorMessage'] != "" && result['errorMessage'] != undefined) {
						alert(result['errorMessage'])
					}
					else {
						x = result['direccionesNormalizadas'][0].coordenadas.x;
						y = result['direccionesNormalizadas'][0].coordenadas.y;
						puntox = x;
						puntoy = y;
						srid = result['direccionesNormalizadas'][0].coordenadas.srid;
						map.setView([y, x], srid);
						L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
							{
								attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,'
									+ '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,'
									+ 'Imagery © <a href="http://cloudmade.com">CloudMade</a>',
								maxZoom: 18
							}).addTo(map);

						L.control.scale().addTo(map);
						L.marker([y, x], { draggable: true }).addTo(map);
					}
				},
				error: function (jqXHR, status, error) {
					alert('Disculpe, existió un problema');
				}
			});
	}

	$("#submit1").click(function () {
		dibujarNormalizacion("1", origenx, origeny);
	});


	$("#submit2").click(function () {
		dibujarNormalizacion("2", destinox, destinoy);
	});

	$("#submit3").click(function () {
		L.Routing.control(
			{
				waypoints:
					[
						L.latLng(origenx, origeny),
						L.latLng(destinox, destinoy)
					]
			}).addTo(map);
	});
}
function esconder(selector, element, input) {
	var nor = document.getElementById(selector);
	var norm = document.getElementById(element);
	if (element.value == "") {
		$('#' + selector).empty();
		nor.style.opacity = 0;
		norm.style.height = 0;
		nor.style.height = 0;
	}


}

function esconderOpciones(input, valor, contenedor) {

	var input = document.getElementById(input);
	var selected = valor.options[valor.selectedIndex].text;
	var contenedor = document.getElementById(contenedor);

	input.value = selected;
	$('#' + valor.id).empty();
	valor.style.opacity = 0;
	valor.style.height = 0;

	contenedor.style.height = 0;

}

function normalizarOrigen() {
	$("#submit1").click();
}

function normalizarDestino() {
	$("#submit2").click();


}

$(bootstrap);
