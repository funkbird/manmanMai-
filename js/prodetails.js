/**
 * Created by Administrator on 2016/11/6 0006.
 */
window.onload = function(){
    var result = common.getUrlParam("productid");
    var categoryid = common.getUrlParam("categoryid");
    //var aa = 4;
    $.ajax({
        url:'http://192.168.37.76:9090/api/getproduct',
        //url:'http://mmb.ittun.com/api/getproduct',
        data:{productid:result},
        success: function (result) {
            var html = template("prodetTem", result);
            $("#prodet_content").html(html);
            var html1 = template("listTem",result);
            $("#plist").html(html1);
            var index = result.result[0].productName.indexOf(" ");
            var str = result.result[0].productName.substring(0,index);
            var html2 = template("currentTem",{"str":str});
            $(".prolist_nav_right").html(html2);

        }
    });
    $.ajax({
        url:'http://192.168.37.76:9090/api/getproductcom',
        //url:'http://mmb.ittun.com/api/getproductcom',
        data:{productid:result},
        success: function (result) {
            var html = template("reviewTem", result);
            $("#reviewlist").html(html);
        }
    });
    $.ajax({
        url:'http://192.168.37.76:9090/api/getcategorybyid',
        //url:'http://mmb.ittun.com/api/getcategorybyid',
        data:{categoryid:categoryid},
        success: function (result) {
            var html = template("titleTem", result);
            $(".prolist_nav_left").html(html);
        }
    })
    var layout = document.querySelector(".prolist")
    var close = document.querySelector(".app_promotion_bar");
    common.tap(close,function(e){
        e.target.parentNode.style.display = "none";
        layout.style.paddingBottom = "0px";
        e.preventDefault();
    })
}