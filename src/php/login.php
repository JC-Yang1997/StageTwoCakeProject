<?php 
	// CORS跨域
	header("Access-Control-Allow-Origin:*");
	$password = $_POST["password"];
	$username = $_POST["username"];
	// 连接数据库服务器
	mysql_connect("localhost:3306", "root", "");
		// 选择数据库
		mysql_select_db("qianfeng");
		// 读写库编码
		mysql_query("set character set utf8");
		mysql_query("set names utf8");
		// 编写SQL语句
		$sql = "SELECT * FROM cakeusers WHERE telphone='$username' AND password = '$password'";
		// 执行SQL语句
		$result = mysql_query($sql);
		$row = mysql_fetch_array($result);
		// 判断

		if ($row) { 
			$arr = array("res_code"=>1, "res_message"=>"登陆成功");
			echo json_encode($arr);
		} else { // 失败
			$arr = array("res_code"=>0, "res_message"=>"登录失败");
			echo json_encode($arr);
		}
		// 关闭连接
		mysql_close();	
 ?>