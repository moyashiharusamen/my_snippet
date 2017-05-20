var MOYASHI = MOYASHI || {};
MOYASHI.COMMON = {};

MOYASHI.COMMON.DIASNOSIS = {
  BAR_DURATION : 800,
  init : function(){
    this.setParameters();
    this.bindEvent();
  },
  setParameters : function(){
    this.$disgnosis = $('.js-diagnosis');
    this.$diagnosisList = this.$disgnosis.find('li');
    this.$btn = $('.js-btn-box').find('a');
    this.$result = $('.js-result');
    this.$resultList = this.$result.find('li');
    this.$prevBtn = $('.js-prev-btn');
    this.jumpRoute = [];
    this.$returnBtn = $('.js-return-btn');
    this.$status = $('.js-current-status');
  },
  bindEvent : function(){
    var _self = this;
    this.$btn.on('click',function(e){
      e.preventDefault();
      var myself = $(this);
      _self.jumpList(myself);
    });
    this.$prevBtn.on('click',function(e){
      e.preventDefault();
      var myself = $(this);
      _self.jumpPrev(myself);
    });
    this.$returnBtn.on('click',function(e){
      e.preventDefault();
      _self.returnList();
    });
  },
  jumpList : function(myself){
    this.jumpRoute.push(myself.data('jump'));

    var currentNumber = myself.parents('li').data('number') - 1;
    this.jumpNumber = myself.data('jump') - 1;
    this.$diagnosisList.eq(currentNumber).hide();
    this.$diagnosisList.eq(this.jumpNumber).fadeIn();

    // status bar
    if(this.jumpNumber <= 20){
      this.$status.animate({
        'width': ((this.jumpNumber + 1) * 5 ) +  '%'
      },this.BAR_DURATION);
    }
  },
  jumpPrev : function(myself){
    this.prevList = this.jumpRoute[this.jumpRoute.length - 2];
    this.currentList = this.jumpRoute[this.jumpRoute.length - 1];

    if(this.jumpRoute.length != 1){
      this.$diagnosisList.eq(this.currentList - 1).hide();
      this.$diagnosisList.eq(this.prevList - 1).fadeIn();

    } else if(this.jumpRoute.length == 1){
      this.$diagnosisList.eq(this.currentList - 1).hide();
      this.$diagnosisList.eq(0).fadeIn();
    }

    //戻った際に配列内の最後の数値を消さないと続けて戻ることが出来ない為
    this.jumpRoute.pop();

    // status bar
    if(this.jumpRoute == 0){
      this.$status.animate({
        'width': '5%'
      },this.BAR_DURATION);
    }else {
      this.$status.animate({
        'width': ((this.prevList + 1) * 5 ) +  '%'
      },this.BAR_DURATION);
    }
  },
  returnList : function(){
    this.$result.hide();
    this.jumpRoute = [];
    this.$diagnosisList.eq(0).fadeIn();

    // status bar
    this.$status.animate({
      'width': '5%'
    },this.BAR_DURATION);
  }
};
$(function(){
  MOYASHI.COMMON.DIASNOSIS.init();
});
