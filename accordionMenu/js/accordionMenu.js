var $trigger = $('.js-accordion-trigger'),
    $content = $('.js-accrodion-content'),
    SLIDE_SPEED = 300;

$trigger.each(function(){
  var $openContent = $(this).next($content);

  $(this).on('click',function(event){
    event.preventDefault();
    if($content.is(':animated')){
      return;
    }
    $(this).toggleClass('open');
    $openContent.slideToggle(SLIDE_SPEED);
  });
});
