const {screen, getByText, fireEvent} = require('@testing-library/dom');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
require('@testing-library/jest-dom/extend-expect');

const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

let dom;
let container;

describe('index html test', () => {
  beforeEach(() => {
    dom = new JSDOM(html, {runScripts: 'dangerously'});
    container = dom.window.document.body;
  });

  it('should render an h1 that says Express', () => {
    const h1 = container.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(getByText(container, 'Express')).toBeInTheDocument();
  });

  it('should render a p that says Welcome to Express', () => {
    const p = container.querySelector('p');
    expect(p).not.toBeNull();
    expect(getByText(container, 'Welcome to Express')).toBeInTheDocument();
  });
});

