if (typeof chapterList !== 'undefined') {
    var html = '';
    var curl = chapterList.customer_url;
    var bookVolumeList = chapterList.bookVolumeList;
    var total_size = 0;
    var fist_chapter_url = "";
    for (var v in bookVolumeList) {
        var chapterList = bookVolumeList[v].bookChapterList;
        total_size += chapterList.length;
        html += '<li class="volumes ell">' + bookVolumeList[v].volume_name + '</li>';
        for (var c in chapterList) {
            var url_tmp = '/read/' + curl + '/' + chapterList[c].id + '.html';
            if (fist_chapter_url === "") {
                fist_chapter_url = url_tmp;
            }
            html += '<li class="w33p" id="c' + chapterList[c].id + '"><a href="' + url_tmp + '" title="' + chapterList[c].chapter_name + '" class="c_strong vam ell db"><span class="vam">' + chapterList[c].chapter_name + '</span></a> </li>';
        }
    }
    if (fist_chapter_url && fist_chapter_url !== "") {
        $("#btnReadBook").attr("href", fist_chapter_url);
    }
    $("#volumes").html(html);
    $("#total-size").html("[" + total_size + "]");

}