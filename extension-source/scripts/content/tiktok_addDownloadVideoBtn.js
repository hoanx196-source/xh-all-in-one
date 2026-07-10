(async()=>{console.log("xH all in one: Tiktok add download video button ENABLED");const{hookFetch:x}=await import("./helper/ajax-hook.js"),{notify:k,downloadData:y,closest:S,sanitizeName:_,injectCssCode:A,getFBAIODashboard:C}=await import("./helper/helper.js"),i=new Map;window.fbaio_tiktok_addDownloadVideoBtn=()=>i,x({onAfter:async(o,d,a)=>{const p=o.includes("item_list/"),r=o.includes("api/search");if(p||r){let l=0;const t=await a.clone().json();console.log(t);const e=t?.itemList||t?.item_list||t?.data;e?.length&&e.forEach(n=>{const f=n?.item||n;f?.video?.id&&(i.set(f.video.id,f),l++)}),l>0&&k({msg:`xH all in one: Found ${l} videos (Total: ${i.size})`})}}});const h="fb-aio-tiktok-download-btn";function m(o,d){const a=o.querySelector(`.${h}`);return a&&(!d||a.dataset.id===d)}function g(o){const d=o.querySelector(`.${h}`);d&&d.remove()}A(`
      .fb-aio-trigger {
        position: relative;
        color: white;
        z-index: 2;
      }
      .fb-aio-trigger button {
        background: #ffffff1f;
        color: white;
      }
      .fb-aio-trigger button:hover {
        background: #ffffff3f !important;
      }
      .fb-aio-content {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        border-radius: 10px;
        padding: 5px;
        background-color: #333;
        min-width: 200px;
      }
      .fb-aio-content button {
        width: 100%;
        padding: 5px;
        text-align: left;
      }
      .fb-aio-trigger:hover .fb-aio-content,
      .fb-aio-content:hover {
        display: block;
      }`);function b({video:o,btnStyle:d="",containerStyle:a="",contentStyle:p=""}){const r=document.createElement("div");r.style.cssText=a,r.dataset.id=o?.id,r.classList.add("fb-aio-trigger",h);const l=document.createElement("button");l.style.cssText=d,l.textContent="\u2B07\uFE0F",l.title="xH all in one: Download video",l.addEventListener("click",()=>{}),r.appendChild(l);const c=document.createElement("div");c.style.cssText=p,c.classList.add("fb-aio-content");const t=document.createElement("p");t.textContent="xH all in one",c.appendChild(t);const e=_(o.desc?.slice?.(0,50)||o?.id||"tiktok_video"),n=document.createElement("p");return n.textContent=e,c.appendChild(n),[{text:"\u{1F3AC} Video - no watermark",onClick:()=>{window.open(o?.video?.playAddr,"_blank")}},{text:"\u{1F3AC} Video - watermark",onClick:()=>{const s=o?.video?.downloadAddr;window.open(s,"_blank")}},o?.music?.id?{text:"\u{1F3A7} Music: "+o?.music?.title,onClick:()=>{const s=o?.music?.playUrl;s?window.open(s,"_blank"):alert("Can not download this music (no URL)")}}:null,{text:"\u{1F4DD} JSON Data",onClick:()=>{y(JSON.stringify(o,null,4),e+".json")}},{text:"\u{1F4DD} ALL "+i.size+" videos (JSON)",onClick:()=>{const s=Array.from(i.values());y(JSON.stringify(s,null,4),s.length+"_tiktok_videos.json")}}].filter(Boolean).forEach(s=>{const w=document.createElement("button");w.textContent=s.text,w.addEventListener("click",s.onClick),c.appendChild(w)}),r.appendChild(c),r}const v="fb-aio-tiktok-download-all-btn",u=document.createElement("button");u.id=v,u.textContent="\u2B07\uFE0F Download all",u.title="xH all in one: Download all videos",u.style.cssText=`
    padding: 10px;
    background: #2c68dc;
    border-radius: 5px;
    color: white;
  `,u.addEventListener("click",()=>{window.open(C()+`/#/bulk-downloader?platform=Tiktok&targetId=${location.href}`,"_blank")}),setInterval(()=>{const o=document.querySelector('[data-e2e="user-page"] [class*="DivButtonPanelWrapper"]');o&&!o.querySelector(`#${v}`)&&o.append(u);const d=Array.from(document.querySelectorAll('[data-e2e="feed-video"]'));for(const t of d){const e=S(t,'[class*="SectionActionBarContainer"]');if(e&&!m(e)){const n=t.querySelector("[id*=xgwrapper-0]")?.id?.split("-")?.at(-1);if(n&&i.has(n)){const f=b({video:i.get(n),btnStyle:`
              width: 48px;
              height: 48px;
              border-radius: 50%;`,containerStyle:`
              margin-bottom: 15px;`});e.prepend(f)}}}const a=Array.from(document.querySelectorAll('[data-e2e="search_top-item"], [data-e2e="search_video-item"]')),p=Array.from(document.querySelectorAll('[data-e2e="explore-item"]'));for(const t of[...p,...a])if(!m(t)){const e=t.querySelector('a[href*="tiktok.com"][href*="/video/"]')?.href?.split("video/")?.at(-1);if(e&&i.has(e)){console.log("explore",t);const n=b({video:i.get(e),btnStyle:`
              width: 48px;
              height: 48px;
              border-radius: 10px;`,containerStyle:`
              position: absolute;
              top: 0;
              right: 0;`,contentStyle:`
              right: 0;
              left: auto;`});t.appendChild(n)}}const r=Array.from(document.querySelectorAll('[data-e2e="detail-video"]'));for(const t of r){const e=t.querySelector('[id*="xgwrapper"]')?.id?.split("-")?.at(-1);if(!m(t,e)&&e&&i.has(e)){g(t),console.log("detail",t);const n=b({video:i.get(e),btnStyle:`
              width: 48px;
              height: 48px;
              border-radius: 10px;`,containerStyle:`
              position: absolute;
              top: 0;
              left: 0;`,contentStyle:`
              z-index: 100;
            `});t.appendChild(n)}}const l=Array.from(document.querySelectorAll('[class*="DivItemContainer"], [class*="DivItemContainerV2"]'));for(const t of l)if(!m(t)){const e=t.querySelector('a[href*="/video/"]')?.href?.split("video/")?.at(-1);if(e&&i.has(e)){console.log("you may like",t);const n=b({video:i.get(e),btnStyle:`
              width: 48px;
              height: 48px;
              border-radius: 10px;`,containerStyle:`
              position: absolute;
              top: 0;
              right: 0;`,contentStyle:`
              right: 0;
              left: auto;`});t.style.position="relative",t.appendChild(n)}}const c=Array.from(document.querySelectorAll('[role="dialog"][class*="DivBrowserModeContainer"]'));for(const t of c){const e=t.querySelector('[data-e2e="browse-video"] [id*="xgwrapper"]')?.id?.split("-")?.at(-1);if(!m(t,e)){const n=t.querySelector('[data-e2e="browse-like-icon"]')?.parentElement?.parentElement;if(e&&n&&i.has(e)){g(t),console.log("full",t);const f=b({video:i.get(e),btnStyle:`
                width: 32px;
                height: 32px;
                border-radius: 10px;`,containerStyle:"",contentStyle:`
                z-index: 100;`});n.prepend(f)}}}},1e3),window.addEventListener("load",()=>{const o=setInterval(()=>{if(window?.__UNIVERSAL_DATA_FOR_REHYDRATION__){const a=JSON.parse(window.__UNIVERSAL_DATA_FOR_REHYDRATION__.textContent)?.__DEFAULT_SCOPE__?.["webapp.video-detail"]?.itemInfo?.itemStruct,p=a?.video?.id||a?.id;p&&(i.set(p,a),clearInterval(o))}},1e3)})})();
