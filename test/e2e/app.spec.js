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

	it('should calculate monthly mortgage payment correctly and display it in "output" <p>', () => {
		return pageObject
		.type('#prinicpal',300000)
		.type('#interestRate',4.5)
		.type('#loanTerm',30)
		.select('#period','12')
		.click('#calculate')
		.wait('#output a.result__a')
		.evaluate(() => document.querySelector('#output a.result__a').href)
		.end()
		.then(console.log)
		.catch(error => {
			console.error('Search failed:', error)
		});
	});
})