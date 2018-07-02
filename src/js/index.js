require(["config"],function(){
	require(["jquery","artTemplate","load","xm_carousel","cookie"],function($,template){
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

			// 加入购物车功能
			// 限定是当前渲染模板函数中执行的click事件绑定
			$(".addtocar",c).on("click","a",function(){
				
				// ----------------------------------
            var dPrice = parseInt($(".t-price",this.parentNode.parentNode.parentNode).html().slice(1,4));
				const currProd = {
					        id : $(".t-id",this.parentNode.parentNode.parentNode).html(),
							name : $(".t-name",this.parentNode.parentNode.parentNode).html(),
							desc : $(".t-desc",this.parentNode.parentNode.parentNode).html(),
							price :$(".t-price",this.parentNode.parentNode.parentNode).html(),
							img : this.parentNode.parentNode.parentNode.children[0].children[0].children[0].src,
							amount : 1,
							aPrice : dPrice
						};
				 		// console.log(currProd);
						// cookie插件配置
						$.cookie.json = true;
						// 先从 cookie 中读取已有保存的购物车数组
						const products = $.cookie("products") || [];
						// console.log(products);
						// 判断当前选购商品是否在购物车中已存在
						const index = exist(currProd.id, products);
						if (index === -1) { // 不存在
							products.push(currProd);
						} else { // 存在
							products[index].amount++;
							products[index].aPrice+=dPrice;
						}
						/* 将当前选购的商品信息保存到 cookie 中：即将数组存回cookie */
						$.cookie("products", products, {expires:7, path:"/"});

						// 判断某 id 商品在数组中是否存在，
						// 存在则返回其在数组中的下标，-1表示不存在
						function exist(id, array) {
							for (let i = 0, len = array.length; i < len; i++) {
								if (array[i].id == id)
									return i;
							}
							return -1;
						}
				// -----------------------------------
			});
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
