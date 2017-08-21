var MOYASHI = MOYASHI || {};
MOYASHI.COMMON = {};

MOYASHI.COMMON.DRAGANDDROP = {
  init : function(){
    this.setParameters();
    this.bindEvent();
  },
  setParameters : function(){
    this.$sortableArea = $('.js-sortableArea');
    this.$sortble = $('.js-sortable');
  },
  bindEvent : function(){
    this.$sortble.sortable( {
      revert: true,
      connectWith: this.$sortble
    });
    this.$sortableArea.disableSelection();
  }
};

$(function(){
  MOYASHI.COMMON.DRAGANDDROP.init();
});
