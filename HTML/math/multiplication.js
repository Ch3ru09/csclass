const division = require('./division.js')
exports.multiply = multiply
exports.getSign = getSign

function multiply(num1, num2) {
  const checkSign = getSign(num1, num2)

  num1 = parseFloat(checkSign.num1)
  num2 = parseFloat(checkSign.num2)
  const sign = checkSign.sign

  const resultCheck = check(num1, num2)

  const factor1 = parseFloat(resultCheck.factor1);
  const factor2 = parseInt(resultCheck.factor2);
  const times = parseInt(resultCheck.times)

  let product = 0;
  for (var i = 0; i < factor2; i++) {
    product += factor1;
    product = parseFloat(product.toPrecision(15))
  };
  if (times != 0) {
    product = parseFloat((product/times).toPrecision(15))
    /*
      PLEASE ADD DIVISION HERE!!
    */
  }
  return parseFloat(sign + product)
};


function check(num1, num2) {
  let factor1
  let factor2
  if (num1-Math.floor(num1) === 0) {
    return {
      factor1: num2,
      factor2: num1,
      times: 0,
    }
  } else if (num2-Math.floor(num2) === 0) {
    return {
      factor1: num1,
      factor2: num2,
      times: 0,
    }
  } else {
    const resultChange = change(num2);
    return {
      factor1: num1,
      factor2: resultChange.num,
      times: resultChange.times,
    }
  }
}

function change(num) {
  let times = 0;
  while(num-Math.floor(num) != 0) {
    num = multiply(num, 10);
    times += 10;
  }
  return {
    num: num,
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