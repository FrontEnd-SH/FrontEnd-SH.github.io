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
			this.width = start;
			if(this.width >= this.max){
				 clearInterval(this.interval);
				 this.interval = null;
			} else{
				var self = this;
				this.interval = setInterval(function(){
					var width = this.width + (self.max - self.width) * .1;
						width = self.max > self.width ? self.max- self.width : self.max;
					self.setPlay(width);
				}, self.spend);
			}
		},
		reflash: function(){
			this.run();
		}
	};
	topAnimate.init();
	topAnimate.reflash();
	//set document top animate
//	$(document.body).find("a").each(function(link) {

//	});

})();