require.config({
	paths: {
		zepto: 'src/zepto/zepto.1.1.6.min',
		mProgress:'src/modules/mProgress/mProgress'
	}
});
require(['zepto', 'mProgress'], function($, MoMoProgress){
	$(function(){

		//创建一个progress对象,通过构造函数传入自定义的显示文本
		//var progressObj = new MoMoProgress();
		var progress = 0, s;

		//通过调用init方法，初始化进度条的dom结构
		var progressObj = MoMoProgress({
			title : 'download',
			progress: 0,
			completedTitle : 'Done',
			callback: function(){
				clearInterval(s);
				setTimeout(function(){
					this.destroy();
				}.bind(this), 1000);
			}
		});

		//每次调用run方法，都会根据传递的progress参数指定当前进度（0-100）；title也可以随时更改
		s = setInterval(function(){
			progressObj.run({
				title: 'now loading',
				progress: progress += Math.floor(Math.random() * 5)
			});
		}, 100)

	});
})