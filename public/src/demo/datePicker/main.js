require.config({
	paths: {
		zepto: 'src/zepto/zepto.1.1.6.min',
		mHistory:'src/modules/mHistory/mHistory',
		datePicker:'src/modules/datePicker/datePicker'
	}
});
require(['zepto', 'datePicker'], function($){

})