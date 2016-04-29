require("stylesheets/base.scss");

import MarkovChain from "./markovChain.js";
import Paragraph from "./components/paragraph";

import { chooseSlice } from "./utils.js";

document.addEventListener('DOMContentLoaded', function(){
  let initialText = document.querySelector('#initialText').textContent;
  let bookText = document.querySelector('#bookText').textContent;

  let markovChain = new MarkovChain(bookText);

  // initialText = markovChain.generate(1000);
  let paragraph = new Paragraph(document.body, initialText);

  let words = [].concat.apply([], initialText.split('\n').map(line=> line.split(' ')));

  let randomNext = ()=> {
    let next = '', word = '';
    let j = 0, i;
    while(next === word && ++j < 100){
      let prefix;
      while(!prefix){
        [prefix, i] = chooseSlice(markovChain.prefixLength, words);
      }
      try{
        next = markovChain.next(prefix.join(' '));
        word = words[i+markovChain.prefixLength];
      } catch (e) {
        continue;
      }
    }

    paragraph.swapWord(i+markovChain.prefixLength, next);
    words[i+markovChain.prefixLength] = next;

    // window.setTimeout(randomNext, 3000);
  };

  global.keyDown = function(event){
    let key = event.keyCode || event.which;
    let keychar = String.fromCharCode(key);

    if(keychar === ' '){
      for(let i=0; i<100; i++){
        randomNext();
      }
    }
  };

  // window.setTimeout(randomNext, 3000)
});
