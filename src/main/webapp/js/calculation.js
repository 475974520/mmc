//估算车价
function calculation() {
		$.ajax({
		url: 'data/analyze/price',
		type: 'get',
		dataType: 'json',
		success: function(result) {
			if(result.status==1) {
				//有结果
				
			} else if(result.status==0) {
				//无结果
				
			}
		},
		error: function() {
			alert('请求失败');
		}
	});
}