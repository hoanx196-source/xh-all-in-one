(async()=>{console.log("xH all in one: FB add download video button ENABLED");const{onElementsAdded:r,closest:n}=await import("./helper/helper.js");r("video",c=>{const a="fb-aio-video-control-btn";for(let t of c){const s=n(t,"[data-video-id]")||n(t,'[data-visualcompletion="ignore"]')||t.parentElement;if(s.querySelector(`.${a}`))continue;const i=n(t,"[data-instancekey]"),l=n(t,"[data-video-id]")?.parentElement?.nextElementSibling;let e=document.createElement("button");e.className=a,e.textContent="\u{1F579}\uFE0F",e.title="xH all in one: Toggle video controls",e.style.cssText=`
          position: absolute;
          top: 60px;
          right: 55px;
          width: 40px;
          height: 40px;
          background-color: #333;
          color: #fff;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          opacity: 0.3;
          z-index: 2147483647;`,e.addEventListener("mouseenter",()=>{e.style.opacity=1}),e.addEventListener("mouseleave",()=>{e.style.opacity=.5}),e.onclick=d=>{console.log(t,i),t.hasAttribute("controls")?(t.removeAttribute("controls"),[i,l].forEach(o=>{o&&(o.style.display="block")})):(t.setAttribute("controls",""),[i,l].forEach(o=>{o&&(o.style.display="none")})),d.stopPropagation()},s.appendChild(e)}})})();
