;(function($){
	$.fn.extend({
		/**
		obj 对象元素;target目标(坐标);speed 速度;slant 倾斜
		$("").slide(target,speed)  表示左右(默认)
		$("").slide(target,speed,"top")  表示上下
		$("").slide({"left":xxx,"top":xxx},speed,"slant")  表示斜线
		*/
		/*移动*/
		slide:function(target,speed,orbit){
			var obj = $(this);
			clearInterval(obj.timer);
			var LEFT,TOP,ABOUT,ABOUTL,ABOUTU;
			var UpDow = (orbit == "top") ? "top" : (orbit == "slant") ? "slant":"left"
			if(typeof target == "object"){
				LEFT = parseInt( obj.css("left"));
				TOP = parseInt( obj.css("top"));
				ABOUTL = target.left > LEFT ? speed : -speed;
				ABOUTU = target.top > TOP ? speed : -speed;
			}else{
				LEFT = parseInt( obj.css(UpDow));
				ABOUT = target > LEFT ? speed : -speed;
			}
			obj.timer = setInterval(function(){
				if(typeof target == "object"){
					if(LEFT != target.left*1 ){
						obj.css({"left":LEFT+ABOUTL+"px"});
						if(Math.abs(LEFT - target.left) < speed){
							obj.css({"left":target.left+"px"})
						}
						LEFT = parseInt( obj.css("left"));
					}
					if(TOP != target.top*1){
						obj.css({"top":TOP+ABOUTU+"px"});
						if(Math.abs(TOP - target.top) < speed){
							obj.css({"top":target.top+"px"})
							TOP = parseInt( obj.css("top"));
						}
						TOP = parseInt( obj.css("top"));
					}
					if(LEFT == parseInt( target.left ) && TOP == parseInt( target.top)){
						clearInterval(obj.timer);
					}
				}else{
					if(LEFT != target*1){
						if(orbit == "top" ){
							obj.css({"top":LEFT+ABOUT+"px"});
						}else{
							obj.css({"left":LEFT+ABOUT+"px"});
						}
						LEFT = parseInt( obj.css(UpDow));
						if(Math.abs(LEFT - target) < speed){
							if(orbit == "top"){
								obj.css({"top":target+"px"})
							}else{
								obj.css({"left":target+"px"})
							}
							clearInterval(obj.timer);
						}
					}
				}
			},17);
		},

		/*
			方法调用方式:框.waterfall(需要实现效果的元素)
			$(".box").waterfall("li")
		*/
		/*图片瀑布流*/
		waterfall:function(Child){
			var Parent = $(this);
			var ChildArr = [],ChildList,Listminheight = 0,Listmaxheight = 0,Listminindex = 0,Cols;
			//获取集合
			ChildList = $(Parent).find(Child);
			//一行显示几个
			Cols = parseInt($(Parent).width() / $(ChildList[0]).outerWidth(true));
			$(Parent).css({width:Cols*$(ChildList[0]).outerWidth(true)+"px"})
			for(var i = 0; i <ChildList.length; i++){
				if(i < Cols){
					$(ChildList[i]).css({left:i*$(ChildList[i]).outerWidth(true)+"px"});
					ChildArr.push($(ChildList[i]).outerHeight(true))
				}else{
					//获取数组中最小的数
					Listminheight = Math.min.apply(this,ChildArr);
					//获取数组中最小的数的索引
					Listminindex = getminindex(ChildArr,Listminheight);
					$(ChildList[i]).css({left:Listminindex*$(ChildList[i]).outerWidth(true)+"px"});
					$(ChildList[i]).css({top:Listminheight+"px"});
					//改变数组中最小的数
					ChildArr[Listminindex] += $(ChildList[i]).outerHeight(true);
				}
				//获取数组中最大的数
				Listmaxheight = Math.max.apply(this,ChildArr)
				$(Parent).css({height:Listmaxheight+"px"})
			}
			function getminindex(arr,minval){
				for(var i = 0; i < arr.length; i++){
					if(arr[i] == minval){
						return i;
					}
				}
			}
		}

	})
	
	
})(jQuery);