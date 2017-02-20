window.common = {
    //鑾峰彇API鎺ュ彛鐨勬暟鎹?
    //鍙傛暟绫诲瀷锛歄bj锛?
    // 闇?瑕佷紶閫掔殑鍙傛暟灏辨槸api鍜宑allback鎺ュ彛璺熷洖璋冨嚱鏁?
    getApiData: function (obj) {
        var api = obj.api || '';
        var callback = obj.callback || function () {};
        var id = obj.id;
        $.ajax({
            url:api,
            data:{idTitle:id},
            success: function (result) {
                callback && callback(result);
            }
        })
    },
    openTransition:function(dom){
        dom.style.transition = "all,0.5s";
        dom.style.webkitTransition = "all,0.5s";
    },
    removeTransition:function(dom){
        dom.style.transition = "none";
        dom.style.webkitTransition = "none";
    },
    setTransform:function(dom,distance){
        dom.style.transform = "translateX("+distance+"px)";
        dom.style.webkitTransform = "translateX("+distance+"px)";
    },
    // 绉诲姩绔偣鍑讳簨浠?
    tap:function(dom,callback){
        var isMove = false;
        var startTime = null;
        dom.addEventListener("touchstart", function(e){
            startTime = Date.now();
        });
        dom.addEventListener("touchmove", function(e){
            isMove = true;
        });
        dom.addEventListener("touchend", function(e){
            if(!isMove && Date.now()-startTime<=150){
                callback && callback(e);
            }
            isMove = false;
        });
    },
    //鑾峰彇url涓殑鍙傛暟
    //涓句緥:姣斿url涓殑鍦板潃鏄痠ndex.html?id=1鍙互閫氳繃涓嬮潰杩欎釜鍑芥暟鍙栧埌id=1杩欎釜鏁版嵁
    //var result= common.getUrlParam("id");
    getUrlParam:function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //鏋勯?犱竴涓惈鏈夌洰鏍囧弬鏁扮殑姝ｅ垯琛ㄨ揪寮忓璞?
        var r = window.location.search.substr(1).match(reg);  //鍖归厤鐩爣鍙傛暟
        if (r != null) return unescape(r[2]); return null; //杩斿洖鍙傛暟鍊?
    },
