/**
 * Created by Administrator on 2016/8/18.
 */
/**
 * 获得标签之间的文本信息
 * @param element
 * @returns {string}
 */
function getText(element){  // 形参   起占位的作用
    if(typeof element.innerText =="string"){ // 0,NaN,"",Null,undefined,false   Boolean()
        return element.innerText; // IE8及之前的版本的浏览器支持的方式
    }else {
        return  element.textContent;//火狐的早期版本的浏览器支持的
    }
}

/**
 * 设置标签之间的文本信息
 * @param element
 * @param value
 */
function setText(element,value){
    // 有时候获得的内容有可能是“”
    if(typeof element.innerText =="string"){ // IE8及之前的版本的浏览器支持的方式
        element.innerText = value;
    }else {
        element.textContent = value;
    }
}

var text = {
    getText:function(element){
        if(typeof element.innerText =="string"){ // 0,NaN,"",Null,undefined,false   Boolean()
            return element.innerText; // IE8及之前的版本的浏览器支持的方式
        }else {
            return  element.textContent;//火狐的早期版本的浏览器支持的
        }
    },
    setText:function(element,value){
        // 有时候获得的内容有可能是“”
        if(typeof element.innerText =="string"){ // IE8及之前的版本的浏览器支持的方式
            element.innerText = value;
        }else {
            element.textContent = value;
        }
    }
}


/**
 * 封装了一个兼容各浏览器版本的获得上一个标签节点的函数
 * @param element
 * @returns {*}
 */
function getPreviousElement(element){
    if(element.previousElementSibling){
        return element.previousElementSibling;//直接将获取到的上一个标签节点返回
    }else {
        // 如果进入到else里面来了，就说明不支持previousElementSibling，而只能用所有的流利 器都支持的previousSibling来获得上一个节点
        var ele = element.previousSibling;//获得当前标签对象的上一个节点
        while(ele&&ele.nodeType !==1){
            ele = ele.previousSibling;
        }
        return ele;//将找到的标签节点返回
    }
}

// 用函数来解决兼容性的问题
/**
 * 封装了一个兼容各浏览器版本的获得下一个标签节点的函数
 * @param element
 * @returns {*}
 */
function getNextElement(element){
    if(element.nextElementSibling){  // 如果当前浏览器支持使用nextElementSibling来获得下一个标签节点
        return element.nextElementSibling;//将获得到的下一个标签节点对象返回
    }else{ // 进入到else里面的话，说明不支持nextElementSibling来获得下一个标签节点，这个时候就得使用所有浏览器都支持nextSibling来获得当前标签的下一个节点
        var ele = element.nextSibling;//先拿到当前对象的下一个兄弟姊妹节点
        while(ele && ele.nodeType !==1){ // 第一个ele的意思，就是首先要确保有这个对象 ，第二个就是当前的节点类型不是标签
            ele= ele.nextSibling;
        }
        return ele; // 将获得的标签节点返回
    }
}

/**
 * 封装了一个兼容各版本浏览器的获得第一个子标签节点的函数
 * @param element
 * @returns {*}
 */
function getFirstElement(element){
    if(element.firstElementChild){
        return element.firstElementChild;  // 如果当前浏览器支持这种属性的话，直接将获取到的第一个子标签节点返回
    }else{
        var ele =  element.firstChild;  // 只能用所有的浏览器都支持的方式来获得
        while(ele && ele.nodeType !==1){
            ele = ele.nextSibling;
        }
        return ele;
    }
}

/**
 * 封装了一个兼容各版本浏览器的获得最后一个子标签节点的函数
 * @param element
 * @returns {*}
 */
function getLastElement(element){
    if(element.lastElementChild){ //如果当前浏览器支持lastElementChild来获得第一个子标签节点的话，
        return element.lastElementChild;
    }else{
        var ele = element.lastChild;//所有浏览器都支持的方式
        while(ele&&ele.nodeType!==1){
            ele=  ele.previousSibling;
        }
        return ele;
    }
}
// 对象的作用：
    // 对象可以帮助我们封装一组数据
    // 对象可以帮助我们描述一些事物

var elementNode = {
    getPreviousElement:function(element){
        if(element.previousElementSibling){
            return element.previousElementSibling;//直接将获取到的上一个标签节点返回
        }else {
            // 如果进入到else里面来了，就说明不支持previousElementSibling，而只能用所有的流利 器都支持的previousSibling来获得上一个节点
            var ele = element.previousSibling;//获得当前标签对象的上一个节点
            while(ele&&ele.nodeType !==1){
                ele = ele.previousSibling;
            }
            return ele;//将找到的标签节点返回
        }
    },
    getNextElement:function(element){
        if(element.nextElementSibling){  // 如果当前浏览器支持使用nextElementSibling来获得下一个标签节点
            return element.nextElementSibling;//将获得到的下一个标签节点对象返回
        }else{ // 进入到else里面的话，说明不支持nextElementSibling来获得下一个标签节点，这个时候就得使用所有浏览器都支持nextSibling来获得当前标签的下一个节点
            var ele = element.nextSibling;//先拿到当前对象的下一个兄弟姊妹节点
            while(ele && ele.nodeType !==1){ // 第一个ele的意思，就是首先要确保有这个对象 ，第二个就是当前的节点类型不是标签
                ele= ele.nextSibling;
            }
            return ele; // 将获得的标签节点返回
        }
    },
    getFirstElement:function(element){
        if(element.firstElementChild){
            return element.firstElementChild;  // 如果当前浏览器支持这种属性的话，直接将获取到的第一个子标签节点返回
        }else{
            var ele =  element.firstChild;  // 只能用所有的浏览器都支持的方式来获得
            while(ele && ele.nodeType !==1){
                ele = ele.nextSibling;
            }
            return ele;
        }
    },
    getLastElement:function(element){
        if(element.nextElementSibling){  // 如果当前浏览器支持使用nextElementSibling来获得下一个标签节点
            return element.nextElementSibling;//将获得到的下一个标签节点对象返回
        }else{ // 进入到else里面的话，说明不支持nextElementSibling来获得下一个标签节点，这个时候就得使用所有浏览器都支持nextSibling来获得当前标签的下一个节点
            var ele = element.nextSibling;//先拿到当前对象的下一个兄弟姊妹节点
            while(ele && ele.nodeType !==1){ // 第一个ele的意思，就是首先要确保有这个对象 ，第二个就是当前的节点类型不是标签
                ele= ele.nextSibling;
            }
            return ele; // 将获得的标签节点返回
        }
    }

}

function $$(id){
    return document.getElementById(id);
}




