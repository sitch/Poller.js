(function (root, factory) {
	'use strict';
	if (typeof exports === 'object') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		root.Poller = factory();
	}
}(this, function () {
	'use strict';

	function Poller(callback, interval, context) {
		if (typeof callback !== 'function') {
			throw new Error('Poller.constructor requires the callback to be a function');
		}
		this.setInterval(interval);
		this.callback = callback;
		this.context = context || null;
		this.timeout = null;
		this.result = null;
		this.pollCount = 0;
		return this;
	}
	Poller.prototype = {
		setInterval: function (interval) {
			if (typeof interval !== 'number' && Object.prototype.toString.call(interval) !== '[object Number]') {
				throw new Error('Poller.setInterval requires the interval to be numeric');
			}
			this.interval = interval;
		},
		start: function () {
			if (!this.isRunning()) {
				this.continuePolling = true;
				this.result = this.callback.call(this.context, this.result);
				this.poll();
			}
			return this;
		},
		stop: function () {
			if (this.timeout) {
				clearTimeout(this.timeout);
				this.timeout = null;
			}
			this.continuePolling = false;
			return this;
		},
		restart: function () {
			if (this.isRunning()) {
				this.stop();
				this.start();
			} else {
				this.start();
			}
		},
		isRunning: function () {
			return !!this.continuePolling;
		},
		updateInterval: function (interval) {
			if (this.interval !== interval) {
				this.stop();
				this.setInterval(interval);
				this.start();
			}
			return this;
		},
		poll: function () {
			var self = this;
			if (this.isRunning()) {
				this.pollCount += 1;
				this.timeout = setTimeout(function () {
					self.result = self.callback.call(self.context, self.result);
					if (self.continuePolling) {
						self.poll();
					}
				}, this.interval);
			}
		},
		getResult: function () {
			return this.result;
		}
	};
	return Poller;
}));
