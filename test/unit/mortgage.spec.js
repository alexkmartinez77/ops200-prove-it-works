var chai = require('chai'), expect = chai.expect, should = chai.should();
const Mortgage = require('../../src/js/lib/Mortgage');

describe ('Mortgage', () => {
  let mortgage = null;

  beforeEach(() => {
  mortgage = new Mortgage();
  });

  it('should have an monthlyPayment function', () => {
  expect(mortgage.monthlyPayment).to.exist;
  });

  it('should calculate mortgage Payment correctly', () => {
  expect(mortgage.monthlyPayment(300000, 4.5, 30, 12)).to.equal(1520.06);
  });

  it('should calculate mortgage Payment correctly', () => {
  expect(mortgage.monthlyPayment(400000, 7.5, 30, 12)).to.equal(2796.86);
  });

  it('monthly payment should be a number', () => {
  mortgage.monthlyPayment(300000, 4.5, 30, 12).should.be.a('number');
  });
})

