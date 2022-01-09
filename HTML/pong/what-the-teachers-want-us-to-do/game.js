var game = document.getElementById('game');
var ctx = game.getContext("2d");
const W = game.width;
const H = game.height;
const pW = 100
const pH = 15
var pX = (W - pW)/2
const pSpeed = 7
var rightPressed = false
var leftPressed = false
let play = false

numballs = document.getElementById('nbballs').value
balls = []

for(let i = 0; i < numballs; i++) {
  balls.push(new Ball())
}

function ranint(min, max) {
  return min + Math.floor(Math.random()*(max-min+1))
}

function Ball() {
  this.r = ranint(6, 12);
	this.x = ranint(r, W-r);
	this.y = ranint(r, -H+r);
	this.dx = 5;
	this.dy = 5;
	this.color = 'hsl('+(Math.random()*360)+',90%,50%)';
	
	this.draw = () => {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0,2*Math.PI);
		ctx.fill();
	} 
	
	this.update = () => {
		this.x += this.dy;
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
  }
  else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == 'a') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight" || e.key == 'd') {
    rightPressed = false;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == 'a') {
    leftPressed = false;
  }
}

function positionPaddle() {
  if (rightPressed == true || leftPressed == true) return
  
  else if (rightPressed == true) {
    
  } else if (leftPressed == true) {

  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(pX, H - pH, pW, pH);
  ctx.fillStyle = "#aaf";
  ctx.fill();
  ctx.closePath();
} 

function animate() {
  positionPaddle()
  drawPaddle();
	requestAnimationFrame(animate);
}