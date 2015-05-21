//=========获取验证码按钮配置=============
//
;(function ($) {
	$(function(){
		var trigger = $('[role="get-vericode"]');
		if(trigger.length == 0) return false;
		trigger.on('click',function(){
			var $this = $(this);
			if($this.hasClass('disabled')) return;
			var flag = trigger.attr('seconds') ? parseInt(trigger.attr('seconds')) : 30;
			$this.addClass('disabled');
			$this.html(flag + '秒后重新获取');
			var timing = setInterval(function(){
				if(flag <= 0){
					$this.removeClass('disabled');
					$this.html('获取验证码');
					clearInterval(timing);
					timing = null;
				}else{
					flag--;
					$this.html(flag + '秒后重新获取');
				}
			},1000);
			var postUrl = $this.attr('_action') || '';
			var data = {},country_code = $this.attr('country_code');
			data.phone = $this.attr('phone');
			data.country_code = country_code || '+86';
			$.post(postUrl,data,function(dat){
				$.showTip(dat.em);
			},'json');
		});
	})
})(window.jQuery || window.Zepto);