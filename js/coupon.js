/**
 * Created by kevin on 2016/11/7.
 */
$(function(){
    $.ajax({
        url:"http://192.168.37.76:9090/api/getcoupon",
        success:function(result){
            var html=template("coupon_temp",result);
            $(".coupon_box").html(html);
        }
    })
})