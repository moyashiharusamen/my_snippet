var MOYASHI = MOYASHI || {};
MOYASHI.COMMON = {};

MOYASHI.COMMON.UPSCROLL = {
	FADE_TIMING : 200,
	init : function(){
		this.setParameters();
		this.appearUpScroll();
	},
	setParameters : function(){
		this.window = $(window);
		this.$appearHeader = $('.jsc-header');
	},
	appearUpScroll : function(){
		var _self = this;
		var startPos = 0;
		this.window.on('scroll',function(){
			var currentPos = $(this).scrollTop();
			if(currentPos < startPos){
				_self.$appearHeader.fadeIn(_self.FADE_TIMING);
			} else {
				_self.$appearHeader.fadeOut(_self.FADE_TIMING);
			}

			startPos = currentPos;
		});
	}
};
$(function(){
	MOYASHI.COMMON.UPSCROLL.init();
});
