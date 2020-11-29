	/**
	 * <p id="back-top">
	 * <a class="top" href="#" title="Back to top">Top</a>
	 * </p>
	 * 
	 * */
	/*
	// hide #back-top first
	$("#back-top").hide();
	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$("#back-top").fadeIn();
			} else {
				$("#back-top").fadeOut();
			}
		});

		// scroll body to 0px on click
		$("#back-top a").click(function () {
			$("body,html").animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});*/
	
	$(".icon1,.icon2,.icon3,.icon4,", "#rss").wrapInner("<span class='hover'></span>").css("textIndent", "0").each(function() {
	    $("span.hover").css("opacity", 0).hover(function() {
	        $(this).stop().fadeTo(350, 1);
	    },
	    function() {
	        $(this).stop().fadeTo(350, 0);
	    });
	});
	
	$(function () {
	    $(window).scroll(function(){
	      if ($(window).scrollTop()>100){
	        $(".toTop").fadeIn(500);
	      }
	      else
	      {
	        $(".toTop").fadeOut(500);
	      }
	    });
	    $(".toTop").hover(function(){
	      $(this).css("background-position", "-48px 0");
	    },function(){
	      $(this).css("background-position", "0 0");
	    });
	    $(".toTop").click(function(){
	      $("body,html").animate({scrollTop:0},300);
	      return false;
	    });
	  });
	
	$(".htitle, .h2cate a").hover(function(){
		$(this).css("position","relative").animate({"left":"10px"},300);
	},function(){
		$(this).animate({"left":"0px"},300);
	});