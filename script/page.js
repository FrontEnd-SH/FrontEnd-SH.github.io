(function() {
	"use strict";

	var topAnimate = {
		key: "_local_top_ani",
		init: function() {
			if (this.isInit) return;
			this.isInit = true;

			this.width = localStorage.getItem(this.key) || 0;
			this.max = $(document.body).width();
			this.interval = null;
			this.spend = 30;
			this.$elem = $("<div>").css({
				"background": "#78d2d8",
				"height": "5px",
				"width": 0,
				"position": "absolute",
				"top": 0,
				"left": 0
			});
			$('body').append(this.$elem);

		},
		setPlay: function(width) {
			localStorage.setItem(this.key, width);
			this.$elem.width(width);
			this.width = width;
		},
		play: function() {
			this.run(0);
		},
		run : function(start){
			  this.width = start || this.width;
			
				var self = this;
				this.interval = setInterval(function() {
					if (self.width >= self.max - 20) {
						clearInterval(self.interval);
						self.interval = null;
						self.setPlay.call(self, 0);
					} else {
						var width = self.width + (self.max - self.width) * .08;
						width = self.max > width ? width : self.max;
						self.setPlay.call(self, width);
					}
				}, self.spend);
			
		},
		reflash: function(){
			this.run();
		}
	};
	topAnimate.init();
	topAnimate.reflash();
	window.topAnimate = topAnimate;
	//set document top animate
//	$(document.body).find("a").each(function(link) {

//	});

})();