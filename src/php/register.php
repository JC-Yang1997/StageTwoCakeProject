<?php 
	// CORS跨域
	header("Access-Control-Allow-Origin:*");

	/* 注册 */
	$telphone = $_POST["telphone"];
	$password = $_POST["password"];
	$birthday = $_POST["birthday"];

	// 连接数据库服务器
	mysql_connect("localhost:3306", "root", "");
	// 选择数据库
	mysql_select_db("qianfeng");
	// 读写库编码
	mysql_query("set character set utf8");
	mysql_query("set names utf8");
	// 编写SQL语句
	$sql = "INSERT INTO cakeusers (telphone, password,birthday) VALUES ('$telphone', '$password','$birthday')";
	// 执行SQL语句
	$result = mysql_query($sql);
	// 判断
	if ($result) { // 保存成功
		$arr = array("res_code"=>1, "res_message"=>"注册成功");
		echo json_encode($arr);
	} else { // 失败
		$arr = array("res_code"=>0, "res_message"=>"注册失败" . mysql_error());
		echo json_encode($arr);
	}
	// 关闭连接
	mysql_close();
 ?>