class Bird {
  constructor() {
    this.x = W/4;
    this.y = H/2;
    this.r = W/H * 15;
    this.jump = false;
    this.cool = false;
    this.grav = -3;
    this.up = H/15;
    this.jumping = false;
    
    this.accel = 11/10;
    this.maxSpeed = -H/60;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x = W/4
    
    if (this.jumping == 2) {
      this.jumping = 0;
    } else if (this.cool == true && this.jump == true || this.jumping > 0) {
      this.y -= this.up * (++this.jumping/6)
      this.cool = true;
    }

    // if(this.jump == true) {
    //   if (this.y-this.up-this.r < 0) {
    //     this.y = this.r
    //   } else {
    //     this.y -= this.up;
    //   }
    //   this.jump = false;
    //   this.grav = -3
    // } else {
    //   this.grav *= this.accel;
    //   this.y -= Math.max(this.grav, this.maxSpeed)
    // }
    
    if (this.y > H-this.r-61) {
      this.y = H-this.r-61;
    }
    this.draw();
  }
}