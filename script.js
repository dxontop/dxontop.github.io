// ════════════════════════════════════════════════════════
//  1998 — SCRIPT.JS
//  Fonts: Cinzel · Inter · JetBrains Mono
// ════════════════════════════════════════════════════════

// ── TAB TITLE TYPING ──────────────────────────────────
(function(){
  const el=document.getElementById('tab-title');
  const txt='1998'; let i=0,erase=false,out='';
  function step(){
    if(!erase){ out=txt.slice(0,++i); el.textContent=out+(i<txt.length?'|':'');
      if(i===txt.length){setTimeout(()=>{erase=true;step()},3000);return;}
    }else{ out=out.slice(0,-1); el.textContent=out+'|';
      if(!out.length){erase=false;i=0;setTimeout(step,500);return;}
    }
    setTimeout(step,erase?45:85+Math.random()*55);
  }
  step();
})();

// ── SPLASH ──────────────────────────────────────────────
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

// ── NAV ACTIVE ──────────────────────────────────────────
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
    const t=document.getElementById(a.dataset.s);
    if(t)t.scrollIntoView({behavior:'smooth'});
  });
});

// ════════════════════════════════════════════════════════
//  DISCORD PRESENCE via Lanyard API
//  Lanyard API: https://api.lanyard.rest/v1/users/:id
//
//  ⚠️  REQUIREMENT: Each member must join the Lanyard
//      Discord server so their presence is tracked:
//      👉  discord.gg/lanyard
//
//  HOW TO USE:
//  1. Member joins discord.gg/lanyard
//  2. Get their Discord User ID:
//     - Enable Developer Mode in Discord settings
//     - Right-click their name → Copy User ID
//  3. In index.html find the section you want (HOF / TTE / EXCLUSIVE)
//  4. Replace data-uid="000000000000000001" with their real ID
//     Example: data-uid="123456789012345678"
//  5. Save and reload — their avatar, name, and status appear live!
// ════════════════════════════════════════════════════════

const CDN='https://cdn.discordapp.com';

function statusFromData(d){
  return d.discord_status||'offline';
}

function activityText(d){
  const acts=d.activities||[];
  // Prefer Spotify
  if(d.listening_to_spotify&&d.spotify){
    return `🎵 ${d.spotify.song} — ${d.spotify.artist}`;
  }
  // First non-Custom activity
  const a=acts.find(x=>x.type!==4);
  if(a){
    if(a.type===0)return `🎮 ${a.name}`;
    if(a.type===2)return `🎵 ${a.name}`;
    if(a.type===3)return `📺 ${a.name}`;
    return a.name;
  }
  // Custom status
  const cs=acts.find(x=>x.type===4);
  if(cs&&cs.state)return cs.state;
  return '';
}

function avatarUrl(uid,hash,size=128){
  if(!hash)return `${CDN}/embed/avatars/${parseInt(uid)%5}.png`;
  const fmt=hash.startsWith('a_')?'gif':'png';
  return `${CDN}/avatars/${uid}/${hash}.${fmt}?size=${size}`;
}

async function fetchPresence(uid){
  try{
    const r=await fetch(`https://api.lanyard.rest/v1/users/${uid}`);
    const j=await r.json();
    if(j.success)return j.data;
  }catch(e){}
  return null;
}

// Apply presence to HOF card
async function loadHOF(card){
  const uid=card.dataset.uid;
  if(!uid||uid.startsWith('0000'))return; // placeholder
  const d=await fetchPresence(uid);
  if(!d)return;
  const u=d.discord_user;
  card.querySelector('.hof-avatar').src=avatarUrl(uid,u.avatar);
  card.querySelector('.hof-username').textContent=u.global_name||u.username;
  const st=statusFromData(d);
  card.querySelector('.hof-status-dot').dataset.status=st;
  const act=activityText(d);
  if(act)card.querySelector('.hof-activity').textContent=act;
}

// Apply presence to TTE card
async function loadTTE(card){
  const uid=card.dataset.uid;
  if(!uid||uid.startsWith('0000'))return;
  const d=await fetchPresence(uid);
  if(!d)return;
  const u=d.discord_user;
  card.querySelector('.tte-avatar').src=avatarUrl(uid,u.avatar);
  card.querySelector('.tte-username').textContent=u.global_name||u.username;
  const st=statusFromData(d);
  card.querySelector('.tte-status-dot').dataset.status=st;
  const act=activityText(d);
  if(act)card.querySelector('.tte-activity-line').textContent=act;
}

