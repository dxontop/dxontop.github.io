// 1998 script

// tab title
(function(){
  const el=document.getElementById('tab-title');
  const txt='1998'; let i=0,erase=false,out='';
  function step(){
    if(!erase){out=txt.slice(0,++i);el.textContent=out+(i<txt.length?'|':'');
      if(i===txt.length){setTimeout(()=>{erase=true;step()},3000);return;}
    }else{out=out.slice(0,-1);el.textContent=out+'|';
      if(!out.length){erase=false;i=0;setTimeout(step,500);return;}
    }
    setTimeout(step,erase?45:85+Math.random()*55);
  }
  step();
})();

// splash to
window.addEventListener('load',()=>{
  const splash=document.getElementById('splash');
  const btn=document.getElementById('enter-btn');
  const site=document.getElementById('site');
  const music=document.getElementById('bg-music');
  let done=false;
  function enter(){
    if(done)return; done=true;
    if(music){music.volume=0.28;music.play().catch(()=>{})}
    splash.classList.add('up');
    setTimeout(()=>{
      splash.style.display='none';
      site.classList.add('visible');
      initDiscord();
      initServers();
      initServersTyping();
      initScrollReveal();
      initTerminal();
    },900);
  }
  btn.addEventListener('click',e=>{e.stopPropagation();enter()});
  splash.addEventListener('click',enter);
});

// nav
const NAV_IDS=['hof','tte','exclusive','servers','terminal'];
function updateNav(){
  const mid=window.scrollY+window.innerHeight*.45;
  NAV_IDS.forEach(id=>{
    const s=document.getElementById(id);
    const a=document.querySelector(`#nav a[data-s="${id}"]`);
    if(!s||!a)return;
    if(mid>=s.offsetTop&&mid<s.offsetTop+s.offsetHeight){
      document.querySelectorAll('#nav a').forEach(x=>x.classList.remove('active'));
      a.classList.add('active');
    }
  });
}
window.addEventListener('scroll',updateNav,{passive:true});
updateNav();
document.querySelectorAll('#nav a').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    document.getElementById(a.dataset.s)?.scrollIntoView({behavior:'smooth'});
  });
});

// ════════════════════════════════════════════════════
//  DISCORD PRESENCE — Lanyard API
//
//  SETUP (required for each member):
//  1. Member joins discord.gg/lanyard  ← mandatory
//  2. Enable Discord Developer Mode → Settings → Advanced
//  3. Right-click member name → Copy User ID
//  4. In index.html replace data-uid="0000..." with real ID
//     e.g. data-uid="123456789012345678"
//
//  WHAT SYNCS AUTOMATICALLY:
//  • Avatar (animated GIF if they have one)
//  • Banner (Discord Nitro banner shown on HOF hover card)
//  • Display name + username tag
//  • Online / Idle / DND / Offline status dot
//  • Current activity: game, Spotify song, custom status
// ════════════════════════════════════════════════════

const CDN='https://cdn.discordapp.com';

function avatarUrl(uid,hash,size=128){
  if(!hash)return `${CDN}/embed/avatars/${Number(BigInt(uid)%5n)}.png`;
  const fmt=hash.startsWith('a_')?'gif':'png';
  return `${CDN}/avatars/${uid}/${hash}.${fmt}?size=${size}`;
}
function bannerUrl(uid,hash){
  if(!hash)return null;
  const fmt=hash.startsWith('a_')?'gif':'png';
  return `${CDN}/banners/${uid}/${hash}.${fmt}?size=480`;
}
function statusLabel(s){
  return{online:'Online',idle:'Idle',dnd:'Do Not Disturb',offline:'Offline'}[s]||'Offline';
}
function getActivity(d){
  if(d.listening_to_spotify&&d.spotify)return `🎵 ${d.spotify.song} — ${d.spotify.artist}`;
  const acts=d.activities||[];
  const a=acts.find(x=>x.type!==4);
  if(a){
    if(a.type===0)return `🎮 ${a.name}`;
    if(a.type===2)return `🎵 ${a.name}`;
    if(a.type===3)return `📺 ${a.name}`;
    return a.name;
  }
  const cs=acts.find(x=>x.type===4);
  return cs?.state||'';
}

