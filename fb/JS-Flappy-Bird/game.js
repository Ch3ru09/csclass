const RAD = Math.PI/180;
const screen = document.getElementById('canvas');
screen.width = innerWidth;
const W = screen.width/3;
const H = screen.height = innerHeight;
var ctx = screen.getContext("2d");

screen.tabIndex = 1;
screen.addEventListener("click", () => {
  switch (state.curr) {
    case state.getReady :
      state.curr = state.Play;
      SFX.start.play();
      break;
    case state.Play :
      bird.flap();
      break;
    case state.gameOver :
      state.curr = state.getReady;
      bird.speed = 0;
      bird.y = 100;
      pipe.pipes=[];
      UI.score.curr = 0;
      SFX.played=false;
      break;
  }
})

screen.onkeydown = function keyDown(e) {
  // *** Space Key or W key or arrow up
  if (e.keyCode == 32 || e.keyCode == 87 || e.keyCode == 38) { 
    handdleKeyDown()
  }
}

function handdleKeyDown() {
  switch (state.curr) {
    case state.getReady :
      state.curr = state.Play;
      SFX.start.play();
      break;
    case state.Play :
      bird.flap();
      break;
    case state.gameOver :
      state.curr = state.getReady;
      bird.speed = 0;
      bird.y = 100;
      pipe.pipes=[];
      UI.score.curr = 0;
      SFX.played=false;
      break;
  }
}

const pipeCreation = 150;

let frames = 0;
let dx = 2;
const state = new function() {
  this.curr = 0;
  this.getReady = 0;
  this.Play = 1;
  this.gameOver = 2;
}
const SFX = new function() {
  this.start = new Audio();
  this.flap = new Audio();
  this.score = new Audio();
  this.hit = new Audio();
  this.die = new Audio();
  this.played = false;
};
const ground = new function() {
  this.sprite = new Image();
  this.x = 0;
  this.y = 0;
  this.stop = false;
  this.times;

  this.draw = () => {
    if (this.stop == false) {
      this.sprite.height *= size;
      this.sprite.width *= size;
      this.stop = true;
    }
    this.times = Math.ceil(W/this.sprite.width)+1;
    for (let i = 0; i < this.times; i++) {
      let variation = i>0?-6:0;
      let deviation = this.sprite.width*i + variation*i;
      this.y = parseFloat(H-this.sprite.height);
      ctx.drawImage(this.sprite,this.x+deviation,this.y, this.sprite.width, this.sprite.height);
    }
  }
  this.update = () => {
    if(state.curr != state.Play) return;
    this.x -= dx;
    if (this.x <= -this.sprite.width) {
      this.x = 0;
    }
  }
};
const bg = new function() {
  this.sprite = new Image();
  this.x = 0;
  this.y = 0;
  this.stop = false;

  this.draw = () => {
    if (this.stop == false) {
      this.sprite.height *= size;
      this.sprite.width *= size;
      this.stop = true;
    }
    this.times = Math.ceil(W/this.sprite.width)+1;
    for (let i = 0; i < this.times; i++) {
        let deviation = this.sprite.width*i;
        this.y = parseFloat(H-this.sprite.height);
        ctx.drawImage(this.sprite,this.x+deviation,this.y, this.sprite.width, this.sprite.height);
    }
  }
  this.update = () => {
    if(state.curr != state.Play) return;
    this.x -= 1;
    this.x = this.x % (this.sprite.width);
  } 
};
const pipe = new function() {
    this.top = {sprite : new Image()};
    this.bot = {sprite : new Image()};
    this.gap = 85;
    this.moved = true;
    this.pipes = [];
    this.w = 0;
    this.h = 0;
    this.stop = false;

    this.draw = () => {
      for(let i = 0;i<this.pipes.length;i++) {
        let p = this.pipes[i];
        ctx.drawImage(this.top.sprite, p.x, p.y, this.w, this.h)
        ctx.drawImage(this.bot.sprite, p.x, p.y+parseFloat(this.h)+this.gap, this.w, this.h)
      }
    }                                                                                                                                                                                                                                                           

    this.drawHitboxes = () => {
      if (this.pipes.length < 0) return
      for (let i = 0; i < Math.min(this.pipes.length, 2); i++) {
        let p = this.pipes[i];
        let grad = ctx.createLinearGradient(p.x, p.y, p.x+this.w, p.y)
        grad.addColorStop(0, 'rgba(0, 0, 0, 1)'); 
        grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 1)');
        ctx.fillStyle = grad;
        ctx.fillRect(p.x, p.y, this.w, this.h);
        ctx.fillRect(p.x, p.y+parseFloat(this.h)+this.gap, this.w, this.h);
      }
    }

    this.update = () => {
      if(state.curr!=state.Play) return;
      if (this.stop == false) {
        this.gap *= size;
        this.w = this.top.sprite.width * size;
        this.h = this.top.sprite.height * size;
        this.stop = true
      }
      if (frames == 0) {
        this.pipes.push({x:parseFloat(W),y:-210*Math.min(Math.random()+1,1.8)}); 
      } if(frames%pipeCreation == 0) {
        this.pipes.push({x:parseFloat(W),y:-210*Math.min(Math.random()+1,1.8)});
      }
      this.pipes.forEach(pipe => {
        pipe.x -= dx;
      })
      if(this.pipes.length&&this.pipes[0].x < -this.w) {
        this.pipes.shift();
        this.moved = true;
      }
    }
};

