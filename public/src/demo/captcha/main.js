require.config({
	paths: {
		zepto: 'src/zepto/zepto.1.1.6.min',
		mCooki: 'src/modules/captcha/captcha'
	}
});
require(['zepto', 'captcha'], function($){

});