$(function(){
    var shop = document.querySelector("nav>ul>li:nth-child(1)");
    var area = document.querySelector("nav>ul>li:nth-child(2)");
    var price = document.querySelector("nav>ul>li:nth-child(3)");
    var select = document.querySelector("nav>.select");
    var selectUl = select.querySelector("ul");
    var selectLis = selectUl.querySelectorAll("li");
    var mainUl = document.querySelector("main>ul:first-child");
    var shopid = "0";
    var areaid = "0";
    getData();
    common.tap(shop,function(e){
        $.ajax({
            url:"http://192.168.37.76:9090/api/getgsshop",
            success:function(result){
                var html = template("selectShop",result);
                $(selectUl).html(html);
            },
            complete:function(){
                if(select.getAttribute("id")==1){
                    $(select).toggleClass("hide");
                }else{
                    $(select).removeClass("hide");
                }
                select.setAttribute("id",1);
                selectLis = selectUl.querySelectorAll("li");
                for(var i = 0 ;i<selectLis.length;i++){
                    common.tap(selectLis[i],function(e){
                        shop.querySelector("span:first-child").innerHTML = e.target.innerHTML;
                        shopid = e.target.getAttribute("class");
                        getData();
                        $(select).addClass("hide");
                    })
                }
            }
        });
    });
    common.tap(area,function(){
        $.ajax({
            url:"http://192.168.37.76:9090/api/getgsshoparea",
            success:function(result){
                var html = template("selectArea",result);
                $(selectUl).html(html);
            },
            complete:function(){
                if(select.getAttribute("id")==2){
                    $(select).toggleClass("hide");
                }else{
                    $(select).removeClass("hide");
                }
                select.setAttribute("id",2);
                select.index = 2;
                selectLis = selectUl.querySelectorAll("li");
                for(var i = 0 ;i<selectLis.length;i++){
                    common.tap(selectLis[i],function(e){
                        area.querySelector("span:first-child").innerHTML = e.target.innerHTML.split("（")[0];
                        areaid = e.target.getAttribute("class");
                        getData();
                        $(select).addClass("hide");
                    })
                }
            }
        });
    });
    common.tap(price,function(){
        $(selectUl).html("<li>全部价格</li>");
        if(select.getAttribute("id")==3){
            $(select).toggleClass("hide");
        }else{
            $(select).removeClass("hide");
        }
        select.setAttribute("id",3);
        selectLis = selectUl.querySelectorAll("li");
        for(var i = 0 ;i<selectLis.length;i++){
            common.tap(selectLis[i],function(e){
                price.querySelector("span:first-child").innerHTML = e.target.innerHTML.split("��")[0];
                $(select).addClass("hide");
            })
        }
    });
    function getData(){
        $.ajax({
            url:"http://192.168.37.76:9090/api/getgsproduct",
            data:{shopid:shopid,areaid:areaid},
            success:function(result){
                var html = template("product",result);
                mainUl.innerHTML = html;
            }
        });
    }
});
