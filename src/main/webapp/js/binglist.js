/*
 * 饼状图点击获取详细信息表
 */
function getBingList(cityName, result, elementId) {
	var dom = document.getElementById(elementId);
	if (dom != null) {
		echarts.dispose(dom);
	}
	var myChart = echarts.init(dom);

	var data = [];
	for (var i = 0; i < result[0].length; i++) {
		data[i] = {
			name : result[0][i],
			value : result[1][i]
		}
	}

	option = {
		textStyle : {
			fontSize : 18,
			fontStyle : 'italic'
		},
		series : {
			type : 'pie',
			// roseType: 'angle',
			itemStyle : {
				// 阴影的大小
				shadowBlur : 200,
				// 阴影水平方向上的偏移
				shadowOffsetX : 0,
				// 阴影垂直方向上的偏移
				shadowOffsetY : 0,
				// 阴影颜色
				shadowColor : 'rgba(0, 0, 0, 0.5)'
			},

			data : data
		}
	};
	myChart.setOption(option);
	myChart.on('click', function(brand) {
		$("#modalContent").addClass("small");
		console.log(cityName, brand.name);
		getList(cityName,brand.name);
	});
}
/*
 * 创建List
 */
function getList(cityName, brandName) {
	$.ajax({
		url:'data/analyze/city/brand/'+cityName+'/'+brandName,
		type: 'get',
		dataType: 'json',
		success: function(result) {
			if(result.status==200) {
				// 请求成功
				var carList = result.data;
				$("#modalList").addClass("tableStyle");
				$("#modalList thead").html("");
				$("#modalList tbody").html("");
				// 添加表头
				var thead = '<tr>'+
								'<th scope="col">序号</th>'+
								'<th scope="col">品牌</th>'+
								'<th scope="col">车型</th>'+
								'<th scope="col">二手价</th>'+
								'<th scope="col">原价</th>'+
								'<th scope="col">里程数</th>'+
								'<th scope="col">车牌所在地</th>'+
								'<th scope="col">使用时间</th>'+
								'<th scope="col">变速箱</th>'+
								'<th scope="col">排量</th>'+
							'</tr>'
				$("#modalList thead").append(thead);
				//遍历集合, 添加表
				$(carList).each(function(index, item) {
					var tbody = '<tr>'+
									'<th scope="row">'+index+'</th>'+
									'<td>'+item.brand+'</td>'+
									'<td>'+item.model+'</td>'+
									'<td>'+item.price/10000+'万</td>'+
									'<td>'+item.originalPrice/10000+'万</td>'+
									'<td>'+item.mileage/10000+'万公里</td>'+
									'<td>'+item.city+'</td>'+
									'<td>'+item.year+'</td>'+
									'<td>'+item.type+'</td>'+
									'<td>'+item.displacement+'</td>'+
								'</tr>'
					$("#modalList tbody").append(tbody);
				});
			} else if(result.status==201) {
				// 请求失败
				alert(result.msg);
			}
		},
		error : function() {
			error();
		}
	});
	}