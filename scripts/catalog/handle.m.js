if(chapterList) {
    var bookVolumeList = chapterList.bookVolumeList;
    var curl = chapterList.customer_url;
    var html = '';
    var i = 1;
    var chapters_sum = 0;
    for(var v  in bookVolumeList){
        i++;
        var chapterList = bookVolumeList[v].bookChapterList;
        chapters_sum += chapterList.length;
        html += '<li class="chapter-bar"><span data-num="'+i+'">'+bookVolumeList[v].volume_name+'</span>&nbsp;['+chapterList.length+']</li>';
        for(var c in chapterList){
            i++;
            var url_tmp = '/m/read/'+curl+'/'+chapterList[c].id+'.html';
            html += '<li class="chapter-li" id="c'+chapterList[c].id+'"> <a href="'+url_tmp+'" class="chapter-li-a" > <span data-num="'+i+'" class="chapter-index">'+chapterList[c].chapter_name+'</span> </a> </li>';
        }
    }
    $("#volumes").append(html);
    $("#chapters_sum").html(chapters_sum);
}