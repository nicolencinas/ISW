
var cabecera=document.getElementById("cabecera");
var logo= document.getElementById("logo");
var functional=document.getElementById("functional");
var hamburger=document.getElementById("hamburger");
var menulateral=document.getElementById("menulateral");
var fondo=document.getElementById("fondo");
var ul=document.getElementById("ulghost");

var oc1=document.getElementById("oculto1");
    var oc2=document.getElementById("oculto2");
    var oc3=document.getElementById("oculto3");
    var oc4=document.getElementById("oculto4");

    var nu1=document.getElementById("numero1");
    var nu2=document.getElementById("numero2");
    var nu3=document.getElementById("numero3");

    var peso=document.getElementById("peso");
    var why=document.getElementById("why");

fondo.addEventListener('click', function(e)
{
  menulateral.style.width="0"
  hamburger.style.width="50px";
                            
  
});


  document.addEventListener('scroll', function(e)
  {
  
    var scroll=window.pageYOffset;
  
 
   
 
  
 if (scroll>111)
 {
  var opacity=scroll/1000+0.3;
 
  cabecera.style.backgroundColor="rgba(231, 72, 72,"+ opacity + ")";
  
  cabecera.style.top="0";
  cabecera.style.position="fixed";
  cabecera.style.borderRadius="0";
  
  


    
 }


 
 else{
   cabecera.style.position="absolute";
   cabecera.style.top="11%";
   
 }


    if (scroll>91){
      
      logo.style.transform="translate(0%,-120%)";
     hamburger.style.position="fixed"
  hamburger.style.top="30px";
 
  menulateral.style.top="0";

  
  

      
      
    
      
    }
    else{
     logo.style.transform="translate(0%,0%) scale(1)";
    hamburger.style.position="absolute"
  hamburger.style.top="100px";
 
  menulateral.style.top="30px";
  
    }
  });

  function mostrarMenu()
{
  menulateral.style.width="180px";
  menulateral.style.opacity="1";
  hamburger.style.width="0";
  ul.style.transition="all 2s ease-in-out";
  ul.style.opacity="1";
  
  
}

function closeMenu()
{
  menulateral.style.width=0;
  menulateral.style.opacity="1";
  hamburger.style.width="50px";
  ul.style.transition="all 0.2s ease-in-out";
  ul.style.opacity="0";
  
}

function cargaratributo(){
  var why=document.getElementById("why");
    why.setAttribute('data-value',"¿No sabes como calcularlo?")
}

function calcular()
{
  
    var n1= parseInt(nu1.value);
    var n2= parseInt(nu2.value);
    var n3= parseInt(nu3.value);

  var calculo=(n1+n2+n3)/5000;
  peso.value=calculo.toString();
  why.click();
}

function desplegar()
  {
    

    
    why.setAttribute('data-value',"¿No sabes como calcularlo?")
   
    var botton=document.getElementById("why");

    if (botton.innerHTML=="?")
    {
      oc1.className="contenedor total desplegado1";
      oc2.className="contenedor total desplegado2";
      oc3.className="contenedor total desplegado3";
      oc4.className="contenedor desplegado4";
     
      botton.innerHTML="˄";
      peso.disabled=true;
      why.setAttribute('data-value',"Volver atras")
      
    }

    else
    {
      oc1.className="contenedor total oculto1";
      oc2.className="contenedor total oculto2";
      oc3.className="contenedor total oculto3";
      oc4.className="contenedor oculto4"
     
      botton.innerHTML="?";
      peso.disabled=false;
    }

    

    

  }

  oc1.addEventListener('keyup',function()
  {
    var o=oc1.value+" cm";
    console.log(o);
    oc1.value=oc1.value+"cm"
  });



  





