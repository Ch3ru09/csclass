const game = document.getElementById('game')
const names = [
  'chat',
  'cheval',
  'chien',
  'cochon',
  'lapin',
  'poule',
  'fox',
  'rhino',
  'elephant',
  'herisson',
]

const answers = []

const chooseSpeed = document.getElementById('speed');
const diff = document.getElementsByName('diff')

function addSpeedInput() {
  const speeds = [2000, 1500, 1000, 750, 500, 250, 0];
  speeds.forEach((e, i) => {
    chooseSpeed.innerHTML +=
      `<input type="radio" id="${e}ms" name="speed" value="${e}ms" ${i==2?'checked':''}>
      <label for="${e}ms">${e/1000}s${i==speeds.length-1?'???':''}</label>`;
  })

} addSpeedInput()

function getAnswers() {
  let dimensions
  diff.forEach(e => {if (e.checked) {const d = e.value.split('x'); dimensions = d.reduce((a, b) => a*b)}});
  const ids = [...Array(dimensions).keys()];
  shuffleArray(names)
  names.forEach((item, i) => {
    if (i < Number(dimensions/2)) {
      for (let index = 0; index < 2; index++) {
        const eh = ranInt(0, ids.length-1)
        const id = ids[eh];
        ids.splice(eh, 1)
        const tag = document.getElementById(String(id));
        const hashed = md5(tag.innerHTML);
        answers.push({
          path: String(item+'-'+Number(index+1)+'.png'),
          id: hashed
        })
      }
    }
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// function detectSpeed(gameSpeed) {
//   let dimensions
//   diff.forEach(e => {if (e.checked) {const d = e.value.split('x'); dimensions = d.reduce((a, b) => a*b)}});
//   const arr = [...Array(dimensions).keys()];
//   arr.forEach(e => {
//     const button = document.getElementById(e.toString());
//     button.style.setProperty('--transTime', gameSpeed+'ms')
//   })
// }

diff.forEach(e => {
  e.onclick = diffReload
});

function diffReload() {
  clearInterval(t)
  const startButton = document.getElementById('start');
  const pause = document.getElementById('pause');
  re(pause, startButton);
};

function getRows() {
  diff.forEach(e => {
    if (e.checked == true) {
      const showDiff = document.getElementById('chosenDifficulty')
      showDiff.innerHTML = `Your current difficulty: `+ e.value
      const chosenDiff = e.value.split('x')
      const width = Number(chosenDiff[1])
      const height = Number(chosenDiff[0])
      let rowsToAdd = ''
      for (let i = 0; i < height; i++) {
        rowsToAdd += `<tr id="row-${i+1}"></tr>`
      }
      game.innerHTML = rowsToAdd;
      getColumns(width, height)
    }
  })
} getRows()

function getColumns(width, height) {
  let row
  const numbers = [...Array(height*width).keys()]
  for (let i = 0; i < height; i++) {
    row = 'row-' + Number(i + 1)
    let toAdd = ''
    const t = document.getElementById(row);
    for (let index = 0; index < width; index++) {
      const num = 0
      const salt = ranString(32)
      toAdd += `<td id="squares">
          <button id="${numbers[num]}" onClick="squareClick(this)">${salt}</button>
        </td>`
      numbers.splice(num, 1)
    }
    t.innerHTML = toAdd;
  }

}

getAnswers()

function diffDrop() {
  const x = document.getElementById('diffDrop')
  x.classList.toggle('hide')
}

let counter = 0
let clicks = 0
let oldElement
let newElement
let stop = true
let path1
let path2
const frozen = []
let timer = 0;
let t

function start(e) {
  const idk = document.getElementById('idk');
  var startButton = document.getElementById('start');
  var pause = document.getElementById('pause');
  if (!e) {
    if (!document.getElementsByClassName('lever')[0]) {
      stop = false;
      startButton.innerHTML = '';
      startButton.classList.add('reset');
      pause.classList.add('lever');
      const ik = Array.from(document.getElementsByClassName('hide2'));
      ik.forEach(e => e.classList.remove('hide2'))
      t = setInterval(loopClock, 100)
    } else {
      re(pause, startButton);
    }
  } else {
    if (!document.getElementsByClassName('pause')[0]) {
      e.classList.add('pause')
      clearInterval(t)
      stop = true
    } else {
      e.classList.remove('pause');
      if (frozen.length == answers.length) {
        clearInterval(t);
        re(pause, startButton);
        return;
      }
      t = setInterval(loopClock, 100)
      stop = false
    }
  }
  return
}

function re(pause, startButton) {
  pause.classList.remove('lever');
  startButton.classList.remove('reset');
  startButton.innerHTML = 'Start';
  reset();
}

function loopClock() {
  const time = document.getElementById('time');
  if (frozen.length == answers.length) {
    clearInterval(t);
    setTimeout(() => {
      alert(`eh, could've been faster`)
    }, 500);
  }
  timer += 0.1;
  time.innerHTML = timer.toFixed(0);
}

function reset() {
  clearInterval(t)
  const ik = Array.from(document.getElementsByClassName('ik'));
  ik.forEach(el => el.classList.add('hide2'));
  counter = timer = clicks = 0
  stop = true
  frozen.splice(0, frozen.length)
  oldElement = newElement = path1 =
  path2 = t = undefined;
  time.innerHTML = timer.toFixed(0);
  const c = document.getElementById('clicks')
  c.innerHTML = clicks
  const p = document.getElementsByClassName('pause')[0]
  if (p) {p.classList.remove('pause')}
  answers.splice(0, answers.length);
  getRows();
  getAnswers();
}

function squareClick(element) {
  if (oldElement && oldElement == element || stop == true || frozen.includes(element)) {
    return
  }

  const speed = document.getElementsByName('speed');
  let gameSpeed
  speed.forEach(e => {
    if (e.checked == true) {
      gameSpeed = e.id.split('m')[0];
    }
  });

  // detectSpeed(gameSpeed)

  if (counter == 0) {
    oldElement = element
    path1 = answers.find(e => e.id == md5(element.innerHTML)).path;
    counter++;
  } else {
    newElement = element
    path2 = answers.find(e => e.id == md5(element.innerHTML)).path;
    stop = true
    counter = 0;
    if (path1.split('-')[0] == path2.split('-')[0]) {
      frozen.push(oldElement, newElement)
      stop = false
      oldElement = newElement = undefined;
    } else {
      setTimeout(() => {
        oldElement.style.backgroundImage =
          oldElement.style.borderRadius =
          newElement.style.backgroundImage =
          newElement.style.borderRadius = '';
        oldElement = newElement = undefined;
        stop = false
      }, gameSpeed);
    }
  }
  clicks++
  const c = document.getElementById('clicks')
  c.innerHTML = clicks
  element.style.backgroundImage = `url("./public/${counter == 1?path1:path2}")`;
  element.style.borderRadius = "25%";
  return
}

function ranInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function ranString(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/{}$[]';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
//  A formatted version of a popular md5 implementation.
//  Original copyright (c) Paul Johnston & Greg Holt.
//  The function itself is now 42 lines long.

function md5(inputString) {
    var hc="0123456789abcdef";
    function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
    function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
    function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
    function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
    function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
    function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
    function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
    function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
    function sb(x) {
        var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
        for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
        blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
    }
    var i,x=sb(inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
    for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
        a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
        b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
        c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
        d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
        a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
        b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
        c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
        d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
        a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
        b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
        c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
        d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
        a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
        b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
        c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
        d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
        a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
        b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
        c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
        d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
        a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
        b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
    }
    return rh(a)+rh(b)+rh(c)+rh(d);
}
