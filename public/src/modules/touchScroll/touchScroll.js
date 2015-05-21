//=========触摸滑动（上下／左右）=============
(function ($) {
	$.touchScroll = function(innerId,outerId,swipe){
		if(!arguments.length) return ;
		var obj = {};
		obj.swipe = swipe || 'x';
		var inner = document.getElementById(innerId);
		var outer = outerId ? document.getElementById(outerId) : inner.parentNode;
		obj.aboveX= 0,obj.aboveY=0; // 设一个全局变量记录上一次内部块滑动的位置
		var documentWidth=$(inner).width(),//内部滑动模块的高度
			documentHeight=$(inner).height(),
			wapperWidth=$(outer).width(),
			wapperHeight=$(outer).height();
		//
		//if(obj.swipe.toUpperCase() === 'X'){
		//    inner.style.left = '0px';
		//    if(documentWidth <= wapperWidth) return false;
		//}else{
		//    inner.style.top = '0px';
		//    if(documentHeight <= wapperHeight) return false;
		//}

		function touchStart(e){//触摸开始
			e.preventDefault();
			var touch=e.touches[0];
			obj.startY = touch.pageY;   //刚触摸时的坐标
			obj.startX = touch.pageX;
		}

		function touchMove(e){//滑动
			e.preventDefault();
			var  touch = e.touches[0];
			obj.y = touch.pageY - obj.startY;//滑动的距离
			obj.x = touch.pageX - obj.startX;

			switch(obj.swipe.toUpperCase()){
				case 'X':
					obj.aboveX = obj.aboveX+obj.x;

					if(obj.x>0&&obj.aboveX>=0){//当滑动到最左端时候不能再往左滑动
						obj.aboveX = 0;
					}

					if(obj.x<0&&(obj.aboveX<=(-(documentWidth-wapperWidth)))){//当滑动到最右端时候不能再往右滑动
						obj.aboveX = -(documentWidth-wapperWidth);
					}
					//inner.style.left=left+"px";
					inner.style.webkitTransform = inner.style.transform = 'translateX('+obj.aboveX+'px)';
					break;
				case 'Y':
					obj.aboveY = obj.aboveY+obj.y;
					if(obj.y>0&&obj.aboveY>=0){//当滑动到最顶端时候不能再往上滑动
						obj.aboveY = 0;
					}

					if(obj.y<0&&(obj.aboveY<=(-(documentHeight-wapperHeight)))){//当滑动到最底部时候不能再往下滑动
						obj.aboveY = -(documentHeight-wapperHeight);
					}
					//inner.style.top=top+"px";
					inner.style.webkitTransform = inner.style.transform = 'translateY('+obj.aboveY+'px)';
					break;
			}

		}

		function touchEnd(e){//手指离开屏幕
			switch(obj.swipe.toUpperCase()){
				case 'X':
					if(obj.x>0&&obj.aboveX>0){//当滑动到最左端时候不能再往左滑动
						obj.aboveX=0;
					}

					if(obj.x<0&&(obj.aboveX<(-(documentWidth-wapperWidth)))){//当滑动到最右端时候不能再往右滑动

						obj.aboveX=-(documentWidth-wapperWidth);
					}
					inner.style.webkitTransform = inner.style.transform = 'translateX('+obj.aboveX+'px)';
					break;
				case 'Y':
					if(obj.y>0&&obj.aboveY>0){//当滑动到最顶端时候不能再往上滑动
						obj.aboveY=0;
					}
					if(obj.y<0&&(obj.aboveY<(-(documentHeight-wapperHeight)))){//当滑动到最底部时候不能再往下滑动
						obj.aboveY=-(documentHeight-wapperHeight);
					}
					inner.style.webkitTransform = inner.style.transform = 'translateY('+obj.aboveY+'px)';
					break;
			}
		}

		//outer.addEventListener('touchstart', touchStart,false);
		//outer.addEventListener('touchmove', touchMove,false);
		//outer.addEventListener('touchend', touchEnd,false);

		$(inner).bind('touchstart',function(e){
			e.preventDefault();
			var touch=e.touches[0];
			obj.startY = touch.pageY;   //刚触摸时的坐标
			obj.startX = touch.pageX;
		}).bind('touchmove',function(e){
			e.preventDefault();
			var  touch = e.touches[0];
			obj.y = touch.pageY - obj.startY;//滑动的距离
			obj.x = touch.pageX - obj.startX;

			switch(obj.swipe.toUpperCase()){
				case 'X':
					obj.aboveX = obj.aboveX+obj.x;

					if(obj.x>0&&obj.aboveX>=0){//当滑动到最左端时候不能再往左滑动
						obj.aboveX = 0;
					}

					if(obj.x<0&&(obj.aboveX<=(-(documentWidth-wapperWidth)))){//当滑动到最右端时候不能再往右滑动
						obj.aboveX = -(documentWidth-wapperWidth);
					}
					//inner.style.left=left+"px";
					inner.style.webkitTransform = inner.style.transform = 'translateX('+obj.aboveX+'px)';
					break;
				case 'Y':
					obj.aboveY = obj.aboveY+obj.y;
					if(obj.y>0&&obj.aboveY>=0){//当滑动到最顶端时候不能再往上滑动
						obj.aboveY = 0;
					}

					if(obj.y<0&&(obj.aboveY<=(-(documentHeight-wapperHeight)))){//当滑动到最底部时候不能再往下滑动
						obj.aboveY = -(documentHeight-wapperHeight);
					}
					//inner.style.top=top+"px";
					inner.style.webkitTransform = inner.style.transform = 'translateY('+obj.aboveY+'px)';
					break;
			}
		}).bind('touchend',function(){
			switch(obj.swipe.toUpperCase()){
				case 'X':
					if(obj.x>0&&obj.aboveX>0){//当滑动到最左端时候不能再往左滑动
						obj.aboveX=0;
					}

					if(obj.x<0&&(obj.aboveX<(-(documentWidth-wapperWidth)))){//当滑动到最右端时候不能再往右滑动

						obj.aboveX=-(documentWidth-wapperWidth);
					}
					inner.style.webkitTransform = inner.style.transform = 'translateX('+obj.aboveX+'px)';
					break;
				case 'Y':
					if(obj.y>0&&obj.aboveY>0){//当滑动到最顶端时候不能再往上滑动
						obj.aboveY=0;
					}
					if(obj.y<0&&(obj.aboveY<(-(documentHeight-wapperHeight)))){//当滑动到最底部时候不能再往下滑动
						obj.aboveY=-(documentHeight-wapperHeight);
					}
					inner.style.webkitTransform = inner.style.transform = 'translateY('+obj.aboveY+'px)';
					break;
			}
		})
	}
})(window.jQuery || window.Zepto);