// Apply presence to Exclusive card
async function loadExcl(card){
  const uid=card.dataset.uid;
  if(!uid||uid.startsWith('0000'))return;
  const d=await fetchPresence(uid);
  if(!d)return;
  const u=d.discord_user;
  card.querySelector('.excl-avatar').src=avatarUrl(uid,u.avatar);
  card.querySelector('.excl-username').textContent=u.global_name||u.username;
  const st=statusFromData(d);
  card.querySelector('.excl-status-dot').dataset.status=st;
  const act=activityText(d);
  if(act)card.querySelector('.excl-activity').textContent=act;
}

function initDiscord(){
  document.querySelectorAll('.hof-card[data-uid]').forEach(loadHOF);
  document.querySelectorAll('.tte-card[data-uid]').forEach(loadTTE);
  document.querySelectorAll('.excl-card[data-uid]').forEach(loadExcl);
  // Refresh every 30 seconds
  setInterval(()=>{
    document.querySelectorAll('.hof-card[data-uid]').forEach(loadHOF);
    document.querySelectorAll('.tte-card[data-uid]').forEach(loadTTE);
    document.querySelectorAll('.excl-card[data-uid]').forEach(loadExcl);
  },30000);
}

// ════════════════════════════════════════════════════════
//  DISCORD SERVER WIDGET
//  Uses Discord's public widget API — no bot token needed
//
//  HOW TO ADD A SERVER:
//  1. Go to your Discord Server Settings
//  2. Click "Widget" in the left sidebar
//  3. Enable the Server Widget toggle
//  4. Copy the Server ID shown there (or from General Info)
//  5. In index.html find a .srv-card div
//  6. Replace data-sid="000000000000000001" with the real Server ID
//     Example: data-sid="1234567890123456789"
//  7. Done! The card auto-loads icon, name, online count, member count
// ════════════════════════════════════════════════════════

async function fetchServerWidget(sid){
  try{
    const r=await fetch(`https://discord.com/api/guilds/${sid}/widget.json`);
    if(!r.ok)return null;
    return await r.json();
  }catch(e){return null;}
}

function serverIconUrl(sid,hash){
  if(!hash)return null;
  return `https://cdn.discordapp.com/icons/${sid}/${hash}.png?size=64`;
}

async function loadServerCard(card){
  const sid=card.dataset.sid;
  if(!sid||sid.startsWith('0000'))return;
  const w=await fetchServerWidget(sid);
  if(!w)return;

  // Name
  const nameEl=card.querySelector('.srv-cname');
  if(nameEl)nameEl.textContent=w.name||nameEl.textContent;

  // Online count from widget members
  const onlineEl=card.querySelector('.srv-online');
  if(onlineEl&&w.presence_count!=null)onlineEl.textContent=w.presence_count.toLocaleString();

  // Member count (widget doesn't expose total; use approximate_member_count if available)
  const memEl=card.querySelector('.srv-members');
  if(memEl&&w.approximate_member_count!=null){
    memEl.textContent=formatCount(w.approximate_member_count);
  }

  // Icon — widget doesn't give icon hash directly; use guild fetch if public
  // Try fetching guild preview for icon
  try{
    const gr=await fetch(`https://discord.com/api/guilds/${sid}/preview`);
    if(gr.ok){
      const gd=await gr.json();
      if(gd.icon){
        const iconEl=card.querySelector('.srv-icon-img');
        if(iconEl){
          iconEl.style.background='none';
          iconEl.innerHTML=`<img src="${serverIconUrl(sid,gd.icon)}" style="width:100%;height:100%;border-radius:12px;object-fit:cover"/>`;
        }
      }
      if(memEl&&gd.approximate_member_count)memEl.textContent=formatCount(gd.approximate_member_count);
      if(onlineEl&&gd.approximate_presence_count)onlineEl.textContent=gd.approximate_presence_count.toLocaleString();
    }
  }catch(e){}
}

function formatCount(n){
  if(n>=1000)return (n/1000).toFixed(1).replace(/\.0$/,'')+'k';
  return n.toString();
}

function initServers(){
  // Load original cards + clones (both share same sid)
  document.querySelectorAll('.srv-card').forEach(loadServerCard);
}

// ── SERVERS DESCRIPTION TYPING ──────────────────────────
const SRV_TXT=`Welcome to 1998 — where the most skillful, undefeated minds converge. Pure skill, elite execution, unmatched presence. We don't end debates... we end eras. Bring your vision and undeniable talent — everyone's welcome, but only the skillful endure and the undefeated define what's next.`;

