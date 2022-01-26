exports.divide = divide
// const multiplication = require('./multiplication.js')
const multiplication = require('./fastermultiplication.js')

function divide(num1, num2) {
  num1 = parseFloat(num1)
  num2 = parseFloat(num2)
  if (num2 == 0) {
    return {err: 'ERR: Are you stupid? You can\'t divide by 0'}
  } else if (num1 == 0) {
    return {quotient: 0, remainder: 0,}
  } else if (isTen(num2) == true) {
    return {quotient : divide10(num1, num2), remainder: 0,}
  }
  const checkSign = multiplication.getSign(num1, num2)
  num1 = checkSign.num1
  num2 = checkSign.num2
  const sign = checkSign.sign

  let quotient = 0;
  while (num1 > num2) {
    num1 -= num2;
    quotient++
  }
  if (num1 == num2) {
    num1 = 0;
    quotient++;
  }
  
  return {
    quotient: parseFloat(sign + quotient),
    remainder: parseFloat(parseFloat(num1).toPrecision(15))
  }
}

function divide10(num1, num2) {
  let move = 0
  String(num2).split('').forEach(char => {
    if (char == '0') {
      move++
    }
  })
  const final = []
  const length = String(num1).length 
  if (Math.floor(num1) == num1) {
    let buff1 = ''
    let buff2 = ''
    if (length - move < 0) {
      let zeros = length - move 
      zeros = zeros - zeros - zeros
      for (let i = 0; i < zeros; i++) {
        buff2 += '0'
      }
    }
    String(num1).split('').forEach((char, i) => {
      if (length - move > i) {
        buff1 += char
      } else {
        buff2 += char
      }
    })
    final.push(buff1, buff2)
  } else {
    
  }
  return Number(final.join('.'))
}

function isTen(num2) {
  let answer = true
  String(num2).split('').forEach((char, i) => {
    if (i == 0 && char == '1') {
      answer = true
    } else if (i != 0 && char == '0') {
      answer = true
    } else {
      answer = false
    }
  })
  return answer;
}