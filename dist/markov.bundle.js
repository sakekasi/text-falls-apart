webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _markovChain = __webpack_require__(1);
	
	var _markovChain2 = _interopRequireDefault(_markovChain);
	
	var _paragraph = __webpack_require__(3);
	
	var _paragraph2 = _interopRequireDefault(_paragraph);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(8);
	
	document.addEventListener('DOMContentLoaded', function () {
	  var initialText = document.querySelector('#initialText').textContent;
	  var bookText = document.querySelector('#bookText').textContent;
	
	  var markovChain = new _markovChain2.default(bookText);
	
	  // initialText = markovChain.generate(1000);
	  var paragraph = new _paragraph2.default(document.body, initialText);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MarkovChain = function () {
	  function MarkovChain(text) {
	    var prefixLength = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
	
	    _classCallCheck(this, MarkovChain);
	
	    this.prefixLength = prefixLength;
	    this.text = text;
	  }
	
	  _createClass(MarkovChain, [{
	    key: '_slurp',
	    value: function _slurp() {
	      var _this = this;
	
	      var words = [].concat.apply([], this.text.split('\n').map(function (line) {
	        return line.split(' ');
	      }));
	      var prefix = words.slice(0, this.prefixLength);
	      words = words.slice(this.prefixLength);
	
	      words.forEach(function (word) {
	        var key = prefix.join(' ');
	        if (_this._data.has(key)) {
	          _this._data.get(key).push(word);
	        } else {
	          _this._data.set(key, [word]);
	        }
	
	        prefix.push(word);
	        prefix.shift();
	      });
	
	      this._serialize();
	    }
	  }, {
	    key: '_serialize',
	    value: function _serialize() {
	      localStorage.setItem('markovChainMap', JSON.stringify([].concat(_toConsumableArray(this._data))));
	    }
	  }, {
	    key: '_deserialize',
	    value: function _deserialize() {
	      this._data = new Map(JSON.parse(localStorage.getItem('markovChainMap')));
	    }
	  }, {
	    key: 'next',
	    value: function next(prefix) {
	      if (!prefix || !this.data.has(prefix)) {
	        throw 'passed null prefix to next';
	      }
	
	      return (0, _utils.choose)(this.data.get(prefix));
	    }
	  }, {
	    key: 'generate',
	    value: function generate(length) {
	      var prefix = (0, _utils.choose)(Array.from(this.data.keys()).filter(function (key) {
	        return key.charAt(0).toUpperCase() === key.charAt(0);
	      })).split(' ');
	      var text = prefix.slice();
	
	      while (text.length < length) {
	        var nextWord = this.next(prefix.join(' '));
	
	        text.push(nextWord);
	
	        prefix.push(nextWord);
	        prefix.shift();
	      }
	
	      return text.join(' ');
	    }
	  }, {
	    key: 'data',
	    get: function get() {
	      if (!this._data) {
	        if (localStorage.getItem('markovChainMap')) {
	          this._deserialize();
	        } else {
	          this._data = new Map();
	          this._slurp();
	          this._serialize();
	        }
	      }
	
	      return this._data;
	    }
	  }]);
	
	  return MarkovChain;
	}();
	
	exports.default = MarkovChain;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._ = _;
	exports.t = t;
	exports.choose = choose;
	function _(name, attrs) {
	  var domNode = document.createElement(name);
	  Object.keys(attrs).forEach(function (attr) {
	    return domNode.setAttribute(attr, attrs[attr]);
	  });
	
	  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    children[_key - 2] = arguments[_key];
	  }
	
	  children.forEach(function (child) {
	    return domNode.appendChild(child);
	  });
	
	  return domNode;
	}
	
	function t(text) {
	  return document.createTextNode(text);
	}
	
	function choose(array) {
	  return array[Math.floor(Math.random() * array.length)];
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(2);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	__webpack_require__(4);
	
	var LineBrokenParagraph = function LineBrokenParagraph(parentNode, text) {
	  var _this = this;
	
	  _classCallCheck(this, LineBrokenParagraph);
	
	  this.text = text;
	
	  var words = this.text.split(' ').map(function (word) {
	    return (0, _utils._)('word', {}, (0, _utils.t)(word));
	  });
	  var children = [].concat.apply([], words.map(function (wordNode, i, words) {
	    return i === words.length - 1 ? [wordNode] : [wordNode, (0, _utils.t)(' ')];
	  }));
	
	  this.domNode = _utils._.apply(undefined, ['p', { class: 'animatedParagraph' }].concat(_toConsumableArray(children))); //t(this.text));
	  this.parentNode = parentNode;
	
	  this.parentNode.appendChild(this.domNode);
	
	  var lines = [[]];
	  words.forEach(function (wordNode, i) {
	    var line = lines.slice(-1)[0];
	    var previous = words[i - 1];
	    if (previous && previous.getBoundingClientRect().top !== wordNode.getBoundingClientRect().top) {
	      console.log("new line at " + wordNode.textContent);
	      lines.push([]);
	      line = lines.slice(-1)[0];
	    }
	
	    line.push(wordNode);
	  });
	
	  while (this.domNode.firstChild) {
	    ;
	    this.domNode.removeChild(this.domNode.firstChild);
	  }
	
	  lines = lines.map(function (lineNodes) {
	    var children = [].concat.apply([], lineNodes.map(function (wordNode, i, line) {
	      return i === line.length - 1 ? [wordNode] : [wordNode, (0, _utils.t)(' ')];
	    }));
	    return _utils._.apply(undefined, ['line', {}].concat(_toConsumableArray(children)));
	  });
	
	  lines.forEach(function (line) {
	    return _this.domNode.appendChild(line);
	  });
	  // this.domNode.style.maxWidth = 'none';
	};
	
	exports.default = LineBrokenParagraph;

/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);
//# sourceMappingURL=markov.bundle.js.map