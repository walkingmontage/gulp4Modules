require.config({
	paths: {
		zepto: 'src/zepto/zepto.1.1.6.min',
		mDialog:'src/modules/mDialog/mDialog',
		mHistory:'src/modules/mHistory/mHistory',
		popup: 'src/modules/popup/popup'
	}
});
require(['zepto', 'mDialog'], function($){
	$(function(){
		$('#btn-1').on('click', function(){
			$.showTip('这是一个提示');
		});

		$('#btn-2').on('click', function(){
			$.alert({
				content:'这是一个提示',
				callback:function(){},
				title:'标题',
				btn:'按钮文本'
			});
		});

		$('#btn-3').on('click', function(){
			$.confirm({
				content:'这是一个提示',
        callback:function(){},
				title:'标题',
				btn1:'左边按钮文本',
				btn2:'右边按钮文本'
			});
		});

		$('#btn-4').on('click', function() {
			$.showOptions({
				option: ['选项1', '选项2'],
				value: [1, 2],
				callback: function (option) {
					alert(option)
				}
			});
		});
	});
});