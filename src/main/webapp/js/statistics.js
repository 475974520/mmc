function statistics(btn) {
	$('#viewResult').load("views/statisticsView.html #statisticsView");
	//$("#checkboxResult").html("");
	//$("#contentResult").html("");
	$("statisticsView").ready(function() {
		if(btn=="品牌统计") {
			brand();
			btnType=1;
		} else if (btn=="地区统计") {
			city();
			btnType=2;
		} else if (btn=="品牌保值") {
			hedge();
			btnType=3;
		} else if (btn=="车龄统计") {
			age();
			btnType=4;
		}
	});
}