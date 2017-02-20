/**
 * Created by Administrator on 2016/11/5 0005.
 */
window.onload = function () {
    var categoryid = common.getUrlParam("categoryid");
    var pageid = common.getUrlParam("pageid") | 1;
    var category = common.getUrlParam("category");

    $.ajax({
        url:'http://192.168.37.76:9090/api/getcategorybyid',
        //url: 'http://mmb.ittun.com/api/getcategorybyid',
        data: {categoryid: categoryid},
        success: function (result) {
            var html = template("currentlistTem", result);
            $("#currentlist").html(html);
            console.log(html);
        }
    })

    var totalpage = 0;

    $("#prolist_nav").html(category);
    getData(categoryid, pageid);
    function getData(categoryid, pageid) {
        $.ajax({
            url: 'http://192.168.37.76:9090/api/getproductlist',
            //url:'http://mmb.ittun.com/api/getproductlist',
            data: {categoryid: categoryid, pageid: pageid},
            success: function (result) {
                totalpage = Math.ceil(result.totalCount / result.pagesize);
                var html = template("prolistTem", result);
                $("#prolist_content").html(html);
            }
        });

    }

    var selpage = $("#selpage");

    function showPageid() {
        options = selpage.find("option");
        options.each(function () {
            $(this)[0].removeAttribute("selected");
        })
        options[pageid - 1].setAttribute("selected", "selected");
        $(".backtop").click();
    };

    setTimeout(function () {
        for (var i = 0; i < totalpage; i++) {
            var option = $("<option></option>");
            $("#selpage").append(option);
            option.val(i + 1);
            option.html((i + 1) + "/" + totalpage);
        }
        selpage.on("change", function () {
            pageid = this.value;
            getData(categoryid, pageid);
            showPageid();
        })

    }, 1000);

    var paging = document.querySelector(".paging");
    var prepage = document.querySelector("#prepage");
    var nextpage = document.querySelector("#nextpage");
    common.tap(paging, function (e) {
        if (e.target == prepage) {
            (function () {
                if (pageid == 1) {
                    alert("当前已是第一页");
                    return false;
                }
                else {
                    pageid--;
                    getData(categoryid, pageid);
                    showPageid();
                    e.preventDefault();
                    $(".backtop").click();
                }
            })();
        }
        else if (e.target == nextpage) {
            (function () {
                if (pageid == totalpage) {
                    alert("当前已是最后一页");
                    return false;
                }
                else {
                    pageid++;
                    getData(categoryid, pageid);
                    showPageid();
                    e.preventDefault();
                    $(".backtop").click();
                }
            })();
        }
    })

    var layout = document.querySelector(".prolist")
    var close = document.querySelector(".app_promotion_bar");
    common.tap(close, function (e) {
        //e.stopPropagation();
        e.target.parentNode.style.display = "none";
        layout.style.paddingBottom = "0px";
        e.preventDefault();
    });

    //筛选
    var screenBox = document.querySelector(".prolist_nav");
    var cancelscreenp = document.querySelector("#cancelscreen");
    cancelscreenp.addEventListener("click", function () {
        screen.style.display = "none";
    });
    var screen = document.querySelector(".screen");
    var cancelscreen = document.querySelector(".cancelscreen");
    var loading = document.querySelector(".loading");
    common.tap(screenBox, function () {
        screen.style.display = "block";
    });
    function getDataSc(categoryid, pageid,name) {
        $.ajax({
            url: 'http://192.168.37.76:9090/api/getproductlist',
            //url:'http://mmb.ittun.com/api/getproductlist',
            data: {categoryid: categoryid, pageid: pageid},
            success: function (result) {
                totalpage = Math.ceil(result.totalCount / result.pagesize);
                var array = result.result;
                function sortByKey(array, key) {
                    return array.sort(function(a, b) {
                        var x = parseFloat(a[key].replace(/[^0-9]/ig,""));
                        var y = parseFloat(b[key].replace(/[^0-9]/ig,""));
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    });
                }
                resultarr = sortByKey(array,name);
                var jsresultarr = JSON.stringify(resultarr);
                var jsobject =JSON.parse(jsresultarr);
                var html = template("prolistTem2",{"items":jsobject});
                $("#prolist_content").html(html);
            }
        });
        screen.style.display = "none";
        loading.style.display= "block";
        setTimeout(function(){
            $(".loading").slideUp(300);
        },800);
    }
    $("#prisc").on("click",function(){
        getDataSc(categoryid, pageid,'productPrice');
    });
    $("#volsc").on("click",function(){
        getDataSc(categoryid, pageid,'productCom');
    });
    $("#bansc").on("click",function(){
        getDataSc(categoryid, pageid,'productName');
    });
    $("#defsc").on("click",function(){
        getData(categoryid, pageid);
        screen.style.display = "none";
        loading.style.display= "block";
        setTimeout(function(){
            $(".loading").slideUp(300);
        },800);
    });
};