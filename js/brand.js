/**
 * Created by Administrator on 2016/11/5.
 */
window.onload = function () {
    //数据获取函数封装
    $(function () {
        //brand数据获取与Dom渲染
        common.getApiData({
            api:"http://mmb.ittun.com/api/getbrandtitle",
            callback: function (result) {
                console.log(result)
                var arrAll = result.result;
                var parentBox = $(".totalBrand");
                var uls = parentBox.find("ul");
                console.log(uls)
                var arrReg = [/电视/,/空调/,/播放器|影院/,/冰箱/,/洗衣机/,/手机/,/相机/];
                for(var i = 0 ; i < arrAll.length;i++) {
                    var li = document.createElement("li")
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
        })
        //brand手风琴特效
        var titles = $(".totalBrand .product h3");
        titles.on("click", function () {
            $(this).siblings("ul").show(500).parent().siblings().children("ul").hide(500);
        })
    })
}
