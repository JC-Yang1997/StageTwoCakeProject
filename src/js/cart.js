require(["../js/config.js"],function(){
	require(["jquery","artTemplate","load","loadtuijian","cookie"],function($,template){
	    $("#jiezhang").on("click",function(){
	    	window.open("/html/login.html","_self");
	    });
	    $(function(){
	    	$.cookie.json = true;
	    	var products = $.cookie("products") || [];
			if(products.length == 0){
				$(".car-body").hide();
				$(".empty-car").css({"display":"flex"});
			}else{
				$(".car-body").css({"display":"flex"});
				$(".empty-car").hide();
				const html = template("list",{products});
				$(".car-list").html(html);
				// 配送费判断以及初始化界面数据展示
				var sum = 0;
				for(var i in products){
					sum +=products[i].aPrice;
				}
				$(".all-money").html("￥"+sum+".00");
				var sum1 = 0,peisong;
					for(var i in products){
						sum1 +=products[i].aPrice;
						if(sum1>=100){
							peisong = 0;
							$(".peisong").html("配送费：￥"+peisong+".00");
							$(".peisong-i").show();
						}
						else{
							peisong = 10;
							$(".peisong").html("配送费：￥"+peisong+".00");
							$(".peisong-i").hide();
						}
					}
					$(".all-money").html("商品金额：￥"+sum+".00");
					const end = sum+peisong-10;
					$(".pay-money").html("合计：￥"+end+".00");
			}
		});

		// 数量加操作
		var add = function(){
			$(".add").on("click",function(){
			const products = $.cookie("products");
			var _name =$(".c-name",this.parentNode.parentNode).html();
			for(var i in products){
				if(products[i].name==_name){
					const dPrice = parseInt($(".c-price",this.parentNode.parentNode).html().slice(1,4));
					products[i].amount++;
					products[i].aPrice = products[i].amount*dPrice;					
					$(".amount",this.parentNode).html(products[i].amount);
					$(".c-allprice",this.parentNode.parentNode).html("￥"+products[i].aPrice+".00");
					$.cookie("products", products, {expires:7, path:"/"});
				}
			}
			dataReload();
		});
	}

	   // 数量减操作
		var minus = function(){
			$(".minus").on("click",function(){
			const products = $.cookie("products");
			var _name =$(".c-name",this.parentNode.parentNode).html();
			for(var i in products){
				if(products[i].name==_name){
					if(products[i].amount>1){
					const dPrice = parseInt($(".c-price",this.parentNode.parentNode).html().slice(1,4));
					products[i].amount--;
					products[i].aPrice = products[i].amount*dPrice;					
					$(".amount",this.parentNode).html(products[i].amount);
					$(".c-allprice",this.parentNode.parentNode).html("￥"+products[i].aPrice+".00");
					$.cookie("products", products, {expires:7, path:"/"});
					}
				}
			}
			dataReload();
		});
	}


		// 删除当前行操作
		var del = function(){
			$(".delete-r").on("click",function(){
			this.parentNode.remove();
			const products = $.cookie("products");
			for(let i in products){
				if(products[i].name==$(".c-name",this.parentNode).html()){
					products.splice(i,1);
					break;
				}
			}
			$.cookie("products", products, {expires:7, path:"/"});
			if(products.length==0){
				$(".car-body").hide();
				$(".empty-car").css({"display":"flex"});
			}
			dataReload();
		});
    }
		// 清空购物车操作
		var empty = function(){
			 $(".qingkong").on("click",function(){
			const products = [];
			$(".car-body").hide();
			$(".empty-car").css({"display":"flex"});
			$.cookie("products", products, {expires:7, path:"/"});
			dataReload();
		});
 	}

 		add();
	    minus();
	    empty();
	    del();

	    
		// 配件加入购物车操作
		$(".addtocar").on("click",function(){
        	const dPrice = parseInt($(".t-price",this.parentNode.parentNode).html().slice(1,2));
			const currProd = {
				        id : parseInt($(".t-id",this.parentNode.parentNode).html()),
						name : $(".t-name",this.parentNode.parentNode).html(),
						price :$(".t-price",this.parentNode.parentNode).html(),
						img : this.parentNode.parentNode.children[0].children[0].children[0].src,
						amount : 1,
						aPrice : dPrice
					};
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
					const html = template("list",{products});
					$(".car-list").html(html);
					// 判断某 id 商品在数组中是否存在，
					// 存在则返回其在数组中的下标，-1表示不存在
					function exist(id, array) {
						for (let i = 0, len = array.length; i < len; i++) {
							if (array[i].id == id)
								return i;
						}
						return -1;
					}
					add();
				    minus();
				    empty();
				    del();
					dataReload();
				});

        // 实现点击事件页面数据动态变化（代码复用）
		function dataReload(){
			const products = $.cookie("products");
			var sum = 0;
			for(let i in products){
				sum +=products[i].aPrice;
			}
			$(".all-money").html("￥"+sum+".00");
			var peisong;
			if(sum>=100){
				peisong = 0;
				$(".peisong").html("配送费：￥"+peisong+".00");
				$(".peisong-i").show();
			}
			else{
				peisong = 10;
				$(".peisong").html("配送费：￥"+peisong+".00");
				$(".peisong-i").hide();
			}
			$(".all-money").html("商品金额：￥"+sum+".00");
			var end = sum+peisong-10;
			if(products.length==0){
				$(".pay-money").html("合计：￥"+0+".00");
			}else{
			$(".pay-money").html("合计：￥"+end+".00");
		  }
	   };
	});
});