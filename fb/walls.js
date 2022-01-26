class Wall {
  constructor() {
    this.x = W+1
    this.y = ranint(10, H-10)
    this.H = 200;
    this.W = 50;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.fillRect(this.x, 0, this.W, this.y);
    ctx.fillRect(this.x, this.y+this.H, this.W, H-this.y+this.H)
  }

  update() {
    this.x -= this.speed
    this.draw();
  }
}

var cooldown = 

function createWalls() {
  cooldown -= 1
  if (cooldown == 0) {
    walls.push(new Wall)
  }
}

function ranint(min, max) {
  return min + Math.floor(Math.random()*(max-min+1))
}