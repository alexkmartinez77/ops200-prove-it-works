const Calculator = require('./Calculator');
let calculator = new Calculator();
let add = calculator.add;
let divide = calculator.divide;
let multiply = calculator.multiply;
let subtract = calculator.subtract;

module.exports = class Mortgage{

  monthlyPayment(principal, interest, term, period) {
    const monthlyInterestRate = divide((divide(interest, 100)), period);
    const numberOfPayments = multiply(term, period);
    const compoundedInterestRate = Math.pow((add(1, monthlyInterestRate)), numberOfPayments);
    const interestQuotient = divide(multiply(monthlyInterestRate,compoundedInterestRate), subtract((Math.pow(add(1, monthlyInterestRate), numberOfPayments)), 1));
    const monthlyPayment = multiply(principal, interestQuotient);
    return parseFloat(monthlyPayment.toFixed(2));
  }

  }