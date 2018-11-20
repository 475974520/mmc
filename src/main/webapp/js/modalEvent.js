/*
 * 地图调取模态框
 */
function mapModal(cityName) {
	$.ajax({
		url:"/data/analyze/mapmodal1/"+cityName,
		type: "get",
		dataType: "json",
		success: function(result) {
			getBingList(cityName, result.data, "modalContent");
		},
		error: function() {
			error();
		}
	}); 
}
/*
 * 普通柱状图调取模态框
 */
function zhuModal(mileage) {
	$.ajax({
		url:"/data/analyze/mapmodal2/"+mileage,
		type: "get",
		dataType: "json",
		success: function(result) {
			getbing(result.data, "modalContent");
		},
		error: function() {
			error();
		}
	}); 
}
/*
 * 环状饼状图调取模态框
*/
function bingModal(brandName) {
	$.ajax({
		url:"/data/analyze/mapmodal3/"+brandName,
		type: "get",
		dataType: "json",
		success: function(result) {
			getzhu2(result.data, "modalContent");
		},
		error: function() {
			error();
		}
	}); 
}