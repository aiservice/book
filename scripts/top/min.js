$(function() {
	$(window).scroll(function() {
		if ($(window).scrollTop() > 100) {
			$(".toTop").fadeIn(500);
		} else {
			$(".toTop").fadeOut(500);
		}
	});
	
	$(".toTop").hover(function() {
		$(this).css("background-position", "-48px 0");
	}, function() {
		$(this).css("background-position", "0 0");
	});
	$(".toTop").click(function() {
		$("body,html").animate({
			scrollTop : 0
		}, 300);
		return false;
	});
});
