const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const paddleHeight = 10;
const paddleWidth = 0;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
const paddlespeed = 10;
const balls = [];
getballs()

var interval = setInterval(draw, 10);


function getballs() {
  balls.splice(0, balls.length)
  for (let i = 0; i < document.getElementById('nbballs').value; i++) {
    balls.push({
      ballRadius: ranint(15, 25),
      x: ranint(20, canvas.width-20),
      y: canvas.height - 200,
      dx: ranReal(-5, 5),
      dy: ranReal(-5, -1),
      color: `hsl(${ranint(0, 360)}, ${ranint(50, 100)}%, ${ranint(40, 60)}%)`,
    });
  };
}

function reset() {
  getballs()
  clearInterval(interval)
  interval = setInterval(draw, 10)
}

function ranint(max, min) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

function ranReal(max, min) {
  return min + (Math.random() * (max - min + 1));
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
    rightPressed = true;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
    leftPressed = true;
  }
  else if (e.key == 'r') {
    reset()
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
    rightPressed = false;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
    leftPressed = false;
  }
}

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function detectCollisions(ball, ind) {

}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball, i) => {
    drawBall(ball);
    const collisions = detectCollisions(ball, i)
    if (ball.x + ball.dx > canvas.width - ball.ballRadius || ball.x + ball.dx < ball.ballRadius) {
      ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy < ball.ballRadius) {
      ball.dy = -ball.dy;
    }
    else if (ball.y + ball.dy > canvas.height - ball.ballRadius) {
      if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
        if (ball.y = ball.y - paddleHeight) {
          ball.dy = -ball.dy;
        }
        }
        else {
          balls.splice(i, 1)
        }
    }  
    if (balls.length <= 3) {
      setTimeout(() => {
        clearInterval(interval);
      }, 10); 
    };
    ball.x += ball.dx;
    ball.y += ball.dy;
  });
  drawPaddle();

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += paddlespeed;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= paddlespeed;
  }
}


