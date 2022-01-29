class Bird {
  constructor() {
    this.x = W/4;
    this.y = H/2;
    this.r = W/H * 15;
    this.jump = false;
    this.cool = false;
    this.grav = -3;
    this.up = H/10 + Math.floor(Math.max(score, 1));
    this.jumping = false;
    this.superjump = false;
    
    this.accel = 6/5;
    this.maxSpeed = -Math.max(H/60, score+10);
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
    this.up = H/10 + Math.floor(Math.max(score, 1)/5 * H/100);
    

    if (this.cool == true && this.superjump == true && this.jump == true) {
      this.y -= H/4;
      this.jump = false;
      this.jumping = 0;
      this.grav = -3
      this.grav > this.maxSpeed ? this.grav *= this.accel: 1;
      this.y -= Math.max(this.grav, this.maxSpeed);
    } else if (this.jumping == 2) {
      this.jumping = 0;
      this.jump = false;
      this.grav = -3;
      this.grav > this.maxSpeed ? this.grav *= this.accel: 1;
      this.y -= Math.max(this.grav, this.maxSpeed); 
    } else if (this.cool == true && this.jump == true || this.jumping > 0) {
      this.y -= this.up * (++this.jumping/6)
      this.cool = true;
    } else {
      this.grav > this.maxSpeed ? this.grav *= this.accel: 1;
      this.y -= Math.max(this.grav, this.maxSpeed);
    }

    if (this.y-this.r < 0) {
      this.y = this.r;
    } else if (this.y+this.r > H) {
      this.y = H - this.r;
      // -------------------
      // *** Should be Death
      // -------------------
    }
    this.x = W/4;
    

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