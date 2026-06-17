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

  // Hover Discord card
  const hov=card.querySelector('.hof-spread-panel');
  if(!hov)return;

  const banSrc=resolveBanner(card,uid,u.banner,avSrc);
  const banEl=hov.querySelector('.hof-banner');
  if(banEl){
    if(banSrc){
      banEl.style.backgroundImage=`url('${banSrc}')`;
      banEl.style.backgroundSize='cover';
      banEl.style.backgroundPosition='center top';
      banEl.style.filter='none';
    } else {
      // blurred avatar as banner fallback (Discord style)
      banEl.style.backgroundImage=`url('${avSrc}')`;
      banEl.style.backgroundSize='cover';
      banEl.style.backgroundPosition='center';
      banEl.style.filter='blur(14px) brightness(.45) saturate(.6)';
    }
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
const SRV_TXT=`Welcome to 1998 — where the most skillful, undefeated minds converge. Pure skill, elite execution, unmatched presence. We don't end debates... we end eras. Bring your vision and undeniable talent — everyone's welcome, but only the skillful endure and the undefeated define what's next.`;
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
` ██╗ █████╗  █████╗  █████╗ 
███║██╔══██╗██╔══██╗██╔══██╗
╚██║╚██████║╚██████║╚█████╔╝
 ██║ ╚═══██║ ╚═══██║██╔══██╗
 ██║ █████╔╝ █████╔╝╚█████╔╝
 ╚═╝ ╚════╝  ╚════╝  ╚════╝ `;

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

// Fake ping times (realistic-ish)
function fakePing(){return(Math.random()*40+1).toFixed(2)}

const COMMANDS={
  help:{
    desc:'show available commands',
    fn:async()=>[
      {c:'pur', t:'╔══════════════════════════════════════════════╗'},
      {c:'pur', t:'║          1998 SHELL v2.0 — COMMANDS          ║'},
      {c:'pur', t:'╚══════════════════════════════════════════════╝'},
      {c:'gap', t:''},
      {c:'bold',t:'  NETWORK'},
      {c:'out', t:'    ip          — show your public IP address'},
      {c:'out', t:'    geoip       — geolocate your IP'},
      {c:'out', t:'    ping        — ping 1998 servers'},
      {c:'out', t:'    scan        — port scan (simulated)'},
      {c:'out', t:'    whois       — whois lookup'},
      {c:'out', t:'    curl <url>  — fetch a URL header'},
      {c:'out', t:'    nmap        — network map (simulated)'},
      {c:'gap', t:''},
      {c:'bold',t:'  SYSTEM'},
      {c:'out', t:'    whoami      — who you are'},
      {c:'out', t:'    neofetch    — system info'},
      {c:'out', t:'    date        — current date & time'},
      {c:'out', t:'    uptime      — session uptime'},
      {c:'out', t:'    cat <file>  — read a file'},
      {c:'out', t:'    clear       — clear terminal'},
      {c:'gap', t:''},
      {c:'bold',t:'  1998'},
      {c:'out', t:'    members     — list 1998 elite'},
      {c:'out', t:'    status      — group system status'},
      {c:'gap', t:''},
      {c:'dim', t:'  Tab = autocomplete  ↑↓ = history  Ctrl+L = clear'},
    ]
  },
  ip:{
    desc:'show your public IP',
    fn:async(args,pr)=>{
      pr([{c:'dim',t:'fetching your IP...'}]);
      const ip=await getIP();
      return[{c:'grn',t:`Your public IP: ${ip}`}];
    }
  },
  geoip:{
    desc:'geolocate your IP',
    fn:async(args,pr)=>{
      pr([{c:'dim',t:'resolving IP geolocation...'}]);
      const g=await getGeo();
      if(!g)return[{c:'err',t:'geolocation lookup failed — try again'}];
      return[
        {c:'info',t:`IP:        ${g.ip}`},
        {c:'info',t:`Country:   ${g.country}`},
        {c:'info',t:`Region:    ${g.regionName}`},
        {c:'info',t:`City:      ${g.city}${g.zip?' ('+g.zip+')':''}`},
        {c:'info',t:`Coords:    ${g.lat}, ${g.lon}`},
        {c:'info',t:`Timezone:  ${g.timezone}`},
        {c:'info',t:`ISP/Org:   ${g.isp||g.org||'unknown'}`},
        {c:'info',t:`ASN:       ${g.as||'unknown'}`},
      ];
    }
  },
  ping:{
    desc:'ping 1998 servers',
    fn:async(args,pr)=>{
      const target=args[0]||'1998.gg';
      pr([{c:'dim',t:`PING ${target}...`}]);
      await delay(300);
      const times=[fakePing(),fakePing(),fakePing()];
      const avg=(times.reduce((a,b)=>a+parseFloat(b),0)/3).toFixed(2);
      return[
        {c:'out', t:`PING ${target} (104.21.x.x): 56 bytes of data`},
        {c:'grn', t:`64 bytes from ${target}: icmp_seq=0 ttl=54 time=${times[0]} ms`},
        {c:'grn', t:`64 bytes from ${target}: icmp_seq=1 ttl=54 time=${times[1]} ms`},
        {c:'grn', t:`64 bytes from ${target}: icmp_seq=2 ttl=54 time=${times[2]} ms`},
        {c:'out', t:''},
        {c:'pur', t:`--- ${target} ping statistics ---`},
        {c:'out', t:`3 packets transmitted, 3 received, 0% packet loss`},
        {c:'out', t:`round-trip min/avg/max = ${Math.min(...times.map(Number)).toFixed(2)}/${avg}/${Math.max(...times.map(Number)).toFixed(2)} ms`},
      ];
    }
  },
  scan:{
    desc:'run port scan',
    fn:async(args,pr)=>{
      pr([{c:'dim',t:'Starting Nmap 7.94 — https://nmap.org'}]);
      await delay(400);
      pr([{c:'dim',t:'Scanning 1998.gg (104.21.x.x) ...'}]);
      await delay(600);
      return[
        {c:'out', t:'Nmap scan report for 1998.gg (104.21.x.x)'},
        {c:'out', t:'Host is up (0.013s latency).'},
        {c:'out', t:''},
        {c:'out', t:'PORT      STATE  SERVICE   VERSION'},
        {c:'port',t:'22/tcp    open   ssh       OpenSSH 8.9p1'},
        {c:'port',t:'80/tcp    open   http      nginx 1.24.0'},
        {c:'port',t:'443/tcp   open   https     nginx 1.24.0'},
        {c:'port',t:'8443/tcp  open   alt-https'},
        {c:'port',t:'3306/tcp  closed mysql'},
        {c:'port',t:'5432/tcp  closed postgresql'},
        {c:'out', t:''},
        {c:'grn', t:'4 open ports — 2 closed'},
        {c:'err', t:'[!] CVE-2024-0001 — CRITICAL — RCE via header injection'},
        {c:'ylw', t:'[!] CVE-2023-9812 — HIGH    — Auth bypass (port 8443)'},
        {c:'dim', t:'Nmap done: 1 IP address scanned in 2.31 seconds'},
      ];
    }
  },
  nmap:{
    desc:'network map',
    fn:async(args,pr)=>{
      pr([{c:'dim',t:'Starting Nmap 7.94...'}]);
      await delay(500);
      return[
        {c:'out', t:'Host: 1998.gg   Status: Up'},
        {c:'out', t:'Latency: 0.013s'},
        {c:'port',t:'22    ssh     open'},
        {c:'port',t:'80    http    open'},
        {c:'port',t:'443   https   open'},
        {c:'port',t:'8443  alt     open'},
      ];
    }
  },
  whois:{
    desc:'whois lookup',
    fn:async(args,pr)=>{
      const target=args[0]||'1998.gg';
      pr([{c:'dim',t:`whois ${target}`}]);
      await delay(300);
      return[
        {c:'out', t:`Domain: ${target.toUpperCase()}`},
        {c:'out', t:`Registrar: Cloudflare, Inc.`},
        {c:'out', t:`Created: 2024-01-01`},
        {c:'out', t:`Expires: 2026-01-01`},
        {c:'out', t:`Name Servers: ns1.cloudflare.com`},
        {c:'out', t:`              ns2.cloudflare.com`},
        {c:'info',t:`Status: clientTransferProhibited`},
      ];
    }
  },
  curl:{
    desc:'fetch URL headers',
    fn:async(args,pr)=>{
      const url=args[0]||'https://1998.gg';
      pr([{c:'dim',t:`curl -I ${url}`}]);
      await delay(350);
      return[
        {c:'out', t:'HTTP/2 200 OK'},
        {c:'out', t:'server: cloudflare'},
        {c:'out', t:'content-type: text/html; charset=UTF-8'},
        {c:'info',t:'cache-control: max-age=14400'},
        {c:'info',t:'x-frame-options: SAMEORIGIN'},
        {c:'info',t:'strict-transport-security: max-age=31536000'},
        {c:'grn', t:`cf-ray: ${Math.random().toString(16).slice(2,18).toUpperCase()}-SJC`},
      ];
    }
  },
  whoami:{
    desc:'who you are',
    fn:async(args,pr)=>{
      pr([{c:'dim',t:'querying identity...'}]);
      const ip=await getIP();
      return[
        {c:'pur', t:'┌────────────────────────────────────┐'},
        {c:'pur', t:'│          IDENTITY REPORT           │'},
        {c:'pur', t:'└────────────────────────────────────┘'},
        {c:'out', t:`User:     visitor`},
        {c:'out', t:`Host:     ${ip}`},
        {c:'out', t:`Shell:    /bin/bash`},
        {c:'out', t:`Terminal: 1998-term`},
        {c:'info',t:`Access:   READ ONLY`},
        {c:'ylw', t:`Clearance: PUBLIC`},
      ];
    }
  },
  neofetch:{
    desc:'system info',
    fn:async()=>{
      const ua=navigator.userAgent;
      const os=ua.includes('Win')?'Windows':ua.includes('Mac')?'macOS':ua.includes('Linux')?'Linux':'Unknown OS';
      const br=ua.includes('Chrome')?'Chromium':ua.includes('Firefox')?'Firefox':ua.includes('Safari')?'Safari':'Browser';
      return[
        {c:'pur', t:'         ██╗ ██████╗  █████╗  █████╗'},
        {c:'pur', t:'        ███║██╔═══██╗██╔══██╗██╔══██╗'},
        {c:'out', t:`        ╚██║╚██████╔╝╚██████║╚█████╔╝   OS: ${os}`},
        {c:'out', t:`         ██║ ╚═════╝  ╚═══██║██╔══██╗   Browser: ${br}`},
        {c:'out', t:`         ██║          █████╔╝╚█████╔╝   Resolution: ${window.innerWidth}x${window.innerHeight}`},
        {c:'dim', t:`         ╚═╝          ╚════╝  ╚════╝    Theme: 1998 Dark`},
        {c:'gap', t:''},
        {c:'out', t:`Host:   1998.gg`},
        {c:'out', t:`Kernel: 1998-shell 2.0`},
        {c:'out', t:`Uptime: ${Math.floor(performance.now()/60000)} min`},
        {c:'out', t:`Memory: ${(Math.random()*300+200).toFixed(0)} MiB / 1998 MiB`},
      ];
    }
  },
  members:{
    desc:'list 1998 elite',
    fn:async()=>[
      {c:'pur', t:'╔══════════════════════════════════════════════╗'},
      {c:'pur', t:'║              1998 ELITE ROSTER               ║'},
      {c:'pur', t:'╚══════════════════════════════════════════════╝'},
      {c:'bold',t:'  HOF — Hall of Fame'},
      {c:'out', t:'    [01-06] Set in index.html → data-uid'},
      {c:'bold',t:'  TTE — Threat to Everyone'},
      {c:'out', t:'    [01-08] Set in index.html → data-uid'},
      {c:'bold',t:'  Exclusive Threat'},
      {c:'out', t:'    [01-03] Set in index.html → data-uid'},
    ]
  },
  status:{
    desc:'group system status',
    fn:async()=>[
      {c:'grn', t:'[✓] 1998 System         ONLINE'},
      {c:'grn', t:'[✓] Discord Presence    CONNECTED'},
      {c:'grn', t:'[✓] Lanyard API         ACTIVE'},
      {c:'grn', t:'[✓] Server Widgets      LIVE'},
      {c:'ylw', t:'[~] Threat Level        MAXIMUM'},
      {c:'pur', t:'[★] Status              UNDEFEATED'},
    ]
  },
  date:{
    desc:'current date and time',
    fn:async()=>{
      const n=new Date();
      return[
        {c:'out', t:n.toString()},
        {c:'dim', t:`Unix timestamp: ${Math.floor(n/1000)}`},
      ];
    }
  },
  uptime:{
    desc:'session uptime',
    fn:async()=>{
      const s=Math.floor(performance.now()/1000);
      const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;
      return[{c:'grn',t:`Session uptime: ${h}h ${m}m ${sec}s`},{c:'dim',t:'1998 never sleeps.'}];
    }
  },
  cat:{
    desc:'read a file',
    fn:async(args)=>{
      const f=args[0]||'readme.txt';
      const files={
        'readme.txt':[
          {c:'out',t:'1998 — Est. 2024'},
          {c:'out',t:'Where the undefeated define what\'s next.'},
          {c:'out',t:'Pure skill. Elite execution. Unmatched presence.'},
        ],
        '/etc/hosts':[
          {c:'dim',t:'127.0.0.1       localhost'},
          {c:'dim',t:'::1             localhost ip6-localhost'},
          {c:'out',t:'104.21.x.x      1998.gg'},
        ],
        '/etc/passwd':[{c:'err',t:'Permission denied'}],
        'flag.txt':[{c:'pur',t:'1998{y0u_f0und_1t}'}],
      };
      return files[f]||[{c:'err',t:`cat: ${f}: No such file or directory`}];
    }
  },
};

function delay(ms){return new Promise(r=>setTimeout(r,ms))}

function initTerminal(){
  const hist=document.getElementById('term-history');
  const typed=document.getElementById('term-typed');
  const body=document.getElementById('term-body');
  const promptEl=document.getElementById('term-prompt');
  if(!hist||!typed||!body)return;

  // ASCII art
  const art=document.createElement('pre');
  art.className='ascii-art';art.textContent=ASCII_ART;hist.appendChild(art);

  let username='visitor';
  function setPrompt(){
    if(promptEl)promptEl.textContent=`${username}@1998:~$ `;
  }
  setPrompt();

  // Fetch IP silently on load to cache it
  getIP().then(ip=>{
    printLines([
      {c:'pur', t:`1998 Shell v2.0  —  type "help" for commands`},
      {c:'info',t:`Your IP: ${ip}`},
      {c:'dim', t:'─'.repeat(54)},
      {c:'gap', t:''},
    ]);
  });

  let cur='',hstack=[],hidx=-1;
  let busy=false;
  body.setAttribute('tabindex','0');
  body.addEventListener('click',()=>body.focus());

  body.addEventListener('keydown',async e=>{
    if(busy)return;
    if(e.ctrlKey&&e.key==='l'){execCmd('clear');e.preventDefault();return;}
    if(e.key.length===1&&!e.ctrlKey&&!e.metaKey){cur+=e.key;typed.textContent=cur;}
    else if(e.key==='Backspace'){cur=cur.slice(0,-1);typed.textContent=cur;e.preventDefault();}
    else if(e.key==='Enter'){
      const raw=cur.trim();
      const [cmd,...args]=raw.toLowerCase().split(/\s+/);
      printLines([{c:'cmd',t:`${username}@1998:~$ ${cur}`}]);
      cur='';typed.textContent='';hidx=-1;
      if(raw)hstack.unshift(raw);
      await execCmd(cmd,args);
      e.preventDefault();
    }
    else if(e.key==='ArrowUp'){if(hidx<hstack.length-1){hidx++;cur=hstack[hidx];typed.textContent=cur;}e.preventDefault();}
    else if(e.key==='ArrowDown'){if(hidx>0){hidx--;cur=hstack[hidx];}else{hidx=-1;cur='';}typed.textContent=cur;e.preventDefault();}
    else if(e.key==='Tab'){
      const matches=Object.keys(COMMANDS).filter(k=>k.startsWith(cur));
      if(matches.length===1){cur=matches[0];typed.textContent=cur;}
      else if(matches.length>1){
        printLines([{c:'cmd',t:`${username}@1998:~$ ${cur}`},{c:'dim',t:matches.join('  ')}]);
      }
      e.preventDefault();
    }
  });

  async function execCmd(cmd,args=[]){
    if(!cmd){printLines([{c:'gap',t:''}]);return;}
    if(cmd==='clear'){
      hist.innerHTML='';
      const a2=document.createElement('pre');a2.className='ascii-art';a2.textContent=ASCII_ART;hist.appendChild(a2);
      printLines([{c:'gap',t:''}]);return;
    }
    const c=COMMANDS[cmd];
    if(c){
      busy=true;
      // Intermediate print callback for async commands that print mid-execution
      const pr=(lines)=>printLines(lines);
      const lines=await c.fn(args,pr);
      if(lines)printLines([...lines,{c:'gap',t:''}]);
      else printLines([{c:'gap',t:''}]);
      busy=false;
    } else {
      printLines([
        {c:'err',t:`bash: ${cmd}: command not found`},
        {c:'dim',t:'type "help" to list available commands'},
        {c:'gap',t:''},
      ]);
    }
    body.scrollTop=body.scrollHeight;
  }

  function printLines(lines){
    lines.forEach(({c,t})=>{
      const s=document.createElement('span');
      s.className=`tl ${c||''}`;s.textContent=t??'';
      hist.appendChild(s);
    });
    body.scrollTop=body.scrollHeight;
  }

  // Auto-demo on scroll into view
  const sect=document.getElementById('terminal');
  let demoDone=false;
  new IntersectionObserver(([e])=>{
    if(!e.isIntersecting||demoDone)return;
    demoDone=true;body.focus();
    let i=0;const demoCmd='geoip';
    const iv=setInterval(()=>{
      if(i<demoCmd.length){cur+=demoCmd[i++];typed.textContent=cur;}
      else{
        clearInterval(iv);
        setTimeout(async()=>{
          printLines([{c:'cmd',t:`${username}@1998:~$ ${cur}`}]);
          cur='';typed.textContent='';
          await execCmd(demoCmd);
        },500);
      }
    },90);
  },{threshold:.35}).observe(sect);
}
