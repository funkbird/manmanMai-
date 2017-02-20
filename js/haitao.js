$(function(){
    $.ajax({
        url:"http://mmb.ittun.com/api/getmoneyctrl",
        data:{"PageID":1},
        success: function (result) {
            console.log(result)
            var html = template("haitao",result);
            $(".container .content").html(html);
        }
    })
});