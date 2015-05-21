;(function (root, factory) {
	if (typeof define === 'function' && define.amd){
		define(factory);
	}else{
		root.mHistory = factory();
	}
}(window, function() {

	// A simple h5 history adpater, don't work with h4 browser & firefox(bfcache?).
	var mHistory = {
		supported: !!(window.history && window.history.pushState),
		state:  null,
		getState: function() {return mHistory.state},
		pushState: function(state, fragment) {
			state = state || null;
			mHistory.addState({pop:1});
			history.pushState(state, null, fragment);
			this.notify(state);
		},
		replaceState: function(state, fragment) {
			state = state || null;
			history.replaceState(state, null, fragment);
			this.state = state;
		},
		addState: function(state, fragment){
			// adding state to current state object and replace
			state = state || null;
			if (this.state && typeof this.state == 'object'
				&& state && typeof state == 'object') {
				for(var i in state ) { this.state[i] = state[i] }
			} else {
				this.state = state;
			}
			console.log('add')
			console.log(state)
			console.log(this.state)
			history.replaceState(this.state, null, fragment);
		},
		notify: function(state) {
			this.matcher(location.pathname + location.search, state);
		},
		start: function(matcher) {
			this.matcher = matcher;
			window.addEventListener("popstate", function(event) {
				mHistory.notify(event.state || null);
				mHistory.state = event.state || null;
			}, false);
		}
	};

	// Get the state if there is one
	mHistory.state = window.history.state || null;

	// -webkit-browser will pop a null state when init page,
	// So use timeout to get the right one

	setTimeout(function() {
		mHistory.state = window.history.state || null;
		// register a event listener so the state is changed.
		window.addEventListener("popstate", function(event) {
			mHistory.state = event.state || null;
		}, false);
	}, 100);

	return mHistory;
}));