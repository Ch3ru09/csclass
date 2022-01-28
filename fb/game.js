const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
var H = canvas.height = innerHeight;
var W = canvas.width = innerWidth;

var play = false;
var score = 0;

var bird = new Bird();

var background = new Image();
var background_x = 0;
var speed = 3;

function movebgr() {
  background.src = './background.png';
  background_x -= speed;

  if (background_x < -(background.width - W)) {
    background_x = 0
  } 
  ctx.beginPath();
  ctx.drawImage(background, background_x, 0, background.width, innerHeight);
  ctx.closePath();
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function keyDownHandler(e) {
  if (e.key == ' ' || e.key == 'upArrow' && bird.cool == false) {
    bird.jump = true;
    bird.cool = true;
  } else if (e.key == 'r') {
    reset();
  }
}

function keyUpHandler(e) {
  if (e.key == ' ') {  
    bird.jump = false
    bird.cool = false
  } 
}

function collision(wall, b) {
  if (wall.passed == true) return
  if (b.x+b.r < wall.x) return
  if (b.x-b.r > wall.x+wall.W && wall.passed == false) {
    score++;
    wall.passed = true;
  }

  if (detectifdeath(wall, b) == 'ded') {
    reset()
  }
}

function detectifdeath(wall, b) {
  if (b.y-b.r > wall.y && b.y+b.r < wall.y+wall.H) return

  for (let i = 0; i < 2; i++) {
    var a = i*wall.W;
    for (let j = 0; j < 2; j++){
      var dy = j*wall.H;
      if (getDist([wall.x+a, wall.y+dy], b) == true) {
        return 'ded'
      }
    }
  }
  return 'ded'
}

function getDist(point, b) {
  return Math.sqrt((point[0]-b.x)**2+(point[1]-b.y)**2) < b.r
}

function showscore() {
  ctx.beginPath();
  ctx.fillStyle = '#000';
  ctx.font = '100px Quicksand'
  ctx.fillText(String(score), 10, 110, 100)
  ctx.closePath();
}

function reset() {
  bird = new Bird()
  background = new Image();
  background_x = 0;
  speed = 3;
  walls = [];
  score = 0;
  if (play == false) {
    play = true;
    animate()
  }
}

function animate() {
  H = canvas.height = innerHeight;
  W = canvas.width = innerWidth;
  
  
  if (play == true) {
    ctx.clearRect(0, 0, W, H);
    movebgr();

    bird.update();
    createWalls();
    showscore();
    requestAnimationFrame(animate)
  }
} 

animate()