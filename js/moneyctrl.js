$(function(){
    var pageid=common.getUrlParam("pageid") || 1;
    var pagesize = 0;
    var totalcount = 0;
    var pageNumber = 0;
    getPageData(pageid);
    function getPageData(pageid) {
        $.ajax({
            url:"http://192.168.37.76:9090/api/getmoneyctrl",
            data:{"pageid":pageid},
            success:function(result){
                var html = template("product",result);
                pagesize = result.pagesize;
                totalcount=result.totalCount;
                pageNumber = parseInt(totalcount/pagesize);
                $("main>ul").html(html);
            },
            complete:function(){
                var html = template("gotoPage",{"pageNumber":pageNumber,"pageid":parseInt(pageid)});
                $("#selectPage").html(html);
                $("#selectBox").on("change",function(){
                    pageid = $(this).val();
                    window.location = "moneyctrl.html?pageid="+pageid;
                })
            }
        });
    }
    var ol = document.getElementById('slippylist');
    ol.addEventListener('slip:beforereorder', function(e){
        if (/demo-no-reorder/.test(e.target.className)) {
            e.preventDefault();
        }
    }, false);

    ol.addEventListener('slip:beforeswipe', function(e){
        if (e.target.nodeName == 'INPUT' || /demo-no-swipe/.test(e.target.className)) {
            e.preventDefault();
        }
    }, false);

    ol.addEventListener('slip:beforewait', function(e){
        if (e.target.className.indexOf('instant') > -1) e.preventDefault();
    }, false);

    ol.addEventListener('slip:afterswipe', function(e){
        e.target.parentNode.appendChild(e.target);
    }, false);

    ol.addEventListener('slip:reorder', function(e){
        e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
        return false;
    }, false);

    new Slip(ol);
})
