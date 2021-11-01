module.exports.multiply = (param1, param2) => {
  console.log('>>', multiply(param1, param2));
}
module.exports.divide = (param1, param2) => {
  console.log('>>', divide(param1, param2));
}

function multiply(num1, num2) {
  const resultCheck = check(num1, num2)

  const factor1 = parseFloat(resultCheck.factor1);
  const factor2 = parseInt(resultCheck.factor2);
  const times = parseInt(resultCheck.times)

  let product = 0;
  for (var i = 0; i < factor2; i++) {
    product += factor1;
    product = parseFloat(product.toPrecision(15))
    console.log('>>', product);
  };
  if (times != 0) {
    product = parseFloat((product/times).toPrecision(15))
  }
  return product
};

function divide(num1, num2) {
  // don't forget to do division
  let quotient = 0;
  while (num1 > num2) {
    num1 -= num2;
    quotient++;
  }
  return quotient + ', ' + parseFloat(num1.toPrecision(15))
}

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
