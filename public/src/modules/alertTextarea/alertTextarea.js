//=========文本域剩余输入字数提醒=============

;(function ($) {
	$(function(){

		var alertTextarea = $('[role="length-alert-textarea"]');
		if(alertTextarea.length == 0) return false;
		alertTextarea.each(function(){
			var maxLength = $(this).attr('maxlength');
			$(this).parents('.length-alert-textarea-wrapper').append($('<span class="textarea-alert-span">还能输入'+maxLength+'字</span>'));
		});

		alertTextarea.bind('input',function(){
			var $this = $(this);
			var alertSpan = $this.siblings('.textarea-alert-span');
			var curVal = $this.val();
			var lastLength = parseInt($this.attr('maxlength')) - curVal.length;
			if(lastLength <= 0){
				alertSpan.html('还能输入0字');
			}else{
				alertSpan.html('还能输入'+lastLength+'字');
			}
		});

	})
})(window.jQuery || window.Zepto);