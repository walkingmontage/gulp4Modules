require.config({
	paths: {
		zepto: 'src/zepto/zepto.1.1.6.min',
		popup: 'src/modules/popup/popup',
		loading: 'src/modules/loading/loading'
	}
});
require(['zepto', 'loading'], function($){
	$(function(){
		$.showLoading();

		setTimeout(function(){
			$.hideLoading();
		}, 2000)
	});
});