async function fetchPresence(uid){
  try{
    const r=await fetch(`https://api.lanyard.rest/v1/users/${uid}`);
    const j=await r.json();
    if(j.success)return j.data;
  }catch(e){}
  return null;
}

// hof
async function loadHOF(card){
  const uid=card.dataset.uid;
  if(!uid||uid.startsWith('0000'))return;
  const d=await fetchPresence(uid);
  if(!d)return;
  const u=d.discord_user;
  const st=d.discord_status||'offline';
  const act=getActivity(d);
  const avSrc=avatarUrl(uid,u.avatar);
  const banSrc=bannerUrl(uid,u.banner);
  const name=u.global_name||u.username;
  const tag='@'+u.username;

  // Front card
  const av=card.querySelector('.hof-avatar');
  if(av)av.src=avSrc;
  const sdot=card.querySelector('.hof-sdot');
  if(sdot)sdot.dataset.status=st;
  const fn=card.querySelector('.hof-front-name');
  if(fn)fn.textContent=name;

  // If banner exists set as card-bg image
  if(banSrc){
    const bg=card.querySelector('.hof-card-bg');
    if(bg)bg.style.background=`url('${banSrc}') center/cover no-repeat`;
  }

  // Hover Discord card
  const hov=card.querySelector('.hof-hover-card');
  if(!hov)return;

  // Banner in hover card
  const ban=hov.querySelector('.hof-banner');
  if(ban){
    if(banSrc){ban.style.background=`url('${banSrc}') center/cover no-repeat`;}
    else{
      // Use avatar as blurred banner fallback (like Discord does)
      ban.style.background=`url('${avSrc}') center/cover no-repeat`;
      ban.style.filter='blur(12px) brightness(.5)';
    }
  }

  const hav=hov.querySelector('.hof-hover-av');
  if(hav)hav.src=avSrc;
  const hsdot=hov.querySelector('.hof-hover-sdot');
  if(hsdot)hsdot.dataset.status=st;
  const hn=hov.querySelector('.hof-hover-name');
  if(hn)hn.textContent=name;
  const ht=hov.querySelector('.hof-hover-tag');
  if(ht)ht.textContent=tag;
  const hsi=hov.querySelector('.hof-hover-sdot-inline');
  if(hsi)hsi.dataset.status=st;
  const hst=hov.querySelector('.hof-hover-status-text');
  if(hst)hst.textContent=statusLabel(st);
  const ha=hov.querySelector('.hof-hover-activity');
  if(ha)ha.textContent=act||'';
}

// tte
async function loadTTE(card){
  const uid=card.dataset.uid;
  if(!uid||uid.startsWith('0000'))return;
  const d=await fetchPresence(uid);
  if(!d)return;
  const u=d.discord_user;
  const st=d.discord_status||'offline';

  // Avatar
  const av=card.querySelector('.tte-avatar');
  if(av)av.src=avatarUrl(uid,u.avatar);

  // Status dot
  const sdot=card.querySelector('.tte-sdot');
  if(sdot)sdot.dataset.status=st;

  // Name
  const nm=card.querySelector('.tte-name');
  if(nm)nm.textContent=u.global_name||u.username;

  // Activity
  const ac=card.querySelector('.tte-activity');
  if(ac)ac.textContent=getActivity(d)||'';

  // Banner as card background
  const banSrc=bannerUrl(uid,u.banner);
  const bg=card.querySelector('.tte-card-bg');
  if(bg&&banSrc){
    bg.style.background=`url('${banSrc}') center top / cover no-repeat`;
    bg.style.filter='brightness(.4) blur(1px)';
  } else if(bg){
    // Use avatar as blurred bg fallback
    bg.style.background=`url('${avatarUrl(uid,u.avatar,512)}') center/cover no-repeat`;
    bg.style.filter='brightness(.3) blur(4px) saturate(.6)';
  }
}

