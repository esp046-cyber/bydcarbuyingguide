"use strict";
// Indicative 2026 prices from the guide brief. uae = AED low, or null when no verified figure (check Al-Futtaim).
const M=[
{n:"BYD Seal 5 DM-i / Qin Plus DM-i",sp:"Essential: 7.42 kWh battery, up to 55 km electric range. Dynamic: 18.3 kWh, up to 115 km (Manila Bulletin, Jul 2026). Warranty: 6 years or 160,000 km vehicle, 8 years or 160,000 km Blade Battery, 8 years drive unit (CleanTechnica, Aug 2026).",pt:"PHEV",b:"Sedan",lo:948e3,hi:1198e3,uae:74900,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026"},
{n:"BYD Atto 2 DM-i",sp:"7.9 kWh battery, 162 hp, 300 Nm (Zigwheels PH, 2026). Warranty: 6 years or 160,000 km vehicle, 8 years or 160,000 km Blade Battery, 8 years drive unit (CleanTechnica, Aug 2026).",pt:"PHEV",b:"Crossover",lo:1048e3,hi:1258e3,uae:null,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026"},
{n:"BYD Atto 2 EV",sp:"Premium: 45.12 kWh battery, up to 380 km range (Autoindustriya, 2026). DC charging 10 to 100% in about 40 minutes (Zigwheels PH). Warranty: 6 years or 160,000 km vehicle, 8 years or 160,000 km Blade Battery, 8 years drive unit (CleanTechnica, Aug 2026).",pt:"EV",b:"Crossover",lo:1338e3,hi:1338e3,uae:null,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026"},
{n:"BYD Sealion 5 DM-i",sp:"12.96 kWh Blade Battery, 71 km electric range (NEDC), 197 hp, 300 Nm (Unbox.ph; BYD PH page).",pt:"PHEV",b:"SUV",lo:1268e3,hi:1268e3,uae:89900,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026"},
{n:"BYD Sealion 6 DM-i / Song Plus DM-i",sp:"18.3 kWh battery. Free 7 kW wall charger; about 2.6 to 3 hours for a full AC charge (CarGuide.ph; GadgetMatch).",pt:"PHEV",b:"SUV",lo:1548e3,hi:1798e3,uae:119900,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026",d:"One May 2026 report listed ₱1.598M."},
{n:"BYD Atto 3",pt:"EV",b:"Crossover",lo:1638e3,hi:1848e3,uae:94900,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026",d:"Earlier listings showed ₱1.598M to ₱1.798M.",u:"Older UAE listings show AED 149,900; May 2026 lists from AED 94,900."},
{n:"BYD Seal",pt:"EV",b:"Sedan",lo:2098e3,hi:2648e3,uae:149900,s:"BYD Cars Philippines site and Zigwheels PH, Nov 2026",d:"Earlier listings showed ₱1.998M to ₱2.548M."},
{n:"BYD Shark 6 DMO",pt:"PHEV",b:"Pickup",lo:2388e3,hi:2618e3,uae:158900,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026"},
{n:"BYD Sealion 7",sp:"Up to 482 km range from an 82.6 kWh Blade Battery (Visor.ph, 2026).",pt:"EV",b:"SUV",lo:2588e3,hi:2588e3,uae:158900,s:"BYD Cars Philippines price list, SRP as of 12 Nov 2026",u:"Listings show from AED 158,900 or AED 172,900."},
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
const aedP=m.uae?`from AED ${fmt(m.uae)} (reported)`:"ask the dealer";const aedFromPhp=`≈ AED ${fmt(m.lo/r)}${m.hi>m.lo?" – "+fmt(m.hi/r):""}`;
if(c==="PHP")return `<div class="price">${php}</div>`;
if(c==="AED")return `<div class="price">${aedFromPhp}<small>PH price converted. UAE: ${aedP}</small></div>`;
return `<div class="price">${php}<small>UAE: ${aedP}${m.uae?` (≈ ₱${fmt(m.uae*r)})`:""}</small></div>`}
function card(m,i){const on=fav.includes(m.n);return `<article class="card"><h3>${m.n}</h3><span class="badge ${m.pt}">${m.pt==="EV"?"Pure EV":"Plug-in hybrid"}</span> <span class="sub">${m.b}</span>${priceHTML(m)}<p class="note">Source: ${m.s}.${m.d?" Sources differ: "+m.d:""}${m.u?" UAE: "+m.u:""}</p>${m.sp?`<p class="note"><b>Specs (press reports, not a spec sheet):</b> ${m.sp}</p>`:""}${m.x?`<p class="note"><b>Not on current list.</b> ${m.x}</p>`:""}
<button class="fav ${on?"on":""}" data-n="${m.n}" aria-pressed="${on}" aria-label="${on?"Remove":"Save"} ${m.n} ${on?"from":"to"} shortlist">${on?"Saved":"Save to shortlist"}</button></article>`}
function render(){const p=$("#fp").value,b=$("#fb").value,t=+$("#ft").value;
const out=M.filter(m=>(p==="all"||m.pt===p)&&(b==="all"||m.b===b)&&(!t||(t===99999999?m.lo>2e6:m.lo<=t)));
show($("#list"),out.length?out.map(card).join(""):'<p class="empty">No models match these filters. Reset one filter to see more.</p>');
const sv=M.filter(m=>fav.includes(m.n));show($("#slist"),sv.length?sv.map(card).join(""):'<p class="empty">No saved models yet. Tap Save to shortlist on any model. <button data-go="compare">Browse models</button></p>');$("#cnt").textContent=fav.length;tco();start();pay();imp();dec()}
const n=id=>parseFloat($(id).value)||0;
function tco(){const m=M.find(x=>x.n===$("#tm").value)||M[0],y=n("#ty")||5,km=n("#tk"),h=Math.min(100,Math.max(0,n("#th")))/100,r=rate(),c=n("#tc"),tot=km*y/100*c;
$("#th2").textContent=`Cost over ${y} year${y>1?"s":""}`;$("#tcu").textContent=m.pt==="EV"?"kWh per 100 km":"L per 100 km";
let ph,ae;if(m.pt==="EV"){ph=tot*(h*n("#phh")+(1-h)*n("#php"));ae=tot*(h*n("#uah")+(1-h)*n("#uap"))}else{ph=tot*n("#phf");ae=tot*n("#uaf")}
const xp=n("#cxp")*y,xu=n("#cxu")*y,d=$("#rd").value,rs=Math.min(100,n("#crs"))/100,rp=m.lo*rs,ru=(m.uae||0)*rs;
show($("#tout"),`<article class="card"><h3>Philippines</h3><div class="price">Energy: ₱${fmt(ph)}<small>Extras: ₱${fmt(xp)}.${rp?" Resale: −₱"+fmt(rp)+".":""} Purchase from ₱${fmt(m.lo)}</small></div><p>Total: ₱${fmt(ph+xp+m.lo-rp)}</p></article>
<article class="card"><h3>UAE</h3><div class="price">Energy: AED ${fmt(ae)} (≈ ₱${fmt(ae*r)})<small>Extras: AED ${fmt(xu)}. ${m.uae?"Purchase from AED "+fmt(m.uae):"No UAE price in this guide yet. Ask Al-Futtaim for a quote."}</small></div><p>${m.uae?"Total: AED "+fmt(ae+xu+m.uae-ru)+" (≈ ₱"+fmt((ae+xu+m.uae-ru)*r)+")":"Add the UAE car price to compare totals."}</p></article>
<p class="note" style="grid-column:1/-1">Exchange rate: 1 AED = ₱${r}. ${d?"Checked on "+d+".":"Set the date you checked this rate in Models."}</p>`)}
function syncTc(){const m=M.find(x=>x.n===$("#tm").value);$("#tc").value=store.get("tc:"+m.n,null)??(m.pt==="EV"?15:5.5)}
function imp(){const v=n("#ipp")*rate(),s=["#ish","#idt","#iex","#ivt","#ibr","#ireg"].reduce((a,i)=>a+n(i),0);
show($("#iout"),`<article class="card"><h3>Estimated landed cost</h3><div class="price">₱${fmt(v+s)}<small>Car ≈ ₱${fmt(v)} plus costs ₱${fmt(s)}</small></div><p>${s?"Use broker quotes for every cost line.":"No import costs entered yet, so this is the car price only."}</p></article>`)}
function dec(){const w=$("#ow").value,r=$("#or").value;
$("#dres").textContent=w==="ph"?"Buy in the Philippines. You get local warranty, service and registration support.":w==="uae"?(r==="soon"?"Think twice before buying in the UAE. You may need to sell it before you leave, and importing needs verified eligibility and landed cost.":"A UAE purchase can make sense while you live there. Plan what you will do with the car when you leave."):"Buy in the Philippines unless you can confirm import eligibility and landed cost with a customs broker."}
function tab(id){$$("#tabs [role=tab]").forEach(b=>b.setAttribute("aria-selected",b.dataset.t===id));$$(".panel").forEach(p=>p.hidden=p.id!==id);history.replaceState(null,"","#"+id);scrollTo(0,0)}
$("#tabs").addEventListener("click",e=>{const b=e.target.closest("[data-t]");if(b)tab(b.dataset.t)});
$("#tabs").addEventListener("keydown",e=>{const t=$$("#tabs [role=tab]"),i=t.indexOf(document.activeElement);if(i<0||!["ArrowRight","ArrowLeft"].includes(e.key))return;const n=t[(i+(e.key==="ArrowRight"?1:t.length-1))%t.length];n.focus();tab(n.dataset.t)});
document.addEventListener("click",e=>{const f=e.target.closest(".fav");if(!f)return;const n=f.dataset.n;fav=fav.includes(n)?fav.filter(x=>x!==n):[...fav,n];store.set("fav",fav);render()});
["#up","#ud","#ut","#ur","#rf","#crs","#tc","#phh","#php","#phf","#uah","#uap","#uaf","#cxp","#cxu","#rd","#ipp","#ish","#idt","#iex","#ivt","#ibr","#ireg","#ow","#or","#fp","#fb","#ft","#fc","#rate","#tm","#tk","#ty","#th","#sb","#sk","#sc","#pp","#pd","#pt","#pr"].forEach(s=>$(s).addEventListener("input",()=>{if(s==="#rate")store.set("rate",$(s).value);if(s==="#rd")store.set("rd",$(s).value);if(s==="#tc")store.set("tc:"+$("#tm").value,$(s).value);if(s==="#tm"){{const mm=M.find(x=>x.n===$("#tm").value);$("#pp").value=mm.lo;$("#up").value=mm.uae||0;syncTc()}}render()}));
[...new Set(M.map(m=>m.b))].forEach(b=>$("#fb").insertAdjacentHTML("beforeend",`<option>${b}</option>`));
M.forEach(m=>$("#tm").insertAdjacentHTML("beforeend",`<option>${m.n}</option>`));
$("#rate").value=store.get("rate",15.8);$("#rd").value=store.get("rd","");syncTc();document.addEventListener("click",e=>{const g=e.target.closest("[data-go]");if(g)tab(g.dataset.go)});addEventListener("hashchange",()=>{const h=location.hash.slice(1);if(["start","compare","tco","ofw","saved"].includes(h))tab(h)});
$("#share").addEventListener("click",async()=>{const t="My BYD shortlist (checked "+PRICES_REVIEWED+"):\n"+M.filter(m=>fav.includes(m.n)).map(m=>`${m.n}: ₱${fmt(m.lo)}${m.hi>m.lo?" to ₱"+fmt(m.hi):""}${m.uae?", UAE from AED "+fmt(m.uae):""} (${m.s})`).join("\n")+"\nPrices are reported, not dealer quotes.\nhttps://esp046-cyber.github.io/bydcarbuyingguide/";
try{if(navigator.share)await navigator.share({text:t});else{await navigator.clipboard.writeText(t);toast("Summary copied")}}catch{}});
// Start wizard
function start(){const b=+$("#sb").value,k=+$("#sk").value,c=$("#sc").value,pe=c==="no"||(k>=120&&c!=="yes");
let l=M.filter(m=>m.lo<=b&&!m.x);if(pe)l=l.filter(m=>m.pt==="PHEV");l=l.sort((a,b)=>a.lo-b.lo).slice(0,4);
show($("#sres"),l.length?l.map(m=>`<article class="card"><h3>${m.n}</h3><span class="badge ${m.pt}">${m.pt==="EV"?"Pure EV":"Plug-in hybrid"}</span><div class="price">From ₱${fmt(m.lo)}</div><p>${m.pt==="EV"?"Runs on battery only. Best if you can charge at home or at work.":"Petrol engine as backup, so long trips and no charger are fine."}</p></article>`).join("")+`<p class="note" style="grid-column:1/-1">${pe?"Shown plug-in hybrids only because you may not have easy charging or drive long distances. ":""}See all models in Models, then check costs in Costs.</p>`:'<p class="empty">No model starts at or under that budget. Raise your budget or try the payment calculator in Costs.</p>')}
function pay(){const loan=(pr,dp,yrs,rt)=>{const P=pr*(1-Math.min(90,Math.max(0,dp))/100),k=Math.max(1,yrs)*12,q=Math.max(0,rt)/1200,mo=q?P*q/(1-Math.pow(1+q,-k)):P/k;return{P,k,mo,int:mo*k-P}};
const a=loan(n("#pp"),n("#pd"),n("#pt")||1,n("#pr")),b=loan(n("#up"),n("#ud"),n("#ut")||1,n("#ur")),r=rate(),fee=Math.max(0,n("#rf"))/100;
show($("#pout"),`<article class="card"><h3>Philippines loan</h3><div class="price">₱${fmt(a.mo)} a month<small>Loan ₱${fmt(a.P)} over ${a.k/12} years${fee?". With remittance cost ≈ ₱"+fmt(a.mo*(1+fee)):""}</small></div><p>Total interest: ₱${fmt(a.int)}</p></article>
<article class="card"><h3>UAE loan</h3><div class="price">AED ${fmt(b.mo)} a month<small>≈ ₱${fmt(b.mo*r)}. Loan AED ${fmt(b.P)} over ${b.k/12} years</small></div><p>Total interest: AED ${fmt(b.int)}</p></article>
<article class="card"><h3>Paying cash</h3><div class="price">₱${fmt(n("#pp"))}<small>or AED ${fmt(n("#up"))} (≈ ₱${fmt(n("#up")*r)})</small></div><p>Cash avoids interest but uses savings you may need for emergencies.</p></article>`)}
// Spec checker (user-filled)
const SP=["Battery size (kWh)","Range figure and test standard (CLTC, WLTP...)","AC and DC charging power (kW)","Charging connector type","Warranty: vehicle and battery (years or km)","Software, app and language","Nearest service center","Trim and options"];
let sp=store.get("spec",{});
$("#spec").innerHTML='<div class="specrow"><b>Philippines</b><b>UAE</b></div>'+SP.map((t,i)=>`<p class="note">${t}</p><div class="specrow"><input data-k="p${i}" aria-label="${t}, Philippines" value=""><input data-k="u${i}" aria-label="${t}, UAE" value=""></div>`).join("");
$$("#spec input").forEach(el=>{el.value=sp[el.dataset.k]||"";el.addEventListener("input",()=>{sp[el.dataset.k]=el.value;store.set("spec",sp)})});
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
