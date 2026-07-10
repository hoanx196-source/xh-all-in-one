(async()=>{const m=location.hostname.includes("douyin.com")?"douyin":"tiktok";console.log(`xH all in one: ${m} batch download ENABLED`);const{hookFetch:I,hookXHR:T}=await import("./helper/ajax-hook.js"),{chooseFolderToDownload:S,downloadData:U,downloadToFolder:M,getNumberFormatter:C,getRedirectedUrl:N,getURL:L,injectCssCode:B,injectScriptSrcAsync:j,notify:F,sanitizeName:f}=await import("./helper/helper.js"),s={list:[],hasNew:!0,videoById:new Map},i={tiktok:{title:"Tiktok",videoFolderPrefix:"tiktok_videos_",audioFolderPrefix:"tiktok_musics_",jsonFilenameSuffix:"_videos_tiktok.json",metricLabel:"View",metricSortKey:"view",windowKey:"fbaio_tiktok_batchDownload",imageWidth:"150px",expectBlobTypes:["video/mp4","image/jpeg"],getItemId:t=>t.id,getVideoUrl:t=>t.video.playAddr,getCoverUrl:t=>t.video.dynamicCover||t.video.originCover||t.video.cover,getDesc:t=>t.desc,getAuthorAvatar:t=>t.author.avatarThumb,getAuthorNickname:t=>t.author.nickname,getAuthorHandle:t=>t.author.uniqueId,getAuthorId:t=>t.author.id,getAuthorOpenId:t=>t.author.uniqueId,getAuthorUrl:t=>"https://www.tiktok.com/@"+t,getAuthorAvatarLarge:t=>t.author.avatarLarger,getMetric:t=>t.stats.playCount,getDuration:t=>t.video.duration,getMusicId:t=>t.music.id,getMusicTitle:t=>t.music.title,getMusicUrl:t=>t.music.playUrl,getVideoDownloadItems(t,e){const o=[],a=t.imagePost?.images;a?.length&&o.push(...a.map((r,l)=>({url:r.imageURL?.urlList?.[1]||r.imageURL?.urlList?.[0],filename:e+1+"_"+(l+1)+"_"+f(t.id,!1)+".jpg"})));const d=t.video?.bitrateInfo?.find?.(r=>r.Bitrate===t.video.bitrate)?.PlayAddr?.UrlList||[],c=d[d.length-1];return o.push({url:c||t.video.playAddr,filename:e+1+"_"+f(t.id,!1)+".mp4"}),o},getAudioDownloadItem(t,e){return{url:t.music.playUrl,filename:e+1+"_"+f(t.music.title.substr(0,50)||"audio",!1)+".mp3"}},onFoundItem(t){(t.video.playAddr||t.imagePost?.images?.length)&&(s.videoById.set(t.video.id,t),s.hasNew=!0),t.imagePost?.images?.length&&console.log(t)},setupHook(){I({onAfter:async(t,e,o)=>{if(t.includes("item_list/")){const d=await o.clone().json();console.log(d),d?.itemList&&d.itemList.forEach(this.onFoundItem)}if(t.includes("api/search")){const d=await o.clone().json();console.log(d),d.data?.length&&d.data.forEach(c=>{c.type===1&&(s.videoById.set(c.item.video.id,c.item),s.hasNew=!0)})}}})}},douyin:{title:"Douyin",videoFolderPrefix:"douyin_videos_",audioFolderPrefix:"douyin_musics_",jsonFilenameSuffix:"_videos_douyin.json",metricLabel:"Like",metricSortKey:"like",windowKey:"fbaio_douyin_batchDownload",imageWidth:"200px",expectBlobTypes:["video/mp4"],getItemId:t=>t.aweme_id,getVideoUrl:t=>t.video.play_addr.url_list.at(-1),getCoverUrl:t=>t.video.cover.url_list[0],getDesc:t=>t.desc,getAuthorAvatar:t=>t.author.avatar_thumb.url_list.at(-1),getAuthorNickname:t=>t.author.nickname,getAuthorHandle:t=>t.author.sec_uid,getAuthorId:t=>t.author.uid,getAuthorOpenId:t=>t.author.sec_uid,getAuthorUrl:t=>"https://www.douyin.com/user/"+t,getAuthorAvatarLarge:t=>t.author.avatar_thumb.url_list.at(-1),getMetric:t=>t.statistics.digg_count,getDuration:t=>new Date(t.video.duration).toISOString().substr(11,8).split(":").filter(e=>e!=="00").join(":"),getMusicId:t=>t.music?.id,getMusicTitle:t=>t.music?.title,getMusicUrl:t=>t.music?.playUrl||t.music?.play_url?.url_list?.at(-1),getVideoDownloadItems(t,e){return[{url:t.video.play_addr.url_list.at(-1),filename:e+1+"_"+f(t.aweme_id,!1)+".mp4"}]},getAudioDownloadItem(t,e){return{url:t.music?.playUrl||t.music?.play_url?.url_list?.at(-1),filename:e+1+"_"+f(t.music.title.substr(0,50)||"audio",!1)+".mp3"}},onFoundItem(t){s.videoById.has(t.aweme_id)||(s.videoById.set(t.aweme_id,t),s.hasNew=!0)},setupHook(){T({onAfterSend:async({method:t,url:e,async:o,user:a,password:d},c,r)=>{try{const l=typeof r=="string"?JSON.parse(r):r;l?.aweme_list?.length&&(console.log(l),s.list.push(...l.aweme_list),l.aweme_list.forEach(this.onFoundItem)),l?.cards?.length&&l.cards.map(g=>JSON.parse(g.aweme)).forEach(this.onFoundItem)}catch(l){console.log("ERROR:",l)}}})}}}[m];window[i.windowKey]=s,i.setupHook(),B(`
#fbaio_tiktok_batchDownload {
  position: fixed;
  z-index: 16777269;
}

#fbaio_tiktok_batchDownload a:hover {
  text-decoration: underline;
}

#fbaio_tiktok_batchDownload .fbaio_floating_btn {
  border-radius: 25px;
  background: #444;
  color: white;
  padding: 15px;
  position: fixed;
  bottom: 25px;
  right: 25px;
  border: 1px solid #777;
  cursor: pointer;
}

#fbaio_tiktok_batchDownload .fbaio_floating_btn:hover {
  background: #666;
}

#fbaio_tiktok_batchDownload .fbaio_container {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
}

.fbaio_popup {
  position: relative;
  background: #444;
  color: #eee;
  padding: 20px;
  border-radius: 10px;
  max-width: 90vw;
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.fbaio_popup .fbaio_popup_header {
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.fbaio_popup .table_wrap {
  overflow: auto;
}

.fbaio_popup table {
  width: 100%;
}

.fbaio_popup table,
.fbaio_popup th,
.fbaio_popup td {
  border: 1px solid #aaa;
  border-collapse: collapse;
  vertical-align: middle;
}

.fbaio_popup table td {
  padding: 10px;
}

.fbaio_popup table thead {
  position: sticky;
  top: -2px;
  background: #333;
}

.fbaio_popup input {
  padding: 5px;
}

.fbaio_popup button {
  padding: 5px 10px;
  background: #333;
  color: #eee;
  border: 1px solid #777;
  cursor: pointer;
}

.fbaio_popup button:hover {
  background: #666;
}

.fbaio_popup .fbaio_avatar {
  width: 50px;
  height: 50px;
  cursor: pointer
}

.fbaio_popup .clickable {
  cursor: pointer;
  background: #333;
  user-select: none;
}

.fbaio_popup .clickable:hover {
  background: #666;
}

.fbaio_popup .fbaio_scroll_top {
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 10px;
  cursor: pointer;
  background: #444;
  color: white;
  padding: 10px;
}

/* check boxes */
.fbaio_is_private {
  position: absolute;
  top: 0;
  right: 0;
  color: red;
  background: black;
  padding: 8px;
  font-weight: bold;
}

.fbaio_tiktok_checkbox {
  z-index: 2;
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  transition: all 0.1s ease;
}

.fbaio_tiktok_checkbox:hover {
  transform: scale(1.3);
}

.fbaio_video_checkbox {
  width: 30px;
  height: 30px;
}

.fbaio_dropdown {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fbaio_dropdown .fbaio_dropdown_content {
  visibility: hidden;
  overflow: hidden;
  position: absolute;
  width: max-content;
  top: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.fbaio_dropdown .fbaio_dropdown_trigger:hover~.fbaio_dropdown_content,
.fbaio_dropdown .fbaio_dropdown_content:hover {
  visibility: visible;
}`),window.Vue||await j(await L("/scripts/content/helper/vue.js"));const b=document.createElement("div");document.documentElement.appendChild(b);const E=C("compactShort");function _(){const t=new Date;return[t.getFullYear(),t.getMonth()+1,t.getDate()].join("-")+"_"+[t.getHours(),t.getMinutes(),t.getSeconds()].join("-")}const P=new window.Vue({template:`
<div id="fbaio_tiktok_batchDownload">
  <div class="fbaio_floating_btn" @click="showModal = true">\u{1F4E5} {{totalCount}}</div>
  <div class="fbaio_container" v-if="showModal" @click.self="showModal = false">
    <div class="fbaio_popup">
      <h1 style="text-align:center">{{platformTitle}} - <a target="_blank" href="https://xh.nyna.io.vn/">xH all in one</a></h1>
      <h2 style="text-align:center">Found {{totalCount}} videos</h2>

      <div class="fbaio_popup_header">
        <button @click="scrollToVeryEnd">\u23EC Auto scroll</button>
        <div class="fbaio_dropdown">
          <button @click="clear" class="fbaio_dropdown_trigger">\u{1F5D1}\uFE0F Clear</button>
          <div class="fbaio_dropdown_content" v-if="selectedCount > 0">
            <button @click="clearSelected">\u{1F5D1}\uFE0F Remove {{selectedCount}} selected</button>
          </div>
        </div>
        <div class="fbaio_dropdown">
          <button @click="downloadVideo" class="fbaio_dropdown_trigger">\u{1F3AC}  {{videoTitle}}</button>
          <div class="fbaio_dropdown_content">
            <button @click="downloadAudio">\u{1F3A7} {{audioTitle}}</button>
            <button @click="downloadJson">\u{1F4C4} Download json</button>
          </div>
        </div>
        <input type="text" placeholder="\u{1F50E} Search..." :value="search" @input="e => search = e.target.value" >
      </div>

      <div class="table_wrap">
        <table>
          <thead>
            <tr>
              <th @click="setSortBy('index')" class="clickable">#</th>
              <th>\u{1F3AC} Video</th>
              <th @click="setSortBy('title')" class="clickable">Title</th>
              <th @click="setSortBy('author')" class="clickable">\u{1F464} User</th>
              <th @click="setSortBy(metricSortKey)" class="clickable">{{metricLabel}}</th>
              <th @click="setSortBy('duration')" class="clickable">Length</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
<tr v-if="videosToShow.length === 0">
  <td colspan="7"><h2 style="text-align:center">No video</h2></td>
</tr>
<tr v-for="v in videosToShow" :key="getItemId(v)">
  <td style="text-align:center">{{v.index}}<br/>
    <input type="checkbox" v-model="selected[getItemId(v)]" class="fbaio_video_checkbox" />
  </td>
  <td>
    <a target="_blank" :href="getVideoUrl(v)">
      <img :src="getCoverUrl(v)" :style="{ width: imageWidth }" />
    </a>
  </td>
  <td><p style="max-width:200px">{{getDesc(v)}}</p></td>
  <td>
    <img :src="getAuthorAvatar(v)" class="fbaio_avatar" @click="openUser(getAuthorOpenId(v))"/>
    {{getAuthorNickname(v)}}<br/>
    <input type="text" :value="getAuthorHandle(v)" style="width: 150px" /><br/>
    {{getAuthorId(v)}}
  </td>
  <td>{{format(getMetric(v))}}</td>
  <td>{{getDuration(v)}}s</td>
  <td>
    <p style="max-width:200px">
      <a :href="getVideoUrl(v)" v-if="getVideoUrl(v)" target="_blank">\u{1F3AC} Video</a><br/>
      <a :href="getCoverUrl(v)" target="_blank">\u{1F5BC}\uFE0F Cover</a><br/>
      <a :href="getAuthorAvatarLarge(v)" target="_blank">
      \u{1F464} Avatar
      </a><br/>
      <a v-if="getMusicUrl(v)" :href="getMusicUrl(v)" target="_blank">
      \u{1F3A7} Music: {{getMusicTitle(v)}}
      </a>
    </p>
  </td>
</tr>
          </tbody>
        </table>

        <button v-if="videosToShow.length > 2" @click="scrollToTop" class="fbaio_scroll_top">\u2B06</button>
      </div>
    </div>
  </div>
</div>`,created(){setInterval(()=>{s.hasNew&&(this.videos=Array.from(s.videoById.values()).map((t,e)=>({...t,index:e+1})),s.hasNew=!1)},1e3)},data(){return{showModal:!1,videos:[],search:"",sortBy:"index",sortDir:"asc",downloading:{video:null,audio:null},selected:{},platformTitle:i.title,metricLabel:i.metricLabel,metricSortKey:i.metricSortKey,imageWidth:i.imageWidth}},computed:{selectedIds(){return Object.entries(this.selected).filter(t=>t[1]).map(t=>t[0])},selectedCount(){return Object.values(this.selected).filter(t=>t).length},hasSelected(){return this.selectedCount>0},videoToDownload(){return this.hasSelected?this.videosToShow.filter(t=>this.selected[this.getItemId(t)]):this.videosToShow},audioToDownload(){const t=this.hasSelected?this.videosToShow.filter(o=>this.selected[this.getItemId(o)]):this.videosToShow,e=new Map;for(const o of t){const a=this.getMusicId(o);a&&!e.has(a)&&e.set(a,o)}return Array.from(e.values())},videoTitle(){return Number.isInteger(this.downloading.video)?"Downloading "+this.downloading.video+"/"+this.videoToDownload.length+" video":"Download "+this.videoToDownload.length+(this.hasSelected?" selected":"")+" video"},audioTitle(){return Number.isInteger(this.downloading.audio)?"Downloading "+this.downloading.audio+"/"+this.audioToDownload.length+" audio":"Download "+this.audioToDownload.length+(this.hasSelected?" selected":"")+" audio"},totalCount(){return this.videos.length},videosToShow(){return this.videos.filter(t=>[this.getDesc(t),this.getAuthorId(t),this.getAuthorNickname(t),this.getAuthorHandle(t)].some(e=>e?.toLowerCase?.().includes(this.search.toLowerCase()))).sort((t,e)=>{switch(this.sortBy){case"index":return this.sortDir==="asc"?t.index-e.index:e.index-t.index;case"title":return this.sortDir==="asc"?this.getDesc(t).localeCompare(this.getDesc(e)):this.getDesc(e).localeCompare(this.getDesc(t));case"author":return this.sortDir==="asc"?this.getAuthorNickname(t).localeCompare(this.getAuthorNickname(e)):this.getAuthorNickname(e).localeCompare(this.getAuthorNickname(t));case i.metricSortKey:return this.sortDir==="asc"?this.getMetric(t)-this.getMetric(e):this.getMetric(e)-this.getMetric(t);case"duration":return this.sortDir==="asc"?t.video.duration-e.video.duration:e.video.duration-t.video.duration}})}},methods:{async downloadVideo(){const t=this.videoToDownload.length;if(!t)return;let e=0;await y({folderName:i.videoFolderPrefix+_(),expectBlobTypes:i.expectBlobTypes,data:this.videoToDownload.map((o,a)=>i.getVideoDownloadItems(o,a)).flat().filter(o=>o.url),onProgressItem:(o,a)=>{this.downloading.video=o},onFinishItem:(o,a)=>{e++}}),this.downloading.video=!1,alert("Downloaded "+e+"/"+t+" videos!")},async downloadAudio(){const t=this.audioToDownload.length;if(!t)return;let e=0;await y({folderName:i.audioFolderPrefix+_(),data:this.audioToDownload.map((o,a)=>i.getAudioDownloadItem(o,a)),onProgressItem:(o,a)=>{this.downloading.audio=o},onFinishItem:(o,a)=>{e++}}),this.downloading.audio=!1,alert("Downloaded "+e+"/"+t+" videos!")},downloadJson(){U(JSON.stringify(this.videosToShow,null,4),this.videosToShow.length+i.jsonFilenameSuffix)},scrollToVeryEnd(){setTimeout(()=>V(!1),100)},scrollToTop(t){t.target.parentElement.scrollTo({top:0,behavior:"smooth"})},clearSelected(){this.selectedIds.forEach(t=>{s.videoById.delete(t)}),s.hasNew=!0,this.selected={}},clear(){confirm("Are you sure want to clear all?")&&(s.videoById.clear(),this.videos=[])},setSortBy(t){this.sortBy=t,t===this.sortBy&&(this.sortDir=this.sortDir==="asc"?"desc":"asc")},openUser(t){window.open(i.getAuthorUrl(t),"_blank")},format(t){return E.format(t)},getItemId:i.getItemId,getVideoUrl:i.getVideoUrl,getCoverUrl:i.getCoverUrl,getDesc:i.getDesc,getAuthorAvatar:i.getAuthorAvatar,getAuthorNickname:i.getAuthorNickname,getAuthorHandle:i.getAuthorHandle,getAuthorId:i.getAuthorId,getAuthorOpenId:i.getAuthorOpenId,getAuthorAvatarLarge:i.getAuthorAvatarLarge,getMetric:i.getMetric,getDuration:i.getDuration,getMusicId:i.getMusicId,getMusicTitle:i.getMusicTitle,getMusicUrl:i.getMusicUrl}}).$mount(b);async function y({folderName:t=m,expectBlobTypes:e,data:o,onProgressItem:a,onFinishItem:d}){const c=await S(t);a?.(0,o.length);for(let r=0;r<o.length;++r)try{a?.(r+1,o.length);const{url:l,filename:h}=o[r],g=await N(l);await M({url:g,fileName:h,dirHandler:c,expectBlobTypes:e}),d?.(r+1,o.length)}catch(l){console.error(l)}}function V(t=!0){return new Promise(async(e,o)=>{const a=F({msg:"Useful-script: Scrolling to very end...",duration:99999});function d(){let n=[],p=Array.from(document.querySelectorAll("*")).concat(document.documentElement);for(let u of p)window.getComputedStyle(u).overflowY!=="hidden"&&(u.scrollHeight>u.clientHeight||u.scrollWidth>u.clientWidth)&&n.push(u);if(n.length===1)return n[0];let v=null,A=0;for(let u of n){let w=u.getBoundingClientRect(),D=w.width*w.height;D>A&&(A=D,v=u)}return v}let c=n=>(n||document.body).scrollHeight,r=(n=document)=>n.scrollTo({left:0,top:c(n),behavior:t?"smooth":"instant"}),l=n=>new Promise(p=>setTimeout(p,n)),h={time:Date.now(),top:0},g=!0,k=()=>{g=!1,document.removeEventListener("click",k),a.setText("Useful-script: D\u1EEANG scroll do b\u1EA1n click"),a.closeAfter(3e3)};document.addEventListener("click",k);let x=d();for(;g;){r(x);let n=c(x),p=Date.now()-h.time,v=Math.round((5e3-p)/1e3);a.setText(`Useful-script: \u0111ang scroll xu\u1ED1ng cu\u1ED1i ... (${v}s)`),n!=h.top?(h.top=n,h.time=Date.now()):p>5e3&&(g=!1,a.setText("Useful-script: scroll XONG"),a.closeAfter(2e3)),await l(100)}e()})}})();
