var MOYASHI = MOYASHI || {};
MOYASHI.COMMON = {};

MOYASHI.COMMON.SNIPPET = {
	CLICK_DURATION : 800,
	TIMER_TIMING : 3000,
	init : function(){
		this.setParameters();
		this.moveCarousel();
		this.bindEvent();
		this.setTimer();
	},
	setParameters : function(){
		this.$container = $('.jsc-carousel-box');
		this.$image = $('.jsc-carousel-box').find('li');
		this.$prevBtn = $('.jsc-prev-btn');
		this.$nextBtn = $('.jsc-next-btn');
		this.number = this.$image.length;
		this.width = this.$image.width();
		this.imageSize = this.width * (this.number -1) * -1;
	},
	moveCarousel : function(){
		var _self = this;
		_self.common = function(offset,imageNumber,containerLeft){
			//連打対策
			if (_self.$container.is(':animated')){
				return;
			}
			_self.position = _self.$container.position();

			//画像が一周しているように見せる
			if (_self.position.left == imageNumber){
				_self.$container.css('left',containerLeft);
				_self.position.left = containerLeft;
			}
			_self.$container.animate({left: _self.position.left + offset}, _self.CLICK_DURATION);
		};
	},
	bindEvent : function(){
		var _self = this;
		this.$prevBtn.on('click',function(){
			_self.common(-_self.width,_self.imageSize,0);
		});
		this.$nextBtn.on('click',function(){
			_self.common(_self.width,0,_self.imageSize);
		});
	},
	setTimer : function(){
		var _self = this;
		this.timerId = setInterval(function(){
			//タイマーでnext
			_self.common(-_self.width,_self.imageSize,0);
		},this.TIMER_TIMING);
	}
};
$(function(){
	MOYASHI.COMMON.SNIPPET.init();
});
