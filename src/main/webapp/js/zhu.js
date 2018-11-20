/*
 * 动态柱状图
 */
function changingZhu(data, elementId) {
	var dom = document.getElementById(elementId);
	if (dom != null) {
		echarts.dispose(dom);
	}
	var myChart = echarts.init(dom);
	
	var dataMap = {};
	function dataFormatter(obj) {
	    var pList = ['大众','别克','奥迪','宝马','本田','福特','奔驰','比亚迪','长安','标志','宝骏','丰田','长城','吉利','现代',
	    			'奔腾','北汽幻速','起亚','雪佛兰','北汽威旺','东风','日产','保时捷','广汽传祺','江淮','北汽绅宝','东南',
	    			'海马','Jeep','铃木','凯迪拉克'];
	    var temp;
	    for (var year = 2008; year <= 2017; year++) {
	        var max = 0;
	        var sum = 0;
	        temp = obj[year];
	        for (var i = 0, l = temp.length; i < l; i++) {
	            max = Math.max(max, temp[i]);
	            sum += temp[i];
	            obj[year][i] = {
	                name : pList[i],
	                value : temp[i]
	            }
	        }
	        obj[year + 'max'] = Math.floor(max / 100) * 100;
	        obj[year + 'sum'] = sum;
	    }
	    console.log(obj);
	    return obj;
	}


	dataMap.dataFinancial = dataFormatter({
	    //max : 3200,
		2017:data[0],
		2016:data[1],
		2015:data[2],
		2014:data[3],
		2013:data[4],
	    2012:data[5],
	    2011:data[6],
	    2010:data[7],
	    2009:data[8],
	    2008:data[9],
	});
	
	/*
	 * {
	            title: {text: '2002全国宏观经济指标'},
	            series: [
	                {data: dataMap.dataFinancial['2002']}
	            ]
	        }
	 */
	var options = [];
	for(var i = 8; i <= 17; i++) {
		options[i-8]={
	            		title: {text: 2000+i+'主要二手车品牌数量'},
	            		//数据条颜色
//	            		color: ['#3398DB'],
	            		series: [
	            		{data: dataMap.dataFinancial[2000+i+""]}
	            		]
	        		}
	}
	option = {
	    baseOption: {
	        timeline: {
	            // y: 0,
	            axisType: 'category',
	            // realtime: false,
	            // loop: false,
	            autoPlay: true,
	            // currentIndex: 2,
	            playInterval: 1500,
	            // controlStyle: {
	            //     position: 'left'
	            // },
	            data: [
	                '2008-01-01','2009-01-01','2010-01-01','2011-01-01','2012-01-01',
	                '2013-01-01','2014-01-01','2015-01-01','2016-01-01','2017-01-01'     
	            ],
	            label: {
	                formatter : function(s) {
	                    return (new Date(s)).getFullYear();
	                }
	            }
	        },
	        title: {
	            subtext: '数据来自爬虫一号',
	        },
	        tooltip: {
	        },
	        calculable : true,
	        grid: {
	            top: 80,
	            bottom: 100,
	            tooltip: {
	                trigger: 'axis',
	                axisPointer: {
	                    type: 'shadow',
	                    label: {
	                        show: true,
	                        formatter: function (params) {
	                            return params.value.replace('\n', '');
	                        }
	                    }
	                }
	            }
	        },
//	        横坐标
	        xAxis: [
	            {
	            	name: '品牌',
	                'type':'category',
	                'axisLabel':{'interval':0},
	                'data':[
	                	'大众','\n别克','奥迪','\n宝马','本田','\n福特','奔驰','\n比亚迪','长安','\n标志',
	                	'宝骏','\n丰田','长城','\n吉利','现代','\n奔腾','北汽幻速','\n起亚','雪佛兰','\n北汽威旺',
	                	'东风','\n日产','保时捷','\n广汽传祺','江淮','\n北汽绅宝','东南','\n海马','Jeep','\n铃木',
	                	'凯迪拉克'
	                ],
	                splitLine: {show: false}
	            }
	        ],
//	        纵坐标
	        yAxis: [
	            {
	                type: 'value',
	                name: '数量/辆',
	                axisLine: {
                        lineStyle: {
                            color: '#0c3b71'
                        }
	                }
	            }
	            
	        ],
//	        
	        series: [
	        	//数据条样式
	        	{
	                name: '数量',
	                type: 'bar',
	                barWidth: '70%',
	                xAxisIndex: 0,
	                yAxisIndex: 0,
	                itemStyle: {
	                    normal: {
	                        barBorderRadius: 10,
	                        color: new echarts.graphic.LinearGradient(
	                            0, 0, 0, 4, [{
	                                    offset: 0,
	                                    color: '#77cdb5'
	                                },
	                                {
	                                    offset: 0.5,
	                                    color: '#44cdb5'
	                                },
	                                {
	                                    offset: 1,
	                                    color: '#11cdb5'
	                                }
	                            ]
	                        )
	                    }
	                },
	                zlevel: 5
	            },
	            {name: '数量', type: 'bar'},
	            
	        ]
	    },
	    options: options
	};
	myChart.setOption(option);
}
/*
 * 里程数普通柱状图
 */
