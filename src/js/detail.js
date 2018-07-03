require(["../js/config.js"],function(){
	require(["jquery","load"],function($){
			     $(".xiding").hide();
           $(".x-rightbox",".xiding").css({
              "display":"none"
          });
           $("#choose-c-1").css({"border":"1px solid #684029"});
            $("#choose-1").show();
            $(".banner-pic").on("mouseover",function(){
            	$(".banner-pic")[0].src = this.src;
            });
            $(".choose-c").on("click",function(){
            	event.preventDefault();
            	$(".choose-c").css({"border":"1px solid #e7e0dd"});
            	$(".choose").hide();
            	$(this).css({"border":"1px solid #684029"});
            	$(this.children[0].children[0]).show();
            });
            $(".choosecake").on("mouseover",function(){
            	$(this.children[2]).css({
            		"display":"flex",
        			  "height": "50px",
      					"width": "180px",
      					"position": "absolute",
      					"left": "45px",
      					"top": "140px",
      					"background-color": "#cabaa8",
      					"justify-content":"space-around",
      					"align-items": "center",
      					"opacity": "0.8"
            	});
            });
            $(".choosecake").on("mouseleave",function(){
            	$(this.children[2]).css({
            		"display":"none"
            	});
            });
          $(window).scroll(function(){
          	var top = $(window).scrollTop();
          	if(top>1000){
          		$(".xiding").show();
          		$(".header").hide();
              $(".xiding-price").on("mouseover",function(){
                $(".x-rightbox",".xiding").css({
                  "display":"flex"
                });
                $(".x-choose").hide();
                $(".x-choose-c").css({"border":"1px solid #e7e0dd"});
                $(".x-choose-c").on("click",function(){
                event.preventDefault();
                $(".x-choose-c").css({"border":"1px solid #e7e0dd"});
                $(".x-choose").hide();
                $(this).css({"border":"1px solid #684029"});
                $(this.children[0].children[0]).show();
              });
              });
              $(".x-rightbox").on("mouseleave",function(){
                $(".x-rightbox",".xiding").css({
                  "display":"none"
                });
              });
          	}
          	else{
          		$(".xiding").hide();
          		$(".header").show();
          	}
          });
	});
});