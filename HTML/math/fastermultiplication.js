const division = require('./division')
exports.getSign = getSign

exports.multiply = multiply
function multiply(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);

  if (num1 == 0 || num2 == 0) {
    return 0
  };

  const checkSign = getSign(num1, num2);

  num1 = Number(checkSign.num1);
  num2 = Number(checkSign.num2);
  const sign = checkSign.sign;

  const checkedLength = checkLength(num1, num2);
  const factor1 = checkedLength.factor1;
  const factor2 = checkedLength.factor2;
  const times = checkedLength.times;

  let product = 0;
  for (var i = 0; i < factor2; i++) {
    product += factor1;
    product = Number(product.toPrecision(15));
  };
  if (times) {
    product = 
      Number((
        division.divide(product, times)
      ).quotient.toPrecision(15)
      );
  }
  return Number(sign + product);
}

function checkLength(num1, num2) {
  const test1 = num1.toString().length;
  const test2 = num2.toString().length;
  if (test1 < test2) {
    const results = checkDecimal(num1);
    const factor2 = results.factor2;
    const times = results.times
    return {
      factor1: num2,
      factor2,
      times,
    }
  } else if (test2 < test1) {
    const results = checkDecimal(num2);
    const factor2 = results.factor2;
    const times = results.times;
    return {
      factor1: num1,
      factor2,
    }
  } else if (test1 == test2) {
    const results = checkDecimal(num1);
    const factor2 = results.factor2;
    const times = results.times;
    return {
      factor1: factor2,
      factor2: num2,
      times,
    } 
  }
}

function checkDecimal(factor2) {
  let times = 1
  while (Math.floor(factor2) !== factor2) {
    factor2 = multiply(factor2, 10)
    times = multiply(factor2, 10)
  }
  return {
    factor2: factor2,
    times: times,
  }
}

function getSign(num1, num2) {
  if (num1 < 0 && num2 < 0) {
    num1 = num1 - num1 - num1
    num2 = num2 - num2 - num2
    return {
      sign: '',
      num1,
      num2,
    }
  } else if (num1 < 0) {
    num1 = num1 - num1 - num1
    return {
      sign: '-',
      num1,
      num2,
    }
  } else if (num2 < 0) {
    num2 = num2 - num2 - num2
    return {
      sign: '-',
      num1,
      num2,
    }
  } else {
    return {
      sign: '',
      num1,
      num2,
    }
  }
}