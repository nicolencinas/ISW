
var cabecera=document.getElementById("cabecera");
var logo= document.getElementById("logo");
var functional=document.getElementById("functional");
var hamburger=document.getElementById("hamburger");
var menulateral=document.getElementById("menulateral");
var fondo=document.getElementById("fondo");


fondo.addEventListener('click', function(e)
{
  menulateral.style.transform="translate(200%)";
  hamburger.style.transform="translate(0)";
                            
  
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
     

  
  

      
      
    
      
    }
    else{
     logo.style.transform="translate(0%,0%) scale(1)";
    
    }
  });

  function mostrarMenu()
{
  menulateral.style.transform="translate(0)";
  hamburger.style.transform="translate(200%)";
  
  
}

function closeMenu()
{
  menulateral.style.transform="translate(200%)";
  hamburger.style.transform="translate(0)";
}



  