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
    this.window = $(window);
    this.$carousel = $('.jsc-carousel');
    this.$container = $('.jsc-carousel-box');
    this.$li = $('.jsc-carousel-box').find('li');
    this.$prevBtn = $('.jsc-prev-btn');
    this.$nextBtn = $('.jsc-next-btn');
    this.liLength = this.$li.length;
    this.liWidth = this.$li.outerWidth();
    this.liSize = this.liWidth * (this.liLength -1) * -1;
  },
  moveCarousel : function(){
    var _self = this;
    this.common = function(offset,liLength,containerLeft){
      //連打対策
      if (_self.$container.is(':animated')){
        return;
      }
      var positionLeft = _self.$container.position().left;

      //画像が一周しているように見せる
      if (positionLeft === liLength){
        _self.$container.css('left',containerLeft);
        positionLeft = containerLeft;
      }
      _self.$container.animate({left: positionLeft + offset}, _self.CLICK_DURATION);
    };
  },
  bindEvent : function(){
    // var _self = this;
    // this.$prevBtn.on('click',function(){
    //   _self.common(-_self.liWidth,_self.liSize,0);
    // });
    // this.$nextBtn.on('click',function(){
    //   _self.common(_self.liWidth,0,_self.liSize);
    // });
    var _self = this;
    this.window.on('resize', function(){
      var windowWidth = $(this).width();
      console.log(windowWidth);
      _self.$carousel.css('width', windowWidth);
      _self.$li.css('width', windowWidth);
      _self.$container.css('width', windowWidth * 4);
    });
  },
  setTimer : function(){
    var _self = this;
    this.timerId = setInterval(function(){
      //タイマーでnext
      _self.common(-_self.liWidth, _self.liSize, 0);
    },this.TIMER_TIMING);
  }
};
$(function(){
  MOYASHI.COMMON.SNIPPET.init();
});
