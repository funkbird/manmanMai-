/**
 * Created by kevin on 2016/11/5.
 */
window.onload=function(){
    var index_slide=document.querySelector(".index_slide");
    common.bannerLoop(index_slide);
}
$(function(){
    $.ajax({
        url:'http://192.168.37.76:9090/api/getindexmenu',
        success:function(result){
            var result=result.result;
            var tophtml=template("index_nav_top",{"items":result});
            $(".navbox_top").html(tophtml);
        },
    })


//超值推荐
    $.ajax({
        url:'http://192.168.37.76:9090/api/getmoneyctrl',
        success:function(result){
            var result=result.result;
            var dishtml=template("discount",{items:result});
            $(".index_discount").html(dishtml);
        }
    });
})
window.onunload = function(){
    alert("unload is work");
}
//修改代码图标缩放
setTimeout(function(){
    var items = document.querySelectorAll('.menuItem');
    items[7].style.display="none";
    for(var i = 0, l = items.length; i < 7; i++) {
        items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/(l-1))*i*Math.PI)).toFixed(4) + "%";


        items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/(l-1))*i*Math.PI)).toFixed(4) + "%";
    }
    for(var i = 8, l = items.length; i < l; i++) {
        items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/(l-1))*(i-1)*Math.PI)).toFixed(4) + "%";



        items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/(l-1))*(i-1)*Math.PI)).toFixed(4) + "%";
    };
    document.querySelector('.center').onclick = function(e) {
        e.preventDefault(); document.querySelector('.circle').classList.toggle('open');
        document.querySelector(".circle").classList.toggle("blow");
        document.querySelector(".ring").classList.toggle("blow");
    };
},1000);
