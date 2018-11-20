//品牌统计
function brand() {
	$.ajax({
		url: 'data/analyze/brand',
		type: 'get',
		dataType: 'json',
		success: function(result) {
			if(result.status==200) {
				//有结果
				$("#checkboxView").html("");
				$("#contentResult").html("");
				//$("#checkbokView", "#contentResult").html("");
				//$('#viewResult').load("views/brandResult.html #viewBrand")
				var data = result.data;
				for (var i=0; i < data[0].length; i++) {
					$("#checkboxView").append(' <label class="btn btn-warning active" onchange="updateBrand()">'+
													'<input type="checkbox" autocomplete="off">'+
												    data[0][i]+
											  '</label>');
				}
				//统计图
				getzhu(data);
			} else if(result.status==201) {
				//无结果
				var msg = result.msg();
				alert(msg);
			}
		},
		error: function() {
			alert('请求失败');
		}
	});
}