// ── EXCLUSIVE: avatar + rotating ring + status ──
async function loadExcl(card){
  const uid=card.dataset.uid;
  if(!uid||uid.startsWith('0000'))return;
  const d=await fetchPresence(uid);
  if(!d)return;
  const u=d.discord_user;
  const st=d.discord_status||'offline';

  const av=card.querySelector('.excl-avatar');
  if(av)av.src=avatarUrl(uid,u.avatar);
  const sdot=card.querySelector('.excl-sdot');
  if(sdot)sdot.dataset.status=st;
  const nm=card.querySelector('.excl-name');
  if(nm)nm.textContent=u.global_name||u.username;
  const ac=card.querySelector('.excl-activity');
  if(ac)ac.textContent=getActivity(d)||'';
}

function initDiscord(){
  document.querySelectorAll('.hof-card[data-uid]').forEach(loadHOF);
  document.querySelectorAll('.tte-card[data-uid]').forEach(loadTTE);
  document.querySelectorAll('.excl-card[data-uid]').forEach(loadExcl);
  // Refresh every 30s
  setInterval(()=>{
    document.querySelectorAll('.hof-card[data-uid]').forEach(loadHOF);
    document.querySelectorAll('.tte-card[data-uid]').forEach(loadTTE);
    document.querySelectorAll('.excl-card[data-uid]').forEach(loadExcl);
  },30000);
}

// ════════════════════════════════════════════════════
//  DISCORD SERVER WIDGET
//
//  SETUP:
//  1. Server Settings → Widget → Enable Server Widget
//  2. Copy Server ID (from Widget page or General Info)
//  3. In index.html replace data-sid="0000..." with real Server ID
//     e.g. data-sid="1234567890123456789"
//
//  WHAT SYNCS:
//  • Server icon (live from CDN)
//  • Server name
//  • Online member count (from widget)
//  • Total member count (from guild preview)
// ════════════════════════════════════════════════════

function fmtCount(n){return n>=1000?(n/1000).toFixed(1).replace(/\.0$/,'')+'k':String(n)}

async function loadServerCard(card){
  const sid=card.dataset.sid;
  if(!sid||sid.startsWith('0000'))return;

  // Widget API (always available if widget enabled)
  let widgetData=null;
  try{
    const wr=await fetch(`https://discord.com/api/guilds/${sid}/widget.json`);
    if(wr.ok)widgetData=await wr.json();
  }catch(e){}

  if(widgetData){
    const nm=card.querySelector('.srv-cname');
    if(nm)nm.textContent=widgetData.name||nm.textContent;
    const on=card.querySelector('.srv-online');
    if(on&&widgetData.presence_count!=null)on.textContent=widgetData.presence_count.toLocaleString();
  }

  // Guild preview — icon + total members (public servers only)
  try{
    const gr=await fetch(`https://discord.com/api/guilds/${sid}/preview`);
    if(gr.ok){
      const gd=await gr.json();

      // Set server icon
      if(gd.icon){
        const iconUrl=`${CDN}/icons/${sid}/${gd.icon}.png?size=64`;
        const img=card.querySelector('.srv-icon-img');
        if(img){img.src=iconUrl;img.onerror=()=>{img.style.display='none'}}
      }

      // Name
      const nm=card.querySelector('.srv-cname');
      if(nm&&gd.name)nm.textContent=gd.name;

      // Counts
      const on=card.querySelector('.srv-online');
      if(on&&gd.approximate_presence_count)on.textContent=gd.approximate_presence_count.toLocaleString();
      const mem=card.querySelector('.srv-members');
      if(mem&&gd.approximate_member_count)mem.textContent=fmtCount(gd.approximate_member_count)+' members';
    }
  }catch(e){}
}

function initServers(){
  document.querySelectorAll('.srv-card').forEach(loadServerCard);
}

