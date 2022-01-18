var game = document.getElementById('game');
var ctx = game.getContext("2d");
const W = game.width;
const H = game.height;
var rightPressed = false
var leftPressed = false
var shiftPressed = false
let play = true

paddle = new Paddle()


numballs = document.getElementById('nbballs').value
balls = []



function ranint(min, max) {
  return min + Math.floor(Math.random()*(max-min+1))
}

function ranreal(min, max) {
  return min + (Math.random()*(max -min+1))
}

class Ball {
  constructor() {
    this.r = ranint(10, 15);
    this.x = ranint(this.r, W-this.r);
    this.y = ranint(this.r, (H-this.r)/2);
    this.dx = ranreal(-5, -1);
    this.dy = ranreal(1, 5) * (ranint(0, 1)*2 - 1);
    this.color = 'hsl('+(Math.random()*360)+',90%,50%)';
  }
  
  
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0,2*Math.PI);
    ctx.fill();
  }
  
  update(b) {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x > W - this.r) {
      this.x = W - this.r;
      this.dx *= -1.2;
    } else if (this.x < this.r) {
      this.x = this.r;
      this.dx *= -1.2;
    }
    if (this.y > H - this.r) {
      balls.splice(b, 1, undefined)
    } else if (this.y < this.r) {
      this.y = this.r + 1;
      this.dy *= -1.2;
    }

    this.draw();
  }
}

for(let i = 0; i < numballs; i++) {
  balls.push(new Ball())
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight" || e.key == 'd') {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == 'a') {
    leftPressed = true;
  } else if (e.key == 'Shift') {
    shiftPressed = true
  } else if (e.key == 'r') {
    reset()
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight" || e.key == 'd') {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == 'a') {
    leftPressed = false;
  } else if (e.key == 'Shift') {
    shiftPressed = false
  }
}

function Paddle() {
  this.pW = 200
  this.pH = 15
  this.pX = (W - this.pW)/2
  this.pSpeed = 20

  this.drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(this.pX, H - this.pH, this.pW, this.pH);
    ctx.fillStyle = "#15ffaa";
    ctx.fill();
    ctx.closePath();
  }

  this.updatePaddle = () => {
    shiftPressed == true
      ? this.pSpeed = 7
      : this.pSpeed  = 20
    if (rightPressed == true && leftPressed == true) return this.drawPaddle()
    
    else if (rightPressed == true) {
      if (this.pX+this.pSpeed < W-this.pW) {
        this.pX += this.pSpeed
      } else {
        this.pX = W-this.pW
      }
    } else if (leftPressed == true) {
      if (this.pX-this.pSpeed > 0) {
        this.pX -= this.pSpeed
      } else {
        this.pX = 0
      }
    }
    this.drawPaddle()
  }
}

function reset() {
  balls = []
  numballs = document.getElementById('nbballs').value
  paddle.pX = (W - paddle.pW)/2
  pSpeed = 20
  rightPressed = false
  leftPressed = false
  shiftPressed = false
  play = true
  for(let i = 0; i < numballs; i++) {
    balls.push(new Ball())
  }
  animate()
}

function detectCollision(b1, b2) {
  const rsum = b1.r + b2.r ;
  const dx = b2.x - b1.x ;
  const dy = b2.y - b1.y ;
  return [rsum*rsum > dx*dx + dy*dy, rsum - Math.sqrt(dx*dx+dy*dy)]
}

function ajustPos(b1, b2, dist) {
  const percent = 1;
  const slop = 0.01;
  var correction = (Math.max(dist - slop, 0) / (1/b1.r + 1/b2.r)) * percent;
  
  var norm = [b2.x - b1.x, b2.y - b1.y];
  var mag = Math.sqrt(norm[0]*norm[0] + norm[1]*norm[1]);
  norm = [norm[0]/mag,norm[1]/mag];
  correction = [correction*norm[0],correction*norm[1]];
  b1.x -= 1/b1.r * correction[0];
  b1.y -= 1/b1.r * correction[1];
  b2.x += 1/b2.r * correction[0];
  b2.y += 1/b2.r * correction[1];
}

function resolveColl(b1, b2) {
  var relVel = [b2.dx - b1.dx,b2.dy - b1.dy];
  var norm = [b2.x - b1.x, b2.y - b1.y];
  var mag = Math.sqrt(norm[0]*norm[0] + norm[1]*norm[1]);
  norm = [norm[0]/mag,norm[1]/mag];
  
  var velAlongNorm = relVel[0]*norm[0] + relVel[1]*norm[1];
  if(velAlongNorm > 0)
    return;
  
  var bounce = 0.5;
  var j = -(1 + bounce) * velAlongNorm;
  j /= 1/b1.r + 1/b2.r;
  
  var impulse = [j*norm[0],j*norm[1]];
  b1.dx -= 1/b1.r * impulse[0];
  b1.dy -= 1/b1.r * impulse[1];
  b2.dx += 1/b2.r * impulse[0];
  b2.dy += 1/b2.r * impulse[1];
}

function handlePaddleCollision(b) {
  if (b.y+b.dy+b.r < H-paddle.pH) return
  if (b.x+b.dx+b.r < paddle.pX) return
  if (b.x+b.dx+b.r > paddle.pX+paddle.pW) return
  // if (b.y+b.dy < H-paddle.pH && b.x+b.dx < paddle.pX && b.x+b.dx > paddle.x+paddle.pW) return

  b.y = H-paddle.pH-b.r
  b.dy *= -1
  
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  paddle.updatePaddle()
  
  balls.forEach((ball, b) => {
    if (ball != undefined) {
      ball.update(b)
      if (balls[b] != undefined) {
        balls.forEach(ball2 => {
          if (ball2 != undefined && ball != ball2) {
            var res = detectCollision(ball, ball2)
            if (res[0]) {
              ajustPos(ball, ball2, res[1])
              resolveColl(ball, ball2)
            }
          }
        })
      }
      handlePaddleCollision(ball)
    }
  })
  balls.forEach((b, i) => {
    if (b == undefined) balls.splice(i, 1)
  })
  if (balls.length > 3 && play == true) {
    requestAnimationFrame(animate);
  } else if (play == true) {
    requestAnimationFrame(animate)
    play = false
  }
} animate()