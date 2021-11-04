const { getByText } = require("@testing-library/dom");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
require("@testing-library/jest-dom/extend-expect");

const html = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");

let dom;
let container;

describe("index html test", () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
  });
<<<<<<< HEAD
});
=======
});
>>>>>>> 0689ea61697c26838d2e7374bd2c2f00e52d6def
