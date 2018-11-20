function removeSmall(name, str) {
	$("#myModal .modal-header .modal-title").html(name+str);
	if($("#modalContent").hasClass("small")) {
		$("#modalContent").removeClass("small");
		$("#modalList").removeClass("tableStyle");
		$("#modalList thead").html("");
		$("#modalList tbody").html("");
	}
}