if(typeof chapterList !== 'undefined'){
    var html = '';
    var html_catalog = '';
    var curl = chapterList.customer_url;
    var chapterNewList = chapterList.chapterNewList;
    html += '<div class="book_dirbox"> <ul class="clearfix">';
    for(var c in chapterNewList){
        var new_tip = "";
        if(c == 0){
            new_tip = '<b class="novel_right_new">'+i18nUtils.prop("book_chapter_new")+'</b>';
        }
        var url_tmp = '/read/'+curl+'/'+chapterNewList[c].id+'.html';
        html += '<li>'+new_tip+'<a href="'+url_tmp+'" title="'+chapterNewList[c].chapter_name+'">'+chapterNewList[c].chapter_name+'</a> </li>';
    }
    html += '</ul> </div>';

    html_catalog += '<div class="book_dirbox"> <ul class="clearfix">';
    var bookVolumeList = chapterList.bookVolumeList;
    for(var v in bookVolumeList){
        var chapterList = bookVolumeList[v].bookChapterList;
        var nums = "";
        if(bookVolumeList[v].volume_words>0){
            nums= i18nUtils.prop("book_bookshelf_total")+' '+bookVolumeList[v].volume_words+' '+i18nUtils.prop("book_bookshelf_total_words")
        }
        html += '<div class="book_dirbox">';
        html +=  '<h3> <em class="fr">['+chapterList.length+']&nbsp;'+nums+'</em> <span class="dir_name">'+bookVolumeList[v].volume_name+'</span></h3>' ;
        html += '<ul class="clearfix">';
        for(var c in chapterList){
            var url_tmp = '/read/'+curl+'/'+chapterList[c].id+'.html';
            html += '<li id="c'+chapterList[c].id+'"><a href="'+url_tmp+'" title="'+chapterList[c].chapter_name+'">'+chapterList[c].chapter_name+'</a> </li>';
            html_catalog += '<li id="c'+chapterList[c].id+'"><a href="'+url_tmp+'" title="'+chapterList[c].chapter_name+'">'+chapterList[c].chapter_name+'</a> </li>';
        }
        html += '</ul></div>';
    }
    html_catalog += '</ul></div>';
    $("#volumes").append(html);

    var catalogs = $("#catalogs");
    if (catalogs.length > 0 ) {
        catalogs.html(html_catalog);
    }
}