const bird = new function() {
  this.animations = [
    {sprite : new Image()},
    {sprite : new Image()},
    {sprite : new Image()},
    {sprite : new Image()},
  ],
  this.rotatation = 0,
  this.x = Math.max(W/8, 100);
  this.y = 100;
  this.speed = 0;
  this.gravity = 0.125;
  this.thrust = 3.6;
  this.frame = 0;
  this.stop = false;
  this.h;
  this.w;
  this.r;
  
  this.draw = () => {
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.rotatation*RAD);
    ctx.drawImage(this.animations[this.frame].sprite,-this.w/2,-this.h/2, this.w,this.h);
    ctx.restore();
  }

  this.drawHitboxes = () => {
    ctx.beginPath();
    let grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r)
    grad.addColorStop(0.3, 'rgba(100, 0, 255, 0.5)');
    grad.addColorStop(1, 'rgba(100, 0, 200, 1)');
    ctx.fillStyle = grad;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();
  };

  this.update = () => {
    if (this.stop === false) {
      this.h = this.animations[this.frame].sprite.height * size;
      this.w = this.animations[this.frame].sprite.width * size;
      this.gravity *= size;
      this.thrust *= size;
      this.stop = true;
    }
    
    let r = parseFloat(this.animations[0].sprite.width)/2;
    this.r = r;
    switch (state.curr) {
      case state.getReady :
        this.rotatation = 0;
        this.y +=(frames%10==0) ? Math.sin(frames*RAD) :0;
        this.frame += (frames%10==0) ? 1 : 0;
        break;
      case state.Play :
        this.frame += (frames%5==0) ? 1 : 0;
        this.y += this.speed;
        this.setRotation()
        this.speed += this.gravity;
        if (this.y + r  >= ground.y||this.collisioned()) {
          state.curr = state.gameOver;
        }
        break;
      case state.gameOver : 
        this.frame = 1;
        if(this.y + r  < ground.y) {
          this.y += this.speed;
          this.setRotation()
          this.speed += this.gravity*2;
        } else {
          this.speed = 0;
          this.y=ground.y-r;
          this.rotatation=90;
          if(!SFX.played) {
            SFX.die.play();
            SFX.played = true;
          }
        }
        
        break;
    }
    this.frame = this.frame%this.animations.length;       
  }
  this.flap = () => {
    if(this.y > 0) {
      SFX.flap.play();
      this.speed = -this.thrust;
    }
  }
  this.setRotation = () => {
      if(this.speed <= 0) {
        this.rotatation = Math.max(-25, -25 * this.speed/(-1*this.thrust));
      }
      else if(this.speed > 0) {
        this.rotatation = Math.min(90, 90 * this.speed/(this.thrust*2));
      }
  }
  this.collisioned = () => {
    if(!pipe.pipes.length) return;
    let bird = this.animations[0].sprite;
    let r = (bird.height*size)/4 +(bird.height*size)/4;

    var x, y
    pipe.pipes.every((e,i) => {
      if (e.x <= this.x+r && e.x+pipe.w >= this.x - r) {
        x = e.x;
        y = e.y;
        return false
      } else if (e.x >= this.x-r) {
        x = e.x;
        y = e.y;
        return false
      }
      return true
    })
    

    
    let roof = y + parseFloat(pipe.h);
    let floor = roof + pipe.gap;
    let w = parseFloat(pipe.w);
    if(this.x + r >= x) {
      if(this.x + r < x + w) {
        if(this.y - r <= roof || this.y + r>= floor) {
          SFX.hit.play();
          return true;
        }
      } else if (pipe.moved) {
        UI.score.curr++;
        SFX.score.play();
        pipe.moved = false;
      }
    }
  }
};
const UI = new function() {
  this.getReady = {sprite : new Image()};
  this.gameOver = {sprite : new Image()};
  this.tap = [
    {sprite : new Image()},
    {sprite : new Image()}
  ];
  this.score = {
    curr : 0,
    best : 0,
  };
  this.x = 0;
  this.y = 0;
  this.tx = 0;
  this.ty = 0;
  this.frame = 0;
  this.draw = () => {
    switch (state.curr) {
      case state.getReady :
        this.y = parseFloat(H-this.getReady.sprite.height)/2;
        this.x = parseFloat(W-this.getReady.sprite.width)/2;
        this.tx = parseFloat(W - this.tap[0].sprite.width)/2;
        this.ty = this.y + this.getReady.sprite.height- this.tap[0].sprite.height;
        ctx.drawImage(this.getReady.sprite,this.x,this.y);
        ctx.drawImage(this.tap[this.frame].sprite,this.tx,this.ty)
        break;
      case state.gameOver :
        this.y = parseFloat(H-this.gameOver.sprite.height)/2;
        this.x = parseFloat(W-this.gameOver.sprite.width)/2;
        this.tx = parseFloat(W - this.tap[0].sprite.width)/2;
        this.ty = this.y + this.gameOver.sprite.height- this.tap[0].sprite.height;
        ctx.drawImage(this.gameOver.sprite,this.x,this.y);
        ctx.drawImage(this.tap[this.frame].sprite,this.tx,this.ty)
        break;
    }
    this.drawScore();
  };
  this.drawScore = () => {
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#000000";
    switch (state.curr) {
      case state.Play :
        ctx.lineWidth = "2";
        ctx.font = "35px Squada One";
        ctx.fillText(this.score.curr,W/2-5,50);
        ctx.strokeText(this.score.curr,W/2-5,50);
        break;
      case state.gameOver :
        ctx.lineWidth = "2";
        ctx.font = "40px Squada One";
        let sc = `SCORE :     ${this.score.curr}`;
        try {
          this.score.best = Math.max(this.score.curr,localStorage.getItem("best"));
          localStorage.setItem("best",this.score.best);
          let bs = `BEST  :     ${this.score.best}`;
          ctx.fillText(sc,W/2-80,H/2+0);
          ctx.strokeText(sc,W/2-80,H/2+0);
          ctx.fillText(bs,W/2-80,H/2+30);
          ctx.strokeText(bs,W/2-80,H/2+30);
        } catch(e) {
          ctx.fillText(sc,W/2-85,H/2+15);
          ctx.strokeText(sc,W/2-85,H/2+15);
        }
        break;
    }
  };
  this.update = () => {
    if(state.curr == state.Play) return;
    this.frame += (frames % 10==0) ? 1 :0;
    this.frame = this.frame % this.tap.length;
  };
};

