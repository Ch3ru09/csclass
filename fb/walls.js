var walls = []
class Wall {
  constructor() {
    this.H = 200;
    this.W = 100;

    this.x = W+1;
    this.y = ranint(10, H-10-71-this.H);
    this.passed = false;
    this.checked = false;
    this.color = '#000'
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = /*'rgba(255, 0, 0, 0.6)'*/ this.color;
    ctx.fillRect(this.x, 0, this.W, this.y);
    ctx.fillRect(this.x, this.y+this.H, this.W, H-this.y-this.H-71)
    ctx.closePath();
  }

  update(i) {
    this.x -= (speed+score/2+1) // *** change speed mod here
    if (this.x < -this.W) {
      walls.splice(i, 1)
    } else {
      this.draw();
    }
  }
}


function createWalls() {
  if (!walls[0]) walls.push(new Wall())
  if (walls[0].x < W-750 && walls[0].checked == false || walls.length == 0) {
    walls[0].checked = true;
    walls.splice(0, 0, new Wall());
  }
  walls.forEach((w, i) => {
    w.update(i);
    collision(w, bird)
  })
  walls = walls.filter(x => x != undefined);
}

function ranint(min, max) {
  return min + Math.floor(Math.random()*(max-min+1))
}