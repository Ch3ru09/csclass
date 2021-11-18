const game = document.getElementById('game')
const names = ['chat', 'cheval', 'chien', 'cochon', 'lapin', 'poule']




const chooseSpeed = document.getElementById('speed');

function addSpeedInput() {
  const speeds = [2000, 1000, 500, 250, 100];
  speeds.forEach((e, i) => {
    chooseSpeed.innerHTML +=
      `<input type="radio" id="${e}ms" name="speed" value="${e}ms" ${i==0?'checked':''}>
      <label for="${e}ms">${e/1000}s</label>`
  })
  
} addSpeedInput()

function detectSpeed() {
  const squares = game.getElementsByTagName('button')
  for (let i = 0; i < squares.length; i++) {
    const e = squares[i];
    e.styles.setProperty('--transTime', gameSpeed+'ms');
  }
}

const diff = document.getElementsByName('diff')

diff.forEach(e => {
  e.onclick = getRows
})

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
      const num = ranInt(0, numbers.length-1);
      const salt = ranString(7)
      toAdd += `<td id="squares">
          <button id="${numbers[num]}" onClick="squareClick(this)"></button>
        </td>`
      numbers.splice(num, 1)
    }
    t.innerHTML = toAdd;
  }

}

function diffDrop() {
  const x = document.getElementById('diffDrop')
  x.classList.toggle('show')
}

let counter = 0
let oldElement
let newElement
let stop

function squareClick(element) {
  if (oldElement && oldElement == element || stop == true) {
    return
  }

  const speed = document.getElementsByName('speed');
  let gameSpeed
  speed.forEach(e => {
    if (e.checked==true) {
      gameSpeed = Number(e.value.split('m')[0])
    }
  })
  
  if (counter == 0) {
    oldElement = element;
    counter++;
  } else {
    newElement = element;
    stop = true
    setTimeout(() => {
      counter = 0;
      oldElement.style.backgroundImage =
        oldElement.style.borderRadius =
        newElement.style.backgroundImage =
        newElement.style.borderRadius = '';
      oldElement = newElement = undefined;
      stop = false
    }, gameSpeed);
  }
  element.style.backgroundImage = 'url("./public/chat-1.png")';
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
/*
 * const path = String('./public/' + element + '-' + Number(i+1) + '.png')
*/
