//popstate callback 关闭弹窗
;(function (root, factory) {
	if (typeof define === 'function' && define.amd){
		define(['zepto'], factory);
	}else{
		factory(Zepto);
	}
}(window, function($) {
	window.addEventListener('popstate', function (e) {
		var wrapper = $('#transWrapper'),
			pop = $('.common-popup'),
			bottomPop = $('.common-bottom-popup');
		if (e.state && e.state.hasOwnProperty('pop') && e.state.pop == 1) {
			if (bottomPop.length) {
				bottomPop.css('bottom', '-' + bottomPop.height() + 'px');
			}
			if (wrapper.length > 0) {
				wrapper.css('display', 'none');
			}
			if (pop.length > 0) {
				pop.css('display', 'none');
			}
			if (window.popupCallback) {
				popupCallback();
			}
			// mHistory.addState({pop:0})   // only trigger once??
		}
		if (window.onpopstateCallback) {
			onpopstateCallback();
		}
	}, false);
}));