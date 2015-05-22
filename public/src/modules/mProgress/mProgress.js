/**
 * 进度条组件
 * 最后修改2015/05/22 lin.zhusong
 *params:
 * @title 下载提示
 * @completedTitle 下载完成提示
 * @progress 进度值
 * @callback 下载完成回调
 * @$el 进度条html结构
 *
 * fn:
 * @run 修改进度
 * @show 显示
 * @hide 隐藏
 * @destroy 销毁
*/
;(function (root, factory) {
	if (typeof define === 'function' && define.amd){
		define(['zepto'], factory);
	}else{
		root.MoMoProgress = factory(Zepto);
	}
}(window, function($) {
	console.log('under window');
	//$(function(){
	var MoMoProgress = function(o){
		return new MoMoProgress.prototype.init(o)
	}
	MoMoProgress.prototype.init = function(params){
		$.extend(this, {
			title: '正在下载',
			completedTitle: '下载完成',
			progress: 0,
			callback: function(){
				console.info('default callback method');
			},
			$el: $("<div>" +
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
				"</div>")
		}, params)

		//创建dom结构

		$("body").prepend(this.$el);
		//显示modal-mask
		$('.modal-mask').css('display','block');
		//显示modal-bg
		$('.modal-bg').css('display','block');
		//显示modal
		$('.modal').css('display','block');
		//初始化title 以及其它自定义样式
		$('.modal-title').text(this.title);

		if(this.progress <= 100){
			$('.modal-value').text(this.progress + '%');
			$('.long-content').css('width',this.progress +'%');
		}
	}
	MoMoProgress.prototype.run = function(params){
		params.title && (this.title = params.title);
		params.progress && (this.progress = params.progress);
		//run 调用一次进度条跑1%
		//this.init_long = this.init_long + 4;
		//this.progress = this.progress + 1;
		if(this.progress >= 100){
			this.progress = 100;
			this.title = this.completedTitle;
		}
		$('.modal-title').text(this.title);
		$('.modal-value').text(this.progress + '%');
		$('.long-content').css('width',this.progress +'%');

		if(this.progress == 100){
			this.callback.call(this);
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

	MoMoProgress.prototype.init.prototype = MoMoProgress.prototype;

	//MoMoProgress.prototype.callback = function(){
	//	console.info('default callback method');
	//
	//}
	return MoMoProgress;
}));