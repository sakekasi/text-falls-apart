require("stylesheets/components/paragraph.scss");

import { _, t } from "../../utils.js";

export default class Paragraph {
  constructor(text){
    this.text = text;
    this.domNode =  _('p', {class: 'animatedParagraph'}, t(this.text));
  }
}
