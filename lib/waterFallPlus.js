function waterFallPlus(dom,option){
	var _this = dom;
	if(option){
		var defaultValue={
		"padding":option.padding || 20,
		"col":option.col || 2
		}
	}
	var childrens = _this.children;
	var totalWidth = _this.offsetWidth;
	var singleWidth = (totalWidth-defaultValue.padding*(defaultValue.col+1))/defaultValue.col;
	var heightArr = [];
	for(var i=0; i<childrens.length; i++){
		childrens[i].style.width = singleWidth+"px";
	}
	setTimeout(function(){
		for(var i=0; i<childrens.length; i++){
			if(i < defaultValue.col){
				childrens[i].style.top=0;
				childrens[i].style.left=defaultValue.padding+(singleWidth+defaultValue.padding)*i+"px";
				heightArr[i] = childrens[i].offsetHeight;
			}else{
				var minCol = 0;
				for(var j=0; j<heightArr.length; j++){
					if(heightArr[minCol]>heightArr[j]){
						minCol = j;
					}
				}
				childrens[i].style.top=heightArr[minCol] + defaultValue.padding+"px";
				childrens[i].style.left=defaultValue.padding+(singleWidth+defaultValue.padding)*minCol+"px";
				heightArr[minCol] = heightArr[minCol] + childrens[i].offsetHeight + defaultValue.padding;
			}
		}
	},100);
//	// 加入定时器,防止出现以下错误:::图片还没定位完,大盒子高度已经计算完毕
	setTimeout(function(){
		var maxCol = 0;
		for(var i=0; i<heightArr.length; i++){
			if(heightArr[maxCol]<heightArr[i]){
				maxCol = i;
			}
		}
		_this.style.height=heightArr[maxCol]+defaultValue.padding+"px";
	}, 150);
}