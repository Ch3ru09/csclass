const main = document.getElementById('main')
import md5 from './src/md5.js'

const names = ['chat', 'cheval', 'chien', 'cochon', 'lapin', 'poule']

names.map(element => {
  for (let i = 0; i < 2; i++) {
    const path = String('./' + element + '-' + Number(i+1) + '.png')
    console.log('>>', path);
  }
  return {
    animal: element,
  }
})

function ranInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/{}$[]';

function ranString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result);
    return result;
}
