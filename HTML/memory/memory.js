const game = document.getElementById('game')
const names = ['chat', 'cheval', 'chien', 'cochon', 'lapin', 'poule']




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

function squareClick(element) {

  let counter
  let oldElement
  let newElement

  counter.trim() == '' && counter = 0

  if (oldElement && oldElement == element) {
    return
  }
  if (counter == 0) {
    oldElement = element;
    counter++;
  } else {
    newElement = element;
    setTimeout(() => {
      counter = 0;
      oldElement.style.backgroundImage =
        oldElement.style.borderRadius =
        newElement.style.backgroundImage =
        newElement.style.borderRadius = '';
      oldElement = newElement = undefined;
    }, 1000);
  }
  element.style.backgroundImage = '';
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
