define(["jquery"],function($){
  $(".header").load("/html/include/header.html");
  $(".footer").load("/html/include/footer.html");
  require(["cookie"],function(){
  	$(function(){
  		$.cookie.json = true;
  		const products = $.cookie("products") || [];
  		if(products ==[]){
  			$(".cookie-amount").html(0);
  		}else{
  			var sum = 0;
  			for(const i in products){
  				sum+=products[i].amount;
  			}
  			$(".cookie-amount").html(sum);
  		}
  	});		
	$("body").on("click",function(){
		$.cookie.json = true;
		const products = $.cookie("products") || [];
		if(products ==[]){
			$(".cookie-amount").html(0);
		}else{
			var sum = 0;
			for(const i in products){
				sum+=products[i].amount;
			}
			$(".cookie-amount").html(sum);
		}
	});
  });
});