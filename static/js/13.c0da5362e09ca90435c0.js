(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{RV0U:function(t,a,n){"use strict";var e=n("YxtQ");n.n(e).a},S70H:function(t,a,n){"use strict";n.r(a);var e={name:"Notification",metaInfo:{title:"Notifications"},data:function(){return{multipleSelection:[]}},computed:{notifications:function(){return this.$store.getters.notifications}},methods:{transUnreadClass:function(t){return t.unread?"unread":""},handleShowDetail:function(t){var a=this;this.$alert(t.title,"notification",{confirmButtonText:"Ok",callback:function(){a.handleMarkRead(t)}})},handleMarkRead:function(t){t&&t.unread&&this.$store.dispatch("notification_read",[t.id])},handleMarkAllRead:function(){var a=this,t={confirmButtonText:"Mark all",cancelButtonText:"Cancel",callback:function(t){"confirm"===t&&a.$store.dispatch("notification_read_all")}};this.$confirm("You will mark all unread notifications as read.","Are you sure?",t)}}},o=(n("RV0U"),n("KHd+")),i=Object(o.a)(e,function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"va-body-container container-notifications"},[e("h4",{staticClass:"va-body-title"},[n._v("\n    Notifications\n\n    "),n._v(" "),e("span",{staticClass:"options"},[n.notifications.hasUnread?e("el-button",{attrs:{size:"small",plain:""},on:{click:n.handleMarkAllRead}},[n._v("\n        Mark all as read\n      ")]):n._e()],1)]),n._v(" "),e("el-table",{ref:"notifications",staticStyle:{width:"100%"},attrs:{size:"medium","show-header":!1,"highlight-current-row":"","show-overflow-tooltip":"",data:n.notifications.list}},[e("el-table-column",{attrs:{type:"index",label:"#",width:"40"}}),n._v(" "),e("el-table-column",{attrs:{prop:"from",lable:"from",width:"80"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-tag",{attrs:{size:"mini"}},[n._v(n._s(t.row.from))])]}}])}),n._v(" "),e("el-table-column",{attrs:{prop:"title",label:"title","show-overflow-tooltip":""},scopedSlots:n._u([{key:"default",fn:function(a){return[e("a",{class:n.transUnreadClass(a.row),on:{click:function(t){n.handleShowDetail(a.row)}}},[n._v(n._s(a.row.title))])]}}])}),n._v(" "),e("el-table-column",{attrs:{width:"160",label:"date"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("span",[n._v(n._s(n._f("dateFormat")(t.row.date,"yyyy.MM.dd hh:mm:ss")))])]}}])}),n._v(" "),e("el-table-column",{attrs:{width:"120",label:"date"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("span",{class:n.transUnreadClass(t.row)},[n._v(n._s(n._f("dateAgo")(t.row.date)))])]}}])}),n._v(" "),e("el-table-column",{attrs:{label:"options",width:"70",align:"right"},scopedSlots:n._u([{key:"default",fn:function(a){return[a.row.unread?e("el-tooltip",{attrs:{content:"Mark this as read",placement:"left"}},[e("i",{staticClass:"el-icon-check",on:{click:function(t){n.handleMarkRead(a.row)}}})]):n._e()]}}])})],1)],1)},[],!1,null,"242dc971",null);i.options.__file="Notification.vue";a.default=i.exports},YxtQ:function(t,a,n){}}]);