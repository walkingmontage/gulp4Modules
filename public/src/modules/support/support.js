/**
 * Created by lishuang on 14-11-21.
 */
;(function (root, factory) {
	if (typeof define === 'function' && define.amd){
		define(factory);
	}else{
		factory();
	}
}(this, function() {
	//兼容性
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(fun /* , thisp */) {
			var len = this.length;

			if (typeof fun != "function")
				throw new TypeError();

			var thisp = arguments[1];
			for ( var i = 0; i < len; i++) {
				if (i in this)
					fun.call(thisp, this[i], i, this);
			}
		};
	}
}));