require(["config"],function(){
	require(["jquery","artTemplate","load","xm_carousel"],function($,template){
			$(function(){
				$(".index-lunbo").carousel({
				duration:4000,
				imgs:[{href:"#",src:"images/index-images/lunbo1.jpg"},
				{href:"#",src:"images/index-images/lunbo2.jpg"},
				{href:"#",src:"images/index-images/lunbo3.jpg"},
				{href:"#",src:"images/index-images/lunbo4.jpg"},
				{href:"#",src:"images/index-images/lunbo5.jpg"},
				{href:"#",src:"images/index-images/lunbo6.jpg"}],
				width:1280,
				height:671,
				showBtn:false
			});
		});

			// 渲染数据(json文件路徑,template名字,渲染容器)
			function xuanran(a,b,c){
			$.getJSON(a, function(data){
			const html = template(b, {list: data.res_body.list});
			$(c).html(html);
		});
	}
			xuanran("/mock/index-list1.json","index-list1","#zhuanqu1");
			xuanran("/mock/index-list2.json","index-list2","#zhuanqu2");
			
			// 左右翻页（封裝函數）
			function fanye(a,b){
			const n = (parseInt($(b).length)-4)*138;
			const t = parseInt($(a).css("left").slice(0,-2));
			$(a).css({"left":t+n+828+'px'});
			$(".list-right").on("click",function(){
            const t = parseInt($(a).css("left").slice(0,-2));
            if(t>=0){
                 $(a).animate({left: t-276+'px'}, "slow");
                 $(".list-left").css({"opacity":"1"});
                 $(".list-right").css({"opacity":"1"});
            }
            if(t<=0){
                $(".list-right").css({"opacity":"0.3"});
            }
			});
			$(".list-left").on("click",function(){
                const t = parseInt($(a).css("left").slice(0,-2));
             if(t<=0){
                 $(a).animate({left: t+276+'px'}, "slow");
                 $(".list-left").css({"opacity":"1"});
                 $(".list-right").css({"opacity":"1"});
             }
             if(t>=0){
				 $(".list-left").css({"opacity":"0.3"});
             }
			});
			}
			fanye("#zhuanqu1",".list-1");
			fanye("#zhuanqu2",".list-2");
	  });
	});
