$(function(){
    var getData=function(callback){
        $.ajax({
            type:"get",
            data:{},
            url:"http://192.168.37.76:9090/api/getcategorytitle",
            success:function(result){
                callback&&callback(result);
            }
        });
    };
    function render(){
        getData(function(result){
            var html=template("cateTitleTemp",result,{titleid:"titleid"});
            $(".category").html(html);
        });
    };

        render();

     num=0;
    var getDetial=function(callback){
        $.ajax({
            type:"get",
            data:{"titleid":x},
            url:"http://192.168.37.76:9090/api/getcategory",
            success:function(result){
                num=result.result.length;
                callback&&callback(result);
            }
        });

    };
    function renderD(x){
        getDetial(function(result){
            var html=template("detialTemp",result);
            $(".categoryTitle")[x].innerHTML+=html;
        });
    };
        for(var x=0 ;x<8;x++){
            renderD(x);
        }
    var cateTite=$(".categoryTitle");
    var detial=$(".detial");
    common.tap($(".category")[0],function(event){
        event.target.parentNode.classList.toggle("active");
        event.target.parentNode.parentNode.classList.toggle("active");
        $(event.target.parentNode).siblings().removeClass("active");
    });
});
