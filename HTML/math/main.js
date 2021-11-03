const multiplication = require('./multiplication.js')
const division = require('./division.js')

module.exports.multiply = (param1, param2) => {
  const product = multiplication.multiply(param1, param2)
  console.log('>>', product);
}
module.exports.divide = (param1, param2) => {
  const res = division.divide(param1, param2);
  const quotient = res.quotient;
  const reminder = res.reminder;
  const err = res.err
  if (err) {
    console.log('!>>', err);
  } else if (reminder == 0) {
    console.log('>> Q = ', quotient);
  } else {
    console.log('>> Q =', quotient, ', R =', reminder);
  }
}
