var screenCanvas, info;
var run = true;
var fps =  1000 / 30;
var mouse =  new Point();

var ctx;
var CHARA_COLOR = "rgba(0, 0, 255, 0.75)";


window.onload = function(){
  screenCanvas = document.getElementById('screen');
  screenCanvas.width = 256;
  screenCanvas.height = 256;

  ctx = screenCanvas.getContext('2d');

  screenCanvas.addEventListener('mousemove', mouseMove, true);
  window.addEventListener('keydown', keyDown, true);

  info = document.getElementById('info');

  var chara = new Character();
  chara.init(10);

  (function(){
    info.innerHTML = mouse.x + ' : ' + mouse.y;

    ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
    ctx.beginPath();
    ctx.fillStyle = CHARA_COLOR;
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
