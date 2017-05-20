var MOYASHI = MOYASHI || {};
MOYASHI.COMMON = {};

MOYASHI.COMMON.HUMBERGER = {
	init : function(){
		this.setParameters();
		this.bindEvent();
	},
	setParameters : function(){
		this.$trigger = $('.jsc-menu-btn');
		this.$nav = $('.jsc-nav');
	},
	bindEvent : function(){
		var _self = this;
		this.$trigger.on('click',function(e){
			e.preventDefault();
			_self.moveNav();
		});
	},
	moveNav : function(){
		// this.$nav.slideToggle();
		this.$nav.fadeToggle();
		this.$trigger.toggleClass('push');
	}
};
$(function(){
	MOYASHI.COMMON.HUMBERGER.init();
});
