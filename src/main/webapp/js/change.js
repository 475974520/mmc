//上移主页页面
function moveUp() {
	$('#navigation, #search, #statistics,#valuation').animate({
		marginTop: 0
	});
	$('body').css("background" ,"url('picture/2.jpg')");
	$('#navigation a').css('color', 'black');
	$('#main').css('height', '120px');
	$('#viewResult').show();
}
//还原
function moveBack() {
		$('#navigation').animate({
			marginTop: '25%'
		}, 'slow');
		$('#search, #statistics,#valuation').animate({
			marginTop: '80px'
		}, 'slow');
		$('body').css("background" ,"url('picture/1.jpg')").css("background-position", "center");
		$('#navigation a').css('color', 'grey');
		$('#main').css('height', '650px');
		$('#viewResult').hide();
}