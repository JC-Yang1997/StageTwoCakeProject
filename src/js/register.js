require(["../js/config.js"],function(){
	require(["jquery","load","laydate","vCode"],function($){

		    // 日期选取
			$("#birthday").on("click",function(){
			     laydate();
		    });

		    // yzm功能
		    var verifyCode = new GVerify("v_container");
			$(".shuaxin-code").on("click",function(){
				verifyCode.refresh();
			});
			$("#code_input").on("blur",function(){
			var res = verifyCode.validate(document.getElementById("code_input").value);
			if(!res){
				$(".tishi4").html("错误！");
			}else{
				$(".tishi4").html("");
			}
		});


		    // 生成手机验证码功能
		    $("#hq-code").on("click",function(){
		    	var arr = [];
		    	for(var i = 0;i<4;i++){
		    		const a = parseInt(Math.random()*10);
                    arr[i] = a;
		    	}
		    	const html = ""+arr[0]+arr[1]+arr[2]+arr[3];
		    	$("#telphone-code").val(html);
		    	if($("#telphone-code").val()==""){
		    		 $(".tishi5").html("错误！");
		    	}
		    	else{
		    		$(".tishi5").html("");
		    		
		    	}
		    });


		    // 实现注册功能
		    // 输入框判空操作
		    $("#register-telphone").on("blur",function(){
		    	var a = /^1[34578]\d{9}$/;
		    	if(!a.test($("#register-telphone").val())){
		    		 $(".tishi1").html("错误！");
		    	}
		    	else{
		    		$(".tishi1").html("");
		    	}
		    	$.post("http://localhost/StageTwoCakeProject/src/php/username.php", $("#register-form").serialize(), function(data){
				if (data.res_code === 1)
					$(".register-information").html("用户名已存在");
				else
					$(".register-information").html("");
				    
			}, "json");
		    });

		    $("#register-password").on("blur",function(){
		    	var a = /^[\da-zA-Z]{8,20}$/;
		    	if(!a.test($("#register-password").val())){
		    		 $(".tishi2").html("错误！");
		    	}
		    	else{
		    		$(".tishi2").html("");
		    		
		    	}
		    });
		   $("#register-c-password").on("blur",function(){
		    	if($("#register-c-password").val()!=$("#register-password").val()){
		    		 $(".tishi3").html("错误！");
		    	}
		    	else{
		    		$(".tishi3").html("");
		    		
		    	}
		    });
		   $("#telphone-code").on("blur",function(){
		    	if($("#telphone-code").val()==""){
		    		 $(".tishi5").html("错误！");
		    	}
		    	else{
		    		$(".tishi5").html("");
		    		
		    	}
		    });
		     $("#birthday").on("blur",function(){
		    	if($("#birthday").val()==""){
		    		 $(".tishi6").html("错误！");
		    	}
		    	else{
		    		$(".tishi6").html("");
		    		
		    	}
		    });



		    // 进行数据库注册的数据传递
		    $("#my_button").on("click",function(){
		    	$(".register-information").html("");
		    	if($(".tishi1").html()==""&&$(".tishi2").html()==""&&$(".tishi3").html()==""&&$(".tishi4").html()==""&&$(".tishi5").html()==""&&$(".tishi6").html()==""&&$(".register-information").html()==""
		    	&&$("#register-telphone").val()!=""&&$("#register-password").val()!=""&&$("#register-c-password").val()!=""&&$("#code_input").val()!=""&&$("#telphone-code").val()!=""&&$("#birthday").val()!=""){
				$.post("http://localhost/StageTwoCakeProject/src/php/register.php", $("#register-form").serialize(), function(data){
				if (data.res_code === 1){
					alert("注册成功");
				    window.open("/html/login.html","_self");
				}
				else
				{
					alert("用户注册失败：" + data.res_message);
				}
			}, "json");
    	}
    			else{
					$(".register-information").html("请填写完整表单");
				}
	   });
	});
});
