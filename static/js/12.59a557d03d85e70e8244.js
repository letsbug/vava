(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"6r67":function(n,t,e){"use strict";var i=e("dE5/");e.n(i).a},Zmc7:function(n,t,e){"use strict";e.r(t);var i,c=e("okRf"),o=/\.\/(.*)\.svg/,s=(i=c,i.keys()).map(function(n){return n.match(o)[1]}),a=e("Ueoi"),r={name:"IconViewer",metaInfo:{title:"Icons"},data:function(){return{icons:s}},methods:{generateIconCode:function(n){return'<va-icon icon="'+n+'"/>'},handleClipboard:function(n,t){Object(a.f)(n,t)}}},l=(e("6r67"),e("KHd+")),d=Object(l.a)(r,function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("div",{staticClass:"va-body-container icon-viewer"},[i("h4",{staticClass:"va-body-title"},[e._v("\n    Usage\n  ")]),e._v(" "),i("pre",{directives:[{name:"highlight",rawName:"v-highlight"}]},[e._m(0)]),e._v(" "),e._m(1),e._v(" "),i("el-row",e._l(e.icons,function(t){return i("el-col",{key:t,attrs:{xl:3,lg:4,md:6,sm:6,xs:8}},[i("div",{staticClass:"grid-content",on:{click:function(n){e.handleClipboard(e.generateIconCode(t),n)}}},[i("div",{staticClass:"icon-item"},[i("va-icon",{attrs:{icon:t}}),e._v(" "),i("span",[e._v(e._s(t))])],1)])])}))],1)},[function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("code",{staticClass:"html"},[n._v("\n    Just use "),e("strong",[n._v("va-icon")]),n._v(' component to use icons, Like <va-icon icon="dashboard"/>.\n  ')])},function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("h4",{staticClass:"va-body-title"},[n._v("\n    Icons  \n    "),e("small",{staticClass:"text-muted hidden-sm-and-down"},[n._v("Click them to copy HTML.")])])}],!1,null,"6548cb23",null);d.options.__file="IconViewer.vue";t.default=d.exports},"dE5/":function(n,t,e){}}]);