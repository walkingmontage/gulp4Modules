// Scroll loading elements with callback
;(function (root, factory) {
	if (typeof define === 'function' && define.amd){
		define(['zepto'], factory);
	}else{
		factory(Zepto);
	}
}(window, function($) {
	$.fn.scrollLoad = function(callback, threshold) {

		var $w = $(window),
			th = threshold || 0,
			elems = this,
			loaded,
			timeoutId = null; //节流

		this.one("scrollLoad", function() {
			var $this = $(this)

			if (!$this.data('loaded') ) {
				$(this).data('loaded', true);
				if (typeof callback === "function") callback.call(this);

			}
		});

		function scrollLoad() {
			clearTimeout(timeoutId);
			timeoutId = null;

			elems = elems.filter(function(){
				// filter the element that is not loaded only.
				return !$(this).data('loaded')
			})

			timeoutId = setTimeout(function(){
				var inview = elems.filter(function() {
					var $e = $(this);
					// zepto don't support the pseudo filter ':hidden'
					if($e.css('display')=='none' || $e.css('visibility')=='hidden' ) return;

					var wt = $w.scrollTop(),
						wb = wt + $w.height(),
						et = $e.offset().top,
						eb = et + $e.height();

					return eb >= wt - th && et <= wb + th;
				});

				loaded = inview.trigger("scrollLoad")
				elems = elems.not(loaded)
			},50)
		}

		$w.on("scroll.scrollLoad resize.scrollLoad lookup.scrollLoad", scrollLoad);
		scrollLoad();
		return this;
	};
}));