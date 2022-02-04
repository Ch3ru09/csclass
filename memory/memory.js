/*
  you'll have to
*/

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
  /*
    this adds the speed,
    you also have to remove the get speed at line 216
  */
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
// !! DEPRICATED;
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
  // change gameSpeed to a number (in ms) delete the rest
  const speed = document.getElementsByName('speed');
  let gameSpeed
  speed.forEach(e => {
    if (e.checked == true) {
      gameSpeed = e.id.split('m')[0];
    }
  });

  // detectSpeed(gameSpeed) !! DECAPITADED
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
