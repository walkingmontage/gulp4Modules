;(function (root, factory) {
	if (typeof define === 'function' && define.amd){
		define(factory);
	}else{
		root.mQuery = factory();
	}
}(window, function() {
	// A simple param serializer/parser, don't work with duplicated param like '&a=1&a=2'
	// also not work with '&a[]=1&b[]=2'
	return {
		parse: function(p) {
			var q = {};
			if (p == '') {
				return q
			}
			try {
				p = this.normalize(p);
				p.substr(1).split("&").forEach(function(item) {
					q[item.split("=")[0]] = decodeURIComponent(typeof item.split("=")[1] == 'undefined' ? '' : item.split("=")[1])
				});
			} catch (err) {} finally {
				return q
			}
		},
		serialize: function(q) {
			var s = '';
			if (typeof q == 'object') {
				for (var k in q) {
					s += '&' + k + '=' + encodeURIComponent(q[k])
				}
			}
			return s;
		},
		normalize: function(u) {
			if (!/^[&?]/.test(u)) {
				u = '&' + u
			}
			return u.replace(/[&?]{1,2}/, '&')
		},
		urllize: function(u) {
			return u.replace(/[&?]{1,2}/, '?')
		}
	};
}));