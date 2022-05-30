function imgIcon(src, alt = '') {return '<img src="' + src + '" alt="' + alt + '">';}
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (factory((global.peditor = {})));
}(this, (function (exports) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var defaultParagraphSeparatorString = 'defaultParagraphSeparator';
  var formatBlock = 'formatBlock';
  var addEventListener = function addEventListener(parent, type, listener) {
    return parent.addEventListener(type, listener);
  };
  var appendChild = function appendChild(parent, child) {
    return parent.appendChild(child);
  };
  var createElement = function createElement(tag) {
    return document.createElement(tag);
  };
  var queryCommandState = function queryCommandState(command) {
    return document.queryCommandState(command);
  };
  var queryCommandValue = function queryCommandValue(command) {
    return document.queryCommandValue(command);
  };

  var exec = function exec(command) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return document.execCommand(command, false, value);
  };

  var defaultActions = {
    bold: {
      icon: imgIcon('assets/icons/bold.svg', 'bold'),
      title: 'Bold',
      state: () => queryCommandState('bold'),
      result: () => exec('bold')
    },
    italic: {
      icon: imgIcon('assets/icons/italic.svg', 'italic'),
      title: 'Italic',
      state: () => queryCommandState('italic'),
      result: () => exec('italic')
    },
    underline: {
      icon: imgIcon('assets/icons/underline.svg', 'underline'),
      title: 'Underline',
      state: () => queryCommandState('underline'),
      result: () => exec('underline')
    },
    strikethrough: {
      icon: '<strike>S</strike>',
      title: 'Strike-through',
      state: () => queryCommandState('strikeThrough'),
      result: () => exec('strikeThrough')
    },
    heading1: {
      icon: '<b>H<sub>1</sub></b>',
      title: 'Heading 1',
      result: () => exec(formatBlock, '<h1>')
    },
    heading2: {
      icon: '<b>H<sub>2</sub></b>',
      title: 'Heading 2',
      result: () => exec(formatBlock, '<h2>')
    },
    paragraph: {
      icon: '&#182;',
      title: 'Paragraph',
      result: () => exec(formatBlock, '<p>')
    },
    quote: {
      icon: '&#8220; &#8221;',
      title: 'Quote',
      result: () => exec(formatBlock, '<blockquote>')
    },
    backColor: {
      name: 'backColor',
      icon: '<div style="background-color:pink;">A</div>',
      title: 'Highlight Color',
      result: () => peditor.exec('backColor', 'pink')
    },
    olist: {
      icon: imgIcon('assets/icons/hash.svg', 'ordered list'),
      title: 'Ordered List',
      result: () => exec('insertOrderedList')
    },
    ulist: {
      icon: imgIcon('assets/icons/list.svg', 'unordered list'),
      title: 'Unordered List',
      result: () => exec('insertUnorderedList')
    },
    code: {
      icon: imgIcon('assets/icons/code.svg', 'code'),
      title: 'Code',
      result: () => exec(formatBlock, '<pre>')
    },
    line: {
      icon: imgIcon('assets/icons/minus.svg', 'Horizontal Line'),
      title: 'Horizontal Line',
      result: () => exec('insertHorizontalRule')
    },
    link: {
      icon: imgIcon('assets/icons/link.svg', 'link'),
      title: 'Link',
      result: () => {
        const url = window.prompt('Enter the link URL')
        if (url) exec('createLink', url)
      }
    },
    image: {
      icon: imgIcon('assets/icons/image.svg', 'image'),
      title: 'Image',
      result: () => {
        const url = window.prompt('Enter the image URL')
        if (url) exec('insertImage', url)
      }
    }
  };

  var defaultClasses = {
    menubar: 'peditor-menubar',
    btn: 'peditor-btn',
    content: 'peditor-content',
    selected: 'peditor-btn-selected'
  };

  var init = function init(settings) {
    var actions = settings.actions ? settings.actions.map(function (action) {
      if (typeof action === 'string') return defaultActions[action]; else if (defaultActions[action.name]) return _extends({}, defaultActions[action.name], action);
      return action;
    }) : Object.keys(defaultActions).map(function (action) {
      return defaultActions[action];
    });

    var classes = _extends({}, defaultClasses, settings.classes);

    var defaultParagraphSeparator = settings[defaultParagraphSeparatorString] || 'div';

    var menubar = createElement('div');
    menubar.className = classes.menubar;
    appendChild(settings.element, menubar);

    var content = settings.element.content = createElement('div');
    content.contentEditable = true;
    content.className = classes.content;
    content.oninput = function (_ref) {
      var firstChild = _ref.target.firstChild;

      if (firstChild && firstChild.nodeType === 3) exec(formatBlock, '<' + defaultParagraphSeparator + '>'); else if (content.innerHTML === '<br>') content.innerHTML = '';
      settings.onChange(content.innerHTML);
    };
    content.onkeydown = function (event) {
      if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
        setTimeout(function () {
          return exec(formatBlock, '<' + defaultParagraphSeparator + '>');
        }, 0);
      }
    };
    appendChild(settings.element, content);

    actions.forEach(function (action) {
      var btn = createElement('button');
      btn.className = classes.btn;
      btn.innerHTML = action.icon;
      btn.title = action.title;
      btn.setAttribute('type', 'button');
      btn.onclick = function () {
        return action.result() && content.focus();
      };

      if (action.state) {
        var handler = function handler() {
          return btn.classList[action.state() ? 'add' : 'remove'](classes.selected);
        };
        addEventListener(content, 'keyup', handler);
        addEventListener(content, 'mouseup', handler);
        addEventListener(btn, 'click', handler);
      }

      appendChild(menubar, btn);
    });

    if (settings.styleWithCSS) exec('styleWithCSS');
    exec(defaultParagraphSeparatorString, defaultParagraphSeparator);

    return settings.element;
  };

  var peditor = { exec: exec, init: init };

  exports.exec = exec;
  exports.init = init;
  exports['default'] = peditor;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
