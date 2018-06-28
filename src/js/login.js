require(["../js/config.js"],function(){
	require(["jquery","load","laydate","vCode"],function($){
		var verifyCode = new GVerify("v_container");
			$(".shuaxin-code").on("click",function(){
				verifyCode.refresh();
			});
		$(".login-method2").hide();
		$("#login1").on("click",function(){
			$(".login-method1").show();
			$(".login-method2").hide();
			$("#login1").css({"color":"#482618"});
			$("#login2").css({"color":"#dcdcdc"});
			$("input",".login-method2").val("");
		});
		$("#login2").on("click",function(){
			$(".login-method1").hide();
			$(".login-method2").show();
			$("#login1").css({"color":"#dcdcdc"});
			$("#login2").css({"color":"#482618"});
			$("input",".login-method1").val("");
		});
		$("#hq-code").on("click",function(){
		    	var arr = [];
		    	for(var i = 0;i<4;i++){
		    		const a = parseInt(Math.random()*10);
                    arr[i] = a;
		    	}
		    	const html = ""+arr[0]+arr[1]+arr[2]+arr[3];
		    	$("#telphone-code").val(html);
		    });		
		
		$("#login-submit").on("click",function(){
			// 默认登录方式（第一种登录方式）
			if($(".login-method2").css("display")=="none"){
				if($("#login-username").val()==""){
					alert("请填写完整用户名与密码！");
					return false;
				}
				else{
				$.post("http://localhost/StageTwoCakeProject/src/php/login.php", $("#login-form").serialize(), function(data){
				if (data.res_code === 1){
				    window.open("/html/list.html","_self");
				}
				else
				{
					alert("登录失败：" + data.res_message);
				}
				}, "json");
			}	
        	}
			// 第二种登录方式
        	else{
			 	 var a = /^1[34578]\d{9}$/;
        	  	 if(a.test($("#login-telphone").val())){       	  	 	
    	   			var res = verifyCode.validate($("#check-code").val());
    	   			if(res&&$("#telphone-code").val()!=""){
    	   				window.open("/html/list.html","_self");
    	   			}else{
    	   				alert("登录失败！");
    	   			}
        	  	 }else{
        	   		alert("请输入正确的手机号码！");
        	  	 }
			}
        });
		

	});
});
