;(function (factory) {
	if (typeof define === 'function' && define.amd){
		define(['zepto'], factory);
	}else{
		factory(Zepto);
	}
}(function($) {

	//弹层水平垂直居中
	$.popPosition = function(popWin) {
		var scrollH = $('body').scrollTop() || $('html').scrollTop();
		//var winX = $(window).width();
		//var winY = $(window).height();
		var winX = document.documentElement.clientWidth;
		var winY = window.innerHeight || document.documentElement.clientHeight;

		var popY = popWin.height();
		var popX = popWin.width();

		var top = (winY - popY)/2 + scrollH;
		var left = (winX - popX)/2;
		popWin.css({top:top + 'px',left:left + 'px',marginTop:'-10px'});
	}


	//删除弹层
	$.hidePopUp = function() {
		var pop = $('.common-popup'),
			bottomPop = $('.common-bottom-popup');
		var wrapper = $('#transWrapper');
		if(bottomPop.length){
			bottomPop.css('bottom','-'+bottomPop.height()+'px');
		}
		if(wrapper.length > 0){
			wrapper.remove();
		}
		if(pop){
			pop.remove();
		}
	}
}));