// ── SERVERS TYPING ──
const SRV_TXT=`Welcome to 1998 — where power isn't earned, it's embodied. The strongest gather here, the fearless thrive here, and the ordinary are forgotten here. Every move shapes the future, every name carries weight, and every presence leaves a mark. We don't compete for greatness — we define it.`;
function initServersTyping(){
  const el=document.getElementById('srv-desc');
  if(!el)return;
  let i=0;el.textContent='';
  const obs=new IntersectionObserver(([e])=>{
    if(!e.isIntersecting)return;obs.disconnect();
    (function type(){if(i<SRV_TXT.length){el.textContent=SRV_TXT.slice(0,++i);setTimeout(type,18);}})();
  },{threshold:.3});
  obs.observe(el);
}


function initScrollReveal(){
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach((e,idx)=>{
      if(e.isIntersecting){
        setTimeout(()=>e.target.classList.add('revealed'),idx*70);
        obs.unobserve(e.target);
      }
    });
  },{threshold:.12});
  document.querySelectorAll('.tte-card,.excl-card').forEach(el=>obs.observe(el));
}

// termi
const ASCII_ART=
` ██╗ █████╗  █████╗  █████╗ 
███║██╔══██╗██╔══██╗██╔══██╗
╚██║╚██████║╚██████║╚█████╔╝
 ██║ ╚═══██║ ╚═══██║██╔══██╗
 ██║ █████╔╝ █████╔╝╚█████╔╝
 ╚═╝ ╚════╝  ╚════╝  ╚════╝ `;

const COMMANDS={
  help:{fn:()=>[
    {c:'pur',t:'┌─ AVAILABLE COMMANDS ──────────────────────────┐'},
    {c:'out',t:'  whoami    — who runs 1998'},
    {c:'out',t:'  status    — system status'},
    {c:'out',t:'  members   — list elite members'},
    {c:'out',t:'  scan      — run port scan'},
    {c:'out',t:'  clear     — clear terminal'},
    {c:'out',t:'  date      — current date/time'},
    {c:'out',t:'  uptime    — system uptime'},
    {c:'out',t:'  ping      — ping 1998 servers'},
    {c:'pur',t:'└───────────────────────────────────────────────┘'},
  ]},
  whoami:{fn:()=>[{c:'pur',t:'root@1998'},{c:'out',t:'Group: 1998 — Est. 2024'},{c:'out',t:'Role: Undefeated'}]},
  status:{fn:()=>[
    {c:'grn',t:'[✓] System: ONLINE'},{c:'grn',t:'[✓] Discord: CONNECTED'},
    {c:'grn',t:'[✓] Members: ACTIVE'},{c:'ylw',t:'[~] Threat level: MAXIMUM'},
  ]},
  members:{fn:()=>[
    {c:'pur',t:'┌─ 1998 ELITE ──────────────────────────────────┐'},
    {c:'out',t:'  [01-06] HOF — Hall of Fame'},
    {c:'out',t:'  [01-08] TTE — Threat to Everyone'},
    {c:'out',t:'  [01-03] Exclusive Threat'},
    {c:'pur',t:'└───────────────────────────────────────────────┘'},
  ]},
  scan:{fn:()=>[
    {c:'out',t:'[$] Resolving: 1998.gg...'},
    {c:'out',t:'[$] IP: 192.168.x.x (Cloudflare CDN)'},
    {c:'out',t:''},
    {c:'dim',t:'[>] Scanning ports 0-65535...'},
    {c:'port',t:'22/tcp    open  ssh'},
    {c:'port',t:'80/tcp    open  http'},
    {c:'port',t:'443/tcp   open  https'},
    {c:'port',t:'8443/tcp  open  alt-https'},
    {c:'gap',t:''},
    {c:'grn',t:'[$] 4 open ports detected'},
    {c:'err',t:'[$] CVE-2024-0001 — CRITICAL — RCE via header injection'},
    {c:'ylw',t:'[$] CVE-2023-9812 — HIGH — Auth bypass (port 8443)'},
  ]},
  date:{fn:()=>[{c:'out',t:new Date().toString()}]},
  uptime:{fn:()=>{
    const s=Math.floor(performance.now()/1000);
    return [{c:'grn',t:`up ${Math.floor(s/3600)}h ${Math.floor((s%3600)/60)}m ${s%60}s — 1998 never sleeps`}];
  }},
  ping:{fn:()=>[
    {c:'out',t:'PING 1998.gg (192.168.x.x)'},
    {c:'grn',t:'64 bytes: icmp_seq=1 time=1.33 ms'},
    {c:'grn',t:'64 bytes: icmp_seq=2 time=1.21 ms'},
    {c:'grn',t:'64 bytes: icmp_seq=3 time=1.29 ms'},
    {c:'pur',t:'--- 3/3 packets, 0% loss ---'},
  ]},
};