function initServersTyping(){
  const el=document.getElementById('srv-desc');
  if(!el)return;
  let i=0; el.textContent='';
  const obs=new IntersectionObserver(([e])=>{
    if(!e.isIntersecting)return; obs.disconnect();
    (function type(){if(i<SRV_TXT.length){el.textContent=SRV_TXT.slice(0,++i);setTimeout(type,18);}})();
  },{threshold:.3});
  obs.observe(el);
}

// ── SCROLL REVEAL for TTE + EXCLUSIVE ───────────────────
function initScrollReveal(){
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach((e,idx)=>{
      if(e.isIntersecting){
        setTimeout(()=>e.target.classList.add('revealed'), idx*80);
        obs.unobserve(e.target);
      }
    });
  },{threshold:.15});
  document.querySelectorAll('.tte-card,.excl-card').forEach(el=>obs.observe(el));
}

// ════════════════════════════════════════════════════════
//  TERMINAL — interactive real terminal feel
//  Type commands and get responses
// ════════════════════════════════════════════════════════
const ASCII_ART=
` ██╗ █████╗  █████╗  █████╗
███║██╔══██╗██╔══██╗██╔══██╗
╚██║╚██████║╚██████║╚█████╔╝
 ██║ ╚═══██║ ╚═══██║██╔══██╗
 ██║ █████╔╝ █████╔╝╚█████╔╝
 ╚═╝ ╚════╝  ╚════╝  ╚════╝`;

const COMMANDS={
  help:{
    fn:()=>[
      {c:'pur',t:'┌─ AVAILABLE COMMANDS ──────────────────────────┐'},
      {c:'out',t:'  whoami       — who runs 1998'},
      {c:'out',t:'  status       — check system status'},
      {c:'out',t:'  members      — list elite members'},
      {c:'out',t:'  scan         — run port scan'},
      {c:'out',t:'  clear        — clear terminal'},
      {c:'out',t:'  date         — show current date/time'},
      {c:'out',t:'  uptime       — show system uptime'},
      {c:'out',t:'  ping         — ping 1998 servers'},
      {c:'pur',t:'└───────────────────────────────────────────────┘'},
    ]
  },
  whoami:{
    fn:()=>[
      {c:'pur',t:'root@1998'},
      {c:'out',t:'Group: 1998 — Est. 2024'},
      {c:'out',t:'Role: Undefeated'},
    ]
  },
  status:{
    fn:()=>[
      {c:'grn',t:'[✓] System: ONLINE'},
      {c:'grn',t:'[✓] Discord: CONNECTED'},
      {c:'grn',t:'[✓] Members: ACTIVE'},
      {c:'ylw',t:'[~] Threat level: MAXIMUM'},
    ]
  },
  members:{
    fn:()=>[
      {c:'pur',t:'┌─ 1998 ELITE ──────────────────────────────────┐'},
      {c:'out',t:'  [01] sykovich            — Exclusive Threat'},
      {c:'out',t:'  [02] Chris               — Exclusive Threat'},
      {c:'out',t:'  [03] wroteheraparagraph  — Exclusive Threat'},
      {c:'out',t:'  [...] and more in HOF & TTE'},
      {c:'pur',t:'└───────────────────────────────────────────────┘'},
    ]
  },
  scan:{
    fn:()=>[
      {c:'out',t:'[$] Resolving target: 1998.gg...'},
      {c:'out',t:'[$] Target IP: 192.168.x.x (Cloudflare CDN)'},
      {c:'out',t:'[$] Geolocation: San Francisco, CA'},
      {c:'out',t:''},
      {c:'dim',t:'[>] Running port scan (0-65535)...'},
      {c:'port',t:'22/tcp    open  ssh'},
      {c:'port',t:'80/tcp    open  http'},
      {c:'port',t:'443/tcp   open  https'},
      {c:'port',t:'8443/tcp  open  alt-https'},
      {c:''},
      {c:'grn',t:'[$] 4 open ports detected'},
      {c:'err',t:'[$] CVE-2024-0001 — CRITICAL — RCE via header injection'},
      {c:'ylw',t:'[$] CVE-2023-9812 — HIGH — Auth bypass (port 8443)'},
    ]
  },
  date:{
    fn:()=>[{c:'out',t:new Date().toString()}]
  },
  uptime:{
    fn:()=>{
      const s=Math.floor(performance.now()/1000);
      const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;
      return [{c:'grn',t:`up ${h}h ${m}m ${sec}s — 1998 never sleeps`}];
    }
  },
  ping:{
    fn:()=>[
      {c:'out',t:'PING 1998.gg (192.168.x.x)'},
      {c:'grn',t:'64 bytes: icmp_seq=1 time=1.33 ms'},
      {c:'grn',t:'64 bytes: icmp_seq=2 time=1.21 ms'},
      {c:'grn',t:'64 bytes: icmp_seq=3 time=1.29 ms'},
      {c:'pur',t:'--- 1998.gg ping statistics: 3/3 packets, 0% loss ---'},
    ]
  },
};

