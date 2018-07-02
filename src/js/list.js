require(["config"],function(){
	require(["jquery","artTemplate","load","xm_carousel"],function($,template){
			function xuanran(a,b,c){
			$.getJSON(a, function(data){
			const html = template(b, {list: data.res_body.list});
			$(c).html(html);

			$(".addtocar",c).on("click",function(){
            var dPrice = parseInt($(".t-price",this.parentNode.parentNode).html().slice(1,4));
				const currProd = {
					        id : $(".t-id",this.parentNode.parentNode).html(),
							name : $(".t-name",this.parentNode.parentNode).html(),
							price :$(".t-price",this.parentNode.parentNode).html(),
							img : this.parentNode.parentNode.children[0].children[0].children[1].src,
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

						// 判断某 id 商品在数组中是否存在，
						// 存在则返回其在数组中的下标，-1表示不存在
						function exist(id, array) {
							for (let i = 0, len = array.length; i < len; i++) {
								if (array[i].id == id)
									return i;
							}
							return -1;
						}
		});
	});
}
	xuanran("/mock/cake-list.json","cake-list",".cake-list");

	
	});
});
