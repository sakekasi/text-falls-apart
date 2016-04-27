require("stylesheets/components/paragraph.scss");

import { _, t } from "../../utils.js";

export default class LineBrokenParagraph {
  constructor(parentNode, text){
    this.text = text;

    let words = this.text.split(' ')
                         .map(word=> _('word', {}, t(word)));
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
    // this.domNode.style.maxWidth = 'none';
  }
}
