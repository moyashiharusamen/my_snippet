var screenCanvas, info;
var run = true;
var fps =  1000 / 30;
var mouse =  new Point();
var ctx;


window.onload = function(){
  screenCanvas = document.getElementById('screen');
  screenCanvas.width = 256;
  screenCanvas.height = 256;

  ctx = screenCanvas.getContext('2d');

  screenCanvas.addEventListener('mousemove', mouseMove, true);
  window.addEventListener('keydown', keyDown, true);

  info = document.getElementById('info');

  (function(){
    info.innerHTML = mouse.x + ' : ' + mouse.y;

    ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 0, 100, 0.75)';
    ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2, false);
    ctx.fill();

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
