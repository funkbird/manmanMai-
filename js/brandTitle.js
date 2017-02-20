/**
 * Created by Administrator on 2016/11/5.
 */
window.onload = function () {
    //数据获取函数封装
    $(function () {
        //brand数据获取与Dom渲染
        common.getApiData({
            api:"http://192.168.37.76:9090/api/getbrandtitle",
            callback: function (result) {
                var arrAll = result.result;
                var parentBox = $(".totalBrand");
                var uls = parentBox.find("ul");
                var arrReg = [/电视/,/空调/,/播放器|影院/,/冰箱/,/洗衣机|热水/,/手机/,/相机/];
                for(var i = 0 ; i < arrAll.length;i++) {
                    var li = document.createElement("li");
                    var a = $("<a></a>");
                    a.attr({
                        "href":'brand-content.html?brandtitleid='+ arrAll[i].brandTitleId,
                        "data-title-id":result.result.categoryId
                    });
                    li.appendChild(a[0]);
                    a.html(arrAll[i].brandTitle);
                    for(var j = 0 ; j < uls.length;j++) {
                        if(arrReg[j].test(arrAll[i].brandTitle)){
                            uls[j].appendChild(li);
                        }
                    }
                }
            }
        });
        //brand手风琴特效
        var titles = $(".totalBrand .product h3");
        titles.each(function (index,value) {
            common.tap(value, function () {
                $(value).siblings("ul").show(300).parent().siblings().children("ul").hide(300);
                $(value).children("span").removeClass().addClass("icon icon_less");
                $(value).parent().siblings().find("span").removeClass().addClass("icon icon_unfold");
                if($(value).hasClass("close")){
                    $(value).removeClass().addClass("open");
                }else if($(value).hasClass("open")) {
                    $(value).siblings("ul").hide(300);
                    $(value).removeClass().addClass("close");
                    $(value).children("span").removeClass().addClass("icon icon_unfold");
                }
            })
        })
    })
}
