// ═══════════════════════════════════════════════════════
//  1998 — SCRIPT.JS
//  Fonts: Playfair Display · DM Sans · JetBrains Mono
// ═══════════════════════════════════════════════════════

// ── TAB TITLE TYPING ──────────────────────────────────
(function(){
  const el=document.getElementById('tab-title');
  const txt='1998'; let i=0,erase=false,out='';
  function step(){
    if(!erase){out=txt.slice(0,++i);el.textContent=out+(i<txt.length?'|':'');
      if(i===txt.length){setTimeout(()=>{erase=true;step()},3200);return;}
    }else{out=out.slice(0,-1);el.textContent=out+'|';
      if(!out.length){erase=false;i=0;setTimeout(step,600);return;}
    }
    setTimeout(step,erase?42:88+Math.random()*52);
  }
  step();
})();

// ── SPLASH ────────────────────────────────────────────
window.addEventListener('load',()=>{
  const splash=document.getElementById('splash');
  const btn=document.getElementById('enter-btn');
  const site=document.getElementById('site');
  const music=document.getElementById('bg-music');
  let done=false;
  function enter(){
    if(done)return; done=true;
    if(music){music.volume=0.26;music.play().catch(()=>{})}
    splash.classList.add('up');
    setTimeout(()=>{
      splash.style.display='none';
      site.classList.add('visible');
      initDiscord();
      initServers();
      initServersTyping();
      initScrollReveal();
      initTerminal();
    },950);
  }
  btn.addEventListener('click',e=>{e.stopPropagation();enter()});
  splash.addEventListener('click',enter);
});

// ── NAV ───────────────────────────────────────────────
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

// ═══════════════════════════════════════════════════════
//  DISCORD PRESENCE — Lanyard API
//
//  SETUP:
//  1. Each member joins discord.gg/lanyard (free, takes 1 min)
//  2. Enable Developer Mode: Discord → Settings → Advanced
//  3. Right-click member → Copy User ID
//  4. In index.html:
//     • Replace data-uid="0000...N" with real ID
//     • Optionally set data-banner="https://image-url.jpg"
//       for a custom card banner (overrides Discord banner)
//     • Optionally set data-bg="https://image-url.jpg"
//       for HOF card background image
//
//  WHAT AUTO-SYNCS every 30s:
//  • Avatar (animated GIF if Nitro)
//  • Discord banner (shown in HOF hover card + TTE/EXCL bg)
//  • Display name + @username tag
//  • Status: Online / Idle / DND / Offline (colored dot)
//  • Current activity: game, Spotify, streaming, custom status
// ═══════════════════════════════════════════════════════

const CDN='https://cdn.discordapp.com';

function avUrl(uid,hash,sz=128){
  if(!hash)return `${CDN}/embed/avatars/${Math.abs(parseInt(uid.slice(-4),16))%5}.png`;
  return `${CDN}/avatars/${uid}/${hash}.${hash.startsWith('a_')?'gif':'png'}?size=${sz}`;
}
function banUrl(uid,hash,sz=480){
  if(!hash)return null;
  return `${CDN}/banners/${uid}/${hash}.${hash.startsWith('a_')?'gif':'png'}?size=${sz}`;
}
function statusLabel(s){
  return{online:'Online',idle:'Idle',dnd:'Do Not Disturb',offline:'Offline'}[s]||'Offline';
}
function getActivity(d){
  if(d.listening_to_spotify&&d.spotify)return `♪ ${d.spotify.song} — ${d.spotify.artist}`;
  const acts=d.activities||[];
  const a=acts.find(x=>x.type!==4);
  if(a)return{0:'▶ ',2:'♪ ',3:'📺 '}[a.type]||''+(a.name||'');
  const cs=acts.find(x=>x.type===4);
  return cs?.state||'';
}

async function fetchP(uid){
  try{
    const r=await fetch(`https://api.lanyard.rest/v1/users/${uid}`);
    const j=await r.json();
    if(j.success)return j.data;
  }catch(e){}
  return null;
}

