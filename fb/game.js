const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
var H = canvas.height = innerHeight-10;
var W = canvas.width = innerWidth-10;

const play = true;

const bird = new Bird();
const background = new Image();
var background_x = 0;
var speed = 1;

function movebgr() {
  background.src = './background.png';
  background_x -= speed;

  if (background_x < -(background.width - W)) {
    background_x = 0
  } 
  ctx.beginPath();
  ctx.drawImage(background, background_x, 0, background.width, H);
  ctx.closePath();
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function keyDownHandler(e) {
  if (e.key == ' ' && bird.cool == false) {
    bird.jump = true
    bird.cool = true
  }
}

function keyUpHandler(e) {
  if (e.key == ' ') {  
    bird.jump = false
    bird.cool = false
  } 
}

function animate() {
  H = canvas.height = innerHeight-10;
  W = canvas.width = innerWidth-10;
  movebgr();

  bird.update();
  if (play == true) {
    requestAnimationFrame(animate)
  }
} animate()