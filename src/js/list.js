require(["config"],function(){
	require(["jquery","artTemplate","load","xm_carousel"],function($,template){
			function xuanran(a,b,c){
			$.getJSON(a, function(data){
			const html = template(b, {list: data.res_body.list});
			$(c).html(html);
			});
		}
	xuanran("/mock/cake-list.json","cake-list",".cake-list");
	});
});
