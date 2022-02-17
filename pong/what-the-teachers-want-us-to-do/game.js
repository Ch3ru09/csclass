var game = document.getElementById('game');
var ctx = game.getContext("2d");
const W = game.width;
const H = game.height;

var compteur = 0;

// to see if key pressed
var rightPressed = false;
var leftPressed = false;
var shiftPressed = false;

// is the game on or not
let play = false;

/*
  movement: 
    if mousecontrol is true, you can use the mouse
    if mousecontrol is false, use wasd or side arrows
    (can be changed)
  reset: r
  to add start: put play to false by default and create button that calls "reset()"
*/

let mousecontrol = true;

// creates new paddle
let paddle = new Paddle()





// number of balls and the array to contain them
let numballs = document.getElementById('nbballs').value
var balls = []

function ranint(min, max) {
  // returns random integer between min and max
  return min + Math.floor(Math.random()*(max-min+1))
}

function ranreal(min, max) {
  // returns random real number between min and max
  return min + (Math.random()*(max -min+1))
}

class Ball {
  constructor() {
    // random radius from 20 units to 25 units
    this.r = ranint(20, 25);
    // random position (int) within the canvas
    this.x = ranint(this.r, W-this.r);
    this.y = ranint(this.r, (H-this.r)/2);
    // random speed (float)
    this.dx = ranreal(-5, -1);
    this.dy = ranreal(1, 5) * (ranint(0, 1)*2 - 1);
    // random color
    this.color = 'hsl('+(Math.random()*360)+', 90%, 50%)';
  }
  
  
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0,2*Math.PI);
    ctx.fill();
  }
  
  update(b) {
    // updates movement
    this.x += this.dx;
    this.y += this.dy;
    // checks collisions on walls (X)
    if (this.x > W - this.r) {
      this.x = W - this.r;
      this.dx *= -1.2;
    } else if (this.x < this.r) {
      this.x = this.r;
      this.dx *= -1.2;
    }
    // checks collotions on walls (y)
    if (this.y > H - this.r) {
      // if touches bottom wall, dies
      balls.splice(b, 1, undefined)
    } else if (this.y < this.r) {
      this.y = this.r + 1;
      this.dy *= -1.2;
    }
    // self-explanatory
    this.draw();
  }
}

for(let i = 0; i < numballs; i++) {
  // creates ballss
  balls.push(new Ball())
}

// read movements
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener('mousemove', mousemoveHandler, false);

// if a key is down, it's pressed until it's released from here
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
// to here

// if mouse move
function mousemoveHandler(e) {
  paddle.mouseX = e.x;
}

// function to create paddle
function Paddle() {
  // arbitrary values for paddle width and height
  this.pW = 200;
  this.pH = 15;

  // always start at the middle (arbitrary)
  this.pX = (W - this.pW)/2;

  // movement speed of the paddle when using keys
  this.pSpeed = 20;

  // position of mouse on the screen
  this.mouseX = 0;

  // self-explanatory
  this.drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(this.pX, H - this.pH, this.pW, this.pH);
    // change colour of the paddle here (if you want)
    ctx.fillStyle = "#15ffaa";
    ctx.fill();
    ctx.closePath();
  }

  this.updatePaddle = () => {
    // checks which type of control use
    if (mousecontrol == true) {
      this.movementMouse()
    } else {
      this.movementKeyboard()
    }
    
    this.drawPaddle()
  }

  this.movementKeyboard = () => {
    // change speed or no
    shiftPressed == true
      ? this.pSpeed = 7
      : this.pSpeed  = 20

    // if both right and left are pressed, paddle doesn't move
    if (rightPressed == true && leftPressed == true) return this.drawPaddle()
    
    // movement + detect if goes into wall
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
  }

  this.movementMouse = () => {
    // moves the paddle to the position of the mouse within the canvas
    // you can use a ratio to make it so you can play on the whole screen
    // + wall detection
    this.pX = this.mouseX - (innerWidth - W + this.pW)/2;
    if (this.pX < 0) {
      this.pX = 0;
    } else if (this.pX + this.pW > W) {
      this.pX = W - this.pW;
    }
  }
}

function reset() {
  // puts everything to it's default value
  balls.splice(0, balls.length);
  // fetch number of balls
  numballs = document.getElementById('nbballs').value;
  paddle = new Paddle();
  pSpeed = 20;
  rightPressed = false;
  leftPressed = false;
  shiftPressed = false;

  // gets new balls
  for(let i = 0; i < numballs; i++) {
    balls.push(new Ball());
  }
  
  // turns the game back on
  if (play == false) {
    play = true;
    animate();
  }
}

// detects if 2 balls touch
function detectCollision(b1, b2) {
  const rsum = b1.r + b2.r ;
  const dx = b2.x - b1.x ;
  const dy = b2.y - b1.y ;
  return [rsum*rsum > dx*dx + dy*dy, rsum - Math.sqrt(dx*dx+dy*dy)]
}

function ajustPos(b1, b2, dist) {
  // don't ask me, idk either and i didn't try to know
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
  // don't ask me, idk either and i didn't try to know
  var relVel = [b2.dx - b1.dx,b2.dy - b1.dy];
  var norm = [b2.x - b1.x, b2.y - b1.y];
  var mag = Math.sqrt(norm[0]*norm[0] + norm[1]*norm[1]);
  norm = [norm[0]/mag,norm[1]/mag];
  
  var velAlongNorm = relVel[0]*norm[0] + relVel[1]*norm[1];
  if(velAlongNorm > 0)
    return;
  
  // you can change the speed of return, the closer to 0
  // the slower it'll be after a collision with another ball
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
  // if it doesn't touch the paddle, return
  if (b.y+b.dy+b.r < H-paddle.pH) return
  if (b.x+b.dx+b.r < paddle.pX) return
  if (b.x+b.dx-b.r > paddle.pX+paddle.pW) return

  // pushes it above the paddle and bouces it back
  b.y = H-paddle.pH-b.r
  b.dy *= -1
}

function animate() {
  // if false, don't animate
  if (play == false) return

  // clear the board
  ctx.clearRect(0, 0, W, H);
  // update the paddle
  paddle.updatePaddle()
  // loops through balls
  balls.forEach((ball, b) => {
    // checks if undefined
    if (ball != undefined) {

      // checks if collides with the paddle
      handlePaddleCollision(ball)

      // updates if exists
      ball.update(b)

      // checks again if exists
      if (balls[b] != undefined) {
        // takes all the balls after it since the ones 
        // before have already been calculated
        for (let i = b; i < balls.length; i++) {
          // takes ball
          ball2 = balls[i]
          // if exists or not
          if (ball2 != undefined && ball != ball2) {
            // it just works...
            var res = detectCollision(ball, ball2)
            if (res[0]) {
              ajustPos(ball, ball2, res[1])
              resolveColl(ball, ball2)
            }
          }
        }
      }
    }
  })
  // removes all dead balls
  balls = balls.filter(element => element !== undefined)
  // if lower than 3 balls -> dead 
  if (balls.length > 3 && play == true) {
    requestAnimationFrame(animate);
  } else if (play == true) {
    // draws a last frame and removing last dead ball before stopping
    ctx.clearRect(0, 0, W, H); 
    balls.forEach(b => {
      b.update()
    })
    paddle.drawPaddle();
    play = false
  }
} animate()