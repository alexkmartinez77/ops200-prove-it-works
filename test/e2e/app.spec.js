const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
	let httpServer = null;
	let pageObject = null;

	before((done) => {
		httpServer = app.listen(8888);
		done();
	});

	beforeEach(() => {
		pageObject = nightmare.goto(url);
	});

	after((done) => {
		httpServer.close();
		done();
	});

  it('should contain a <h1> element for the page title', () => { 
    return pageObject
      .evaluate(() => document.querySelector('h1').innerText)
      .then(headerText => {
      expect(headerText).to.not.be.null;
      expect(headerText).to.equal('Mortgage Calculator');
      });
    });

  it('should contain a <button> with "calculate" as the id', () => { 
    return pageObject
      .evaluate(() => document.querySelector('button').id)
      .then(buttonId => {
      expect(buttonId).to.not.be.null;
      expect(buttonId).to.equal('calculate');
      });
    });

  it('should contain an <p> with "output" as the id', () => { 
    return pageObject
      .evaluate(() => document.querySelector('p').id)
      .then(output => {
      expect(output).to.not.be.null;
			expect(output).to.equal('output');
      });
    });

	it('should correctly calculate mortgage', () =>
		pageObject
		.wait()
		.type('input[name=principal]', 300000)
		.type('input[name=interestRate]', 3.75)
		.type('input[name=loanTerm]', 30)
		.select('select[name=period]', 12)
		.click('button#calculate')
		.wait('#output')
		.evaluate(() => document.querySelector('#output').innerText)
		.then((outputText) => {
			expect(outputText).to.equal('$1389.35');
		})
	).timeout(6500);

	it('should calculate monthly mortgage payment correctly and display it in "output" <p>', () => {
		return pageObject
		.wait()
		.type('#principal', 300000)
		.type('#interestRate', 4.5)
		.type('#loanTerm', 30)
		.select('#period', 12)
		.click('#calculate')
		.wait('#output')
		.evaluate(() => document.querySelector('#output').innerText)
		.then((result) => {
			expect(result).to.equal('$1520.06')
		})
	}).timeout(6500);
		
});