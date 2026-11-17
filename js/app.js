"use strict";
// Indicative 2026 prices from the guide brief. uae = AED low, or null when no verified figure (check Al-Futtaim).
const M=[
{n:"BYD Seal 5 DM-i / Qin Plus DM-i",pt:"PHEV",b:"Sedan",lo:948e3,hi:1198e3,uae:74900,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026"},
{n:"BYD Atto 2 DM-i",pt:"PHEV",b:"Crossover",lo:1048e3,hi:1258e3,uae:null,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026"},
{n:"BYD Atto 2 EV",pt:"EV",b:"Crossover",lo:1338e3,hi:1338e3,uae:null,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026"},
{n:"BYD Sealion 5 DM-i",pt:"PHEV",b:"SUV",lo:1268e3,hi:1268e3,uae:89900,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026"},
{n:"BYD Sealion 6 DM-i / Song Plus DM-i",pt:"PHEV",b:"SUV",lo:1548e3,hi:1798e3,uae:119900,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026",d:"One May 2026 report listed ₱1.598M."},
{n:"BYD Atto 3",pt:"EV",b:"Crossover",lo:1638e3,hi:1848e3,uae:94900,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026",d:"Earlier listings showed ₱1.598M to ₱1.798M.",u:"Older UAE listings show AED 149,900; May 2026 lists from AED 94,900."},
{n:"BYD Seal",pt:"EV",b:"Sedan",lo:2098e3,hi:2648e3,uae:149900,s:"BYD Cars Philippines site and Zigwheels PH, Nov 2026",d:"Earlier listings showed ₱1.998M to ₱2.548M."},
{n:"BYD Shark 6 DMO",pt:"PHEV",b:"Pickup",lo:2388e3,hi:2618e3,uae:158900,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026"},
{n:"BYD Sealion 7",pt:"EV",b:"SUV",lo:2588e3,hi:2588e3,uae:158900,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026",u:"UAE listings show from AED 158,900 or AED 172,900."},
{n:"BYD Seagull",pt:"EV",b:"Hatchback",lo:898e3,hi:898e3,uae:null,s:"Zigwheels PH, Apr 2026 (last reported)",x:"Not on the 12 Nov 2026 price list; may be sold out or discontinued. Ask a dealer."},
{n:"BYD Dolphin",pt:"EV",b:"Hatchback",lo:1398e3,hi:1398e3,uae:null,s:"Zigwheels PH, Apr 2026 (last reported)",x:"Not on the 12 Nov 2026 price list; may be sold out or discontinued. Ask a dealer."},
{n:"BYD eMAX 7",pt:"EV",b:"MPV",lo:1498e3,hi:1748e3,uae:null,s:"Zigwheels PH, Apr 2026 (last reported)",x:"Not on the 12 Nov 2026 price list; may be sold out or discontinued. Ask a dealer."},
{n:"BYD Tang DM-i",pt:"PHEV",b:"7-seater SUV",lo:2098e3,hi:2148e3,uae:null,s:"Zigwheels PH, Apr 2026 (last reported)",x:"Not on the 12 Nov 2026 price list; may be sold out or discontinued. Ask a dealer."},
{n:"BYD Tang EV",pt:"EV",b:"7-seater SUV",lo:3321e3,hi:3421e3,uae:null,s:"Zigwheels PH, Apr 2026 (last reported)",x:"Not on the 12 Nov 2026 price list; may be sold out or discontinued. Ask a dealer."}];
const PRICES_REVIEWED="18 Nov 2026",PRICES_LIST_DATE="12 Nov 2026";
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const fmt=n=>Math.round(n).toLocaleString("en-US");
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
let fav=store.get("fav",[]);
const rate=()=>Math.max(1,parseFloat($("#rate").value)||15.8);
function show(el,html){el.innerHTML=html}
function priceHTML(m){const c=$("#fc").value,r=rate();const php=`₱${fmt(m.lo)}${m.hi>m.lo?" – ₱"+fmt(m.hi):""}`;
const aedP=m.uae?`from AED ${fmt(m.uae)} (reported)`:"UAE price: ask dealer";const aedFromPhp=`≈ AED ${fmt(m.lo/r)}${m.hi>m.lo?" – "+fmt(m.hi/r):""}`;
if(c==="PHP")return `<div class="price">${php}</div>`;
if(c==="AED")return `<div class="price">${aedFromPhp}<small>PH price converted. UAE: ${aedP}</small></div>`;
return `<div class="price">${php}<small>UAE: ${aedP}${m.uae?` (≈ ₱${fmt(m.uae*r)})`:""}</small></div>`}
function card(m,i){const on=fav.includes(m.n);return `<article class="card"><h3>${m.n}</h3><span class="badge ${m.pt}">${m.pt==="EV"?"Pure EV":"Plug-in hybrid"}</span> <span class="sub">${m.b}</span>${priceHTML(m)}<p class="note">Source: ${m.s}.${m.d?" Sources differ: "+m.d:""}${m.u?" UAE: "+m.u:""}</p>${m.x?`<p class="note"><b>Not on current list.</b> ${m.x}</p>`:""}
<button class="fav ${on?"on":""}" data-n="${m.n}" aria-pressed="${on}" aria-label="${on?"Remove":"Save"} ${m.n} ${on?"from":"to"} shortlist">${on?"Saved":"Save to shortlist"}</button></article>`}
function render(){const p=$("#fp").value,b=$("#fb").value,t=+$("#ft").value;
const out=M.filter(m=>(p==="all"||m.pt===p)&&(b==="all"||m.b===b)&&(!t||(t===99999999?m.lo>2e6:m.lo<=t)));
show($("#list"),out.length?out.map(card).join(""):'<p class="empty">No models match these filters. Reset one filter to see more.</p>');
const sv=M.filter(m=>fav.includes(m.n));show($("#slist"),sv.length?sv.map(card).join(""):'<p class="empty">Nothing saved yet. Save models from Compare.</p>');$("#cnt").textContent=fav.length;tco();start();pay()}
function tco(){const m=M.find(x=>x.n===$("#tm").value)||M[0],km=+$("#tk").value||0,y=+$("#ty").value||5,h=Math.min(100,Math.max(0,+$("#th").value))/100,r=rate();
$("#th2").textContent=`Energy cost over ${y} year${y>1?"s":""}`;const tot=km*y/100;let ph,ae;
if(m.pt==="EV"){const k=tot*15;ph=k*(h*13+(1-h)*25);ae=k*(h*.30+(1-h)*.95)*r}
else{const l=tot*5.5;ph=l*62;ae=l*2.99*r}
show($("#tout"),`<article class="card"><h3>Philippines</h3><div class="price">Energy: ₱${fmt(ph)}<small>Purchase from ₱${fmt(m.lo)}</small></div><p>Total: ₱${fmt(ph+m.lo)}</p></article>
<article class="card"><h3>UAE</h3><div class="price">Energy: ≈ ₱${fmt(ae)}<small>${m.uae?"Purchase from AED "+fmt(m.uae)+" (≈ ₱"+fmt(m.uae*r)+")":"No UAE price in this guide yet. Ask Al-Futtaim for a quote."}</small></div><p>${m.uae?"Total: ≈ ₱"+fmt(ae+m.uae*r):"Energy cost only. Add the UAE car price to compare totals."}</p></article>`)}
function tab(id){$$("#tabs [role=tab]").forEach(b=>b.setAttribute("aria-selected",b.dataset.t===id));$$(".panel").forEach(p=>p.hidden=p.id!==id);history.replaceState(null,"","#"+id)}
$("#tabs").addEventListener("click",e=>{const b=e.target.closest("[data-t]");if(b)tab(b.dataset.t)});
$("#tabs").addEventListener("keydown",e=>{const t=$$("#tabs [role=tab]"),i=t.indexOf(document.activeElement);if(i<0||!["ArrowRight","ArrowLeft"].includes(e.key))return;const n=t[(i+(e.key==="ArrowRight"?1:t.length-1))%t.length];n.focus();tab(n.dataset.t)});
document.addEventListener("click",e=>{const f=e.target.closest(".fav");if(!f)return;const n=f.dataset.n;fav=fav.includes(n)?fav.filter(x=>x!==n):[...fav,n];store.set("fav",fav);render()});
["#fp","#fb","#ft","#fc","#rate","#tm","#tk","#ty","#th","#sb","#sk","#sc","#pp","#pd","#pt","#pr"].forEach(s=>$(s).addEventListener("input",()=>{if(s==="#rate")store.set("rate",$(s).value);if(s==="#tm")$("#pp").value=M.find(x=>x.n===$("#tm").value).lo;render()}));
[...new Set(M.map(m=>m.b))].forEach(b=>$("#fb").insertAdjacentHTML("beforeend",`<option>${b}</option>`));
M.forEach(m=>$("#tm").insertAdjacentHTML("beforeend",`<option>${m.n}</option>`));
$("#rate").value=store.get("rate",15.8);
$("#share").addEventListener("click",async()=>{const t="My BYD shortlist:\n"+M.filter(m=>fav.includes(m.n)).map(m=>`${m.n}: ₱${fmt(m.lo)}`).join("\n")+"\nhttps://esp046-cyber.github.io/bydcarbuyingguide/";
try{if(navigator.share)await navigator.share({text:t});else{await navigator.clipboard.writeText(t);toast("Summary copied")}}catch{}});
// Start wizard
function start(){const b=+$("#sb").value,k=+$("#sk").value,c=$("#sc").value,pe=c==="no"||(k>=120&&c!=="yes");
let l=M.filter(m=>m.lo<=b&&!m.x);if(pe)l=l.filter(m=>m.pt==="PHEV");l=l.sort((a,b)=>a.lo-b.lo).slice(0,4);
show($("#sres"),l.length?l.map(m=>`<article class="card"><h3>${m.n}</h3><span class="badge ${m.pt}">${m.pt==="EV"?"Pure EV":"Plug-in hybrid"}</span><div class="price">From ₱${fmt(m.lo)}</div><p>${m.pt==="EV"?"Runs on battery only. Best if you can charge at home or at work.":"Petrol engine as backup, so long trips and no charger are fine."}</p></article>`).join("")+`<p class="note" style="grid-column:1/-1">${pe?"Shown plug-in hybrids only because you may not have easy charging or drive long distances. ":""}See all models in Models, then check costs in Costs.</p>`:'<p class="empty">No model starts at or under that budget. Raise your budget or try the payment calculator in Costs.</p>')}
function pay(){const P=(+$("#pp").value||0)*(1-Math.min(90,Math.max(0,+$("#pd").value||0))/100),n=Math.max(1,+$("#pt").value||1)*12,r=Math.max(0,+$("#pr").value||0)/1200;
const mo=r?P*r/(1-Math.pow(1+r,-n)):P/n;show($("#pout"),`<article class="card"><h3>Monthly payment</h3><div class="price">₱${fmt(mo)}<small>Loan ₱${fmt(P)} over ${n/12} years</small></div><p>Total interest: ₱${fmt(mo*n-P)}</p></article>`)}
// OFW checklist
const CK=["Ask the Philippine dealer if OFW or balikbayan promos exist","Get written quotes in PHP including registration and insurance","Ask a licensed customs broker for the total cost of importing","Confirm the warranty applies to the exact car you are buying","Decide where you will charge: home, condo or work","Check the nearest service center to your home","Set a monthly budget before visiting dealers","Note the exchange rate and remittance fees you will pay"];
let ck=store.get("chk",[]);
function drawCk(){$("#chk").innerHTML=CK.map((t,i)=>`<li><label><input type="checkbox" data-i="${i}" ${ck.includes(i)?"checked":""}>${t}</label></li>`).join("")}
$("#chk").addEventListener("change",e=>{const i=+e.target.dataset.i;ck=e.target.checked?[...ck,i]:ck.filter(x=>x!==i);store.set("chk",ck)});drawCk();
$("#asof").textContent=`Philippine prices follow the BYD Cars Philippines price list valid as of ${PRICES_LIST_DATE} (checked ${PRICES_REVIEWED}). They are suggested retail prices; dealer prices vary. UAE prices are from listing sites citing Al-Futtaim (May 2026) and were not rechecked.`;
// Theme: auto -> light -> dark
const th=["auto","light","dark"];let ti=th.indexOf(store.get("theme","auto"));
function applyTheme(){const v=th[ti],r=document.documentElement;v==="auto"?r.removeAttribute("data-theme"):r.dataset.theme=v;$("#theme").textContent="Theme: "+v;
const dark=v==="dark"||(v==="auto"&&matchMedia("(prefers-color-scheme:dark)").matches);document.querySelector('meta[name=theme-color]').content=dark?"#0b1620":"#f4f8fa"}
$("#theme").addEventListener("click",()=>{ti=(ti+1)%3;store.set("theme",th[ti]);applyTheme()});matchMedia("(prefers-color-scheme:dark)").addEventListener("change",applyTheme);applyTheme();
// Online status
function net(){const p=$("#net");p.textContent=navigator.onLine?"Online":"Offline";p.classList.toggle("off",!navigator.onLine)}
addEventListener("online",net);addEventListener("offline",net);net();
function toast(msg,action){const t=$("#toast");t.hidden=false;t.innerHTML=`<span>${msg}</span>`;if(action){const b=document.createElement("button");b.textContent=action.l;b.onclick=action.f;t.append(b)}else setTimeout(()=>t.hidden=true,3000)}
// Install
let dp;addEventListener("beforeinstallprompt",e=>{e.preventDefault();dp=e;$("#install").hidden=false});
$("#install").addEventListener("click",async()=>{if(!dp)return;dp.prompt();await dp.userChoice;dp=null;$("#install").hidden=true});
addEventListener("appinstalled",()=>$("#install").hidden=true);
const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)&&!navigator.standalone;
if(ios){$("#iosh").hidden=false;$("#iosh").addEventListener("click",()=>{try{$("#ios").showModal()}catch{}})}
$("#iosx").addEventListener("click",()=>$("#ios").close());
// Service worker + update toast
if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("./sw.js",{scope:"./"}).then(r=>{
r.addEventListener("updatefound",()=>{const w=r.installing;w.addEventListener("statechange",()=>{if(w.state==="installed"&&navigator.serviceWorker.controller)toast("Update available",{l:"Reload",f:()=>{w.postMessage("SKIP_WAITING")}})})})}).catch(()=>{}));
let rl;navigator.serviceWorker?.addEventListener("controllerchange",()=>{if(rl)return;rl=1;if(!$("#toast").hidden)location.reload()});
{const h=location.hash.slice(1);if(["start","compare","tco","ofw","saved"].includes(h))tab(h)}
render();
