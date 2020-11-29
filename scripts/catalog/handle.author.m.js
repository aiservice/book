if(typeof authorList !== 'undefined'){
    if(authorList.length>0){
        var html = '';
        html += '<div class="module"> <div class="module-header"> <div class="module-header-l"> <h3 class="module-title">'+i18nUtils.prop("book_author_books")+'</h3> </div> </div> <div class="module-content"> <div class="module-slide"> <ol class="module-slide-ol" id="book-friend-list-container" role="listbox">';
        for(var c in authorList){
            var cur = authorList[c];
            var img = "/"+cur.image_path_min;
            if(typeof ctx_cdn!== 'undefined'){
                img = ctx_cdn+"/"+cur.image_path_min;
            }
            html += '<li class="module-slide-li"><a href="/m/book/'+cur.customer_url+'.html" class="module-slide-a"><img src="'+img+'" class="module-slide-img" alt="'+cur.book_name+'"> <figcaption class="module-slide-caption">'+cur.book_name+'</figcaption> <p class="module-slide-author" role="option"></p> </a></li>';
        }
        html += '</ol></div></div></div>';
        document.write(html);
    }
}