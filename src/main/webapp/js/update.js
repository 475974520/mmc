//更新品牌统计
function updateBrand() {
	var allCbx = $("#checkboxView .active");
	var brands = [];
	for(var i = 0; i < allCbx.length; i++) {
		var name = $.trim($(allCbx[i]).text());
		brands.push(name);
		
	}
	console.log(brands);
	$.ajax({
		url: '/data/analyze/findByBrand',
		type: 'post',
		data: brands,
		dataType: 'json',
		success: function(result) {
			if(result.status==200) {
				//请求成功,显示图表
			} else if(result.status==201) {
				//无结果
				alert(result.msg());
			}
		},
		error: function() {
			alert('请求失败');
		}
	});
}
//更新城市统计
function updateCity() {
	var allCbx = $("#checkboxView .active");
	var citys = [];
	for(var i = 0; i < allCbx.length; i++) {
		var name = $.trim($(allCbx[i]).text());
		citys.push(name);
	}
	console.log(citys);
	$.ajax({
		url: '/data/analyze/findByCity',
		type: 'post',
		data: citys,
		dataType: 'json',
		success: function(result) {
			if(result.status==200) {
				//请求成功,显示图表
				//统计图
				var data = result.data;
				getMap(data);
			} else if(result.status==201) {
				//无结果
				alert(result.msg());
			}
		},
		error: function() {
			alert('请求失败');
		}
	});
}
//更新保值率统计
function updateHedge() {
	var allCbx = $("#checkboxView .active");
	var brands = [];
	for(var i = 0; i < allCbx.length; i++) {
		var name = $.trim($(allCbx[i]).text());
		brands.push(name);
	}
	console.log(brands);
	$.ajax({
		url: '/data/analyze/findByHedge',
		type: 'post',
		data: brands,
		dataType: 'json',
		success: function(result) {
			if(result.status==200) {
				//请求成功,显示图表
			} else if(result.status==201) {
				//无结果
				alert(result.msg());
			}
		},
		error: function() {
			alert('请求失败');
		}
	});
}
//更新车龄统计
function updateAge() {
	var allCbx = $("#checkboxView .active");
	var brands = [];
	for(var i = 0; i < allCbx.length; i++) {
		var name = $.trim($(allCbx[i]).text());
		brands.push(name);
	}
	console.log(brands);
	$.ajax({
		url: '/data/analyze/findByAge',
		type: 'post',
		data: brands,
		dataType: 'json',
		success: function(result) {
			if(result.status==200) {
				//请求成功,显示图表
			} else if(result.status==201) {
				//无结果
				alert(result.msg());
			}
		},
		error: function() {
			alert('请求失败');
		}
	});
}