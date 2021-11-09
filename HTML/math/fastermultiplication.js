const getSign = require('./multiplication.js')

exports.multiply = function multiply(num1, num2) {
  num1 = Number(num1)
  num2 = Number(num2)

  if (num1 == 0 || num2 == 0) {
    return 0
  }

  const checkSign = getSign(num1, num2)

  num1 = Number(checkSign.num1)
  num2 = Number(checkSign.num2)
  const sign = checkSign.sign



  let product = 0;
  for (var i = 0; i < factor2; i++) {
    product += factor1;
    product = Number(product.toPrecision(15))
  };
  if (times != 0) {
    product = Number((product/times).toPrecision(15))
  }
  return Number(sign + product)
}

function checkLength(num1, num2) {
  const test1 = num1.toString().length
  const test2 = num2.toString().length

  if (test1 < test2) {
    const factor2 = checkDecimal(num1).factor2
  } else if (test2 < test1) {
    const factor2 = checkDecimal(num1).factor2
  }
}

function checkDecimal(factor2) {
  
  while (Math.floor(factor2) !== factor2) {

  }
}
