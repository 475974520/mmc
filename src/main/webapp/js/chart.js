/*
 * 饼状图
 */
function getbing(result, elementId) {
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
		title: {
            subtext: '数据来自爬虫一号',
            left: 'center',
            textStyle: {
            	fontFamily:'华文行楷',
                color: 'rgb(0,0,160)',
                fontSize: 30
            },
            padding: [40, 20, 20, 20] 
		},
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
}
/*
 * 环状饼状图
 */
function getcirclebing(data, elementId) {
	
	//放品牌总数的集合
	var brandSum = [];
	
	//声明 放品牌数量的数组
	var brandData = [];
	
	//声明 放价格区间-数组
	var priceSection = [];
	//价格区间标签
	var priceTip = ['[<5万]','[5-10万]','[10-20万]','[>20万]'];
	//颜色数组
	var color = ["#f54d4d", "#f87544", "#ffae00", "#dcff00", "#25d053", 
		 		"#01fff5", "#007cff", "#4245ff", "#c32eff", "#ff62e8"];
	//给 放价格区间-数组 赋值
	for(var i=0 ; i<data[0].length ; i++){
		var pricesum=data[1][4*i]+data[1][4*i+1]+data[1][4*i+2]+data[1][4*i+3];
		brandSum[i]=pricesum;
		for(var j = 0; j< 4; j++) {
			priceSection[4*i+j]={
				value : data[1][4*i+j],
				name : data[0][i],
				itemStyle: {
		            normal: {
		            	color: color[i%10]
		            }
				}
			}
		}
	}

	for(var i=0; i<data[0].length ; i++){
		brandData[i]={
			value : brandSum[i],
			name : data[0][i],
			itemStyle: {
	            normal: {
	            	color: color[i]
	            }
			}
	    }
	}

	
	
	
	
	var dom = document.getElementById(elementId);
	if (dom != null) {
		echarts.dispose(dom);
	}
	var myChart = echarts.init(dom);
	
	var
	
	option = {
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {c} ({d}%)"
		},
		title: {
            text: '品牌价格区间分布',
            subtext: '数据来自爬虫一号',
            left: 'center',
            textStyle: {
            	fontFamily:'华文行楷',
                color: 'rgb(0,0,160)',
                fontSize: 30
            },
            padding: [40, 20, 20, 20] 
		},
		legend : {
			orient : 'vertical',
			x : 'left',
			selected: {
				'大众': true,
				'福特': true,
				'别克': true,
				'现代': true,
				'本田': true,
				'雪佛兰': false,
				'日产': false,
				'丰田': false,
				'奥迪': false,
				'宝马': false,
				'起亚': false,
				'奔驰': false,
				'哈弗': false,
				'比亚迪': false,
				'长安': false,
				'吉利汽车': false,
				'标致': false,
				'五菱汽车': false,
				'奇瑞': false,
				'雪铁龙': false			
			},
            data : data[0]
		},
		series : [
				{
					name : '汽车品牌',
					type : 'pie',
					selectedMode : 'single',
					radius : [ 0, '40%' ],

					label : {
						normal : {
							position : 'inner'
						}
					},
					labelLine : {
						normal : {
							show : false
						}
					},
					data : brandData
				},
				{
					name : '[0,5,10,20]',
					type : 'pie',
					radius : [ '50%', '65%' ],
					label : {
						normal : {
							formatter : '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
							backgroundColor : '#eee',
							borderColor : '#aaa',
							borderWidth : 1,
							borderRadius : 5,
							rich : {
								a : {
									color : '#999',
									lineHeight : 18,
									align : 'center'
								},
								hr : {
									borderColor : '#aaa',
									width : '100%',
									borderWidth : 0.5,
									height : 0
								},
								b : {
									fontSize : 12,
									lineHeight : 24
								},
								per : {
									color : '#eee',
									backgroundColor : '#334455',
									padding : [ 4, 8 ],
									borderRadius : 2
								}
							}
						}
					},
					data : priceSection
				} ]
	};
	myChart.setOption(option);
	myChart.on('click', function(params) {
		$("#myModal").modal();
		$("#modaldiv").html("");
		$("#myModal").off('shown.bs.modal').on('shown.bs.modal', function() {		
			removeSmall(params.name, "地区排行");
			bingModal(params.name);
		})
	});
}

