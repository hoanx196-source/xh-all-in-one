(()=>{console.log("xH all in one: Auto lock websites ENABLED");const d="auto_lock_website_manager_password",l="auto_lock_website_lockedWebsites",o="ufs_auto_lock_website_overlay",u=`${o}-style`;if(window.__fbaioAutoLockWebsiteInjected){window.__fbaioAutoLockWebsiteRefresh?.();return}window.__fbaioAutoLockWebsiteInjected=!0;const a=typeof browser<"u"?browser:typeof chrome<"u"?chrome:null;let p=null,m=null,s=null;b();async function b(){window===window.top&&(window.__fbaioAutoLockWebsiteRefresh=f,await f(),a?.storage?.onChanged?.addListener?.(k))}async function k(e,n){if(n!=="local")return;const t=g(e,d),r=g(e,l);if(!(!t&&!r)){if(t&&e[d].newValue==null){m=null,s=null,w();return}await f()}}function g(e,n){return Object.prototype.hasOwnProperty.call(e||{},n)}async function f(){const e=await y(d,null);if(!e){w();return}const n=h(await y(l,[])),t=E(location.hostname,n);t?(m=e,s=t,S()):(s=null,w())}function h(e){return(Array.isArray(e)?e:[]).map(n=>String(n||"").trim()).filter(Boolean)}function y(e,n){return new Promise(t=>{if(!a?.storage?.local){t(n);return}const r=i=>{if(a.runtime?.lastError){t(n);return}t(Object.prototype.hasOwnProperty.call(i||{},e)?i[e]:n)};a.storage.local.get([e],r)?.then?.(r).catch?.(()=>t(n))})}function x(e,n){return new Promise(t=>{if(!a?.storage?.local){t(null);return}a.storage.local.set({[e]:n},t)?.then?.(t).catch?.(t)})}async function _(e){if(!e)return!1;const n=h(await y(l,[]));return n.includes(e)?(await x(l,n.filter(t=>t!==e)),!0):!1}function E(e,n){for(const t of n)if(new RegExp(t.split("*").map(c=>c.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join(".*")).test(e))return t;return!1}function w(){const e=document.getElementById(o),n=document.getElementById(u);e&&(e.style.top="-100vh"),n&&(n.disabled=!0)}function S(){const e=document.getElementById(o);if(e){const i=document.getElementById(u);e.style.top="0",e.style.opacity="1",i&&(i.disabled=!1);return}const n=document.createElement("style");n.id=u,n.textContent=`
      * :not(#${o}, #${o} *) {
        display: none !important;
      }
    `,(document.head||document.documentElement).appendChild(n);const t=document.createElement("div");t.id=o,t.innerHTML=`
      <h1>This websites has been Locked</h1>
      <input id="password" type="password" placeholder="Enter password to unlock.." autocomplete="new-password" />
      <div id="unlock-temporarly-container" title="Enable to unlock temporarly => will lock again if website reload">
        <input id="unlock-temporarly" type="checkbox" checked />
        <label for="unlock-temporarly" >Unlock temporarly</label>
      </div>
      <style>
        #${o} {
          position: fixed;
          top: -100vh;
          left: 0;
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          background-color: #112;
          z-index: 2147483647;
          opacity: 0;
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        #${o} > h1 {
          color: #ddd;
          font-size: 30px;
          text-align: center;
          font-family: monospace;
        }
        #${o} #unlock-temporarly-container {
          color: #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
        }
        #${o} #unlock-temporarly {
          width: 20px;
          height: 20px;
          padding: 0;
          margin: 0px;
          border: 1px solid #999;
          background-color: #e6e6e6;
          margin-right: 10px;
        }
        #${o} #unlock-temporarly:hover {
          background-color: #ccc;
        }
        #${o} #unlock-temporarly:active {
          background-color: #04aa6d;
        }
        #${o} > input {
          letter-spacing: normal;
          margin-top: 20px;
          font-size: 20px;
          padding: 10px;
          border-radius: 5px;
          border: none;
          outline: none;
          text-align: center;
          color: #ddd;
          background-color: #282828de;
          width: min(400px, calc(100vw - 32px));
        }
        #${o} > input:focus {
          background-color: #282828;
          box-shadow: 0px 5px 5px #555;
        }
        #${o} label {
          color: #ccc !important;
          background-color: transparent !important;
        }
      </style>
    `,window.setTimeout(()=>{t.style.opacity="1",t.style.top="0px"},0),document.documentElement.appendChild(t);const r=t.querySelector("input#unlock-temporarly"),c=t.querySelector("input#password");c.addEventListener("input",async i=>{p=p||(await import("./helper/md5.js")).md5,p(i.target.value)===m&&(t.style.top="-100vh",n.disabled=!0,c.value="",r.checked||await _(s))})}})();
