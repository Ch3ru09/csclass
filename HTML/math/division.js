exports.divide = divide
const multiplication = require('./multiplication.js')

function divide(num1, num2) {
  num1 = parseFloat(num1)
  num2 = parseFloat(num2)
  if (num2 == 0) {
    return {err: 'ERR: Are you stupid? You can\'t divide by 0'}
  } else if (num1 == 0) {
    return {quotient: 0, reminder: 0,}
  }
  const checkSign = multiplication.getSign(num1, num2)
  num1 = checkSign.num1
  num2 = checkSign.num2
  const sign = checkSign.sign

  let quotient = 0;
  while (num1 > num2) {
    num1 -= num2;
    quotient++;
  }
  if (num1 == num2) {
    num1 = 0;
    quotient++;
  }
  return {
    quotient: parseFloat(sign + quotient),
    reminder: parseFloat(parseFloat(num1).toPrecision(15))
  }
}
