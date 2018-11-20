//地区统计
function city() {
	$.ajax({
		url: 'data/analyze/city',
		type: 'get',
		dataType: 'json',
		success: function(result) {
			if(result.status==200) {
				//有结果
				$("#checkboxView").html("");
				$("#contentResult").html("");
				//$('#viewResult').load("views/hedgeResult.html #viewHedge")
				//$("#checkbokView", "#contentResult").html("");
				var data = result.data;
				console.log(data);
				for (var i=0; i < data[0].length; i++) {
					$("#checkboxView").append('<label class="btn btn-warning active" onchange="updateCity()">'+
													'<input type="checkbox" autocomplete="off" checked>'+
													 data[0][i] +
												'</label>');
				}
				//统计图
				getMap(data);
			} else if(result.status==201) {
				//无结果
				var msg = result.msg();
				alert(msg)
			}
		},
		error: function() {
			alert('请求失败');
		}
	});
}