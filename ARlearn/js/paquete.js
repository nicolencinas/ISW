var oc1;
var oc2;
var oc3;
var oc4;
var nu1;
var nu2;
var nu3;
var peso;
var ayuda;

var bootstrap = function () {
    oc1 = document.getElementById("oculto1");
    oc2 = document.getElementById("oculto2");
    oc3 = document.getElementById("oculto3");
    oc4 = document.getElementById("oculto4");

    nu1 = document.getElementById("numero1");
    nu2 = document.getElementById("numero2");
    nu3 = document.getElementById("numero3");

    peso = document.getElementById("peso");
    ayuda = document.getElementById("why");

  oc1.addEventListener('keyup', function () {
    var o = oc1.value + " cm";
    console.log(o);
    oc1.value = oc1.value + "cm"
  });


}

function cargaratributo() {
  ayuda = document.getElementById("why");
  ayuda.setAttribute('data-value', "¿No sabes como calcularlo?")
}
function calcular() {

  var n1 = parseInt(nu1.value);
  var n2 = parseInt(nu2.value);
  var n3 = parseInt(nu3.value);

  var calculo = (n1 + n2 + n3) / 5000;
  peso.value = calculo.toString();
  ayuda.click();
}
function desplegar() {

  ayuda.setAttribute('data-value', "¿No sabes como calcularlo?")

  var botton = document.getElementById("why");

  if (botton.innerHTML == "?") {
    oc1.className = "contenedor total desplegado1";
    oc2.className = "contenedor total desplegado2";
    oc3.className = "contenedor total desplegado3";
    oc4.className = "contenedor desplegado4";

    botton.innerHTML = "˄";
    peso.disabled = true;
    ayuda.setAttribute('data-value', "Volver atras")

  } else {
    oc1.className = "contenedor total oculto1";
    oc2.className = "contenedor total oculto2";
    oc3.className = "contenedor total oculto3";
    oc4.className = "contenedor oculto4"

    botton.innerHTML = "?";
    peso.disabled = false;
  }

}
$(bootstrap);
