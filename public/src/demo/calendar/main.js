require.config({
	paths: {
		zepto: 'src/zepto/zepto.1.1.6.min',
		mHistory:'src/modules/mHistory/mHistory',
		calendar:'src/modules/calendar/calendar'
	}
});
require(['zepto', 'calendar'], function($){
	$(function(){

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
		//cal.init();
	});
})