// Resolve banner: data-banner attr > Discord banner > blurred avatar
function resolveBanner(card,uid,discordBannerHash,avSrc){
  const custom=card.dataset.banner;
  if(custom&&custom.trim())return custom.trim();
  if(discordBannerHash)return banUrl(uid,discordBannerHash);
  return null; // will use blurred avatar fallback
}

// ── HOF ──────────────────────────────────────────────
async function loadHOF(card){
  const uid=card.dataset.uid;
  if(!uid||uid.startsWith('0000'))return;
  const d=await fetchP(uid);
  if(!d)return;
  const u=d.discord_user;
  const st=d.discord_status||'offline';
  const act=getActivity(d);
  const avSrc=avUrl(uid,u.avatar,128);
  const name=u.global_name||u.username;

  // Card front
  const av=card.querySelector('.hof-avatar');
  if(av)av.src=avSrc;
  const sdot=card.querySelector('.hof-sdot');
  if(sdot)sdot.dataset.status=st;
  const fn=card.querySelector('.hof-front-name');
  if(fn)fn.textContent=name;

  // Panel mark — uses data-mark attr if set, otherwise default "1998"
  const markEl=card.querySelector('.hof-panel-mark');
  if(markEl&&card.dataset.mark)markEl.textContent=card.dataset.mark;

  // Card bg (data-bg attr overrides, else use Discord banner)
  const bgEl=card.querySelector('.hof-card-bg');
  if(bgEl){
    const customBg=card.dataset.bg;
    const banSrc=customBg?.trim()||resolveBanner(card,uid,u.banner,avSrc);
    if(banSrc){
      bgEl.style.backgroundImage=`url('${banSrc}')`;
      bgEl.style.backgroundSize='cover';
      bgEl.style.backgroundPosition='center';
    }
  }

  // Hover Discord card (centered profile panel)
  const hov=card.querySelector('.hof-spread-panel');
  if(!hov)return;

  // Subtle glow behind the panel using the avatar/banner color (no visible image)
  const banSrc=resolveBanner(card,uid,u.banner,avSrc);
  if(banSrc){
    hov.style.backgroundImage=`linear-gradient(rgba(12,10,22,.92),rgba(12,10,22,.92)), url('${banSrc}')`;
    hov.style.backgroundSize='cover';
    hov.style.backgroundPosition='center';
  }

  const hav=hov.querySelector('.hof-hover-av');
  if(hav)hav.src=avSrc;
  const hsdot=hov.querySelector('.hof-hover-sdot');
  if(hsdot)hsdot.dataset.status=st;
  hov.querySelector('.hof-hover-name').textContent=name;
  hov.querySelector('.hof-hover-tag').textContent='@'+u.username;
  const sdi=hov.querySelector('.hof-hover-sdot-inline');
  if(sdi)sdi.dataset.status=st;
  hov.querySelector('.hof-hover-status-text').textContent=statusLabel(st);
  const ha=hov.querySelector('.hof-hover-activity');
  if(ha)ha.textContent=act||'';
}

// ── TTE ──────────────────────────────────────────────
async function loadTTE(card){
  const uid=card.dataset.uid;
  if(!uid||uid.startsWith('0000'))return;
  const d=await fetchP(uid);
  if(!d)return;
  const u=d.discord_user;
  const st=d.discord_status||'offline';
  const avSrc=avUrl(uid,u.avatar,256);

  card.querySelector('.tte-avatar').src=avSrc;
  card.querySelector('.tte-sdot').dataset.status=st;
  card.querySelector('.tte-name').textContent=u.global_name||u.username;
  const actEl=card.querySelector('.tte-act');
  if(actEl)actEl.textContent=getActivity(d)||statusLabel(st);

  // Background: custom data-banner > Discord banner > blurred avatar
  const bg=card.querySelector('.tte-bg');
  if(bg){
    const src=resolveBanner(card,uid,u.banner,avSrc)||avSrc;
    bg.style.backgroundImage=`url('${src}')`;
    bg.style.backgroundSize='cover';
    bg.style.backgroundPosition='center top';
    if(!card.dataset.banner&&!u.banner){
      bg.style.filter='brightness(.3) blur(5px) saturate(.5)';
    } else {
      bg.style.filter='brightness(.42) saturate(.75)';
    }
  }
}

