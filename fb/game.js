const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
var H = canvas.height = 790/*Math.min(innerHeight, 790)*/;
var W = canvas.width = innerWidth;

var play = true;
let pause = false;
var score = 0;

var bird = new Bird();

var background = new Image();
var background_x = 0;
var speed = 3;

var hitboxes = true;

let dc = 2;

function movebgr() {
  background.src = './assets/background.png';
  background_x -= speed;
  temp = Math.max(H/700, 11/10)
  if (W > background_x+background.width/temp) {
    background_x = 0
  } 
  ctx.beginPath();
  
  ctx.drawImage(background, background_x, H-background.height/temp, background.width/temp, background.height/temp);
  ctx.closePath();
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function keyDownHandler(e) {
  if (bird.cool == false && e.key == ' ' || e.key == 'ArrowUp') {
    bird.jump = true;
    bird.cool = true;
  } else if (e.key == 'Shift') {
    bird.superjump = true;
  } else if (e.key == 'r') {
    reset();
  }
}

function keyUpHandler(e) {
  if (e.key == ' ' || e.key == 'ArrowUp') {  
    bird.jump = false;
    bird.cool = false;
  } else if (e.key == 'Shift') {
    bird.superjump = false;
  } 
}

function collision(wall, b) {
  if (wall.passed == true) return
  if (b.x+b.r < wall.x) return
  if (b.x-b.r > wall.x+wall.W && wall.passed == false) {
    score++;
    wall.passed = true;
  }
  const isDeath = detectifdeath(wall, b)
  if (isDeath && isDeath[0] == 'ded') {
    // ctx.clearRect(0, 0, W, H)
    // movebgr()
    // bird.update()
    // walls.forEach(w => {
    //   w.draw()
    // })
    isDeath[1].color = '#f00'
    isDeath[1].draw();
    ded()
    return
  }
  return
}

function ded() {
  if (dc == 0) {
    play = false;
    dc = 1;
    return
  } else {
    dc--
    ded()
  }
}

function detectifdeath(wall, b) {
  if (b.y-b.r > wall.y && b.y+b.r < wall.y+wall.H) return

  for (let i = 0; i < 2; i++) {
    var a = i*wall.W;
    for (let j = 0; j < 2; j++){
      var dy = j*wall.H;
      if (getDist([wall.x+a, wall.y+dy], b) == true) {
        return ['ded', wall]
      }
    }
  }
  return ['ded', wall]
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
  dc = 0;
  if (play == false) {
    play = true;
    animate()
  }
}

function animate() {
  H = canvas.height = Math.min(innerHeight, 790);
  W = canvas.width = innerWidth;
  
  
  if (pause == false) {
    ctx.clearRect(0, 0, W, H);
    movebgr();

    createWalls();
    if (play == true) {
      bird.update();
    } else {
      bird.draw()
    }
    
    showscore();
    if (play == true) {
      requestAnimationFrame(animate)
    } 
  }
} 

animate()