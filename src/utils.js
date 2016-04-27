export function _(name, attrs, ...children){
  let domNode = document.createElement(name);
  Object.keys(attrs).forEach(attr=> domNode.setAttribute(attr, attrs[attr]));
  children.forEach(child=> domNode.appendChild(child));

  return domNode;
}

export function t(text){
  return document.createTextNode(text);
}

export function choose(array){
  return array[Math.floor(Math.random() * array.length)]
}