// ── EXCLUSIVE ─────────────────────────────────────────
async function loadExcl(card){
  const uid=card.dataset.uid;
  if(!uid||uid.startsWith('0000'))return;
  const d=await fetchP(uid);
  if(!d)return;
  const u=d.discord_user;
  const st=d.discord_status||'offline';

  card.querySelector('.excl-av').src=avUrl(uid,u.avatar,128);
  card.querySelector('.excl-sdot').dataset.status=st;
  card.querySelector('.excl-name').textContent=u.global_name||u.username;
  const actEl=card.querySelector('.excl-act');
  if(actEl)actEl.textContent=getActivity(d)||statusLabel(st);

  // data-banner on exclusive card sets ring background accent color/image
  const customBan=card.dataset.banner?.trim();
  const ring=card.querySelector('.excl-ring');
  if(ring&&customBan){
    ring.style.background=`url('${customBan}') center/cover, conic-gradient(from 0deg,#7c3aed,transparent 40%,#a855f7 70%,transparent)`;
  }
}

function initDiscord(){
  document.querySelectorAll('.hof-card[data-uid]').forEach(loadHOF);
  document.querySelectorAll('.tte-card[data-uid]').forEach(loadTTE);
  document.querySelectorAll('.excl-card[data-uid]').forEach(loadExcl);
  setInterval(()=>{
    document.querySelectorAll('.hof-card[data-uid]').forEach(loadHOF);
    document.querySelectorAll('.tte-card[data-uid]').forEach(loadTTE);
    document.querySelectorAll('.excl-card[data-uid]').forEach(loadExcl);
  },30000);
}

// ═══════════════════════════════════════════════════════
//  DISCORD SERVER WIDGET
//
//  SETUP:
//  1. Server Settings → Widget → Enable Widget
//  2. Copy the Server ID
//  3. In index.html set data-sid="YOUR_SERVER_ID"
//  4. Set data-invite="https://discord.gg/YOURCODE"
//     Clicking the card opens the invite in a new tab.
//
//  AUTO-LOADS:
//  • Real server icon from Discord CDN
//  • Server name
//  • Online member count
//  • Total member count
// ═══════════════════════════════════════════════════════

function fmtN(n){return n>=1000?(n/1000).toFixed(1).replace(/\.0$/,'')+'k':String(n)}

async function loadSrv(card){
  const sid=card.dataset.sid;
  if(!sid||sid.startsWith('0000'))return;

  // Click opens invite
  const invite=card.dataset.invite;
  if(invite){
    card.style.cursor='pointer';
    card.onclick=()=>window.open(invite,'_blank');
  }

  // Widget (gives online count + name; needs widget enabled)
  try{
    const wr=await fetch(`https://discord.com/api/guilds/${sid}/widget.json`);
    if(wr.ok){
      const w=await wr.json();
      if(w.name)card.querySelector('.srv-cname').textContent=w.name;
      if(w.presence_count!=null)card.querySelector('.srv-online').textContent=w.presence_count.toLocaleString();
    }
  }catch(e){}

  // Guild preview (public discovery) — icon + member counts
  try{
    const gr=await fetch(`https://discord.com/api/guilds/${sid}/preview`);
    if(gr.ok){
      const g=await gr.json();
      if(g.icon){
        const img=card.querySelector('.srv-icon-img');
        if(img){
          img.src=`${CDN}/icons/${sid}/${g.icon}.png?size=64`;
          img.onerror=()=>{img.style.display='none'};
        }
      }
      if(g.name)card.querySelector('.srv-cname').textContent=g.name;
      if(g.approximate_presence_count)card.querySelector('.srv-online').textContent=g.approximate_presence_count.toLocaleString();
      if(g.approximate_member_count)card.querySelector('.srv-members').textContent=fmtN(g.approximate_member_count)+' members';
    }
  }catch(e){}
}

