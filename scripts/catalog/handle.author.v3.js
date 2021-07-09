if (typeof authorList !== 'undefined') {
    if (authorList.length > 0) {
        var html = '';
        html += '<div class="g_wrap j_you_also_like_title"> <h2 class="g_h2 pb20">' + i18nUtils.prop("book_author_books") + '</h2> </div>'
        html += '<ul class="g_row hom-books boo-pop">';
        for (var c in authorList) {
            var cur = authorList[c];
            var img = "/" + cur.image_path;
            if (typeof ctx_cdn !== 'undefined') {
                img = ctx_cdn + "/" + cur.image_path;
            }
            html += '<li class="g_col_2 g_ipad"> <div class="g_book"><a href="/book/' + cur.customer_url + '.html"><i class="g_thumb hom-thumb"><img class="lazy" data-original="' + img + '" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" width="140" height="186" style="display: block;"></i> <h3 class="g_h4">' + cur.book_name + '</h3></a><span class="_type">' + cur.author_name + '</span></div> </li>'
        }
        html += '</ul>';
        document.write(html);
    }
}