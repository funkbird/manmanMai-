$(function(){
    function getSitenav(callBack){
        $.ajax({
            type:'get',
            url:'http://192.168.37.76:9090/api/getsitenav',
            data:{},
            success:function(result){
                callBack && callBack(result);
            }
        });
    };
    getSitenav(function(result){
       var html = template("sitenavTemp",result);
        $(".link").html(html);
    });
});