const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d')
const H = canvas.height;
const W = canvas.width;
play = false;



function drawMiddle() {
  const lineWidth = 10;
  const lineSpace = 10;

  ctx.beginPath();
  ctx.lineWidth = '10';
  ctx.setLineDash([lineWidth, lineSpace]);
  ctx.strokeStyle = '#aaa'
  ctx.moveTo((W-lineWidth)/2, 7.5);
  ctx.lineTo((W-lineWidth)/2, H-7.5);
  ctx.stroke();
}

var paddles, mainBall, balls, timer, points;
var pauseCooldown = false;
var text = 'Game Paused'

function Paddle(i) {
  this.pW = 25;
  this.pH = 200;
  this.pSpeed = 20;
  this.downPressed = false;
  this.upPressed = false;
  this.fPressed = false;
  this.backPressed = false;
  this.slowPressed = false;
  this.cooldown = 0;

  this.y = (H-this.pH)/2;
  i == 0 ? this.x = 5: this.x = W-this.pW-5;

  this.draw = () => {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.pW, this.pH);
    ctx.fillStyle = "#eaa";
    ctx.fill();
    ctx.closePath();
  }
  
  this.update = () => {
    if (this.upPressed && this.downPressed) {}
    else {
      this.slowPressed == false
        ? this.pSpeed = 20
        : this.pSpeed = 7;
      if (this.upPressed) {
        if (this.y-this.pSpeed > 5) {  
          this.y -= this.pSpeed;
        } else {
          this.y = 5;
        }
      } else if (this.downPressed) {
        if (this.y+this.pSpeed+this.pH < H-5) {  
          this.y += this.pSpeed;
        } else {
          this.y = H-this.pH-5;
        }
      }
    }
    
    this.draw();
  }
}

function Ball() {
  this.x = W/2 + 10;
  this.y = H/2;
  this.r = 20;
  this.dx = 5;
  this.dy = 5 * ((ranint(0, 1)*2)-1);

  this.death = new Sound('sounds/deathExplosion.wav')
  this.bounce = new Sound('sounds/wallBounce.wav')

  this.draw = () => {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.r, this.r);
    ctx.fillStyle = '#eee';
    ctx.fill();
    ctx.closePath();
  }

  this.update = () => {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x > W) {
      this.x = W/2 - this.r - 5;
      this.dx *= -1;
      this.death.play();
      points[0]++;
    } else if (this.x < 0) {
      this.x = W/2 + this.r + 5;
      this.dx *= -1;
      this.death.play();
      points[1]++;
    }
    if (this.y > H - this.r) {
      this.y = H-this.r;
      this.dy *= -1;
      this.bounce.play();
    } else if (this.y < 0) {
      this.y = 0;
      this.dy *= -1;
      this.bounce.play();
    }

    this.draw();
  }
}

function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = () => {
    this.sound.play();
  }
  this.stop = () => {
    this.sound.pause();
  }
}

function ranint(min, max) {
  return min + Math.floor(Math.random()*(max-min+1))
}

function positionCheck(b, p) {
  if (b.x+b.dx<p.pW+5) {
    handleCollision(b, paddles[0])
  } else if (b.x+b.dx+b.r>W-p.pW-5) {
    handleCollision(b, paddles[1])
  }
}

function handleCollision(b, p) {
  if (b.y+b.r < p.y || b.y > p.y+p.pH) return
  if (p.x < W/2) {
    b.x = p.x+p.pW;
    bounce(b, p);
  } else if (p.x > W/2) {
    b.x = p.x-b.r;
    bounce(b, p);
  }
}

