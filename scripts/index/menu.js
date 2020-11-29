
$(function(){
	/* 主导航切换 */
	$("#mainMenu li").hover(function(){
		var index = $(this).index();
		$(this).addClass("navon").siblings(this).removeClass("navon");
		$('#subMenu ul').eq(index).show().siblings(this).hide();
	});

	/* 首页专题切换 */
	$("ul.tabs li").hover(function(){
		var index = $(this).index();
		$(this).addClass("current").siblings(this).removeClass("current");
		$(".book_tpbox").eq(index).show().siblings(".book_tpbox").hide();
	});

	/* 作品首页切换 */
	$("div.book_dirtab ul li").hover(function(){
		var index = $(this).index();
		$(this).addClass("hover").siblings(this).removeClass("hover");
		$(".book_dir_list").eq(index).show().siblings().hide();
	});

	/* 排行榜Tab切换 */
	$("div.book_top_tab a").hover(function(){
		var index = $(this).index(),
			parent = $(this).parents(".book_top");
		$(this).addClass("select").siblings(this).removeClass("select");
		parent.find("div.book_top_wrap").eq(index).find("div.book_page_nav a").eq(0).addClass("cur").siblings(this).removeClass("cur");
		parent.find("div.book_top_wrap").eq(index).find("div.book_top_page").eq(0).show().siblings(".book_top_page").hide();
		parent.find("div.book_top_wrap").eq(index).show().siblings(".book_top_wrap").hide();
		
	});
	$("div.book_page_nav a").hover(function(){
		var index = $(this).index();
		$(this).addClass("cur").siblings(this).removeClass("cur");
		$(this).parents(".book_top_wrap").find(".book_top_page").eq(index).show().siblings(".book_top_page").hide();
	});
	
	
	
	/*用户中心关闭提示*/
	$('div.user_form_tip .tip_close').click(function(){
		$(this).parent().fadeOut(1000,function(){$(this).remove()});
	});
	
	/*标签选择*/
	$('div.item_tags span').click(function(){
		var chk = $(this).find(":checkbox");
		if(!chk[0].checked){
			chk[0].checked = true;
			$(this).addClass('active')
		}else {
			chk[0].checked = false;	
			$(this).removeClass('active')
		}
	});	
	

	
});



function swapMenu(liName, tagName, tagCount, currentMenuId, an, bn){
    for(var i=1; i<=tagCount; i++){
        if (currentMenuId ==i){
            document.getElementById(tagName + currentMenuId).style.display = "block";
            document.getElementById(liName + currentMenuId).className = an;
        }else{
            document.getElementById(tagName + i).style.display = "none";
            document.getElementById(liName + i).className = bn;
       }
    }
}

