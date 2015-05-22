/**
 * Created by linzhusong on 5/21/15.
 */

require.config({
	paths: {
		zepto: 'src/zepto/zepto.1.1.6.min',
		mCookie: 'src/modules/mCookie/mCookie'
	}
});
require(['zepto', 'mCookie'], function($, mCookie){
	$(function(){
		console.log(Object.keys(mCookie))
	})
});