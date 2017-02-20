/**
 * Created by Administrator on 2016/11/5.
 */
window.onload = function () {
    var result = common.getUrlParam("brandtitleid");
    //brandTitle数据获取加载
    $.ajax({
        url:'http://192.168.37.76:9090/api/getbrand',
        data:{brandtitleid:result},
        success: function (result) {
            var html = template("tempBrand",result);
            $(".brand-content section.brandTitle ul").html(html);
            //nav商品标题
            $.ajax({
                url:'http://192.168.37.76:9090/api/getcategorybyid',
                data:{categoryid:result.result[0].categoryId},
                success: function (data) {
                    var nav = $("nav");
                    var span = $(".brand-content .hd span").eq(0);
                    span.html("品牌" + data.result[0].category);
                    var navHtml = nav.html();
                    navHtml = navHtml + ">";
                    nav.html(navHtml);
                    var a = $("<a></a>");
                    a.text(data.result[0].category);
                    a.attr("href","brand-content.html?brandtitleid="+data.result[0].categoryId);
                    nav.append(a);
                }
            })
        }
    })

    //brandRange数据获取加载
    $.ajax({
        url:'http://192.168.37.76:9090/api/getbrandproductlist',
        data:{brandtitleid:result},
        success: function (result) {
            var html = template("tempRange",result);
            $(".brand-content section.brandRange ul").html(html);
        }
    });
    //brandComment数据获取加载
    $.ajax({
        url:'http://192.168.37.76:9090/api/getproductcom',
        data:{productid:result},
        success: function (result) {
            var html = template("tempComment",result);
            $(".brand-content section.brandComment ul").html(html);
        }
    });
    //评论图片动态加载
    setTimeout(function () {
        for(var i = 0;i < 5;i++) {
            var img = $(".brandRange .pic img").eq(i);
            $(".brandComment .protit").eq(i).append(img);
            var p = $('<p></p>');
            p.html(img.attr("alt"));
            $(".brandComment .protit").eq(i).append(p);
        }
    },300);
    //tab栏切换
    var sections = $(".brand-content .hd");
    for(var i = 0 ; i < sections.length;i++) {
        common.tap(sections[0], function (e) {
            var active = $(".brand-content .hd .active");
            active.removeClass("active");
            e.target.classList.add("active");
            $(active[0].dataset["target"]).removeClass("active");
            $(e.target.dataset["target"]).addClass("active");
        })
    }
}