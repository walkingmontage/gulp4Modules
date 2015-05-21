({
	appDir: '.',
	baseUrl: '.',
	dir: '.',
	optimize: 'uglify2', //none
	paths: {
		jquery: '../jquery/jquery-2.1.4.min',
		zepto: '../zepto/zepto.1.1.6.min',
		alertTextarea:'../modules/alertTextarea/alertTextarea',
		calendar:'../modules/calendar/calendar',
		captcha:'../modules/captcha/captcha',
		datePicker:'../modules/datePicker/datePicker',
		mClone:'../modules/mClone/mClone',
		mCookie:'../modules/mCookie/mCookie',
		mDialog:'../modules/mDialog/mDialog',
		mHistory:'../modules/mHistory/mHistory',
		mProgress:'../modules/mProgress/mProgress',
		mQuery:'../modules/mQuery/mQuery',
		mUploadImg:'../modules/mUploadImg/mUploadImg',
		setImageCallback:'../modules/mUploadImg/setImageCallback',
		popstateCallbackToDialog:'../modules/popstateCallbackToDialog/popstateCallbackToDialog',
		preloadImg:'../modules/preloadImg/preloadImg',
		scrollLoad:'../modules/scrollLoad/scrollLoad',
		scrollLoad_fn:'../modules/scrollLoad/scrollLoad_fn',
		showOptions:'../modules/showOptions/showOptions',
		slideOptions:'../modules/slideOptions/slideOptions',
		slideSelect:'../modules/slideSelect/slideSelect',
		support:'../modules/support/support',
		touchScroll:'../modules/touchScroll/touchScroll'
	},
	skipDirOptimize: true,
	fileExclusionRegExp: /(^\..+)|(\.(html|png|jpg|gif|less|sass|txt))|(rjs-config\.js)$/,
	noBuildTxt: true,
	modules: [
	 {
		 name: 'module-test/main'
	 },
		{
			name: 'module-test2/main'
		}
	]
})