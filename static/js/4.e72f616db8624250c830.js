webpackJsonp([4],{"57Do":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("yp89"),a=n("7zLi"),i=n("Lokx"),r=n.n(i),l={name:"Dragable",data:function(){return{url_document:"http://element-cn.eleme.io/#/zh-CN/component/table",url_sortablejs:"http://rubaxa.github.io/Sortable/",page:{current:1,limit:8},tableData:[]}},mounted:function(){this.list()},methods:{logTableSort:function(){var t=this.tableData.map(function(t){return t=t.name});console.log(t)},sort:function(){var t=this,e=document.querySelectorAll("#dragTable .el-table__body-wrapper table > tbody")[0];r.a.create(e,{handle:".action-drag",ghostClass:"sortable-ghost",animation:120,setData:function(t){t.setData("Text","")},onEnd:function(e){t.logTableSort()}})},list:function(){var t=this;Object(a.a)(this.page.current,this.page.limit,null).then(function(e){t.page=e.page,t.tableData=e.data.map(function(t){var e=t.date;return"number"==typeof e&&(e=new Date(e)),t.date=Object(o.a)(e,"yyyy-MM-dd"),t}),t.logTableSort(),t.$nextTick(function(){t.sort()})})}}},s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-body table"},[n("h3",{staticClass:"page-title"},[t._v("Drag Table "),n("small",{staticClass:"text-muted"},[t._v("Refers to the table component of the\n    "),n("a",{attrs:{href:t.url_document,target:"_blank"}},[t._v("element ui")])])]),t._v(" "),n("hr"),t._v(" "),n("blockquote",[n("p",[t._v("此功能依赖于"),n("code",[t._v("sortablejs")]),t._v("拖拽排序插件。详细使用方法请移步"),n("a",{attrs:{href:t.url_sortablejs,target:"_blank"}},[t._v("官方文档")]),t._v("。")])]),t._v(" "),n("el-table",{ref:"dragTable",staticStyle:{width:"100%"},attrs:{id:"dragTable","tooltip-effect":"light",stripe:"",data:t.tableData}},[n("el-table-column",{attrs:{prop:"date",label:"Birthday",width:"94"}}),t._v(" "),n("el-table-column",{attrs:{prop:"name",label:"Name",width:"78"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.name))]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"phone",label:"Phone",width:"90"}}),t._v(" "),n("el-table-column",{attrs:{prop:"address",label:"Address","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.address))]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"zip",label:"Postcode",width:"72"}}),t._v(" "),n("el-table-column",{attrs:{prop:"status",label:"Status",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-tag",{attrs:{type:t._f("statusTransStyle")(e.row.status)}},[t._v(t._s(t._f("statusTransName")(e.row.status)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{width:"60",align:"center",label:"Action"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("el-button",{staticClass:"action-drag",attrs:{size:"mini",circle:"",type:"info",icon:"el-icon-rank"}})]}}])})],1)],1)},staticRenderFns:[]};var c=n("VU/8")(l,s,!1,function(t){n("9pwU")},null,null);e.default=c.exports},"9pwU":function(t,e){},Lokx:function(t,e,n){var o,a;
/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */
/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */
!function(i){"use strict";void 0===(a="function"==typeof(o=i)?o.call(e,n,e,t):o)||(t.exports=a)}(function(){"use strict";if("undefined"==typeof window||!window.document)return function(){throw new Error("Sortable.js requires a window with a document")};var t,e,n,o,a,i,r,l,s,c,d,u,h,p,f,g,v,m,b,_,y,D={},w=/\s+/g,T=/left|right|inline/,S="Sortable"+(new Date).getTime(),C=window,E=C.document,x=C.parseInt,k=C.setTimeout,N=C.jQuery||C.Zepto,P=C.Polymer,B=!1,O="draggable"in E.createElement("div"),Y=!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i)&&((y=E.createElement("x")).style.cssText="pointer-events:auto","auto"===y.style.pointerEvents),X=!1,A=Math.abs,M=Math.min,R=[],I=[],j=ot(function(t,e,n){if(n&&e.scroll){var o,a,i,r,d,u,h=n[S],p=e.scrollSensitivity,f=e.scrollSpeed,g=t.clientX,v=t.clientY,m=window.innerWidth,b=window.innerHeight;if(s!==n&&(l=e.scroll,s=n,c=e.scrollFn,!0===l)){l=n;do{if(l.offsetWidth<l.scrollWidth||l.offsetHeight<l.scrollHeight)break}while(l=l.parentNode)}l&&(o=l,a=l.getBoundingClientRect(),i=(A(a.right-g)<=p)-(A(a.left-g)<=p),r=(A(a.bottom-v)<=p)-(A(a.top-v)<=p)),i||r||(r=(b-v<=p)-(v<=p),((i=(m-g<=p)-(g<=p))||r)&&(o=C)),D.vx===i&&D.vy===r&&D.el===o||(D.el=o,D.vx=i,D.vy=r,clearInterval(D.pid),o&&(D.pid=setInterval(function(){if(u=r?r*f:0,d=i?i*f:0,"function"==typeof c)return c.call(h,d,u,t);o===C?C.scrollTo(C.pageXOffset+d,C.pageYOffset+u):(o.scrollTop+=u,o.scrollLeft+=d)},24)))}},30),L=function(t){function e(t,e){return void 0!==t&&!0!==t||(t=n.name),"function"==typeof t?t:function(n,o){var a=o.options.group.name;return e?t:t&&(t.join?t.indexOf(a)>-1:a==t)}}var n={},o=t.group;o&&"object"==typeof o||(o={name:o}),n.name=o.name,n.checkPull=e(o.pull,!0),n.checkPut=e(o.put),n.revertClone=o.revertClone,t.group=n};try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){B={capture:!1,passive:!1}}}))}catch(t){}function U(t,e){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be HTMLElement, and not "+{}.toString.call(t);this.el=t,this.options=e=at({},e),t[S]=this;var n={group:Math.random(),sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,draggable:/[uo]l/i.test(t.nodeName)?"li":">*",ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==U.supportPointer};for(var o in n)!(o in e)&&(e[o]=n[o]);for(var a in L(e),this)"_"===a.charAt(0)&&"function"==typeof this[a]&&(this[a]=this[a].bind(this));this.nativeDraggable=!e.forceFallback&&O,W(t,"mousedown",this._onTapStart),W(t,"touchstart",this._onTapStart),e.supportPointer&&W(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(W(t,"dragover",this),W(t,"dragenter",this)),I.push(this._onDragOver),e.store&&this.sort(e.store.get(this))}function F(e,n){"clone"!==e.lastPullMode&&(n=!0),o&&o.state!==n&&(G(o,"display",n?"none":""),n||o.state&&(e.options.group.revertClone?(a.insertBefore(o,i),e._animate(t,o)):a.insertBefore(o,t)),o.state=n)}function z(t,e,n){if(t){n=n||E;do{if(">*"===e&&t.parentNode===n||nt(t,e))return t}while(t=H(t))}return null}function H(t){var e=t.host;return e&&e.nodeType?e:t.parentNode}function W(t,e,n){t.addEventListener(e,n,B)}function q(t,e,n){t.removeEventListener(e,n,B)}function V(t,e,n){if(t)if(t.classList)t.classList[n?"add":"remove"](e);else{var o=(" "+t.className+" ").replace(w," ").replace(" "+e+" "," ");t.className=(o+(n?" "+e:"")).replace(w," ")}}function G(t,e,n){var o=t&&t.style;if(o){if(void 0===n)return E.defaultView&&E.defaultView.getComputedStyle?n=E.defaultView.getComputedStyle(t,""):t.currentStyle&&(n=t.currentStyle),void 0===e?n:n[e];e in o||(e="-webkit-"+e),o[e]=n+("string"==typeof n?"":"px")}}function $(t,e,n){if(t){var o=t.getElementsByTagName(e),a=0,i=o.length;if(n)for(;a<i;a++)n(o[a],a);return o}return[]}function J(t,e,n,a,i,r,l,s){t=t||e[S];var c=E.createEvent("Event"),d=t.options,u="on"+n.charAt(0).toUpperCase()+n.substr(1);c.initEvent(n,!0,!0),c.to=i||e,c.from=r||e,c.item=a||e,c.clone=o,c.oldIndex=l,c.newIndex=s,e.dispatchEvent(c),d[u]&&d[u].call(t,c)}function Q(t,e,n,o,a,i,r,l){var s,c,d=t[S],u=d.options.onMove;return(s=E.createEvent("Event")).initEvent("move",!0,!0),s.to=e,s.from=t,s.dragged=n,s.draggedRect=o,s.related=a||e,s.relatedRect=i||e.getBoundingClientRect(),s.willInsertAfter=l,t.dispatchEvent(s),u&&(c=u.call(d,s,r)),c}function Z(t){t.draggable=!1}function K(){X=!1}function tt(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,n=e.length,o=0;n--;)o+=e.charCodeAt(n);return o.toString(36)}function et(t,e){var n=0;if(!t||!t.parentNode)return-1;for(;t&&(t=t.previousElementSibling);)"TEMPLATE"===t.nodeName.toUpperCase()||">*"!==e&&!nt(t,e)||n++;return n}function nt(t,e){if(t){var n=(e=e.split(".")).shift().toUpperCase(),o=new RegExp("\\s("+e.join("|")+")(?=\\s)","g");return!(""!==n&&t.nodeName.toUpperCase()!=n||e.length&&((" "+t.className+" ").match(o)||[]).length!=e.length)}return!1}function ot(t,e){var n,o;return function(){void 0===n&&(n=arguments,o=this,k(function(){1===n.length?t.call(o,n[0]):t.apply(o,n),n=void 0},e))}}function at(t,e){if(t&&e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function it(t){return P&&P.dom?P.dom(t).cloneNode(!0):N?N(t).clone(!0)[0]:t.cloneNode(!0)}function rt(t){return k(t,0)}function lt(t){return clearTimeout(t)}return U.prototype={constructor:U,_onTapStart:function(e){var n,o=this,a=this.el,i=this.options,l=i.preventOnFilter,s=e.type,c=e.touches&&e.touches[0],d=(c||e).target,u=e.target.shadowRoot&&e.path&&e.path[0]||d,h=i.filter;if(function(t){var e=t.getElementsByTagName("input"),n=e.length;for(;n--;){var o=e[n];o.checked&&R.push(o)}}(a),!t&&!(/mousedown|pointerdown/.test(s)&&0!==e.button||i.disabled)&&!u.isContentEditable&&(d=z(d,i.draggable,a))&&r!==d){if(n=et(d,i.draggable),"function"==typeof h){if(h.call(this,e,d,this))return J(o,u,"filter",d,a,a,n),void(l&&e.preventDefault())}else if(h&&(h=h.split(",").some(function(t){if(t=z(u,t.trim(),a))return J(o,t,"filter",d,a,a,n),!0})))return void(l&&e.preventDefault());i.handle&&!z(u,i.handle,a)||this._prepareDragStart(e,c,d,n)}},_prepareDragStart:function(n,o,l,s){var c,d=this,u=d.el,h=d.options,f=u.ownerDocument;l&&!t&&l.parentNode===u&&(m=n,a=u,e=(t=l).parentNode,i=t.nextSibling,r=l,g=h.group,p=s,this._lastX=(o||n).clientX,this._lastY=(o||n).clientY,t.style["will-change"]="all",c=function(){d._disableDelayedDrag(),t.draggable=d.nativeDraggable,V(t,h.chosenClass,!0),d._triggerDragStart(n,o),J(d,a,"choose",t,a,a,p)},h.ignore.split(",").forEach(function(e){$(t,e.trim(),Z)}),W(f,"mouseup",d._onDrop),W(f,"touchend",d._onDrop),W(f,"touchcancel",d._onDrop),W(f,"selectstart",d),h.supportPointer&&W(f,"pointercancel",d._onDrop),h.delay?(W(f,"mouseup",d._disableDelayedDrag),W(f,"touchend",d._disableDelayedDrag),W(f,"touchcancel",d._disableDelayedDrag),W(f,"mousemove",d._disableDelayedDrag),W(f,"touchmove",d._disableDelayedDrag),h.supportPointer&&W(f,"pointermove",d._disableDelayedDrag),d._dragStartTimer=k(c,h.delay)):c())},_disableDelayedDrag:function(){var t=this.el.ownerDocument;clearTimeout(this._dragStartTimer),q(t,"mouseup",this._disableDelayedDrag),q(t,"touchend",this._disableDelayedDrag),q(t,"touchcancel",this._disableDelayedDrag),q(t,"mousemove",this._disableDelayedDrag),q(t,"touchmove",this._disableDelayedDrag),q(t,"pointermove",this._disableDelayedDrag)},_triggerDragStart:function(e,n){(n=n||("touch"==e.pointerType?e:null))?(m={target:t,clientX:n.clientX,clientY:n.clientY},this._onDragStart(m,"touch")):this.nativeDraggable?(W(t,"dragend",this),W(a,"dragstart",this._onDragStart)):this._onDragStart(m,!0);try{E.selection?rt(function(){E.selection.empty()}):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(){if(a&&t){var e=this.options;V(t,e.ghostClass,!0),V(t,e.dragClass,!1),U.active=this,J(this,a,"start",t,a,a,p)}else this._nulling()},_emulateDragOver:function(){if(b){if(this._lastX===b.clientX&&this._lastY===b.clientY)return;this._lastX=b.clientX,this._lastY=b.clientY,Y||G(n,"display","none");var t=E.elementFromPoint(b.clientX,b.clientY),e=t,o=I.length;if(t&&t.shadowRoot&&(e=t=t.shadowRoot.elementFromPoint(b.clientX,b.clientY)),e)do{if(e[S]){for(;o--;)I[o]({clientX:b.clientX,clientY:b.clientY,target:t,rootEl:e});break}t=e}while(e=e.parentNode);Y||G(n,"display","")}},_onTouchMove:function(t){if(m){var e=this.options,o=e.fallbackTolerance,a=e.fallbackOffset,i=t.touches?t.touches[0]:t,r=i.clientX-m.clientX+a.x,l=i.clientY-m.clientY+a.y,s=t.touches?"translate3d("+r+"px,"+l+"px,0)":"translate("+r+"px,"+l+"px)";if(!U.active){if(o&&M(A(i.clientX-this._lastX),A(i.clientY-this._lastY))<o)return;this._dragStarted()}this._appendGhost(),_=!0,b=i,G(n,"webkitTransform",s),G(n,"mozTransform",s),G(n,"msTransform",s),G(n,"transform",s),t.preventDefault()}},_appendGhost:function(){if(!n){var e,o=t.getBoundingClientRect(),i=G(t),r=this.options;V(n=t.cloneNode(!0),r.ghostClass,!1),V(n,r.fallbackClass,!0),V(n,r.dragClass,!0),G(n,"top",o.top-x(i.marginTop,10)),G(n,"left",o.left-x(i.marginLeft,10)),G(n,"width",o.width),G(n,"height",o.height),G(n,"opacity","0.8"),G(n,"position","fixed"),G(n,"zIndex","100000"),G(n,"pointerEvents","none"),r.fallbackOnBody&&E.body.appendChild(n)||a.appendChild(n),e=n.getBoundingClientRect(),G(n,"width",2*o.width-e.width),G(n,"height",2*o.height-e.height)}},_onDragStart:function(e,n){var i=this,r=e.dataTransfer,l=i.options;i._offUpEvents(),g.checkPull(i,i,t,e)&&((o=it(t)).draggable=!1,o.style["will-change"]="",G(o,"display","none"),V(o,i.options.chosenClass,!1),i._cloneId=rt(function(){a.insertBefore(o,t),J(i,a,"clone",t)})),V(t,l.dragClass,!0),n?("touch"===n?(W(E,"touchmove",i._onTouchMove),W(E,"touchend",i._onDrop),W(E,"touchcancel",i._onDrop),l.supportPointer&&(W(E,"pointermove",i._onTouchMove),W(E,"pointerup",i._onDrop))):(W(E,"mousemove",i._onTouchMove),W(E,"mouseup",i._onDrop)),i._loopId=setInterval(i._emulateDragOver,50)):(r&&(r.effectAllowed="move",l.setData&&l.setData.call(i,r,t)),W(E,"drop",i),i._dragStartId=rt(i._dragStarted))},_onDragOver:function(r){var l,s,c,p,f=this.el,m=this.options,b=m.group,y=U.active,D=g===b,w=!1,C=m.sort;if(void 0!==r.preventDefault&&(r.preventDefault(),!m.dragoverBubble&&r.stopPropagation()),!t.animated&&(_=!0,y&&!m.disabled&&(D?C||(p=!a.contains(t)):v===this||(y.lastPullMode=g.checkPull(this,y,t,r))&&b.checkPut(this,y,t,r))&&(void 0===r.rootEl||r.rootEl===this.el))){if(j(r,m,this.el),X)return;if(l=z(r.target,m.draggable,f),s=t.getBoundingClientRect(),v!==this&&(v=this,w=!0),p)return F(y,!0),e=a,void(o||i?a.insertBefore(t,o||i):C||a.appendChild(t));if(0===f.children.length||f.children[0]===n||f===r.target&&function(t,e){var n=t.lastElementChild.getBoundingClientRect();return e.clientY-(n.top+n.height)>5||e.clientX-(n.left+n.width)>5}(f,r)){if(0!==f.children.length&&f.children[0]!==n&&f===r.target&&(l=f.lastElementChild),l){if(l.animated)return;c=l.getBoundingClientRect()}F(y,D),!1!==Q(a,f,t,s,l,c,r)&&(t.contains(f)||(f.appendChild(t),e=f),this._animate(s,t),l&&this._animate(c,l))}else if(l&&!l.animated&&l!==t&&void 0!==l.parentNode[S]){d!==l&&(d=l,u=G(l),h=G(l.parentNode));var E=(c=l.getBoundingClientRect()).right-c.left,x=c.bottom-c.top,N=T.test(u.cssFloat+u.display)||"flex"==h.display&&0===h["flex-direction"].indexOf("row"),P=l.offsetWidth>t.offsetWidth,B=l.offsetHeight>t.offsetHeight,O=(N?(r.clientX-c.left)/E:(r.clientY-c.top)/x)>.5,Y=l.nextElementSibling,A=!1;if(N){var M=t.offsetTop,R=l.offsetTop;A=M===R?l.previousElementSibling===t&&!P||O&&P:l.previousElementSibling===t||t.previousElementSibling===l?(r.clientY-c.top)/x>.5:R>M}else w||(A=Y!==t&&!B||O&&B);var I=Q(a,f,t,s,l,c,r,A);!1!==I&&(1!==I&&-1!==I||(A=1===I),X=!0,k(K,30),F(y,D),t.contains(f)||(A&&!Y?f.appendChild(t):l.parentNode.insertBefore(t,A?Y:l)),e=t.parentNode,this._animate(s,t),this._animate(c,l))}}},_animate:function(t,e){var n=this.options.animation;if(n){var o=e.getBoundingClientRect();1===t.nodeType&&(t=t.getBoundingClientRect()),G(e,"transition","none"),G(e,"transform","translate3d("+(t.left-o.left)+"px,"+(t.top-o.top)+"px,0)"),e.offsetWidth,G(e,"transition","all "+n+"ms"),G(e,"transform","translate3d(0,0,0)"),clearTimeout(e.animated),e.animated=k(function(){G(e,"transition",""),G(e,"transform",""),e.animated=!1},n)}},_offUpEvents:function(){var t=this.el.ownerDocument;q(E,"touchmove",this._onTouchMove),q(E,"pointermove",this._onTouchMove),q(t,"mouseup",this._onDrop),q(t,"touchend",this._onDrop),q(t,"pointerup",this._onDrop),q(t,"touchcancel",this._onDrop),q(t,"pointercancel",this._onDrop),q(t,"selectstart",this)},_onDrop:function(r){var l=this.el,s=this.options;clearInterval(this._loopId),clearInterval(D.pid),clearTimeout(this._dragStartTimer),lt(this._cloneId),lt(this._dragStartId),q(E,"mouseover",this),q(E,"mousemove",this._onTouchMove),this.nativeDraggable&&(q(E,"drop",this),q(l,"dragstart",this._onDragStart)),this._offUpEvents(),r&&(_&&(r.preventDefault(),!s.dropBubble&&r.stopPropagation()),n&&n.parentNode&&n.parentNode.removeChild(n),a!==e&&"clone"===U.active.lastPullMode||o&&o.parentNode&&o.parentNode.removeChild(o),t&&(this.nativeDraggable&&q(t,"dragend",this),Z(t),t.style["will-change"]="",V(t,this.options.ghostClass,!1),V(t,this.options.chosenClass,!1),J(this,a,"unchoose",t,e,a,p),a!==e?(f=et(t,s.draggable))>=0&&(J(null,e,"add",t,e,a,p,f),J(this,a,"remove",t,e,a,p,f),J(null,e,"sort",t,e,a,p,f),J(this,a,"sort",t,e,a,p,f)):t.nextSibling!==i&&(f=et(t,s.draggable))>=0&&(J(this,a,"update",t,e,a,p,f),J(this,a,"sort",t,e,a,p,f)),U.active&&(null!=f&&-1!==f||(f=p),J(this,a,"end",t,e,a,p,f),this.save()))),this._nulling()},_nulling:function(){a=t=e=n=i=o=r=l=s=m=b=_=f=d=u=v=g=U.active=null,R.forEach(function(t){t.checked=!0}),R.length=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragover":case"dragenter":t&&(this._onDragOver(e),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.preventDefault()}(e));break;case"mouseover":this._onDrop(e);break;case"selectstart":e.preventDefault()}},toArray:function(){for(var t,e=[],n=this.el.children,o=0,a=n.length,i=this.options;o<a;o++)z(t=n[o],i.draggable,this.el)&&e.push(t.getAttribute(i.dataIdAttr)||tt(t));return e},sort:function(t){var e={},n=this.el;this.toArray().forEach(function(t,o){var a=n.children[o];z(a,this.options.draggable,n)&&(e[t]=a)},this),t.forEach(function(t){e[t]&&(n.removeChild(e[t]),n.appendChild(e[t]))})},save:function(){var t=this.options.store;t&&t.set(this)},closest:function(t,e){return z(t,e||this.options.draggable,this.el)},option:function(t,e){var n=this.options;if(void 0===e)return n[t];n[t]=e,"group"===t&&L(n)},destroy:function(){var t=this.el;t[S]=null,q(t,"mousedown",this._onTapStart),q(t,"touchstart",this._onTapStart),q(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(q(t,"dragover",this),q(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),I.splice(I.indexOf(this._onDragOver),1),this._onDrop(),this.el=t=null}},W(E,"touchmove",function(t){U.active&&t.preventDefault()}),U.utils={on:W,off:q,css:G,find:$,is:function(t,e){return!!z(t,e,t)},extend:at,throttle:ot,closest:z,toggleClass:V,clone:it,index:et,nextTick:rt,cancelNextTick:lt},U.create=function(t,e){return new U(t,e)},U.version="1.7.0",U})}});