if(typeof authorList !== 'undefined'){
    if(authorList.length>0){
        var html = '';
        html += '<div class="book_auth mb10"> <div class="v1_title"><span>'+i18nUtils.prop("book_author_books")+'</span></div> <div class="v1_content"> <ol class="bgGray">';
        for(var c in authorList){
            var cur = authorList[c];
            var num = parseInt(c)
            if(c == 0){
                var img = "/"+cur.image_path_min;
                if(typeof ctx_cdn!== 'undefined'){
                    img = ctx_cdn+"/"+cur.image_path_min;
                }
                html += '<li class="first"> <div class="v1_no1 clearfix"> <div class="v1_img"><a href="/book/'+cur.customer_url+'.html" target="_blank" title="'+cur.book_name+'"><img src="'+img+'" alt="'+cur.book_name+'" width="80" height="100" /></a></div> <div class="v1_con"> <div class="v1_name"><a class="listtxtbold" href="/book/'+cur.customer_url+'.html" target="_blank" title="'+cur.book_name+'">'+cur.book_name+'</a></div> <div class="v1_info"><span class="blue">'+i18nUtils.prop("book_author")+':</span>'+cur.author_name+'</div> <div class="v1_info"><span class="blue">'+i18nUtils.prop("book_role")+':</span>'+cur.leading_role+'</div> </div> <div style="clear:both;"></div> </div> </li>';
            }else{
                html += '<li class="no'+(num+1)+'"><a class="listtxt" href="/book/'+cur.customer_url+'.html" target="_blank" title="'+cur.book_name+'">'+cur.book_name+'<i>'+(num+1)+'</i></a></li>';
            }
        }
        html += '</ol></div></div>';
        document.write(html);
    }
}