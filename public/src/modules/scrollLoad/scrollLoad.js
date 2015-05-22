//another scrollLoad,just excute one time
;(function (root, factory) {
	if (typeof define === 'function' && define.amd){
		define(['zepto'], factory);
	}else{
		factory(Zepto);
	}
}(window, function($) {
	$.scrollLoad = function (eleClass, callback, threshold) {
		var $w = $(window),
			th = threshold || 0,
			$doc = $(document),
			elems = $(eleClass),
			loaded,
			timeoutId = null; //节流


		$doc.on('scroll', function () {
			if (scrollLoad(elems) && !elems.data('loaded')) {
				elems.data('loaded', true);
				if (typeof callback === "function") callback.call(elems);
			}
		});

		if (scrollLoad(elems)) {
			$doc.trigger('scroll');
		}

		function scrollLoad(ele) {
			var $e = ele;
			// zepto don't support the pseudo filter ':hidden'
			if (!$e || !$e.length || $e.css('display') == 'none' || $e.css('visibility') == 'hidden') return false;

			var wt = $w.scrollTop(),
				wb = wt + $w.height(),
				et = $e.offset().top,
				eb = et + $e.height();

			return eb >= wt - th && et <= wb + th;
		}
	};
}));