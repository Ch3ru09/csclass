const md5 = require('md5')

const game = document.getElementById('game')
const names = ['chat', 'cheval', 'chien', 'cochon', 'lapin', 'poule']

const diff = document.getElementsByName('diff')
diff.forEach(e => {
  if (e.checked == true) {
    const chosenDiff = e.value.split('x')
    const width = Number(chosenDiff[1])
    const height = Number(chosenDiff[0])
    for (let i = 0; i < height; i++) {
      game.innerHTML += `<tr id="row-${i+1}"></tr>`
    }
    getColumns(width, height)
  }
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
    console.log(row);
    for (let index = 0; index < width; index++) {
      const t = document.getElementById(row);
      const num = ranInt(0, numbers.length-1);
      t.innerHTML += `<td id="${numbers[num]}"><button></button></td>`;
      numbers.splice(num, 1)
    }
  }
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