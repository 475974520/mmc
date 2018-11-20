$(function() {
	$.ajax({
		url : 'data/analyze/city',
		type : 'get',
		dataType : 'json',
		success : function(result) {
			if (result.status == 200) {
				// 有结果
				var dom = document.getElementById("area");
				if (dom != null) {
					echarts.dispose(dom);
				}
				var data = result.data;
				// 统计图
				getMap(data, "area");
			} else if (result.status == 201) {
				// 无结果
				var msg = result.msg();
				alert(msg)
			}
		},
		error : function() {
			error();
		}
	});
	$("#areali").click(function() {
		$.ajax({
			url : 'data/analyze/city',
			type : 'get',
			dataType : 'json',
			success : function(result) {
				if (result.status == 200) {
					// 有结果
					var dom = document.getElementById("area");
					if (dom != null) {
						echarts.dispose(dom);
					}
					var data = result.data;
					// 统计图
					getMap(data, "area");
				} else if (result.status == 201) {
					// 无结果
					var msg = result.msg();
					alert(msg)
				}
			},
			error : function() {
				error();
			}
		});
	});
	/*
	 * 品牌请求
	 */
	$("#brandli").click(function() {
		$.ajax({
			url : 'data/analyze/brand',
			type : 'get',
			dataType : 'json',
			success : function(result) {
				if (result.status == 200) {
					// 有结果	
					var data = result.data;
					// 统计图
					getcirclebing(data, "brand");
				} else if (result.status == 201) {
					// 无结果
					var msg = result.msg();
					alert(msg)
				}
			},
			error : function() {
				error();
			}
		});
	});
	/*
	 * 性价比请求
	 */
	$("#hedgeli").click(function() {;
		$.ajax({
			url : 'data/analyze/hedge',
			type : 'get',
			dataType : 'json',
			success : function(result) {
				if (result.status == 200) {
					// 有结果
					var data = result.data;
					// 统计图
					moveablezhu(data, "hedge");
					//getbing(data, "hedge");
				} else if (result.status == 201) {
					// 无结果
					var msg = result.msg();
					alert(msg)
				}
			},
			error : function() {
				error();
			}
		});
	});
	/*
	 * 里程请求
	 */
	$("#mileageli").click(function() {
		$.ajax({
			url : 'data/analyze/mileage',
			type : 'get',
			dataType : 'json',
			success : function(result) {
				if (result.status == 200) {
					// 有结果
					var dom = document.getElementById("mileage");
					if (dom != null) {
						echarts.dispose(dom);
					}
					var data = result.data;
					// 统计图
					getzhu(data, "mileage", "里程数统计表");
				} else if (result.status == 201) {
					// 无结果
					var msg = result.msg();
					alert(msg)
				}
			},
			error : function() {
				error();
			}
		});
	});
	/*
	 * 二手车数量年份变化
	 */
	$("#ageli").click(function() {
		$.ajax({
			url : 'data/analyze/year',
			type : 'get',
			dataType : 'json',
			success : function(result) {
				if (result.status == 200) {
					// 有结果
					var dom = document.getElementById("mileage");
					if (dom != null) {
						echarts.dispose(dom);
					}
					var data = result.data;
					// 统计图
					changingZhu(data, "age");
				} else if (result.status == 201) {
					// 无结果
					var msg = result.msg();
					alert(msg)
				}
			},
			error : function() {
				error();
			}
		});
	});
});