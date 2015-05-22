/**
 * Created by linzhusong on 5/21/15.
 */

require.config({
	paths: {
		zepto: 'src/zepto/zepto.1.1.6.min',
		mCookie: 'src/modules/mCookie/mCookie',
		mQuery: 'src/modules/mQuery/mQuery'
	}
});
require(['zepto', 'mCookie', 'mQuery'], function($, mCookie, mQuery){
	$(function(){

		//mCookie test
		console.log(Object.keys(mCookie));


		//mQuery test
		var str = '?name=hello&age=123&tel=13812345678';
		console.log(mQuery.normalize(str))
		console.log(mQuery.parse(str));
		console.log(mQuery.serialize({
			name: 'hello',
			age: 123,
			tel: 13812345678
		}))
	})
});