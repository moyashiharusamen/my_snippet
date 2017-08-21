var screenCanvas, info;
var run = true;
var fps =  1000 / 30;
var mouse =  new Point();


window.onload = function(){
  screenCanvas = document.getElementById('screen');
  screenCanvas.width = 256;
  screenCanvas.height = 256;

  screenCanvas.addEventListener('mousemove', mouseMove, true);
  window.addEventListener('keydown', keyDown, true);

  info = document.getElementById('info');

  (function(){
    info.innerHTML = mouse.x + ' : ' + mouse.y;
    if(run) setTimeout(arguments.callee, fps);
  })();
};


function mouseMove(event){
  mouse.x = event.clientX - screenCanvas.offsetLeft;
  mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event){
  var ck = event.keycode;

  if(ck === 27) run = false;
}
