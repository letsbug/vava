(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{Rsum:function(t,i,n){"use strict";n.r(i);var e={name:"Clipboard",data:function(){return{url:"https://github.com/letsbug/vava",timing:!1}},methods:{clipboard:n("Ueoi").e,onSuccess:function(){var t=this;this.timing=!0,setTimeout(function(){t.timing=!1},3e3)}}},c=(n("kI0S"),n("KHd+")),s=Object(c.a)(e,function(){var i=this,t=i.$createElement,n=i._self._c||t;return n("div",{staticClass:"va-body-container"},[n("h5",[i._v("Direct use")]),i._v(" "),n("el-input",{staticStyle:{width:"400px"},attrs:{readonly:"",disabled:""},model:{value:i.url,callback:function(t){i.url=t},expression:"url"}}),i._v(" "),n("el-button",{staticClass:"copy-handler",attrs:{type:i.timing?"success":"primary",icon:i.timing?"el-icon-check":"el-icon-document",disabled:i.timing},on:{click:function(t){i.clipboard(i.url,t,i.onSuccess)}}},[i._v("\n    "+i._s(i.timing?"Copied":"Copy")+"\n  ")])],1)},[],!1,null,"5a928dd4",null);s.options.__file="index.vue";i.default=s.exports},kI0S:function(t,i,n){"use strict";var e=n("rxV5");n.n(e).a},rxV5:function(t,i,n){}}]);