(()=>{console.log("xH all in one: Facebook ad blocker ENABLED");const E=[],Ce="FB.HideReactComponents.Targets",X="FB.HideReactComponents.HiddenCount",Ne="FB.HideReactComponents.ShowPlaceholder",Re="AutoRun.EnabledFeatures",ye="fb_hideAds",_="fb-aio-hidden-react-component",a="fb-aio-hidden-react-component-placeholder",K="fb-aio-hidden-react-component-style",q="data-fb-aio-hidden-react-component",V="css:",Y=12e4,Ae=3e3,we=50,Fe=500,Oe=250,Le=1e3,W=80,j=5e3,ve=5e3,He=5e3,Me=1500,J=800,l=new Map,S=new Set,m=new Set;let u=new Set(ie(E)),N=new Set(u),R=[],g=[],Q=new Map(ce(E)),H=!0,Z="",M=!1,y=!1,d=!1,ee=0,te=0,h=null,T=null,ne=null,I=null,A="",w=0,P=null,D=null;function re(){if(document.getElementById(K))return;const e=document.createElement("style");e.id=K,e.textContent=`
      .${_} {
        display: none !important;
      }

      .${a} {
        box-sizing: border-box;
        margin: 8px 0;
        padding: 8px 10px;
        border: none;
        border-radius: 6px;
        background: rgba(31, 41, 55, 0.58) !important;
        color: rgba(255, 255, 255, 0.72) !important;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 8px;
        font-family:
          -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 12px;
        line-height: 1.35;
      }

      .${a}__title {
        color: rgba(255, 255, 255, 0.68) !important;
        font-weight: 600;
      }

      .${a}__meta {
        margin-top: 1px;
        color: rgba(255, 255, 255, 0.52) !important;
        font-size: 11px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .${a}__button {
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.66);
        cursor: pointer;
        font: inherit;
        font-size: 11px;
        font-weight: 600;
        line-height: 1;
        min-width: 58px;
        padding: 6px 8px;
      }

      .${a}__button:hover {
        border-color: rgba(255, 255, 255, 0.22);
        background: rgba(255, 255, 255, 0.14);
        color: rgba(255, 255, 255, 0.82);
      }

      .${a}[data-fb-aio-revealed="true"] {
        background: rgba(31, 41, 55, 0.68) !important;
      }

      .${a}[data-fb-aio-revealed="true"]
        .${a}__button {
        border-color: rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.74);
      }

      @media (prefers-color-scheme: dark) {
        .${a} {
          background: rgba(31, 41, 55, 0.58) !important;
          color: rgba(255, 255, 255, 0.72) !important;
        }

        .${a}__meta {
          color: rgba(255, 255, 255, 0.52) !important;
        }

        .${a}__button {
          border-color: rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.66);
        }

        .${a}__button:hover {
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.14);
          color: rgba(255, 255, 255, 0.82);
        }

        .${a}[data-fb-aio-revealed="true"] {
          background: rgba(31, 41, 55, 0.68) !important;
        }
      }
    `,(document.head||document.documentElement)?.appendChild?.(e)}function oe(){return window.__REACT_DEVTOOLS_GLOBAL_HOOK__||null}function x(e){const t=Array.isArray(e)?e:Array.isArray(e?.targets)?e.targets:E,n=[],r=new Set;for(const o of t){const i=typeof o=="string"?o:o?.name||o?.componentName||o?.displayName,c=String(i||"").trim();!c||r.has(c)||(r.add(c),n.push({name:c,label:typeof o=="object"&&ae(o.label)||c,enabled:typeof o=="string"?!0:o?.enabled!==!1}))}return n.length?n:E}function ie(e){return x(e).filter(t=>t.enabled).map(t=>t.name)}function ae(e){return typeof e=="string"?e.trim():e&&typeof e=="object"?String(e.vi||e.en||"").trim():""}function ce(e){return x(e).map(t=>[t.name,ae(t.label)||t.name])}function F(e){const t=String(e||"").trim(),n=t.match(/^\[(.+)]$/);return{name:(n?n[1]:t).trim(),isTarget:!!n}}function Ie(e){const t=String(e||"").trim(),n=t.match(/^(.+?)\s*:has\(\s*(.+?)\s*\)$/);if(n){const v=F(n[1]).name,Te=F(n[2]).name;return!v||!Te?null:{rawName:t,operator:":has",targetName:v,relatedName:Te}}const r=t.match(/^(.+?)\s*([>~])\s*(.+)$/);if(!r)return null;const o=F(r[1]),i=F(r[3]);if(!o.name||!i.name)return null;const c=[o,i].filter(v=>v.isTarget);if(!c.length&&r[2]===">")return{rawName:t,operator:r[2],targetName:o.name,targetSide:"left",relatedName:i.name};if(c.length!==1)return null;const s=o.isTarget?"left":"right",L=o.isTarget?i:o;return{rawName:t,operator:r[2],targetName:c[0].name,targetSide:s,relatedName:L.name}}function Pe(e){const t=String(e||"").trim();if(!t.toLowerCase().startsWith(V))return null;const n=t.slice(V.length).trim();return n?{rawName:t,selector:n}:null}function De(e){u=new Set(e),R=[],g=[],N=new Set;for(const t of u){const n=Pe(t);if(n){g.push(n);continue}const r=Ie(t);r?R.push(r):N.add(t)}}function C(){return N.size||R.length}const xe=/[\s().,:<>[\]{}|/\\]/;function se(e){return!e||xe.test(e)}function p(e,t){if(!e||!t)return!1;if(e===t)return!0;let n=e.indexOf(t);for(;n>=0;){const r=e[n-1],o=e[n+t.length];if(se(r)&&se(o))return!0;n=e.indexOf(t,n+t.length)}return!1}function le(e,t){if(!e)return!1;if(p(e.displayName,t)||p(e.name,t))return!0;const n=e.render;if(n&&(p(n.displayName,t)||p(n.name,t)))return!0;const r=e.type;return!!(r&&(p(r.displayName,t)||p(r.name,t)))}function b(e,t){return!!(le(e?.elementType,t)||le(e?.type,t))}function ke(e,t){const n=[e?.child];let r=0;for(;n.length&&r<j;){const o=n.pop();if(o){if(r++,b(o,t))return!0;$(n,o)}}return!1}function $e(e,t){return!!ue(e,t)}function ue(e,t){let n=e?.return,r=0;for(;n&&r<W;){if(b(n,t))return n;n=n.return,r++}return null}function Be(e,t){let n=e?.return?.child,r=0;for(;n&&r<j;){if(n!==e&&b(n,t))return!0;n=n.sibling,r++}return!1}function ze(e,t){return e.operator===":has"?b(t,e.relatedName)?ue(t,e.targetName):null:Ue(t,e)?t:null}function Ue(e,t){return b(e,t.targetName)?t.operator===">"?t.targetSide==="left"?ke(e,t.relatedName):$e(e,t.relatedName):t.operator==="~"?Be(e,t.relatedName):!1:!1}function lt(e){return k(e)?.targetName||""}function k(e){if(!C())return null;for(const t of N)if(b(e,t))return{fiber:e,targetName:t};for(const t of R){const n=ze(t,e);if(n)return{fiber:n,targetName:t.rawName}}return null}function $(e,t){t?.sibling&&e.push(t.sibling),t?.child&&e.push(t.child)}function Ge(e){const t=[],n=[e?.child];let r=0;for(;n.length&&r<Fe&&t.length<we;){const o=n.pop();if(o){if(r++,o.stateNode?.nodeType===Node.ELEMENT_NODE){t.push(o.stateNode),o.sibling&&n.push(o.sibling);continue}$(n,o)}}return t}function de(e){return e?.nodeType===Node.ELEMENT_NODE&&e!==document.body&&e!==document.documentElement&&!!e.parentNode}function Xe(){return{targetNames:new Set,placeholder:null,revealed:!1}}function fe(e){return Array.from(e).map(t=>Q.get(t)||t).join(", ")}function B(e){e?.placeholder?.remove?.(),e&&(e.placeholder=null)}function Ke(e,t){if(t.placeholder)return t.placeholder;const n=document.createElement("div");n.className=a;const r=document.createElement("div");r.className=`${a}__copy`;const o=document.createElement("div");o.className=`${a}__title`;const i=document.createElement("button");return i.type="button",i.className=`${a}__button`,i.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),t.revealed=!t.revealed,z(e)}),r.appendChild(o),n.appendChild(r),n.appendChild(i),t.placeholder=n,n}function qe(e,t){const n=Ke(e,t),r=fe(t.targetNames),o=n.querySelector(`.${a}__title`),i=n.querySelector(`.${a}__button`);n.dataset.fbAioRevealed=String(t.revealed),o.textContent=(t.revealed?"xH all in one: \u0110ang b\u1ECF \u1EA9n ":"xH all in one: \u0110\xE3 \u1EA9n ")+r,i.textContent=t.revealed?"\u1EA8n l\u1EA1i":"B\u1ECF \u1EA9n",i.setAttribute("aria-label",t.revealed?"\u1EA8n l\u1EA1i m\u1EE5c n\xE0y":"B\u1ECF \u1EA9n m\u1EE5c n\xE0y"),e.parentNode&&n.nextSibling!==e&&e.parentNode.insertBefore(n,e)}function z(e){const t=l.get(e);if(t){for(const n of Array.from(t.targetNames))u.has(n)||t.targetNames.delete(n);if(!t.targetNames.size||!de(e)){e.classList?.remove?.(_),e.removeAttribute?.(q),B(t),l.delete(e);return}H?t.revealed?e.classList?.remove?.(_):e.classList?.add?.(_):(t.revealed=!1,e.classList?.add?.(_),B(t)),e.setAttribute?.(q,fe(t.targetNames)),H&&qe(e,t)}}function me(e,t){if(!de(e)||!t)return!1;let n=l.get(e);n||(n=Xe(),l.set(e,n));const r=!n.targetNames.has(t);return n.targetNames.add(t),z(e),r}function ge(e,t){const n=Ge(e);let r=0;for(const o of n)me(o,t)&&r++;return r}function Ve(){if(!g.length)return 0;let e=0;for(const t of g){let n=[];try{n=Array.from(document.querySelectorAll(t.selector))}catch{continue}for(const r of n)r.classList?.contains?.(a)||r.closest?.(`.${a}`)||me(r,t.rawName)&&e++}return e&&U(e),e}function U(e=1){w+=e,!P&&(P=window.setTimeout(()=>{Ye().catch(()=>{})},500))}async function Ye(){const e=w;if(w=0,P=null,!!e)try{const t=Number(await O(X,0)),n=Number.isFinite(t)?t:0;await at(X,n+e)}catch(t){throw w+=e,t}}function he(e,t=Y,n=null){if(!e||!C())return 0;const r=[e];let o=0,i=0;for(;r.length&&i<t;){const c=r.pop();if(!c)continue;i++;const s=k(c);if(s){if(!n?.has(s.fiber)){n?.add(s.fiber);const L=ge(s.fiber,s.targetName);o+=L,L&&U()}c.sibling&&r.push(c.sibling);continue}$(r,c)}return o}function pe(){for(const[e,t]of Array.from(l.entries())){if(!e.isConnected){B(t),l.delete(e);continue}z(e)}}function We(e){return e?.current||e}function je(){return d?!0:l.size?Date.now()-ee>=He:!1}function Je(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return null;if(A&&e[A])return e[A];for(const t of Object.keys(e))if(t.startsWith("__reactFiber$")||t.startsWith("__reactInternalInstance$"))return A=t,e[t]||null;return null}function Qe(e){let t=e;for(;t&&t!==document.documentElement&&t.nodeType===Node.ELEMENT_NODE;){const n=Je(t);if(n)return n;t=t.parentElement}return null}function Ze(e,t){let n=e,r=0,o=0;for(;n&&r<W;){const i=k(n);if(i)return t.has(i.fiber)||(t.add(i.fiber),o=ge(i.fiber,i.targetName),o&&U()),o;n=n.return,r++}return o}function et(e,t){if(!e?.isConnected||!C()||e.classList?.contains?.(a)||e.closest?.(`.${a}`))return 0;const n=Qe(e);if(!n)return 0;const r=Ze(n,t);return r||he(n,Ae,t)}function tt(){M=!1,re(),je()&&(d=!1,ee=Date.now(),pe());let e=0;const t=new WeakSet;y&&(y=!1,e+=Ve());let n=0;for(const o of Array.from(m))if(m.delete(o),e+=et(o,t),n++,n>=Oe)break;const r=Array.from(S);r.length&&(h&&(window.clearTimeout(h),h=null),te=Date.now());for(const o of r)S.delete(o),e+=he(We(o),Y,t);(m.size||S.size||d)&&f()}function f(){if(M)return;M=!0,(window.requestIdleCallback||(t=>window.setTimeout(t,100)))(tt,{timeout:500})}function nt(){g.length&&(y=!0,d=!0,f())}function rt(e){e&&(!u.size&&!l.size||(S.add(e),d=!0,f()))}function ot(e){if(!e||!u.size&&!l.size)return;S.add(e),d=!0;const t=Me-(Date.now()-te);if(t<=0){f();return}h||(h=window.setTimeout(()=>{h=null,f()},t))}function be(e){if(!(!e||e.nodeType!==Node.ELEMENT_NODE)&&u.size){if(g.length&&(y=!0),!C()){f();return}if(m.add(e),m.size>Le){m.clear(),d=!0,G();return}f()}}function it(){I||!document.documentElement||(I=new MutationObserver(e=>{if(u.size)for(const t of e)for(const n of t.addedNodes||[])n.nodeType===Node.ELEMENT_NODE?be(n):n.parentElement&&be(n.parentElement)}),I.observe(document.documentElement,{childList:!0,subtree:!0}))}function G(){if(!C())return;const e=oe();if(!(!e?.renderers||!e?.getFiberRoots))for(const t of e.renderers.keys()){let n=null;try{n=e.getFiberRoots(t)}catch{n=null}if(n)for(const r of n)rt(r)}}function Ee(){return D=D||import("./helper/helper.js"),D}async function O(e,t){const{getExtStorage:n}=await Ee();return n(e,t,J)}async function at(e,t){const{setExtStorage:n}=await Ee();return n(e,t,J)}async function _e({rescan:e=!1}={}){const[t,n,r]=await Promise.all([O(Ce,E),O(Re,null),O(Ne,!0)]),o=x(t),i=!Array.isArray(n)||n.includes(ye),c=r!==!1,s=JSON.stringify({targets:o,isFeatureEnabled:i,showPlaceholder:c});s!==Z&&(Z=s,H=c,De(i?ie(o):[]),Q=new Map(ce(o)),pe(),e&&G(),nt())}function ct(){ne||(ne=window.setInterval(()=>{_e({rescan:!0}).catch(()=>{})},ve))}function st(e){if(!e||e.__FBAIO_HIDE_REACT_COMPONENTS_PATCHED__)return!1;const t=e.onCommitFiberRoot;return e.onCommitFiberRoot=function(){let r;const o=arguments[1];try{r=t?.apply(this,arguments)}catch{r=void 0}try{ot(o)}catch{}return r},e.__FBAIO_HIDE_REACT_COMPONENTS_PATCHED__=!0,G(),!0}function Se(){const e=oe();if(st(e)){T&&(window.clearInterval(T),T=null);return}T||(T=window.setInterval(Se,500))}re(),_e().catch(()=>{}).finally(()=>{it(),Se(),ct()})})();const default_targets={"FriendingCometFeedPYMKHScroll.react":{vi:"Nh\u1EEFng ng\u01B0\u1EDDi b\u1EA1n c\xF3 th\u1EC3 bi\u1EBFt",en:"People you may know"},"StoriesTrayRectangularRoot.react":{en:"Story tray",vi:"Stories"},"CometReelsFeedUnitStrategy.react":"Reels","CometHomeRightSideEgoContainer.react":{en:"Right sidebar - ads container",vi:"Right sidebar - qu\u1EA3ng c\xE1o"},"CometAdsSideFeedUnitItem.react":{en:"Right sidebar - ads item",vi:"Right sidebar - qu\u1EA3ng c\xE1o item"},"FriendingCometHomeInlineRHCContainer.react":{en:"Rigt sidebar - friend request",vi:"Right sidebar - l\u1EDDi m\u1EDDi k\u1EBFt b\u1EA1n"},"CometHomeRightRail.react":"Right sidebar","CometClassicHomeLeftRailContainer.react":"Left sidebar","CometFeedStoryFeedbackSection.react":"feedback post section","CometUFIDefaultModernSummaryAndActionsRenderer.react":"feedback in post detail","CometFeedStory.react:has(CometFeedStorySponsoredLabelStrategy.react)":"Sponsored post","CometFeedStoryLayoutMatchRenderer.react:has(CometFeedStoryFollowButtonSection.react)":"post with follow btn - WIP","CometFeedStory.react:has(VideoPlayerRelay.react)":"post with video"};
