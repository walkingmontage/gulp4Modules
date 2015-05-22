//预加载图片
;(function (root, factory) {
	if (typeof define === 'function' && define.amd){
		define(['zepto'], factory);
	}else{
		factory(Zepto);
	}
}(window, function($) {
	$(function(){
		var html = '<link rel="prefetch" href="http://www.immomo.com/static/m4/img/loading.gif"/>' //loading图片
		$('head').append($(html));
	})

}));