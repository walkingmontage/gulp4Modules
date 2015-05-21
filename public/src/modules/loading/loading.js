;(function (factory) {
	if (typeof define === 'function' && define.amd){
		define(['zepto', 'popup'], function($){
			factory($)
		});
	}else{
		factory();
	}
}(function($) {
	//弹出loading
	$.showLoading = function() {
		var pop = $('#loadingWrapper');
		//var y = window.scrollY;
		//window.scroll(0,y);
		if(pop.length > 0){
			pop.css('display','block');
		}else{
			pop = $('<div id="loadingWrapper" class="common-loading"><img src="http://www.immomo.com/static/a2/img/loading.gif" /></div>');
			$('body').append(pop);
		}
		$.popPosition(pop);
	}

	//关闭loading
	$.hideLoading = function() {
		var pop = $('#loadingWrapper');
		pop.css('display','none');
	}
}));