function initTerminal(){
  const history=document.getElementById('term-history');
  const typedEl=document.getElementById('term-typed');
  const body=document.getElementById('term-body');
  const inputRow=document.getElementById('term-input-row');
  if(!history||!typedEl||!body)return;

  // Print ASCII art first
  const art=document.createElement('pre');
  art.className='ascii-art';
  art.textContent=ASCII_ART;
  history.appendChild(art);

  // Print welcome
  printLines([
    {c:'pur',t:'1998 Terminal v1.0 — type "help" for commands'},
    {c:'dim',t:'─────────────────────────────────────────────────'},
    {c:'gap',t:''},
  ]);

  let current='';
  const history_stack=[];
  let hist_idx=-1;

  // Focus terminal on click
  body.addEventListener('click',()=>body.focus());
  body.setAttribute('tabindex','0');

  body.addEventListener('keydown',e=>{
    if(e.key.length===1&&!e.ctrlKey&&!e.metaKey){
      current+=e.key;
      typedEl.textContent=current;
    } else if(e.key==='Backspace'){
      current=current.slice(0,-1);
      typedEl.textContent=current;
      e.preventDefault();
    } else if(e.key==='Enter'){
      const cmd=current.trim().toLowerCase();
      printLines([{c:'cmd',t:`root@1998:~$ ${current}`}]);
      current=''; typedEl.textContent=''; hist_idx=-1;
      if(cmd)history_stack.unshift(cmd);
      execCommand(cmd);
      e.preventDefault();
    } else if(e.key==='ArrowUp'){
      if(hist_idx<history_stack.length-1){
        hist_idx++;
        current=history_stack[hist_idx];
        typedEl.textContent=current;
      }
      e.preventDefault();
    } else if(e.key==='ArrowDown'){
      if(hist_idx>0){hist_idx--;current=history_stack[hist_idx];}
      else{hist_idx=-1;current='';}
      typedEl.textContent=current;
      e.preventDefault();
    } else if(e.key==='Tab'){
      // autocomplete
      const matches=Object.keys(COMMANDS).filter(k=>k.startsWith(current));
      if(matches.length===1){current=matches[0];typedEl.textContent=current;}
      e.preventDefault();
    }
  });

  function execCommand(cmd){
    if(!cmd){printLines([{c:'gap',t:''}]);return;}
    if(cmd==='clear'){
      history.innerHTML='';
      const art2=document.createElement('pre');
      art2.className='ascii-art'; art2.textContent=ASCII_ART;
      history.appendChild(art2);
      printLines([{c:'gap',t:''}]);
      return;
    }
    const c=COMMANDS[cmd];
    if(c){
      const lines=c.fn();
      printLines([...lines,{c:'gap',t:''}]);
    } else {
      printLines([
        {c:'err',t:`bash: ${cmd}: command not found`},
        {c:'dim',t:'type "help" to see available commands'},
        {c:'gap',t:''},
      ]);
    }
    body.scrollTop=body.scrollHeight;
  }

  function printLines(lines){
    lines.forEach(({c,t})=>{
      const span=document.createElement('span');
      span.className=`tl ${c||''}`;
      span.textContent=t||'';
      history.appendChild(span);
    });
    body.scrollTop=body.scrollHeight;
  }

  // Auto demo on scroll into view
  const sect=document.getElementById('terminal');
  let demoDone=false;
  const obs=new IntersectionObserver(([e])=>{
    if(!e.isIntersecting||demoDone)return;
    demoDone=true; obs.disconnect();
    body.focus();
    // Auto-type "help" after a moment
    setTimeout(()=>autoType('help'),800);
  },{threshold:.3});
  obs.observe(sect);

  function autoType(cmd){
    let i=0;
    const iv=setInterval(()=>{
      if(i<cmd.length){current+=cmd[i++];typedEl.textContent=current;}
      else{
        clearInterval(iv);
        setTimeout(()=>{
          printLines([{c:'cmd',t:`root@1998:~$ ${current}`}]);
          current=''; typedEl.textContent='';
          execCommand(cmd);
        },400);
      }
    },90);
  }
}
