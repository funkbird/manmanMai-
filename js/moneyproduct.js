/**
 * Created by yang on 2016/11/6.
 */

    var pageid = common.getUrlParam("productId");
    $.ajax({
        type:'get',
        url:'http://192.168.37.76:9090/api/getmoneyctrlproduct',
        data:{'productid':pageid},
        success:function(result){
                var html = template("moneyproduct",result);
                $("main").html(html);
        }
    });