function initServers(){
  document.querySelectorAll('.srv-card').forEach(loadSrv);
}

// ── SERVERS TYPING ─────────────────────────────────────
const SRV_TXT=`Welcome to 1998 — where power isn't earned, it's embodied. The strongest gather here, the fearless thrive here, and the ordinary are forgotten. Every move shapes the future, every name carries weight, and every presence leaves a mark. We don't compete for greatness—we define it. Empires crumble, legacies fade, and entire eras come to an end at our command. What others call impossible, we call routine.`;
function initServersTyping(){
  const el=document.getElementById('srv-desc');
  if(!el)return;
  let i=0;el.textContent='';
  new IntersectionObserver(([e],obs)=>{
    if(!e.isIntersecting)return;obs.disconnect();
    (function t(){if(i<SRV_TXT.length){el.textContent=SRV_TXT.slice(0,++i);setTimeout(t,16);}})();
  },{threshold:.3}).observe(el);
}

// ── SCROLL REVEAL ──────────────────────────────────────
function initScrollReveal(){
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach((e,idx)=>{
      if(e.isIntersecting){
        setTimeout(()=>e.target.classList.add('revealed'),idx*65);
        obs.unobserve(e.target);
      }
    });
  },{threshold:.1});
  document.querySelectorAll('.tte-card,.excl-card').forEach(el=>obs.observe(el));
}

// ═══════════════════════════════════════════════════════
//  TERMINAL — Real interactive shell experience
//
//  Features:
//  • Fetches visitor's real public IP via ipify API
//  • Geolocation lookup via ip-api.com
//  • Interactive: type commands, get responses
//  • Arrow key history, Tab autocomplete
//  • Commands: help, whoami, ip, geoip, scan, whois,
//              curl, nmap, members, status, ping, date,
//              uptime, clear, neofetch, cat
// ═══════════════════════════════════════════════════════

const ASCII_ART=
`
 d888   .d8888b.   .d8888b.   .d8888b.  
d8888  d88P  Y88b d88P  Y88b d88P  Y88b 
  888  888    888 888    888 Y88b. d88P 
  888  Y88b. d888 Y88b. d888  "Y88888"  
  888   "Y888P888  "Y888P888 .d8P""Y8b. 
  888         888        888 888    888 
  888  Y88b  d88P Y88b  d88P Y88b  d88P 
8888888 "Y8888P"   "Y8888P"   "Y8888P"  
`;

// Cache visitor info
let _visitorIP=null;
let _visitorGeo=null;

async function getIP(){
  if(_visitorIP)return _visitorIP;
  try{
    const r=await fetch('https://api.ipify.org?format=json');
    const j=await r.json();
    _visitorIP=j.ip;
    return _visitorIP;
  }catch(e){return'[unavailable]'}
}

