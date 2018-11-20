function chooseAll() {
	var allCbx = $("#checkboxView label");
	for (var i = 0; i < allCbx.length; i++) {
		var lab = $(allCbx[i]);
		if (!lab.hasClass("active")) {
			lab.addClass("active");
		}
	}
	$('#viewResult').load("views/statisticsView.html #statisticsView");
	$("#statisticsView").ready(function() {
		switch (btnType) {
		case 1:
			brand();
			console.log("brand");
			break;
		case 2:
			city();
			console.log("city");
			break;
		case 3:
			hedge();
			console.log("hedge");
			break;
		case 4:
			age();
			console.log("age");
			break;
		}
	});

}

function clearAll() {
	var allCbx = $("#checkboxView label");
	for (var i = 0; i < allCbx.length; i++) {
		var lab = $(allCbx[i]);
		if (lab.hasClass("active")) {
			lab.removeClass("active");
		}
	}
	
}