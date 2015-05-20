require.config({
	paths: {
		jquery: 'src/jquery/jquery-2.1.4.min',
		zepto: 'src/zepto/zepto.1.1.6.min',
		mDialog:'src/modules/mDialog/mDialog',
		mHistroy:'src/modules/mHistroy/mHistroy',
		mClone:'src/modules/mClone/mClone',
		datePicker: 'src/modules/datePicker/datePicker',
		calendar: 'src/modules/calendar/calendar'
	}
});
require(['zepto', 'mDialog', 'mClone', 'datePicker', 'calendar'], function($){
	$(function(){

		var mClone = require('mClone');
		alert(mClone);


		var calendar = require('calendar');
		var cal = new calendar({
			item: $('.calendar'),
			page:2,
			setDefault:{start:new Date(),count:3},
			setContent:{text:'今天', date:new Date()},
			callback:function(result){
				console.log(result)
			}
		});
		cal.init();

		alert('123456')
	});
});