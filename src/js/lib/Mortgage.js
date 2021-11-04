module.exports = class Mortgage{

  monthlyPayment(principal, interest, term, period) {
    const monthlyInterestRate = (interest / 100) / period;
    const numberOfPayments = term * period;
    const compoundedInterestRate = Math.pow((1 + monthlyInterestRate), numberOfPayments);
    const interestQuotient = (monthlyInterestRate * compoundedInterestRate) / ( (Math.pow((1 + monthlyInterestRate), numberOfPayments)) - 1);
    const monthlyPayment = principal * interestQuotient;
    return parseFloat(monthlyPayment.toFixed(2));
  }

  }