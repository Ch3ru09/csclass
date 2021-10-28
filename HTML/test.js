console.log(multiply(1.1, 1.2).product);

function multiply(num1, num2) {
  const resultCheck = check(num1, num2)
  console.log('>>>', resultCheck);

  const factor1 = resultCheck.factor1;
  const factor2 = resultCheck.factor2;

  let product = 0;
  for (var i = 0; i <= factor2-1; i++) {
    product += factor1;
    product = parseFloat(product.toPrecision(15))
  };
  return {
    product,
  }
}

function divide(num1, num2) {
  // don't forget to do division
  check(num2)
  let buff = 0;
  for (let i = 0; i <= num2-1; i++) {
    buff += num1;
  }
}

function check(num1, num2) {
  let factor1
  let factor2
  if (num1-Math.floor(num1) === 0) {
    return {
      factor1: num2,
      factor2: num1,
    }
  } else if (num2-Math.floor(num2) === 0) {
    return {
      factor1: num1,
      factor2: num2,
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
    num = multiply(num, 10).product;
    times += 10;
  }
  return {
    num: num,
    times: times,
  }
}
