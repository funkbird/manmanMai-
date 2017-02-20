$(function () {
    function getData (callback) {
        $.ajax({
            url:"http://192.168.37.76:9090/api/getbaicaijiatitle",
            success: function (result) {
                callback && callback(result);
            }
        })
    }
    getData(function (result) {
        var html = template("header",result);
        $(".header .left ul").html(html);
        var lis = $(".header .left ul li");
            for(var i = 0; i < lis.length; i++){
                lis[i].index = i;
                console.log(lis[i]);
                common.tap(lis[i],function(e){
                    getProduct(e.target.parentNode.index);
                })
            }
    })
    function getProduct (i) {
        $.ajax({
            url:"http://192.168.37.76:9090/api/getbaicaijiaproduct?titleid="+i+"",
            success: function (result) {
                var html = template("product",result);
                $(".product").html(html);
            }
        })
    };
    getProduct(0);
    $(".backHeader").on("touchstart", function () {
        $('html,body').animate({
            scrollTop: 0
        }, 500);
    })
    $(window).on('scroll', function() {

        if ($(window).scrollTop() > $(window).height())
            $(".backHeader").fadeIn();
        else
            $(".backHeader").fadeOut();
    });
    itcast.iScroll({
        swipeDom:document.querySelector(".left"),
        swipeType:"x",
        swipeDistance:100
    });
});

