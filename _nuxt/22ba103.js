(window.webpackJsonp=window.webpackJsonp||[]).push([[4,14],{263:function(t,e,r){var content=r(279);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(78).default)("46777720",content,!0,{sourceMap:!1})},277:function(t,e,r){var content=r(295);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(78).default)("31fb50fe",content,!0,{sourceMap:!1})},278:function(t,e,r){"use strict";r(263)},279:function(t,e,r){var o=r(77)(!1);o.push([t.i,".tag[data-v-8a0b8748]{font-size:.8em;margin:0 3px;background:#00ffa2;border-radius:5px;padding:3px 7px}.tag[data-v-8a0b8748]:first-child{margin:0 3px 0 0}.tag.nodejs[data-v-8a0b8748]{background:#68a063;color:#fff}.tag.vue[data-v-8a0b8748]{background:#33485e;color:#fff}.tag.nuxt[data-v-8a0b8748]{background:#00dc81}.tag.swift[data-v-8a0b8748]{background:#f05137;color:#fff}.tag.swiftui[data-v-8a0b8748]{background:#0137a2;color:#fff}",""]),t.exports=o},284:function(t,e,r){"use strict";r.r(e);var o={props:["tag"],computed:{tagStyle:function(){switch(this.tag){case"Node.js":return"nodejs";case"Vue":return"vue";case"Swift":return"swift";case"SwiftUI":return"swiftui";default:return""}}}},c=(r(278),r(79)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"tag",class:t.tagStyle},[t._v(t._s(t.tag))])}),[],!1,null,"8a0b8748",null);e.default=component.exports},294:function(t,e,r){"use strict";r(277)},295:function(t,e,r){var o=r(77)(!1);o.push([t.i,".project-scroll[data-v-3a4d5de4]{text-align:left;width:360px;height:130px;display:grid;grid-template-columns:100px 1fr;grid-gap:10px;gap:10px;padding:0 17px 0 5px;align-items:center;margin:0 5px;border-radius:10px;transition:.15s;transition-property:background-color}.project-scroll .project-icon[data-v-3a4d5de4]{width:75px;height:75px;background:var(--fg-accent);justify-self:center;border-radius:200px}.project-scroll .details .title[data-v-3a4d5de4],.project-scroll .details p[data-v-3a4d5de4]{margin:0 0 8px}.project-scroll .details .title[data-v-3a4d5de4]{display:flex;align-items:center}.project-scroll .details .title h2[data-v-3a4d5de4]{margin:0 10px 0 0}.project-scroll .details .title span[data-v-3a4d5de4]{font-size:.9em;margin-top:3px;opacity:.5}.project-scroll .details .tags[data-v-3a4d5de4]{display:flex;align-items:center}.project-scroll[data-v-3a4d5de4]:hover{background-color:var(--fg-accent-hv)}",""]),t.exports=o},319:function(t,e,r){"use strict";r.r(e);var o={props:["project"]},c=(r(294),r(79)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"project-scroll"},[r("div",{staticClass:"project-icon"}),t._v(" "),r("div",{staticClass:"details"},[r("div",{staticClass:"title"},[r("h2",[t._v(t._s(t.project.title))]),t._v(" "),t.project.private?r("span",[t._v("Private")]):t._e()]),t._v(" "),r("p",[t._v(t._s(t.project.desc))]),t._v(" "),r("div",{staticClass:"tags"},t._l(t.project.tags,(function(t){return r("Tag",{key:t,attrs:{tag:t}})})),1)])])}),[],!1,null,"3a4d5de4",null);e.default=component.exports;installComponents(component,{Tag:r(284).default})}}]);