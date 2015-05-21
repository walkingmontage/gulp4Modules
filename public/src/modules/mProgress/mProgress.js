// 进度条组件
;(function(window) {
	console.log('under window');
	//$(function(){
	var MoMoProgress = function(){

	}
	MoMoProgress.prototype.init = function(params){

		this.title = params.title || '正在下载';
		this.init_value = params.progress || 0;
		//创建dom结构
		var $dom = $("<div>" +
			"<div class='modal-mask'></div>" +
			"<div class='modal-bg'>" +
			"<div class='modal'>" +
			"<p class='modal-title'></p>" +
			"<p class='modal-value'></p>" +
			"<div class='long-bg'>" +
			"<div class='long-content'></div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>");
		$("body").prepend($dom);
		//显示modal-mask
		$('.modal-mask').css('display','block');
		//显示modal-bg
		$('.modal-bg').css('display','block');
		//显示modal
		$('.modal').css('display','block');
		//初始化title 以及其它自定义样式
		$('.modal-title').text(this.title);
		if(this.init_value <= 100){
			$('.modal-value').text(this.init_value + '%');
			$('.long-content').css('width',this.init_value +'%');
		}
		this.$el = $dom || '';
	}
	MoMoProgress.prototype.run = function(params){
		this.title = params.title || '正在下载';
		this.init_value = params.progress || 0;
		//run 调用一次进度条跑1%
		//this.init_long = this.init_long + 4;
		//this.init_value = this.init_value + 1;
		$('.modal-title').text(this.title);
		if(this.init_value <= 100){
			$('.modal-value').text(this.init_value + '%');
			$('.long-content').css('width',this.init_value +'%');
		}
		if(this.init_value == 100){
			this.callback();
		}
	}

	MoMoProgress.prototype.hide = function(){
		if(this.$el){
			(this.$el).hide();
		}
	}

	MoMoProgress.prototype.show = function(){
		if(this.$el){
			(this.$el).show();
		}
	}

	MoMoProgress.prototype.destroy = function(){
		if(this.$el){
			(this.$el).remove();
		}
	}


	MoMoProgress.prototype.callback = function(){
		console.info('default callback method');

	}
	window.MoMoProgress = MoMoProgress;
})(window);