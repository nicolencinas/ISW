
var cabecera=document.getElementById("cabecera");
var logo= document.getElementById("logo");
var functional=document.getElementById("functional");




  document.addEventListener('scroll', function(e)
  {
  
    var scroll=window.pageYOffset;
 
   
 
  
 if (scroll>111)
 {
  var opacity=scroll/1000+0.3;
  cabecera.style.backgroundColor="rgba(189, 33, 335,"+ opacity + ")";
  
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

  var why=document.getElementById("why");
  var oculto1=document.getElementById("oculto");
  var oculto2=document.getElementById("oculto2");
  var oculto3=document.getElementById("oculto3");
 


  function desplegar()
  {
  
    
      oculto1.style.opacity=1;
      oculto1.style.heigth="50px";
      oculto1.style.margintop="25px";
    

  }





  