ground.sprite.src="img/ground.png";
let size = H*0.05/ground.sprite.height + 1

bg.sprite.src="img/BG.png";
pipe.top.sprite.src="img/toppipe.png";
pipe.bot.sprite.src="img/botpipe.png";
UI.gameOver.sprite.src="img/go.png";
UI.getReady.sprite.src="img/getready.png";
UI.tap[0].sprite.src="img/tap/t0.png";
UI.tap[1].sprite.src="img/tap/t1.png";
bird.animations[0].sprite.src="img/bird/b0.png";
bird.animations[1].sprite.src="img/bird/b1.png";
bird.animations[2].sprite.src="img/bird/b2.png";
bird.animations[3].sprite.src="img/bird/b0.png";
SFX.start.src = "sfx/start.wav"
SFX.flap.src = "sfx/flap.wav"
SFX.score.src = "sfx/score.wav"
SFX.hit.src = "sfx/hit.wav"
SFX.die.src = "sfx/die.wav"

var nbOpp = 0;
var reduceFactor = Math.ceil(Math.sqrt(nbOpp/2));
var split = 3;
// var reduceFactor = 4;
// var nbOpp = reduceFactor*reduceFactor*2;

const opp = [];
createOpponents();


window.addEventListener('load', () => {
  gameLoop();
});

function gameLoop() {
  ctx = screen.getContext("2d");
  update();
  draw();
  if (nbOpp !== 0) {
    createMini();
  }
  frames++;
  requestAnimationFrame(gameLoop);
}

function update() {
  bird.update();
  ground.update();
  bg.update();
  pipe.update();
  UI.update();
}

function draw() {
  ctx.fillStyle = "#30c0df";
  ctx.fillRect(0,0,screen.width,H);
  ctx.translate(W, 0);
  bg.draw();
  pipe.draw();
  bird.draw();

  // drawHitboxes();

  ground.draw();
  UI.draw();

  ctx.fillStyle = "#30c0df"; 
  ctx.fillRect(W, 0, 2*W, H);
  ctx.translate(-W, 0);
  ctx.fillRect(0, 0, W, H);
}

function createMini() {
  opp.forEach(g => {
    ctx = g.getContext('2d');
    ctx.scale(1/reduceFactor, 1/reduceFactor);
    draw();
    ctx.scale(reduceFactor, reduceFactor);
  })
}

function createOpponents() {
  for (let i = 0; i < nbOpp; i++) {
    game = document.createElement('canvas');
    document.body.appendChild(game);

    game.width = innerWidth/(split*reduceFactor);
    game.height = innerHeight/reduceFactor;

    var left, top
    var nbPerSide = reduceFactor**2;
    if (i >= nbPerSide) {
      left = `left:${((i%reduceFactor)*innerWidth/(split*reduceFactor)) + (split-1)*innerWidth/(split) - 2}px`;
      top = `top:${Math.floor((i%nbPerSide)/reduceFactor)*innerHeight/(reduceFactor*split/3)}px`;
    } else {
      left = `left:${((i%reduceFactor)*innerWidth/(split*reduceFactor)) - 2}px`;
      top = `top:${Math.floor((i%nbPerSide)/reduceFactor)*innerHeight/(reduceFactor*split/3)}px`;
    }
    console.log(left, top)
    game.style = `${left}; ${top}`
    opp.push(game)
  }
  
}

function drawHitboxes() {
  pipe.drawHitboxes();
  bird.drawHitboxes();
}