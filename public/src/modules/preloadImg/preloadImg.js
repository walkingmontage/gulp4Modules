//预加载图片

;(function ($) {
	$(function(){
		var html = '<link rel="prefetch" href="http://www.immomo.com/static/m4/img/loading.gif"/>' //loading图片
		$('head').append($(html));
	})

})(window.jQuery || window.Zepto);