/**
 * Created by lishuang on 14-11-21.
 */
;(function (root, factory) {
	if (typeof define === 'function' && define.amd){
		define(factory);
	}else{
		root.mClone = factory();
	}
}(this, function() {

	// A clone method
	// http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
	return function (obj) {
		var copy;
		if (null == obj || "object" != typeof obj) return obj;
		if (obj instanceof Date) {
			copy = new Date();
			copy.setTime(obj.getTime());
			return copy;
		}
		if (obj instanceof Array) {
			copy = [];
			for (var i = 0, len = obj.length; i < len; i++) {
				copy[i] = mClone(obj[i]);
			}
			return copy;
		}
		if (obj instanceof Object) {
			copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = mClone(obj[attr]);
			}
			return copy;
		}

		throw new Error("Unable to copy obj! Its type isn't supported.");
	}
}));