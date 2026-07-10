(async()=>{console.log("xH all in one: download video button for Threads ENABLED");const{onElementsAdded:a,closest:i}=await import("./helper/helper.js");a("video",d=>{const t="fb-aio-threads-video-download-btn";for(let o of d){const n=i(o,"img")?.parentElement||o.parentElement;if(n?.querySelector(`.${t}`))continue;let e=document.createElement("button");e.className=t,e.textContent="\u2B07\uFE0F",e.title="xH all in one: Download video",e.style.cssText=`
          position: absolute;
          top: 10px;
          right: 10px;
          width: 40px;
          height: 40px;
          background-color: #333;
          color: #fff;
          border-radius: 5px;
          border: none;
          opacity: 0.3;
          cursor: pointer;
          z-index: 2147483647;`,e.addEventListener("mouseenter",()=>{e.style.opacity=1}),e.addEventListener("mouseleave",()=>{e.style.opacity=.5}),e.onclick=s=>{window.open(o.src,"_blank"),s.stopPropagation()},n.appendChild(e)}})})();
