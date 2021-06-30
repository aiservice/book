$(document).ready(function(){
    setTimeout(updateViewCount,2000)
});

function updateViewCount(){
    if(isBot()){return;}
    var newsId = $("#news_id").val();
    $.post("/CsAjax.do?method=updateNewsViewCount", {"news_id" : newsId}, function(datas){});
}