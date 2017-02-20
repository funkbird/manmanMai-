1.分页命名
分页的名字是固定的,这是首页从服务器获得的数据,大家都改好名字,如果不改的话,首页无法跳转.
比价搜索,category.html

省钱控",moneyctrl.html"

国内折扣,inlanddiscount.html

白菜价,baicaijia.html

海淘折扣,moneyctrl.html

优惠券,coupon.html

查历史价,category.html

凑单品",gsproduct.html

口碑排行,category.html

商城导航,titlehref":"sitenav.html

品牌大全,titlehref":"brandTitle.html

2.lib文件夹中common.js
lib 文件夹下的common.js中封装有一些常用方法
比如openTransition
removeTransition
setTransform
移动端点击事件tap
轮播图bannerloop方法 bannerLoop(banner)
获取url中的参数的方法getUrlParam("parameter")

//举例:比如url中的地址是index.html?id=1可以通过下面这个函数取到id=1这个数据
//var result= common.getUrlParam("id");

3.页头和页脚
页头和页脚,类名分别是.header和.footer
这两个部分的样式已经加到base.css中.大家的页面其他位置不要使用这两个类名.不然会引起冲突.
需要使用公共页头和公共页脚的同学可以直接到index.html中复制.header部分和.footer部分.
注意:.footer部分有一小段js特效,放在一个script标签中,跟在.footer后面,复制的时候不要忘了它.

4.字体图标
字体图标有下面这些,
需要用的只需要加两个类名.举例:class="icon icon-category"

.icon_category::before {/*粗列表标志*/
    content: "\e6d2";
}
.icon_back::before {/*返回上一级标志*/
    content: "\e697";
}
.icon_cart::before {/*购物车标志*/
    content: "\e698";
}
.icon_category_thin::before {/*细列表标志*/
    content: "\e699";
}
.icon_close::before {/*关闭标志*/
    content: "\e69a";
}
.icon_delete::before {/*删除标志*/
    content: "\e69d";
}
.icon_edit::before {/*写入标志*/
    content: "\e69e";
}
.icon_less::before {/*上箭头*/
    content: "\e6a5";
}
.icon_unfold::before {/*下箭头*/
    content: "\e6a6";
}
.icon_more::before {/*右箭头标志*/
    content: "\e6a7";
}
.icon_refresh::before {/*刷新标志*/
    content: "\e6aa";
}
.icon_search::before {/*搜索标志*/
    content: "\e6ac";
}
.icon_set::before {/*设置标志*/
    content: "\e6ae";
}
.icon_bad::before {/*差评标志*/
    content: "\e716";
}
.icon_refresh::before {/*刷新标志*/
    content: "\e6aa";
}
.icon_good::before {/*点赞标志*/
    content: "\e717";
}
.icon_phone::before {/*电话标志*/
    content: "\e725";
}
.icon_star_hollow::before {/*空心星星标志*/
    content: "\e66e";
}
.icon_star_solid::before {/*实心星星标志*/
    content: "\e645";
}
.icon_comment::before {/*评论标志*/
    content: "\e60b";
}
