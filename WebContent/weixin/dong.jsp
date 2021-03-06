<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- Loading Bootstrap -->
<link href="../css/bootstrap.min.css" rel="stylesheet">
<!-- Loading Flat UI -->
<link href="../css/flat-ui.css" rel="stylesheet">
<link href="../css/demo.css" rel="stylesheet">
<link rel="stylesheet" href="../css/font-awesome.min.css">

<link rel="stylesheet" type="text/css"
	href="http://www.ghostchina.com/assets/css/screen.css?v=82931f6358" />

<script src="../js/jquery.min.js" type="text/javascript"></script>
<script src="../js/flat-ui.js"></script>
<script src="../js/application.js"></script>


<script type="text/javascript"> 
$(document).ready(function() {
	getList(1)
});



function getList(pageIndex) {
	$.ajax({
		url : '/weixin.do?method=dong&pageIndex='
				+ pageIndex
				+ new Date(),
		type : 'POST',
		dataType : 'json',
		data : $("#form").serialize(),
		success : function(data) {
			/*  $("#tab1").empty(); */
			var dataList = data.news_item, html = '';
			for ( var i = 0, len = dataList.length; i < len; i++) {
				var tmp = dataList[i];
				html += '<article id="96" class="post">'
					     +'<div class="post-head">'
					     +'<h1 class="post-title">'
					     +'<a href="'+ tmp.url +'">'
					     +''+ tmp.title +'</a>'
					     +'</h1>'
					     +'<div class="post-meta">'
					     +'<span class="author">作者 <a href="'+ tmp.url +'">'+ tmp.author +'</a></span>'
					     +'<time class="post-date" datetime="'+ tmp.updated_time +'"'
					     +'title="'+ tmp.updated_time +'">'+ tmp.updated_time +'</time>'
					     +'</div>'
					     +'</div>'
					     +'<div class="post-content">'
					     +'<p>'+ tmp.digest +'</p>' 
					     +'</div>'
					     +'<div class="post-permalink">'
					     +'<a href="'+ tmp.url +'"'
					     +'	class="btn btn-default">阅读原文</a>'
					     +'</div>'
					     +'</article>';
			}
			$('#tab1').html(html);
			
		}
	});

}
    </script>

</head>

<form class="" role="form" id="form"
				method="post" name="form">
 <input id ="type" type="hidden" value="${type}"  name="type" class="span3">
</form>
<section class="content-wrap">
	<div class="container">
		<div class="row">

			<main class="col-md-8 main-content" id="tab1">

			</main>
		</div>
	</div>
</section>



</body>
</html>