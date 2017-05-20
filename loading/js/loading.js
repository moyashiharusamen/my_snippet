var MOYASHI = MOYASHI || {};
MOYASHI.COMMON = {};

MOYASHI.COMMON.LOADING = {
	DELAY_TIMING : 800,
	FADE_TIMING : 600,
	init : function(){
		this.setParameters();
		this.loadScreen();
	},
	setParameters : function(){
		this.window = $(window);
		this.$loadBg = $('.load-bg');
		this.$loader = $('.loader');
	},
	loadScreen : function(){
		var _self = this;
		var windowHeight = this.window.height();
		this.$loadBg.height(windowHeight).css('display','block');
		this.window.on('load',function(){
			_self.$loadBg.delay(_self.DELAY_TIMING).fadeOut(_self.FADE_TIMING);
		})
	}
};
$(function(){
	MOYASHI.COMMON.LOADING.init();
});
