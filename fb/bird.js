class Bird {
  constructor() {
    this.r = 20;
    this.x = W/4;
    this.y = this.r;
    this.jump = false;
    this.cool = false;
    this.grav = -3;
    this.up = H/10;
    this.jumping = false;
    this.superjump = false;

    this.sprite = new Image()
    this.sprite.src = './assets/bird.png'
    this.ratio = [this.sprite.width/13, this.sprite.height/13]
    
    this.accel = 11/10;
    this.maxSpeed = -H/40;
  }

  draw() {
    ctx.beginPath();
    ctx.drawImage(this.sprite, this.x-this.ratio[0]/2, this.y-this.ratio[1]/2, this.ratio[0], this.ratio[1])
    if (hitboxes == true) {
      ctx.fillStyle = 'rgba(150, 0, 255, 0.6)';
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
      ctx.fill();
    }
    ctx.closePath();
  }

  update() {
    this.x = W/4
    this.up = H/10 + Math.floor(Math.max(score, 1)/5 * H/100);
    this.maxspeed = (speed+score+1)
    

    if (this.cool == true && this.superjump == true && this.jump == true) {
      this.y -= H/4;
      this.jump = false;
      this.jumping = 0;
      this.grav = -2;
      this.grav > this.maxSpeed ? this.grav *= this.accel: 1;
      this.y -= Math.max(this.grav, this.maxSpeed);
    } else if (this.jumping == 2) {
      this.jumping = 0;
      this.jump = false;
      this.grav = -2;
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
    } else if (this.y > H-this.r-71) {
      this.y = H-this.r-71;
      // -------------------
      // *** Should be Death
      // ? ded()
      // -------------------
      
      
    }
    this.x = W/4;
    this.draw();
  }
}