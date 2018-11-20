function getMap(data,elementId) {
	var dom = document.getElementById(elementId); 
	var myChart = echarts.init(dom);

	var result=[];
	for(var i = 0; i < data[0].length; i++) {
		result[i]={name:data[0][i], value:data[1][i]};
	}
    option = {
    	backgroundColor: 'rgba(74, 165, 247, 0)',
        title: {
            text: '全国二手车分布',
            subtext: '数据来自爬虫一号',
            left: 'center',
            textStyle: {
            	fontFamily:'华文行楷',
                color: 'rgb(0,0,160)',
                fontSize: 60
            },
            padding: [40, 20, 20, 20]  
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
                var value = (params.value + '').split('.');
                value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                return params.seriesName + '<br/>' +'<h2>'+params.name+':'+value+'</h2>';
            }
        },
        visualMap: {
            left: 'right',
            top: 'bottom',
            min: 0,
            max: 60000,
//            inRange: {
//            	//'#313695', '#4575b4', '#74add1', '#abd9e9',  '#a50026'
//                color: ['#f9f8f7','#f7e4de','#f2cfc4','#f3b8a4','#f3a68d','#f39e82',
//                	'#f28e6d','#f07f59','#ef683b','#f05724','#ee4d17','#ee3b00',]
//            },
            text:['High','Low'],           // 文本，默认为数值文本
            calculable: false
        },
        toolbox: {
            show: true,
            //orient: 'vertical',
            left: 'left',
            top: 'top',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '毛毛虫二手车系统',
                type: 'map',
                roam: true,
                map: 'china',
                itemStyle:{
                    emphasis:{label:{show:true}}
                },
                // 文本位置修正
                textFixed: {
                    Alaska: [20, -20]
                },
                data: result
            }
        ]
    };

    myChart.setOption(option);
    myChart.on('click', function (params) {
        $("#myModal").modal();
		$("#modaldiv").html("");
        $("#myModal").off('shown.bs.modal').on('shown.bs.modal', function () {
        	removeSmall(params.name,"省前十品牌");
        	mapModal(params.name);
        })
    });
}
