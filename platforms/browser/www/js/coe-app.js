$(document).ready(function(){  

 
	
	function panelHide() {
		$("#gg1left").hide();
		$("#gg2left").hide();
		$("#gg3left").hide();      
	}
	
	
	
	$(".panel1").on("click",function(){
		
		$("#gg1left").show();
		$("#gg2left").hide();
		$("#gg3left").hide(); 
	});
	
	$(".panel2").on("click",function(){
		
		$("#gg2left").show();
		$("#gg1left").hide();
		
		$("#gg3left").hide();   
	});
	
	
	$(".panel3").on("click",function(){
		
		$("#gg3left").show();
		$("#gg1left").hide();
		$("#gg2left").hide();
		  
	});
	
	
	  
});
	
	
	
	