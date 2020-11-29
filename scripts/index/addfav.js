var myfavflag = true;
function addMyFav(book_id, book_name) {
	if(myfavflag){
		$.jBox.tip("加入收藏中...", 'loading');
		window.setTimeout(function () { 
			$.post("/CsAjax.do?method=addMyFav",{book_id : book_id, book_name : book_name},function(data){
				if (data.ret == 1){
					$.jBox.tip(data.msg, "success");
				} else if (data.ret == 0){
					myfavflag = false;
					$.jBox.tip(data.msg, "warning");
				} else if (data.ret == -1){
					$.jBox.tip(data.msg, "warning");
				}
			});
		}, 2000);
	} else {
		$.jBox.tip("作品《" + book_name + "》已经存在于书架中！", "warning");
	}

}