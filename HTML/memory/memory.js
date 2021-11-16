const md5 = require('md5')

const game = document.getElementById('game')
const names = ['chat', 'cheval', 'chien', 'cochon', 'lapin', 'poule']

const diff = document.getElementsByName('diff')
diff.onclick = getRows

function getRows() {
  diff.forEach(e => {
    if (e.checked == true) {
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

document.getElementsByName('diff').on('click', () => {
  console.log('1');
})

function getColumns(width, height) {
  let row
  const numbers = []
  const max = Number(height*width)
  for (let i = 0; i < max; i++) {
    numbers.push(i+1)
  }
  for (let i = 0; i < height; i++) {
    row = 'row-' + Number(i + 1)
    let toAdd = ''
    const t = document.getElementById(row);
    for (let index = 0; index < width; index++) {
      const num = ranInt(0, numbers.length-1);
      toAdd += `<td><button id="${numbers[num]}"></button></td>`
      numbers.splice(num, 1)
    }
    t.innerHTML = toAdd;
  }
  // for (var i = 0; i < array.length; i++) {
  //   array[i]
  // }
}

function ranInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/{}$[]';

function ranString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result);
    return result;
}
/*
 * const path = String('./public/' + element + '-' + Number(i+1) + '.png')
*/
