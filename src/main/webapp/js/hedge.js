//保值率统计
function hedge() {
	$.ajax({
		url: 'data/analyze/hedge',
		type: 'get',
		dataType: 'json',
		success: function(result) {
			if(result.status==1) {
				//有结果
				$("#checkboxView").html("");
				$("#contentResult").html("");
				//$("#checkbokView", "#contentResult").html("");
				var data = result.data;
				for (var i=0; i < data[0].length; i++) {
					$("#checkbokView").append(' <label class="btn btn-warning active" onchange="updateHedge()">'+
													'<input type="checkbox" autocomplete="off" checked>'+
													 data[0][i]+
												'</label>');
				}
				getxian(data);
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

