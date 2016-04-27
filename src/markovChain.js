import { choose } from "./utils.js";

export default class MarkovChain{
  constructor(text, prefixLength = 2){
    this.prefixLength = prefixLength;
    this.text = text;
  }

  _slurp(){
    let words = [].concat.apply([], this.text.split('\n')
                                                        .map(line=> line.split(' ')));
    let prefix = words.slice(0, this.prefixLength);
    words = words.slice(this.prefixLength);

    words.forEach(word=> {
      let key = prefix.join(' ');
      if(this._data.has(key)){
        this._data.get(key).push(word);
      } else {
        this._data.set(key, [word]);
      }

      prefix.push(word);
      prefix.shift();
    });

    this._serialize();
  }

  _serialize(){
    localStorage.setItem('markovChainMap', JSON.stringify([...this._data]));
  }

  _deserialize(){
    this._data = new Map(JSON.parse(localStorage.getItem('markovChainMap')));
  }

  get data(){
    if(!this._data){
      if(localStorage.getItem('markovChainMap')){
        this._deserialize();
      } else {
        this._data = new Map();
        this._slurp();
        this._serialize();
      }
    }

    return this._data;
  }

  next(prefix){
    if(!prefix || !this.data.has(prefix)){
      throw 'passed null prefix to next';
    }

    return choose(this.data.get(prefix));
  }

  generate(length){
    let prefix = choose(Array.from(this.data.keys()).filter(key=> key.charAt(0).toUpperCase() === key.charAt(0))).split(' ');
    let text = prefix.slice();

    while(text.length < length){
      let nextWord = this.next(prefix.join(' '));

      text.push(nextWord);

      prefix.push(nextWord);
      prefix.shift();
    }

    return text.join(' ');
  }

}
