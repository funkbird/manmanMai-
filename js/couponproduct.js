/**
 * Created by kevin on 2016/11/7.
 */
$(function(){
//divæ”÷–
    function letDivCenter(divName){
        var top = ($(window).height() - $(divName).height())/2;
        var left = ($(window).width() - $(divName).width())/2;
        var scrollTop = $(document).scrollTop();
        var scrollLeft = $(document).scrollLeft();
        $(divName).css( { position : 'absolute', 'top' : top + scrollTop, left : left + scrollLeft } ).show();
    }

    var id=common.getUrlParam("couponid");
    $.ajax({
        url:'http://192.168.37.76:9090/api/getcouponproduct',
        data:{couponid:id},
        success:function(result){
            var html=template("cp_temp",result);
            $(".cp_box").html(html);
        },
        complete:function(){
            $(".pic_click").on("click",function(){
                $(this).parent().siblings(".pic_hidden").show().height($(window).height()).width($(window).width());
                letDivCenter($(this).parent().siblings(".pic_hidden"));
            })
            $(".pic_hidden").on("click",function(){
                $(this).hide();
            })
        }
    })
})

