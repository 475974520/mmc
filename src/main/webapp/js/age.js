//车龄统计
function age() {
	$.ajax({
		url: 'data/analyze/age',
		type: 'get',
		dataType: 'json',
		success: function(result) {
			if(result.status==200) {
				//有结果
				$("#checkboxView").html("");
				$("#contentResult").html("");
				//$('#viewResult').load("views/ageResult.html #viewAge")
				//$("#checkbokView", "#contentResult").html("");
				var data = result.data;
				for (var i=0; i < data[0].length; i++) {
					$("#checkboxView").append(' <label class="btn btn-warning active" onchange="updateAge()">'+
													'<input type="checkbox" autocomplete="off" checked>'+
													 data[0][i]+
												'</label>');
				}
				//统计图
				getzhu(data);
			} else if(result.status==0) {
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

