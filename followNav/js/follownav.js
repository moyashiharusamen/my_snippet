var MOYASHI = MOYASHI || {};
MOYASHI.COMMON = {};

MOYASHI.COMMON.FOLLOWNAV = {
	DELAY_PX : 20,
	init : function(){
		this.setParameters();
		this.bindEvent();
		this.judgemantHeight();
	},
	setParameters : function(){
		this.window = $(window);
		this.$sidemenu = $('.jsc-sidemenu');
		this.$content = $('.main-contents');
	},
	bindEvent : function(){
		var _self = this;
		this.$sidemenuTop = this.$sidemenu.offset().top;
		this.window.on('scroll',function(){
			var myself = $(this);
			_self.fixMenu(myself);
			_self.bottomControl(myself);
		});
	},
	fixMenu : function(myself){
		var windowTop = myself.scrollTop();
		var contentRight = this.$content.offset().left + this.$content.width();

		if(windowTop > this.$sidemenuTop - this.DELAY_PX){
			this.$sidemenu.addClass('fixed');

			//画面の横幅がコンテンツの横幅を下回るとfixedしたサイドメニューの挙動がおかしくなるため制御
			// this.$sidemenu.css('left', contentRight + 50);
		}else {
			this.$sidemenu.removeClass('fixed');
		}
	},
	judgemantHeight : function(){
		// ウィンドウの縦幅よりサイドメニューの縦幅が大きい場合、サイドメニューの下を画面のしたに合わせる
		var _self = this;
		this.sidemenuHeight = this.$sidemenu.height();

		this.window.on('load resize',function(){
			var windowHeight = $(this).height();

			if(windowHeight < _self.sidemenuHeight){
				_self.$sidemenu.addClass('bottom');
			}else {
				_self.$sidemenu.removeClass('bottom');
			}
		});
	},
	bottomControl : function(myself){
		var _self = this;
		var sidemenuBottom = myself.scrollTop() + this.sidemenuHeight;
		var contentBottom = this.$content.offset().top + this.$content.height();
		var windowBottom = this.window.scrollTop() + this.window.height();

		if(sidemenuBottom >= contentBottom - this.DELAY_PX) {
			var over = (sidemenuBottom - contentBottom + this.DELAY_PX) * -1;
			_self.$sidemenu.css('margin-top', over + 'px').removeClass('bottom');
		}else {
			_self.$sidemenu.css('margin-top', '0px');
		}
	}
};
$(function(){
	MOYASHI.COMMON.FOLLOWNAV.init();
});
