
var cabecera=document.getElementById("cabecera");
var logo= document.getElementById("logo");
var functional=document.getElementById("functional");
var hamburger=document.getElementById("hamburger");
var menulateral=document.getElementById("menulateral");
var fondo=document.getElementById("fondo");
var ul=document.getElementById("ulghost");

fondo.addEventListener('click', function(e)
{
  menulateral.style.width="0"
  hamburger.style.width="50px";
                            
  
});


  document.addEventListener('scroll', function(e)
  {
  
    var scroll=window.pageYOffset;
    console.log(scroll);
 
   
 
  
 if (scroll>111)
 {
  var opacity=scroll/1000+0.3;
  console.log(opacity);
  cabecera.style.backgroundColor="rgba(255, 255, 255,"+ opacity + ")";
  
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



  





