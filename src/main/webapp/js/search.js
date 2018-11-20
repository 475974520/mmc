//搜索
function search() {
	$('#viewResult').load("views/searchResult.html #searchView")
	var keyword = $('#searchtext').val();
	$.ajax({
		url: 'search/'+keyword,
		type: 'get',
		dataType: 'json',
		success: function(result) {
			if(result.status==200) {
				//有结果
				//$('#viewResult').load("views/searchResult.html #viewSearch")
				$("#searchView col-md-12").html("");
				
			} else if(result.status==201) {
				//无结果
				var msg = result.msg;
				alter(msg);
			}
		},
		error: function() {
			alert('请求失败');
		}
	});
}