function getzhu(data, elementId, tableName) {
	console.log("getzhu");
	console.log(data);
	var dom = document.getElementById(elementId);
	if (dom != null) {
		echarts.dispose(dom);
	}
	var myChart = echarts.init(dom);
		
	option = {
		
		color: ['#55cdb5'],
		title : {
			text : tableName,
			subtext: '数据来自爬虫一号'
		},
		tooltip : {},
		xAxis : {
			name: '万公里',
			axisLabel: {
	            inside: false,
	            textStyle: {
	                color: '#000'
	            }
	        },
			data : data[0]
		},
		yAxis : {
			name: '数量/辆'
		},
		series : [ {
			name : "Number",
			type : 'bar',
			data : data[1]
		} ]
	};
	myChart.setOption(option);
	// 点击图标转转响应页面
	myChart.on('click', function(params) {
		$("#myModal").modal();
		$("#modaldiv").html("");
		$("#myModal").off('shown.bs.modal').on('shown.bs.modal', function() {
			console.log(params.name);
			removeSmall(params.name,"万公里以内");
			zhuModal(params.name);
		})
	});
}
/*
 * 详细信息柱状图
 */
function getzhu2(data, elementId, tableName) {
	var dom = document.getElementById(elementId);
	if (dom != null) {
		echarts.dispose(dom);
	}
	var myChart = echarts.init(dom);
	
	option = {
		textStyle : {
			fontSize : 18,
			fontStyle : 'italic'
		},
		title : {
			text : tableName,
			subtext: '数据来自爬虫一号'
		},
		tooltip : {},
		xAxis : {
			name: '城市', 
			data: data[0]
		},
		yAxis : {
			name: '数量/台'
		},
		series : [ {
			name : "Number",
			type : 'bar',
			data : data[1]
		} ]
	};
	myChart.setOption(option);
}
/*
 * 可移动柱状图
 */
function moveablezhu(data, elementId) {
	var dom = document.getElementById(elementId);
	if (dom != null) {
		echarts.dispose(dom);
	}
	var myChart = echarts.init(dom);
	var dataAxis = data[0];
	var data = data[1];
	var yMax = 1;
	var dataShadow = [];

	for (var i = 0; i < data.length; i++) {
	    dataShadow.push(yMax);
	}

	option = {
	    title: {
	        text: '品牌性价比',
	        subtext: '数据来自爬虫一号'
	    },
	    xAxis: {
	    	name: '品牌',
	        data: dataAxis,
	        axisLabel: {
	            inside: true,
	            textStyle: {
	                color: '#fff'
	            }
	        },
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            show: false
	        },
	        z: 10
	    },
	    yAxis: {
	        axisLine: {
	            show: true
	        },
	        axisTick: {
	            show: false
	        },
	        axisLabel: {
	            textStyle: {
	                color: '#999'
	            }
	        }
	    },
	    dataZoom: [
	        {
	            type: 'inside'
	        }
	    ],
	    series: [
	        { // For shadow
	            type: 'bar',
	            itemStyle: {
	                normal: {color: 'rgba(0,0,0,0.05)'}
	            },
	            barGap:'-100%',
	            barCategoryGap:'40%',
	            data: dataShadow,
	            animation: false
	        },
	        {
	            type: 'bar',
	            itemStyle: {
	                normal: {
	                    color: new echarts.graphic.LinearGradient(
	                        0, 0, 0, 1,
	                        [
	                            {offset: 0, color: '#99cdb5'},
	                            {offset: 0.5, color: '#55cdb5'},
	                            {offset: 1, color: '#11cdb5'}
	                        ]
	                    )
	                },
	                emphasis: {
	                    color: new echarts.graphic.LinearGradient(
	                        0, 0, 0, 1,
	                        [
	                            {offset: 0, color: '#11cdb5'},
	                            {offset: 0.7, color: '#44cdb5'},
	                            {offset: 1, color: '#77cdb5'}
	                        ]
	                    )
	                }
	            },
	            data: data
	        }
	    ]
	};
	myChart.setOption(option);
	// Enable data zoom when user click bar.
	var zoomSize = 6;
	myChart.on('click', function (params) {
	    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
	    myChart.dispatchAction({
	        type: 'dataZoom',
	        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
	        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
	    });
	});
}