function initTerminal(){
  const hist=document.getElementById('term-history');
  const typed=document.getElementById('term-typed');
  const body=document.getElementById('term-body');
  if(!hist||!typed||!body)return;

  const art=document.createElement('pre');
  art.className='ascii-art';art.textContent=ASCII_ART;hist.appendChild(art);
  print([{c:'pur',t:'1998 Terminal v1.0 — type "help" for commands'},{c:'dim',t:'─────────────────────────────────────────────────'},{c:'gap',t:''}]);

  let cur='',hstack=[],hidx=-1;
  body.setAttribute('tabindex','0');
  body.addEventListener('click',()=>body.focus());

  body.addEventListener('keydown',e=>{
    if(e.key.length===1&&!e.ctrlKey&&!e.metaKey){cur+=e.key;typed.textContent=cur;}
    else if(e.key==='Backspace'){cur=cur.slice(0,-1);typed.textContent=cur;e.preventDefault();}
    else if(e.key==='Enter'){
      const cmd=cur.trim().toLowerCase();
      print([{c:'cmd',t:`root@1998:~$ ${cur}`}]);
      cur='';typed.textContent='';hidx=-1;
      if(cmd)hstack.unshift(cmd);
      exec(cmd);e.preventDefault();
    }
    else if(e.key==='ArrowUp'){if(hidx<hstack.length-1){hidx++;cur=hstack[hidx];typed.textContent=cur;}e.preventDefault();}
    else if(e.key==='ArrowDown'){if(hidx>0){hidx--;cur=hstack[hidx];}else{hidx=-1;cur='';}typed.textContent=cur;e.preventDefault();}
    else if(e.key==='Tab'){const m=Object.keys(COMMANDS).filter(k=>k.startsWith(cur));if(m.length===1){cur=m[0];typed.textContent=cur;}e.preventDefault();}
  });

  function exec(cmd){
    if(!cmd){print([{c:'gap',t:''}]);return;}
    if(cmd==='clear'){hist.innerHTML='';const a2=document.createElement('pre');a2.className='ascii-art';a2.textContent=ASCII_ART;hist.appendChild(a2);print([{c:'gap',t:''}]);return;}
    const c=COMMANDS[cmd];
    if(c)print([...c.fn(),{c:'gap',t:''}]);
    else print([{c:'err',t:`bash: ${cmd}: command not found`},{c:'dim',t:'type "help" to see commands'},{c:'gap',t:''}]);
    body.scrollTop=body.scrollHeight;
  }

  function print(lines){
    lines.forEach(({c,t})=>{const s=document.createElement('span');s.className=`tl ${c||''}`;s.textContent=t||'';hist.appendChild(s);});
    body.scrollTop=body.scrollHeight;
  }

  // Auto-demo
  const sect=document.getElementById('terminal');
  let demoDone=false;
  new IntersectionObserver(([e])=>{
    if(!e.isIntersecting||demoDone)return;
    demoDone=true;body.focus();
    let i=0;const cmd='help';
    const iv=setInterval(()=>{
      if(i<cmd.length){cur+=cmd[i++];typed.textContent=cur;}
      else{clearInterval(iv);setTimeout(()=>{print([{c:'cmd',t:`root@1998:~$ ${cur}`}]);cur='';typed.textContent='';exec(cmd);},400);}
    },90);
  },{threshold:.3}).observe(sect);
}
