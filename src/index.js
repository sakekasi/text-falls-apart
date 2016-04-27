require("stylesheets/base.scss");

import MarkovChain from "./markovChain.js";
import Paragraph from "./components/paragraph";

document.addEventListener('DOMContentLoaded', function(){
  let initialText = document.querySelector('#initialText').textContent;
  let bookText = document.querySelector('#bookText').textContent;

  let markovChain = new MarkovChain(bookText);

  // initialText = markovChain.generate(1000);
  let paragraph = new Paragraph(document.body, initialText);
});