function bounce(b, p) {
  if (b.y+(b.r/2) == p.y+(p.pH/2)) {
    b.dy = 0;
    b.dx = -(b.dx/Math.abs(b.dx)) * 5;
  } else if (b.y+(b.r/2) < p.y+(p.pH/2)) {
    let a = Math.max(b.y-p.y, 0.01);
    let c = Math.max(p.pH/2, 0.01);
    b.dy = Math.abs(b.dy) * -1
    b.dx *= -1
  } else if (b.y+(b.r/2) > p.y+(p.pH/2)) {
    let a = Math.max(b.y-(p.pH+p.y, 0.01));
    let c = Math.max(p.pH/2, 0.01);
    b.dy = Math.abs(b.dy)
    b.dx *= -1
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == 'w') {
    paddles[0].upPressed = true;
  } else if (e.key == 's') {
    paddles[0].downPressed = true;
  } else if (e.key == 'a') {
    paddles[0].backPressed = true;
  } else if (e.key == 'd') {
    paddles[0].fPressed = true;
  } else if (e.key == 'f') {
    paddles[0].slowPressed = true;
  } else if (e.key == 'r') {
    reset()
  } else if (e.key == 'p') {
    pause()
  }

  if (e.key == 'Up' || e.key == 'ArrowUp') {
    paddles[1].upPressed = true;
  } else if (e.key == 'Down' || e.key == 'ArrowDown') {
    paddles[1].downPressed = true;
  } else if (e.key == 'Right' || e.key == 'ArrowRight') {
    paddles[1].backPressed = true;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    paddles[1].fPressed = true;
  } else if (e.key == 'Shift') {
    paddles[1].slowPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == 'w') {
    paddles[0].upPressed = false;
  } else if (e.key == 's') {
    paddles[0].downPressed = false;
  } else if (e.key == 'a') {
    paddles[0].backPressed = false;
  } else if (e.key == 'd') {
    paddles[0].fPressed = false;
  } else if (e.key == 'f') {
    paddles[0].slowPressed = false;
  }

  if (e.key == 'Up' || e.key == 'ArrowUp') {
    paddles[1].upPressed = false;
  } else if (e.key == 'Down' || e.key == 'ArrowDown') {
    paddles[1].downPressed = false;
  } else if (e.key == 'Right' || e.key == 'ArrowRight') {
    paddles[1].backPressed = false;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    paddles[1].fPressed = false;
  } else if (e.key == 'Shift') {
    paddles[1].slowPressed = false;
  }
}

function pause() {
  play ? play = false : unpause();
}

function unpause() {
  if (pauseCooldown == true) return
  pauseCooldown = true
  let t = 3;
  const countdown = () => {
    play = false;
    text = t;
    animate();
    t--;
  }
  countdown()
  timer = setInterval(countdown, 1000);
  setTimeout(() => {
    play = true;
    clearInterval(timer);
    text = "Game Paused";
    pauseCooldown = false;
    animate();
  }, 2999)
  
}

function pausedGraphics() {
  var soundDown = new Sound('sounds/count.wav')
  if(text != 'Game Paused') {
    ctx.clearRect(0, 0, W, H);
    paddles.forEach(p => {
      p.draw();
    })
    drawMiddle();
    mainBall.draw()
    soundDown.play()
  }
  ctx.rect(0, 0, W, H);
  ctx.fillStyle = "rgba(30, 30, 30, 0.8)";
  ctx.fill();
  ctx.font = "100px Quicksand";
  ctx.fillStyle = "#eee";
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width/2, canvas.height/2+25);
}

function reset() {
  paddles = [];
  mainBall = new Ball();
  balls = [];
  points = [0, 0]
  for (let i = 0; i < 2; i++) {
    paddles.push(new Paddle(i))
  }
  if (play == false) {
    play = true;
    animate()
  }
}

function animate() {
  if (play == true) {
    ctx.clearRect(0, 0 , W, H);
    paddles.forEach(p => {
      p.update();
    })
    points.forEach(p => {

    })
    drawMiddle();

    positionCheck(mainBall, paddles[0]);
    mainBall.update();

    requestAnimationFrame(animate);
  } else {
    pausedGraphics();
  }
} 

reset()