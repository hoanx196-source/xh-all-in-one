(()=>{const P="__FBAIO_MAGNIFY_IMAGE__",N="magnify_image_ctrl_enabled",O="magnify_image_auto_largest_src_enabled",Y="ufs_magnify_image_size";if(window[P])return;window[P]=!0,console.log("xH all in one: magnify image ENABLED");const v={mouse:{x:0,y:0},autoLargestImageSrcEnabled:!0,hoverMinSize:{width:20,height:20}};let M=null;const b={none:"none",transparent:"transparent",dark:"dark",light:"light"},lt=`Google lens | https://lens.google.com/uploadbyurl?url=#t#
Google image | https://www.google.com/searchbyimage?safe=off&sbisrc=1&image_url=#t#
Yandex | https://yandex.com/images/search?source=collections&rpt=imageview&url=#t#
SauceNAO | https://saucenao.com/search.php?db=999&url=#t#
IQDB | https://iqdb.org/?url=#t#
3D IQDB | https://3d.iqdb.org/?url=#t#
Baidu | https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&promotion_name=pc_image_shituindex&extUiData%5bisLogoShow%5d=1&image=#t#
Bing | https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIVSP&sbisrc=UrlPaste&q=imgurl:#t#
TinEye | https://www.tineye.com/search?url=#t#
Sogou | https://pic.sogou.com/ris?query=#t#
360 | http://st.so.com/stu?imgurl=#t#
WhatAnime | https://trace.moe/?url=#t#
Ascii2D | https://ascii2d.net/search/url/#t#
Trace Moe | https://trace.moe/?url=#t#
KarmaDecay | http://karmadecay.com/#t#
QRCode decode | https://zxing.org/w/decode?full=true&u=#t#
QRCode | https://hoothin.com/qrcode/##t#
ImgOps | https://imgops.com/#b#`,V=["src","_src","href","xlink:href","poster","data-lazy-src","org_src","data-lazy","data-url","data-orig-file","zoomfile","file","original","load-src","imgsrc","real_src","src2","origin-src","data-lazyload","data-lazyload-src","data-lazy-load-src","data-ks-lazyload","data-ks-lazyload-custom","data-src","data-defer-src","data-actualsrc","data-cover","data-original","data-thumb","data-imageurl","data-placeholder","lazysrc"];window.addEventListener("mousemove",t=>{v.mouse.x=t.clientX,v.mouse.y=t.clientY}),ut(),st(),ct(),ft(),window===window.top&&(dt(),window.addEventListener("message",async t=>{const{data:e,type:i}=t.data||{};if(i!=="fbaio-magnify-image-hover")return;let o=e?.largestResolved?e?.srcs:await G(e?.srcs);o?.length>1?nt(o,e?.x,e?.y):o?.length===1&&K(o[0],e?.x,e?.y)}));async function st(){Q(await q(O,!0)),B()?.storage?.onChanged?.addListener?.((t,e)=>{e==="local"&&t?.[O]&&Q(t[O].newValue!==!1)})}function Q(t){v.autoLargestImageSrcEnabled=t!==!1}async function ct(){Z(await q(Y,"20x20")),B()?.storage?.onChanged?.addListener?.((t,e)=>{e==="local"&&t?.[Y]&&Z(t[Y].newValue)})}function Z(t){v.hoverMinSize=J(t)}function J(t){if(typeof t=="string"){const[o,a]=t.split("x");return J({width:o,height:a})}const e=tt(t?.width),i=tt(t?.height);return{width:e??20,height:i??20}}function tt(t){const e=Number(t);return Number.isFinite(e)?Math.max(0,Math.round(e)):null}async function dt(){et(await q(N,!0)),B()?.storage?.onChanged?.addListener?.((t,e)=>{e==="local"&&t?.[N]&&et(t[N].newValue!==!1)})}function et(t){if(!t){M?.(),M=null;return}M||(M=vt("Control",()=>{let e=X();gt(e.x,e.y)}))}function q(t,e){return new Promise(i=>{const o=B(),a=o?.storage?.local;if(!a?.get){i(e);return}try{a.get([t],s=>{if(o?.runtime?.lastError){i(e);return}i(s?.[t]??e)})?.then?.(s=>{i(s?.[t]??e)},()=>i(e))}catch{i(e)}})}function B(){return globalThis.chrome||globalThis.browser||null}function ft(){let t=null,e=document.createElement("div");e.id="fbaio-magnify-image-hover-div",e.title="Useful-script: Click to magnify",e.classList.add("hide"),e.addEventListener("click",async a=>{if(a.preventDefault(),a.stopPropagation(),!t)return;const l=v.autoLargestImageSrcEnabled,s=await G(t?.srcs);window.top.postMessage({type:"fbaio-magnify-image-hover",data:{srcs:s,largestResolved:l,x:t?.rect?.left,y:t?.rect?.top}},"*")});function i(){e.isConnected||(document.body||document.documentElement).appendChild(e)}i(),new MutationObserver(i).observe(document.documentElement,{childList:!0}),window.addEventListener("mouseover",a=>{const l=a.target;if(!l||l===e)return;const{width:s,height:n}=v.hoverMinSize;if(l.clientWidth<s||l.clientHeight<n)return;let c=it(l);if(!c?.length){e.classList.toggle("hide",l!==e);return}let d=xt(l);(d.width<30||d.height<30)&&(d.top-=d.width/2,d.left-=d.height/2),d.left=Math.max(d.left,0),d.top=Math.max(d.top,0),t={srcs:c,rect:d,target:l},e.style.left=d.left+"px",e.style.top=d.top+"px",e.classList.toggle("hide",!1)},!0)}function ut(){const t="fbaio-magnify-image-css";if(document.querySelector("#"+t))return;let e=document.createElement("style");e.id=t,e.textContent=`
.fbaio-click-to-magnify-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 16777270;
}

/* --------------------- Choose image ------------------------- */
#fbaio-magnify-choose-image {
  position: fixed;
  width: 0;
  height: 0;
  opacity: 0;
  border-radius: 50%;
  background-color: #000b;
  z-index: 16777270;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease, background 0s ease;
}

#fbaio-magnify-choose-image .fbaio-img-container {
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;
}

#fbaio-magnify-choose-image .fbaio-con {
  position: relative;
}

#fbaio-magnify-choose-image .fbaio-size {
  position: absolute;
  top: 0px;
  left: 0px;
  color: #eee;
  background-color: #0005;
  opacity: 0.5;
  z-index: 2;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.2s ease;
  pointer-events: none;
}

#fbaio-magnify-choose-image .fbaio-con:hover .fbaio-size {
  opacity: 1;
  background-color: #000a;
}

#fbaio-magnify-choose-image img {
  max-width: 300px;
  max-height: 300px;
  min-width: 50px;
  min-height: 50px;
  object-fit: contain;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
}

#fbaio-magnify-choose-image .fbaio-con:hover img {
  transform: scale(1.1);
  z-index: 2;
  box-shadow: 0 0 10px #fffa;
}

/* --------------------- Magnify image --------------------- */

#fbaio-magnify-image * {
  font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif !important;
  font-size: 14px !important;
}

#fbaio-magnify-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000b;
  z-index: 2147483647;
  overflow: hidden;
  text-align: left !important;
}

.fbaio-toolbar {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  z-index: 2;
  text-align: center;
  width: max-content;
}

#fbaio-magnify-image img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  cursor: zoom-out;
}

.fbaio-btn {
  cursor: pointer;
  padding: 10px;
  margin: 0;
  line-height: 100%;
  background-color: #111d;
  z-index: 1;
  min-width: 10px;
  border: none;
  user-select: none;
}

.fbaio-btn:hover {
  background: #555d;
}

.fbaio-desc {
  position: absolute;
  top: 0;
  opacity: 0;
  background: #333;
  padding: 0 10px 5px;
  border-radius: 0 0 5px 5px;
  pointer-events: none;
  z-index: 0;
  inline-size: max-content;
  transition: all 0.3s ease;
}

.fbaio-toolbar:hover .fbaio-desc {
  top: 100%;
  opacity: 1;
}

#fbaio-magnify-image img {
  transition: transform 0.15s ease, opacity 0.5s ease 0.15s;
}

#fbaio-magnify-image .fbaio-img-anim {
  position: fixed;
  transition: all 0.3s ease !important;
  transform-origin: center;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background-color: #fffa;
  border-radius: 50%;
}


#fbaio-magnify-image .fbaio-dropdown-menu {
  position: relative;
}

#fbaio-magnify-image .fbaio-dropdown-menu:hover ul {
  opacity: 1;
  height: max-content;
}

#fbaio-magnify-image .fbaio-dropdown-menu ul {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  border-radius: 0 0 5px 5px;
  list-style: none;
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.2s ease;
}

#fbaio-magnify-image .fbaio-dropdown-menu ul li {
  padding: 5px;
  text-align: left;
}

#fbaio-magnify-image-hover-div {
  position: fixed;
  top: -100vh;
  left: -100vw;
  width: 15px;
  height: 15px;
  z-index: 99999999;
  background-color: #3339;
  border: 1px #eee9 solid;
  border-radius: 50%;
  transition: all 0.2s ease;
  transform: translate(-50%, -50%);
  cursor: pointer;
  opacity: 0.5;
}

#fbaio-magnify-image-hover-div:hover {
  background-color: #eee9;
  border: 1px #3339 solid;
  width: 30px;
  height: 30px;
  opacity: 1;
}

#fbaio-magnify-image-hover-div.hide {
  opacity: 0;
  display: block !important;
}

#fbaio-magnify-image-hover-div.hide:not(:hover) {
  opacity: 0;
  transition: all 0.2s 2s ease;
}
`,(document.head||document.documentElement).appendChild(e)}function X(){return v.mouse}function D(t,e){if(t==null||e==null){let i=X();return{x:i.x??t??0,y:i.y??e??0}}return{x:t,y:e}}function gt(t,e){let i=D(t,e),o,a=!1;setTimeout(()=>{a||(o=yt(i.x,i.y,40,"","background: #eee9;"))},100),bt(t,e).then(async l=>{if(a=!0,o?.(),!l?.length){j({msg:"Useful-script: No image found",x:i.x,y:i.y,align:"left"});return}const s=await G(l.map(n=>n.src));s?.length?s.length===1?K(s[0],i.x,i.y):nt(s,i.x,i.y):j({msg:"Useful-script: No image found",x:i.x,y:i.y,align:"left"})})}async function G(t){if(Array.isArray(t)||(t=t?[t]:[]),!t.length||!v.autoLargestImageSrcEnabled)return t;const e=await Promise.all(t.map(async i=>{if(!/^https?:\/\//i.test(i))return i;try{v.largestImageSrcModule=v.largestImageSrcModule||import("./helper/largest-image-src.js");const{getLargestImageSrc:o}=await v.largestImageSrcModule;return await o(i,location.href)||i}catch(o){return console.log("ERROR resolveLargestImageSrcs: ",o),i}}));return Array.from(new Set(e.filter(Boolean)))}function mt(t){try{return new URL(t,location.href).href}catch{return t}}function ht(t){return!t||t.nodeName?.toUpperCase?.()==="HTML"||t.nodeName==="#document"?!1:["","::before","::after"].map(e=>{let o=window.getComputedStyle(t,e).backgroundImage;return o?o.split(",").map(s=>s.match(/url\((['"]?)(.*?)\1\)/)?.[2]).filter(s=>s!==null):null}).flat().filter(e=>e)}function it(t){if(!t)return null;let e=[()=>{let o=t.srcset||t.getAttribute?.("srcset");if(!o){let a=t.children;if(a?.length){o="";for(let l=0;l<a.length;l++){let s=a[l].srcset;s&&(o+=s+", ")}}}if(o)return pt(o)},()=>{for(let o in V){let a=V[o],l=a in t?t[a]:t.getAttribute?.(a);if(!/\bimagecover\.\w+$/i.test(l)&&l)return l}},()=>ht(t),()=>{if(/image/i.test(t.tagName))return t.getAttribute("href");if(/svg/i.test(t.tagName))return[Lt(t),Et(t)];if(/canvas/i.test(t.tagName))return t.toDataURL();if(/video/i.test(t.tagName)){let o=document.createElement("canvas");o.width=t.videoWidth,o.height=t.videoHeight,o.getContext("2d").drawImage(t,0,0);let a=o.toDataURL();return o.remove(),a}}],i=[];for(let o of e)try{let a=o();a&&a?.length&&(Array.isArray(a)||(a=[a]),i=i.concat(a.map(l=>mt(l))))}catch{}return Array.from(new Set(i.filter(Boolean)))}function ot(t){let e=[],i=t.children;if(i?.length){e=e.concat(Array.from(i));for(let o of i)e=e.concat(ot(o))}return e}function pt(t){let e=t.split(/[xw],/i),i=-1,o=null;return e.length?(e.forEach(a=>{let l=a.trim().split(/(\s+|%20)/),s=parseInt(l[2]||0);l[0]&&s>i&&(i=s,o=l[0])}),o):null}async function bt(t,e){let i=Array.from(document.querySelectorAll("*")),o=D(t,e),a=[];if(i=i.reverse().filter(s=>{let n=s.getBoundingClientRect(),c=n.left<=o.x&&n.right>=o.x&&n.top<=o.y&&n.bottom>=o.y;if(c&&/picture|img/i.test(s.tagName)){let d=Array.from(s.querySelectorAll("source"));d?.length&&(a=a.concat(d))}return c}),i=i.concat(a),i=i.concat(i.slice(0,4).map(s=>ot(s)).flat()),!i.length)return null;let l=[];for(let s of i){let n=it(s);n&&n?.length&&(Array.isArray(n)||(n=[n]),n.forEach(c=>{l.find(d=>d.src===c)||l.push({src:c,ele:s})}))}if(l.length>1){let s=[/source/i,/img/i,/picture/i,/image/i,/a/i];l=l.sort((n,c)=>{let d=s.findIndex(g=>g.test(n.src)),r=s.findIndex(g=>g.test(c.src));return d=d===-1?100:d,r=r===-1?100:r,r-d})}return l.filter(({ele:s})=>!/iframe/i.test(s.tagName))}function at(t,e,i,o,a){const l=t/e;let s=i,n=i/l;return n>o&&(n=o,s=o*l),s>i&&(s=i,n=i/l),s<a&&(s=a,n=a/l),n<a&&(n=a,s=a*l),{width:s,height:n}}function nt(t,e,i){let{x:o,y:a}=D(e,i),l="fbaio-magnify-choose-image",s=document.getElementById(l);s&&s.remove();let n=document.createElement("div");n.id=l,n.style.cssText=`
      top: ${a}px;
      left: ${o}px;
    `,n.onclick=h=>{h.preventDefault(),(h.target===n||h.target===L)&&n.remove()},document.body.appendChild(n);let c=document.createElement("div");c.classList.add("fbaio-toolbar"),n.appendChild(c);let d=[b.none,b.dark,b.light],r=(Number(localStorage.getItem("fbaio-magnify-image-bg-choose-image"))||0)-1,g=document.createElement("div");g.classList.add("fbaio-btn"),g.innerText="B",g.ufs_title="Change background",g.onclick=()=>{switch(r=(r+1)%d.length,n.style.background="",d[r]){case b.none:n.style.background="#000b";break;case b.dark:n.style.background="rgba(30, 30, 30, 1)";break;case b.light:n.style.background="rgba(240, 240, 240, 1)";break}g.innerText="BG "+d[r],localStorage.setItem("fbaio-magnify-image-bg-choose-image",r)},c.appendChild(g);let k=document.createElement("div");k.classList.add("fbaio-desc"),k.innerText="Choose image",c.appendChild(k),c.addEventListener("mousemove",h=>{if(h.target!==c&&h.target?.ufs_title&&h.target?.ufs_title!==k.textContent){k.textContent=h.target.ufs_title;let A=h.target.offsetLeft+h.target.offsetWidth/2-k.offsetWidth/2;k.style.cssText=`left: ${A}px`}}),setTimeout(()=>{n.style.top=0,n.style.left=0,n.style.width="100vw",n.style.height="100vh",n.style.opacity=1,n.style.borderRadius="0"},0);let L=document.createElement("div");L.classList.add("fbaio-img-container");let w=[];for(let h=0;h<t.length;h++){let A=t[h],T=document.createElement("div");T.classList.add("fbaio-con"),L.appendChild(T);let u=document.createElement("div");u.classList.add("fbaio-size"),T.appendChild(u);let m=document.createElement("img");m.src=A,m.onload=()=>{u.innerText=`${m.naturalWidth} x ${m.naturalHeight}`,m.setAttribute("loaded",!0),w.length===1&&(m.click(),n.click())},m.onerror=()=>{u.remove(),m.remove(),w.splice(h,1),w.length===1&&w[0].getAttribute("loaded")&&(w[0].click(),n.click())},m.onclick=()=>{let p=X();K(A,p.x,p.y)},w.push(m),T.appendChild(m)}n.appendChild(L),g.click()}function K(t,e,i,o=()=>{}){const{x:a,y:l}=D(e,i),s="fbaio-magnify-image",n=document.getElementById(s);n&&n.remove();let c=document.createElement("div");c.id=s,c.innerHTML=`
      <div class="fbaio-img-anim" style="top: ${l}px; left: ${a}px;"></div>
      <img
        src="${t}"
        style="
          top: ${window.innerHeight/2}px;
          left: ${window.innerWidth/2}px;
          transform-origin: center;
          transform: translate(-50%, -50%) !important;
          max-width: 100vw;
          max-height: 100vh;
          opacity: 0;
        "/>
      <div class="fbaio-toolbar">
        <div class="fbaio-btn" ufs_title="Original size">Size</div>
        <div class="fbaio-btn" ufs_title="Toggle original size">Z</div>
        <div class="fbaio-btn" ufs_title="Toggle background">B</div>
        <div class="fbaio-btn" ufs_title="Flip horizontal">\u2194</div>
        <div class="fbaio-btn" ufs_title="Flip vertical">\u2195</div>
        <div class="fbaio-btn" ufs_title="Rotate left">\u21BA</div>
        <div class="fbaio-btn" ufs_title="Rotate right">\u21BB</div>
        <div class="fbaio-btn" ufs_title="Open in new tab">\u2197</div>
        <div class="fbaio-btn" ufs_title="Download">\u2B07\uFE0F</div>
        <div class="fbaio-btn fbaio-dropdown-menu" ufs_title="">\u{1F50E} Search by image
          <ul>
          ${lt.split(`
`).map(f=>{let[y,C]=f.split(" | ");return`<li class="fbaio-btn" data-url="${C}">${y}</li>`}).join("")}
          </ul>
        </div>
        <div class="fbaio-desc"></div>
      </div>
    `,document.body.appendChild(c);const d=c.querySelector(".fbaio-img-anim"),r=c.querySelector("img"),g=c.querySelector(".fbaio-toolbar"),[k,L,w,h,A,T,u,m,p,_]=Array.from(g.querySelectorAll(".fbaio-btn")),S=g.querySelector(".fbaio-desc");function z(){if(r.naturalWidth&&r.naturalHeight){let f=_t(r.naturalWidth,r.naturalHeight);k.innerText=`${r.naturalWidth} x ${r.naturalHeight}`+(f?` ~ ${f}`:"")}}function E(){if(r.naturalWidth&&r.naturalHeight){let f=(parseFloat(r.style.width)/r.naturalWidth).toFixed(1);parseInt(f)==f&&(f=parseInt(f)),L.innerText=`${f}x`}}const{destroy:H,animateTo:F}=wt(r,c,f=>{("width"in f||"height"in f)&&E()});let U;setTimeout(()=>{U=rt(d,40)},500),c.addEventListener("click",f=>{f.target===c&&(c.remove(),c=null,H(),o?.())});let W=!1;r.onload=()=>{let f=r.naturalWidth,y=r.naturalHeight;if(W){let C=f/y;r.style.height=`${parseInt(r.style.width)/C}px`}else{W=!0;let C=at(f,y,Math.max(window.innerWidth-100,400),Math.max(window.innerHeight-100,400),100);r.style.width=`${C.width}px`,r.style.height=`${C.height}px`,r.style.opacity=1,U?.(),d.style.top=r.style.top,d.style.left=r.style.left,d.style.width=r.style.width,d.style.height=r.style.height,d.style.borderRadius=0,d.style.opacity=0,setTimeout(()=>{d.remove()},300)}z(),E()},r.onerror=()=>{j({msg:"Failed to load image"})},L.onclick=()=>{let f=r.naturalWidth,y=r.naturalHeight;if(parseInt(r.style.width)===f&&parseInt(r.style.height)===y){let C=at(f,y,Math.max(window.innerWidth-100,400),Math.max(window.innerHeight-100,400),100);f=C.width,y=C.height}F(window.innerWidth/2,window.innerHeight/2,f,y),E()};const $=[b.none,b.transparent,b.dark,b.light];let I=(Number(localStorage.getItem("fbaio-magnify-image-bg"))||0)-1;w.onclick=()=>{switch(I=(I+1)%$.length,r.style.background="",$[I]){case b.none:break;case b.transparent:r.style.cssText+="background: linear-gradient(45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0.4) 100%) 0 0 / 20px 20px, linear-gradient(45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0.4) 100%) 10px 10px / 20px 20px !important;";break;case b.dark:r.style.background="rgba(30, 30, 30, 1)";break;case b.light:r.style.background="rgba(240, 240, 240, 1)";break}w.innerText="BG "+$[I],localStorage.setItem("fbaio-magnify-image-bg",I)},w.click();const x={flip_horizontal:!1,flip_vertical:!1,rotate:0};h.onclick=()=>{x.flip_horizontal?(r.style.transform=r.style.transform.replace("scaleX(-1)",""),x.flip_horizontal=!1):(r.style.transform+=" scaleX(-1)",x.flip_horizontal=!0)},A.onclick=()=>{x.flip_vertical?(r.style.transform=r.style.transform.replace("scaleY(-1)",""),x.flip_vertical=!1):(r.style.transform+=" scaleY(-1)",x.flip_vertical=!0)},T.onclick=()=>{r.style.transform=r.style.transform.replace(`rotate(${x.rotate}deg)`,""),x.rotate-=90,r.style.transform+=` rotate(${x.rotate}deg)`},u.onclick=()=>{r.style.transform=r.style.transform.replace(`rotate(${x.rotate}deg)`,""),x.rotate+=90,r.style.transform+=` rotate(${x.rotate}deg)`},m.onclick=()=>{if(/^data:image\/svg/.test(r.src)){const f=St(r.src);window.open(f,"_blank")}else window.open(r.src,"_blank")},_.querySelectorAll("li.fbaio-btn").forEach(f=>{f.onclick=async y=>{y.preventDefault(),window.open(f.getAttribute("data-url").replace("#b#",r.src.replace(/https?:\/\//i,"")).replace("#t#",encodeURIComponent(r.src)),"_blank","width=1024, height=768, toolbar=1, menubar=1, titlebar=1")}}),p.onclick=()=>{Ct(r.src)},g.onmousemove=f=>{if(f.target!==g&&f.target.attributes.ufs_title&&f.target.attributes.ufs_title.textContent!==S.textContent){S.textContent=f.target.attributes.ufs_title.textContent;let y=f.target.offsetLeft+f.target.offsetWidth/2-S.offsetWidth/2;S.style.cssText=`left: ${y}px`}}}function yt(t,e,i=40,o="",a=""){let l=document.createElement("div");return l.style.cssText=`
      position: fixed;
      left: ${t-i/2}px;
      top: ${e-i/2}px;
      width: ${i}px;
      height: ${i}px;
      z-index: 2147483647;
      pointer-events: none;
      user-select: none;
      ${o}
    `,rt(l,i,a),document.body.appendChild(l),()=>l.remove()}function rt(t,e=Math.min(t?.clientWidth,t?.clientHeight)||0,i=""){let o=Math.random().toString(36).substr(2,9);t.classList.add("fbaio-loading-"+o);let a=4,l=document.createElement("style");return l.id="fbaio-loading-style-"+o,l.textContent=`
      .fbaio-loading-${o}::after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: ${e}px;
        height: ${e}px;
        margin-top: -${e/2}px;
        margin-left: -${e/2}px;
        border-radius: 50%;
        border: ${a}px solid #555 !important;
        border-top-color: #eee !important;
        animation: fbaio-spin 1s ease-in-out infinite;
        box-sizing: border-box !important;
        ${i}
      }
      @keyframes fbaio-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,(document.head||document.documentElement).appendChild(l),()=>{t&&t.classList.remove("fbaio-loading-"+o)}}function R(t,e,i,o){return t.addEventListener(e,i,o),()=>t.removeEventListener(e,i,o)}function wt(t,e,i){const o="fbaio-drag-and-zoom";t.classList.add(o);let a=document.createElement("style");a.textContent=`
      .${o} {
        cursor: grab;
        position: relative !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -khtml-user-select: none;
        max-width: unset !important;
        max-height: unset !important;
        min-width: unset !important;
        min-height: unset !important;
        -webkit-user-drag: none !important;
      }`,(e||t).appendChild(a);const l=.3,s={x:0,y:0},n={x:0,y:0},c={left:parseFloat(t.style.left),top:parseFloat(t.style.top),width:parseFloat(t.style.width),height:parseFloat(t.style.height)};let d=!0;function r(){let u=!1,m={};for(let p in c){const _=parseFloat(t.style[p]),S=c[p];let z=Math.abs(S-_);if(z>.1){const E=z<1?S:kt(_,S,l);t.style[p]=E+"px",m[p]=E,u=!0}}u&&i?.(m),d&&requestAnimationFrame(r)}r();let g=!1,k=R(e||t,"mousedown",function(u){u.preventDefault(),g=!0,s.x=u.clientX,s.y=u.clientY,t.style.cursor="grabbing"}),L=R(document,"mousemove",function(u){if(n.x=u.clientX,n.y=u.clientY,g){let m=u.clientX-s.x,p=u.clientY-s.y;c.left+=m,c.top+=p,s.x=u.clientX,s.y=u.clientY}}),w=R(document,"mouseup",function(){g=!1,t.style.cursor="grab"}),h=R(document,"mouseleave",function(){g=!1,t.style.cursor="grab"}),A=R(e||t,"wheel",function(u){u.preventDefault();const m=parseFloat(t.style.width)/t.width,p=-u.wheelDeltaY||-u.wheelDelta||-u.deltaY,_=Math.abs(.3*p/120),S=p>0?m*(1-_):m*(1+_),z=t.width*S,E=t.height*S;if(z<10||E<10)return;const H=parseFloat(t.style.left),F=parseFloat(t.style.top),U=n.x-H,W=n.y-F,$=H-(z-t.width)*(U/t.width),I=F-(E-t.height)*(W/t.height);c.left=$,c.top=I,c.width=z,c.height=E},{passive:!1}),T=[k,L,w,h,A];return{animateTo:(u,m,p,_)=>{c.left=u,c.top=m,c.width=p,c.height=_},destroy:()=>{d=!1,a.remove(),t.classList.remove(o),T.forEach(u=>u?.())}}}function xt(t,e=window){let i=t.getBoundingClientRect(),o=e.getComputedStyle(t),a=parseFloat,l=i.top+a(o.paddingTop)+a(o.borderTopWidth),s=i.right-a(o.paddingRight)-a(o.borderRightWidth),n=i.bottom-a(o.paddingBottom)-a(o.borderBottomWidth),c=i.left+a(o.paddingLeft)+a(o.borderLeftWidth);return{top:l,right:s,bottom:n,left:c,width:s-c,height:n-l}}function vt(t,e,i=500){let o=null,a=0;const l=s=>{if(s.key!==t){a=0;return}if(a++,a===2){e?.(),a=0;return}clearTimeout(o),o=setTimeout(()=>{a=0},i)};return document.addEventListener("keyup",l),()=>{clearTimeout(o),document.removeEventListener("keyup",l)}}function kt(t,e,i){return t+(e-t)*i}function St(t){try{if(!/^data:image\/svg/.test(t))throw new Error("Invalid SVG");const e=atob(t.split(",")[1]),i=new Blob([e],{type:"image/svg+xml"}),o=URL.createObjectURL(i);return setTimeout(()=>URL.revokeObjectURL(o),6e4),o}catch(e){return console.log("ERROR: ",e),null}}function Et(t){return URL.createObjectURL(new Blob([t],{type:"image/svg+xml"}))}function Lt(t){try{return"data:image/svg+xml;charset=utf-8;base64,"+btoa(new XMLSerializer().serializeToString(t))}catch(e){return console.log("ERROR: ",e),null}}function _t(t,e){let i=Math.min(t,e),o=Math.max(t,e);return o<=256&&i<=144?"144p":o<=320&&i<=180?"240p":o<=640&&i<=360?"360p":o<=640&&i<=480?"SD (480p)":o<=1280&&i<=720?"HD (720p)":o<=1600&&i<=900?"HD+ (900p)":o<=1920&&i<=1080?"FHD (1080p)":o<=2560&&i<=1440?"QHD (1440p)":o<=3840&&i<=2160?"4K (2160p)":o<=5120&&i<=2880?"5K (2880p)":o<=7680&&i<=4320?"8K (4320p)":o<=10240&&i<=4320?"10K (4320p)":o<=15360&&i<=8640?"16K":"> 16K"}function j({msg:t="",x:e=window.innerWidth/2,y:i=window.innerHeight-100,align:o="center",duration:a=3e3,id:l="aio_notify_div"}={}){let s=document.getElementById(l);s&&s.remove();let n=document.createElement("div");n.id=l,n.style.cssText=`
      position: fixed;
      left: ${e}px;
      top: ${i}px;
      padding: 10px;
      background-color: #333;
      color: #fff;
      border-radius: 5px;
      z-index: 2147483647;
      transition: all 1s ease-out;
      ${o==="right"?"transform: translateX(-100%);":o==="center"?"transform: translateX(-50%);":""}
    `,n.textContent=t,(document.body||document.documentElement).appendChild(n);let c=[];function d(r){c.forEach(g=>clearTimeout(g)),c=[setTimeout(()=>{n&&(n.style.opacity=0,n.style.top=`${i-50}px`)},r-1e3),setTimeout(()=>{n?.remove()},r)]}return a>0&&d(a),{closeAfter:d,remove(){return n?(n.remove(),n=null,!0):!1},setText(r,g){return n?(n.textContent=r,g&&d(g),!0):!1}}}function Ct(t){let e=document.createElement("a");e.href=t,e.download=t.split(/[/?#]/).filter(Boolean).pop()||"image",e.rel="noreferrer",document.body.appendChild(e),e.click(),e.remove()}})();
