import{r as l,m as f,J as h}from"./DIsr56y4.js";/**
 * @license lucide-vue-next v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-vue-next v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=({size:e,strokeWidth:o=2,absoluteStrokeWidth:r,color:s,iconNode:c,name:u,class:d,...t},{slots:n})=>l("svg",{...a,width:e||a.width,height:e||a.height,stroke:s||a.stroke,"stroke-width":r?Number(o)*24/Number(e):o,class:["lucide",`lucide-${w(u??"icon")}`],...t},[...c.map(i=>l(...i)),...n.default?[n.default()]:[]]);/**
 * @license lucide-vue-next v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(e,o)=>(r,{slots:s})=>l(g,{...r,iconNode:o,name:e},s),p=f("notifications",()=>{const e=h([]);function o(t,n="info"){const i=Date.now().toString()+Math.random().toString(36).substring(2,9);e.value.push({id:i,message:t,type:n}),setTimeout(()=>{d(i)},4e3)}const r=t=>o(t,"success"),s=t=>o(t,"error"),c=t=>o(t,"warning"),u=t=>o(t,"info");function d(t){e.value=e.value.filter(n=>n.id!==t)}return{notifications:e,add:o,success:r,error:s,warning:c,info:u,remove:d}});export{v as c,p as u};