//    灏佽涓?涓疆鎾浘bannerloop鏂规硶
    bannerLoop:function (banner){
        var bannerWidth = banner.offsetWidth;
        var bannerUl = banner.querySelector("ul:first-child");
        var bannerLis = bannerUl.querySelectorAll("li");
        var first = bannerLis[0].cloneNode(true);//鑾峰彇绗竴涓瓙鑺傜偣
        var last = bannerLis[bannerLis.length-1].cloneNode(true);//鑾峰彇鏈?鍚庝竴涓瓙鑺傜偣
        bannerUl.appendChild(first);//鍦ㄦ渶鍚庢坊鍔犵涓?涓瓙鑺傜偣
        bannerUl.insertBefore(last,bannerLis[0]);//鍦ㄦ渶鍓嶉潰鎻掑叆鏈?鍚庝竴涓瓙鑺傜偣
        bannerLis = bannerUl.querySelectorAll("li");//鏇存柊li鍏冪礌鍒楄〃
        var lisLength = bannerLis.length;
        bannerUl.style.width = lisLength*100+"%";//缁檜l璁剧疆瀹藉害
        bannerUl.style.transform = "translateX("+(-100/lisLength)+"%)";//璁﹗l鍋忕Щ鍒扮涓?寮犲浘鐗?
        window.addEventListener("resize",function(){
            bannerUl.style.width = lisLength*100+"%";
            bannerUl.style.transform = "translateX("+(-100/lisLength)+"%)";
            bannerWidth = banner.offsetWidth;
        });
        for(var i=0; i<bannerLis.length; i++){
            bannerLis[i].style.width = 100/bannerLis.length+"%";//缁欐瘡涓猯i璁剧疆瀹藉害
        }

        var index = 1;
        var timerId = null;
        //鍔ㄦ?佹坊鍔犲皬鍦嗙偣
        var dotsUl = banner.querySelector("ul:last-child");
        for(var i = 0; i < bannerLis.length-2; i++){
            var dotsli = document.createElement("li");
            dotsUl.appendChild(dotsli);
        }
        var dotsLis = dotsUl.children;
        dotsLis[0].classList.add("active");
        dotsUl.style.width = dotsLis.length*20+"px";
        // 鍔犲畾鏃跺櫒,杞挱鍥剧壒鏁?
        openTimer();
        // 娉ㄥ唽touch浜嬩欢
        var startX = 0;
        var moveX = 0;
        var distance = 0;
        bannerUl.addEventListener("touchstart", function(e){
            clearInterval(timerId);
            startX = e.touches[0].clientX;
        });
        bannerUl.addEventListener("touchmove",function(e){
            moveX = e.touches[0].clientX;
            distance = moveX - startX;
            common.setTransform(bannerUl,-index*bannerWidth+distance);
        });
        bannerUl.addEventListener("touchend",function(e){
            if(Math.abs(distance) >= bannerWidth/3){
                if(distance>0){
                    index--;
                    common.openTransition(bannerUl);
                    common.setTransform(bannerUl,-index*bannerWidth);
                }else{
                    index++;
                    common.openTransition(bannerUl);
                    common.setTransform(bannerUl,-index*bannerWidth);
                }
            }else{
                common.openTransition(bannerUl);
                common.setTransform(bannerUl,-index*bannerWidth);
            }
            openTimer();
        });
        bannerUl.addEventListener("transitionEnd",function(){
            if(index == 0){
                index = lisLength-2;
                common.removeTransition(bannerUl);
                common.setTransform(bannerUl,-index*bannerWidth);
            }else if(index == lisLength-1){
                index = 1;
                common.removeTransition(bannerUl);
                common.setTransform(bannerUl,-index*bannerWidth);
            }
            lisStyle()
        });
        bannerUl.addEventListener("webkitTransitionEnd",function(){
            if(index <= 0){
                index = lisLength-2;
                common.removeTransition(bannerUl);
                common.setTransform(bannerUl,-index*bannerWidth);
            }else if(index >= lisLength-1){
                index = 1;
                common.removeTransition(bannerUl);
                common.setTransform(bannerUl,-index*bannerWidth);
            }
            lisStyle()
        });
        function openTimer(){
            timerId = setInterval(function(){
                index++;
                common.openTransition(bannerUl);
                common.setTransform(bannerUl,-index*bannerWidth);
            },2000);
        }
         //瀵瑰簲鐨勫皬鍦嗙偣鍙樿壊
        function lisStyle(){
            for(var i=0;i<dotsLis.length; i++){
                dotsLis[i].classList.remove("active");
            }
            dotsLis[index-1].classList.add("active");
        }
    }

}
$(function () {
        //张玉军/header图标点击返回主页面
        $(".index_top_left").on("click",function(){
            window.location="index-real.html";
        })
        //杨康伟点击登录
        function letDivCenter(divName){
            var top = ($(window).height() - $(divName).height())/2;
            var left = ($(window).width() - $(divName).width())/2;
            var scrollTop = $(document).scrollTop();
            var scrollLeft = $(document).scrollLeft();
            $(divName).css( { position : 'absolute', 'top' : top + scrollTop, left : left + scrollLeft } ).show();
        }

        $("#login").on("click",function(){

            letDivCenter($(".login"));

        });
        $(".login>.cancel").on("click",function(){
            $(this).parent().hide();
        });

        //点击注册
        $("#regist").on("click",function(){

            letDivCenter($(".regist"));

        });
        $(".regist>.cancel").on("click",function(){
            $(this).parent().hide();
        });
        $(".backtop").on("click",function(){
            $(window).scrollTop(0);
        })

	// 夏思勇
    var userName = $("#userName");
    var pwd = $("#pwd");
    var pwd1 = $("#pwd1");
    var tel = $("#tel");
    var mail = $("#mail");
    var send = $("#sendMessage");
    //帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：
    var regUserName = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    //密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
    var regPwd = /^[a-zA-Z]\w{5,17}$/;
    //手机号码
    var regTel =/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    //邮箱验证
    var regMail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var info = $(".regist form p");
    userName.on("blur", function () {
        $.ajax({
            type:'get',
            url:'E:/www/ajax/invalidate.php',
            data:{userName:$(this).val()},
            beforeSend: function () {
                if(!regUserName.test(userName.val())) {
                    info.eq(0).html("请输入合法的用户名...")
                    return false;
                }else {
                    info.eq(0).html("").addClass("correct");
                }
            }
        })

    });
    pwd.on("blur", function () {
        if(!regPwd.test(this.value)) {
            $(this).siblings("p").eq(1).html("请输入正确格式的密码");
        }else {
            $(this).siblings("p").eq(1).html("").addClass("correct");
        }
    });
    pwd1.on("blur", function () {
        if(this.value != pwd.val()) {
            $(this).siblings("p").eq(2).html("请输入相同的密码");
        }else {
            $(this).siblings("p").eq(2).html("").addClass("correct");
        }
    });
    tel.on("blur", function () {
        if(!regTel.test(this.value)) {
            $(this).siblings("p").eq(4).html("请输入正确的电话号码");
        }else {
            $(this).siblings("p").eq(4).html("").addClass("correct");
        }
    });
    mail.on("blur", function () {
        if(!regMail.test(this.value)) {
            $(this).siblings("p").eq(3).html("请输入正确的邮箱");
        }else {
            $(this).siblings("p").eq(3).html("").addClass("correct");
        }
    })
    var isCorrect = $(".regist form p");
    var invResult = "";
    send.on("click", function () {
        invResult = true;
        var timer = null;
        for(var i = 0 ; i < isCorrect.length;i++) {
            if(!isCorrect.eq(i).hasClass("correct")) {
                invResult = false;
            }
        };
        console.log(invResult)
        if(invResult) {
            console.log(1)
            send.prop({"disabled":true});
            clearInterval(timer);
            var time = 10;
            timer = setInterval(function () {
                time--;
                send.val(time+"秒后重新发送");
                if(time==0) {
                    clearInterval(timer);
                    send.val("发送验证码");
                    send.prop({"disabled":false});
                }
            },1000)
        }
    });
    //判断是否注册成功并本地存储userName和pwd
    $("#register").on("click", function () {
        if($("#invalidate").val()=="8888") {
            alert("注册成功");
            localStorage.setItem("userName",$("#userName").val());
            localStorage.setItem("password",$("#pwd").val());
            setTimeout(function () {
                window.location = "index-real.html";
            },1000);

        }
    });
    //自动通过localsorage或许userName和pwd
    $(".login input").eq(1).val(localStorage.getItem("userName"));
    $(".login input").eq(2).val(localStorage.getItem("password"));
})