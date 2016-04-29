require("stylesheets/components/paragraph.scss");

import { _, t } from "../../utils.js";
import Velocity from "velocity-animate";

export default class LineBrokenParagraph {
  constructor(parentNode, text){
    this.text = text;

    let words;
    this.words = words = [].concat.apply([], this.text.split('\n').map(line=> line.split(' ')))
                           .map(word=> _('word', {},
                                         _('currentWord', {}, t(word))));
    let children = [].concat.apply([], words.map((wordNode, i, words)=> (i===words.length-1)? [wordNode]: [wordNode, t(' ')]));

    this.domNode =  _('p', {class: 'animatedParagraph'}, ...children);//t(this.text));
    this.parentNode = parentNode;

    this.parentNode.appendChild(this.domNode);

    let lines = [[]];
    words.forEach((wordNode, i)=>{
      let line = lines.slice(-1)[0];
      let previous = words[i-1];
      if(previous && (previous.getBoundingClientRect().top !== wordNode.getBoundingClientRect().top)){
        console.log(`new line at ${wordNode.textContent}`);
        lines.push([]);
        line = lines.slice(-1)[0];
      }

      line.push(wordNode);
    });

    while(this.domNode.firstChild){;
      this.domNode.removeChild(this.domNode.firstChild);
    }

    lines = lines.map(lineNodes=> {
      let children = [].concat.apply([], lineNodes.map((wordNode, i, line)=> (i===line.length-1)? [wordNode]: [wordNode, t(' ')]));
      return _('line', {}, ...children);
    });

    lines.forEach(line=> this.domNode.appendChild(line));

    this.domNode.style.maxWidth = 'none';
  }

  _findWord(wordText){
    return this.words.find(dom=> dom.textContent === wordText);
  }

  swapWord(i, newWord){
    let word = this.words[i].firstChild.textContent;
    let wordDom = this.words[i];
    let currentWord = wordDom.firstChild;
    let wordText = currentWord.firstChild;

    let tempWord = _('wordOverlay', {}, t(word));
    wordDom.appendChild(tempWord);

    currentWord.style.opacity = 0;
    tempWord.style.opacity = 1;

    wordText.nodeValue = newWord;

    Velocity(currentWord, {opacity: 1}, 1000);
    Velocity(tempWord, {opacity: 0}, 1000, ()=>{
      wordDom.removeChild(tempWord);
    });
    // wordDom.style.color = 'red';
    // currentWord.classList.remove('enableTransition');
  }
}