async function getGeo(){
  if(_visitorGeo)return _visitorGeo;
  try{
    // ipapi.co — HTTPS, no key required, returns IP + full geolocation in one call
    const r=await fetch('https://ipapi.co/json/');
    const j=await r.json();
    if(j.error)throw new Error(j.reason||'lookup failed');
    _visitorGeo={
      status:'success',
      ip:j.ip,
      country:j.country_name,
      regionName:j.region,
      city:j.city,
      zip:j.postal,
      isp:j.org,
      org:j.org,
      as:j.asn,
      lat:j.latitude,
      lon:j.longitude,
      timezone:j.timezone,
    };
    if(!_visitorIP)_visitorIP=j.ip;
    return _visitorGeo;
  }catch(e){
    // Fallback provider if ipapi.co rate-limits or fails
    try{
      const ip=await getIP();
      const r2=await fetch(`https://ipwho.is/${ip}`);
      const j2=await r2.json();
      if(!j2.success)throw new Error('fallback failed');
      _visitorGeo={
        status:'success',
        ip:j2.ip,
        country:j2.country,
        regionName:j2.region,
        city:j2.city,
        zip:j2.postal,
        isp:j2.connection?.isp,
        org:j2.connection?.org,
        as:j2.connection?.asn,
        lat:j2.latitude,
        lon:j2.longitude,
        timezone:j2.timezone?.id,
      };
      return _visitorGeo;
    }catch(e2){
      return null;
    }
  }
}

function delay(ms){return new Promise(r=>setTimeout(r,ms))}

function initTerminal(){
  const hist=document.getElementById('term-history');
  const body=document.getElementById('term-body');
  if(!hist||!body)return;

  // ASCII art header
  const art=document.createElement('pre');
  art.className='ascii-art';art.textContent=ASCII_ART;hist.appendChild(art);

  function printLines(lines){
    return new Promise(resolve=>{
      let i=0;
      function step(){
        if(i>=lines.length){resolve();return;}
        const {c,t}=lines[i++];
        const s=document.createElement('span');
        s.className=`tl ${c||''}`;s.textContent=t??'';
        hist.appendChild(s);
        body.scrollTop=body.scrollHeight;
        setTimeout(step, t===''?70:90+Math.random()*70);
      }
      step();
    });
  }

  // Auto-run boot sequence — matches the reference exactly, rebranded to 1998
  async function runSequence(){
    await printLines([{c:'pur',t:'[ 1998v1 ]'},{c:'gap',t:''}]);
    await delay(300);

    const ip=await getIP();
    await printLines([{c:'out',t:`[$] Target IP resolved: ${ip||'192.168.x.x'} (Cloudflare CDN)`}]);

    const g=await getGeo();
    await printLines([
      {c:'out',t:`[$] Geolocation: ${g?`${g.city}, ${g.regionName} — ${g.country}`:'San Francisco, CA — United States'}`},
      {c:'out',t:`[$] ISP: ${g?.isp||'Cloudflare Inc.'} | ASN: ${g?.as||'AS13335'}`},
      {c:'gap',t:''},
    ]);

    await printLines([{c:'bold',t:'[>] Running port scan... (0-65535)'}]);
    await delay(400);
    await printLines([
      {c:'port dim',t:'22/tcp   open  ssh'},
      {c:'port dim',t:'80/tcp   open  http'},
      {c:'port dim',t:'443/tcp  open  https'},
      {c:'port dim',t:'8443/tcp open  alt-https'},
      {c:'grn',t:'[$] Scan complete — 4 open ports detected'},
      {c:'gap',t:''},
    ]);

    await printLines([{c:'bold',t:'[>] Checking vulnerabilities...'}]);
    await delay(400);
    await printLines([
      {c:'err',t:'[$] CVE-2024-0001 — CRITICAL — RCE via header injection'},
      {c:'ylw',t:'[$] CVE-2023-9812 — HIGH — Auth bypass (port 8443)'},
      {c:'gap',t:''},
    ]);

    // Final static prompt with blinking cursor
    const promptLine=document.createElement('div');
    promptLine.className='term-final-prompt';
    promptLine.innerHTML=`root@1998 : ~/1998 $&nbsp;<span class="term-cursor">█</span>`;
    hist.appendChild(promptLine);
    body.scrollTop=body.scrollHeight;
  }

  // Run automatically once the terminal scrolls into view
  let started=false;
  new IntersectionObserver(([e])=>{
    if(!e.isIntersecting||started)return;
    started=true;
    runSequence();
  },{threshold:.3}).observe(document.getElementById('terminal'));
}
