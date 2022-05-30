function imgIcon(e,t=""){return'<img src="'+e+'" alt="'+t+'">'}!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.peditor={})}(this,function(e){"use strict";function s(e,t,n){return e.addEventListener(t,n)}function c(e,t){return e.appendChild(t)}function l(e){return document.createElement(e)}function t(e){return document.queryCommandState(e)}function a(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;return document.execCommand(e,!1,t)}function n(t){var e=t.actions?t.actions.map(function(e){return"string"==typeof e?g[e]:g[e.name]?u({},g[e.name],e):e}):Object.keys(g).map(function(e){return g[e]}),i=u({},p,t.classes),n=t[d]||"div",o=l("div");o.className=i.menubar,c(t.element,o);var r=t.element.content=l("div");return r.contentEditable=!0,r.className=i.content,r.oninput=function(e){e=e.target.firstChild;e&&3===e.nodeType?a(m,"<"+n+">"):"<br>"===r.innerHTML&&(r.innerHTML=""),t.onChange(r.innerHTML)},r.onkeydown=function(e){"Enter"===e.key&&"blockquote"===(e=m,document.queryCommandValue(e))&&setTimeout(function(){return a(m,"<"+n+">")},0)},c(t.element,r),e.forEach(function(e){var t,n=l("button");n.className=i.btn,n.innerHTML=e.icon,n.title=e.title,n.setAttribute("type","button"),n.onclick=function(){return e.result()&&r.focus()},e.state&&(s(r,"keyup",t=function(){return n.classList[e.state()?"add":"remove"](i.selected)}),s(r,"mouseup",t),s(n,"click",t)),c(o,n)}),t.styleWithCSS&&a("styleWithCSS"),a(d,n),t.element}var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,i=arguments[t];for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},d="defaultParagraphSeparator",m="formatBlock",g={bold:{icon:imgIcon("assets/icons/bold.svg","bold"),title:"Bold",state:()=>t("bold"),result:()=>a("bold")},italic:{icon:imgIcon("assets/icons/italic.svg","italic"),title:"Italic",state:()=>t("italic"),result:()=>a("italic")},underline:{icon:imgIcon("assets/icons/underline.svg","underline"),title:"Underline",state:()=>t("underline"),result:()=>a("underline")},strikethrough:{icon:"<strike>S</strike>",title:"Strike-through",state:()=>t("strikeThrough"),result:()=>a("strikeThrough")},heading1:{icon:"<b>H<sub>1</sub></b>",title:"Heading 1",result:()=>a(m,"<h1>")},heading2:{icon:"<b>H<sub>2</sub></b>",title:"Heading 2",result:()=>a(m,"<h2>")},paragraph:{icon:"&#182;",title:"Paragraph",result:()=>a(m,"<p>")},quote:{icon:"&#8220; &#8221;",title:"Quote",result:()=>a(m,"<blockquote>")},backColor:{name:"backColor",icon:'<div style="background-color:pink;">A</div>',title:"Highlight Color",result:()=>i.exec("backColor","pink")},olist:{icon:imgIcon("assets/icons/hash.svg","ordered list"),title:"Ordered List",result:()=>a("insertOrderedList")},ulist:{icon:imgIcon("assets/icons/list.svg","unordered list"),title:"Unordered List",result:()=>a("insertUnorderedList")},code:{icon:imgIcon("assets/icons/code.svg","code"),title:"Code",result:()=>a(m,"<pre>")},line:{icon:imgIcon("assets/icons/minus.svg","Horizontal Line"),title:"Horizontal Line",result:()=>a("insertHorizontalRule")},link:{icon:imgIcon("assets/icons/link.svg","link"),title:"Link",result:()=>{var e=window.prompt("Enter the link URL");e&&a("createLink",e)}},image:{icon:imgIcon("assets/icons/image.svg","image"),title:"Image",result:()=>{var e=window.prompt("Enter the image URL");e&&a("insertImage",e)}}},p={menubar:"peditor-menubar",btn:"peditor-btn",content:"peditor-content",selected:"peditor-btn-selected"},i={exec:a,init:n};e.exec=a,e.init=n,e.default=i,Object.defineProperty(e,"__esModule",{value:!0})});