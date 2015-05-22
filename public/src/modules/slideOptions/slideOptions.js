//=========选择滑动列表选项=============
;(function (root, factory) {
	if (typeof define === 'function' && define.amd){
		define(['zepto'], factory);
	}else{
		factory(Zepto);
	}
}(window, function($) {
	$(function(){
		var list = $('.blue-icon-list');
		if(list.length == 0) return false;
		var box = list.parent('ul');
		var maxOp = box.attr('maxOptions');//选择数限制

		box.delegate('li','click',function(e){
			e.stopPropagation();
			if(box.attr('role') !== 'blue-icon-radio'){
				var val = $(this).attr('data-value');
				var txt = $(this).find('.blue-icon-text');
				if (window.selectBlueIconCallback) {
					selectBlueIconCallback(val,txt);
				}
			}
			if ($(this).hasClass('on')) {
				$(this).removeClass('on');
			} else {
				if (maxOp && $('.blue-icon-list.on').length >= maxOp) {
					$.showTip('最多选择'+maxOp+'项');
				} else {
					list.removeClass('on');
					$(this).addClass('on');
				}

			}
		});
	});
}));