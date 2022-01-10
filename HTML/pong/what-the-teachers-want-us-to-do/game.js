var game = document.getElementById('game');
var ctx = game.getContext("2d");
const W = game.width;
const H = game.height;
var rightPressed = false
var leftPressed = false
var shiftPressed = false
let play = false

paddle = new Paddle()


numballs = document.getElementById('nbballs').value
balls = []

for(let i = 0; i < numballs; i++) {
  balls.push(new Ball())
}

function ranint(min, max) {
  return min + Math.floor(Math.random()*(max-min+1))
}

function ranreal(min, max) {
  return min + (Math.random()*(max -min+1))
}

function Ball() {
  this.r = ranint(6, 12);
	this.x = ranint(this.r, W-this.r);
	this.y = ranint(this.r, (H-this.r)/2);
	this.dx = ranreal(-5, -1);
	this.dy = ranreal(-5, 5);
	this.color = 'hsl('+(Math.random()*360)+',90%,50%)';
	
	this.draw = () => {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0,2*Math.PI);
		ctx.fill();
	} 
	
	this.update = () => {
		this.x += this.dx;
		this.y += this.dy;
		if (this.x > W - this.r) {
			this.x = W - this.r;
			this.dx *= -1;
		} else if (this.x < this.r) {
			this.x = this.r;
			this.dx *= -1;
		}
		if (this.y > H - this.r) {
			this.y = H - this.r;
			this.dy *= -1;
		} else if (this.y < this.r) {
			this.y = this.r + 1;
			this.dy *= -1;
		}
		this.draw();
	}
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
  this.pW = 150
  this.pH = 15
  this.pX = (W - this.pW)/2
  this.pSpeed = 20

  this.drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(this.pX, H - this.pH, this.pW, this.pH);
    ctx.fillStyle = "#aaf";
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
  const pW = 150
  const pH = 15
  var pX = (W - pW)/2
  let pSpeed = 20
  var rightPressed = false
  var leftPressed = false
  var shiftPressed = false
  let play = false
  for(let i = 0; i < numballs; i++) {
    balls.push(new Ball())
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  paddle.updatePaddle()
  
  balls.forEach(ball => {
    ball.update()
    // balls.forEach(ball2 => {
    //   detectCollision(ball, ball2)
    //     .then(res => {
    //       if (res[0]) {
    //         ajustPos(ball, ball2, res[1])
    //         resolve(ball, ball2)
    //       }
    //     })
    // })
  })

	requestAnimationFrame(animate);
} animate()