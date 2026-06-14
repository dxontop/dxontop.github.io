/* ============================================================
   script.js — dx personal site
   ★ = values YOU change
   ============================================================

   DISCORD PRESENCE (User Status / Avatar):
   ─────────────────────────────────────────
   We use Lanyard BUT routed through your own server bot.
   Steps:
   1. Invite the Lanyard bot to YOUR server:
      https://discord.com/oauth2/authorize?client_id=659565532051087361&scope=bot
   2. Every user whose status you want to show must ALSO join:
      discord.gg/lanyard  (free, public server)
   3. Put their Discord User IDs below.
   
   WHY THIS WORKS:  Lanyard's public API reads presence from
   any server the bot is in. By adding it to YOUR server,
   all your members are automatically tracked — no extra step
   for users who are already in your server.

   DISCORD WIDGET (Server online/member count):
   ─────────────────────────────────────────────
   1. Go to your Discord server → Settings → Widget → Enable Widget
   2. Copy the Server ID shown there
   3. Paste it into GUILD_IDS below and on each srv-card's data-guild-id
   No bot needed — this is a free public Discord endpoint.

   HOW TO CHANGE YOUR PROFILE BANNER:
   ────────────────────────────────────
   Option A — Discord banner (automatic):
     Upload a banner inside Discord (requires Nitro).
     It will appear automatically on your profile card here.
   
   Option B — Custom image (no Nitro needed):
     In index.html, find the line:  <div class="halo-banner"></div>
     Change it to:
     <div class="halo-banner" style="background:url('banner.jpg') center/cover no-repeat !important"></div>
     Put your banner.jpg in the same folder as index.html.
   
   Option C — Gradient banner (no image):
     In style.css, find .halo-banner and change the background:
     background: linear-gradient(135deg, #your-color1, #your-color2);

   ============================================================ */

/* ════════════════════════════════════════════════
   ★ YOUR DISCORD USER ID  (for profile card)
   How to get: Discord → Settings → Advanced → Developer Mode ON
               Right-click your name → Copy User ID
   ════════════════════════════════════════════════ */
var PROFILE_ID = '745985998479163443'; /* ★ paste your User ID here */

/* ════════════════════════════════════════════════
   ★ HOF MEMBERS — Discord User IDs + display info
   All users must join discord.gg/lanyard for live status.
   ════════════════════════════════════════════════ */
var HOF_MEMBERS = [
  { id:'000000000000000000', name:'dx',     role:'founder · since 2025' }, /* ★ */
  { id:'000000000000000000', name:'Name 2', role:'elite'                }, /* ★ */
  { id:'000000000000000000', name:'Name 3', role:'legend'               }, /* ★ */
  { id:'000000000000000000', name:'Name 4', role:'dedicated'            }, /* ★ */
  { id:'000000000000000000', name:'Name 5', role:'respected'            }, /* ★ */
  { id:'000000000000000000', name:'Name 6', role:'recognized'           }, /* ★ */
];

/* ════════════════════════════════════════════════
   ★ DISCORD SERVER GUILD IDs (for live member counts)
   How to get: Server Settings → Widget → Enable → copy Server ID
   Put the same ID in each srv-card's data-guild-id in HTML.
   ════════════════════════════════════════════════ */
var MAIN_GUILD_ID = 'YOUR_GUILD_ID_HERE'; /* ★ your main server Guild ID */

/* ════════════════════════════════════════════════
   ★ FEATURED SERVER DESCRIPTION (types itself out)
   ════════════════════════════════════════════════ */
var SERVER_DESC = 'Welcome to 1998 — where the most skillful, undefeated minds converge. Pure skill, elite execution, unmatched presence. We don\'t end debates... we end eras.'; /* ★ */

/* ════════════════════════════════════════════════
   ★ ANIMATED TAB TITLE
   ════════════════════════════════════════════════ */
var TAB_FRAMES = [ 'dxontop', 'dxonto', 'dxont', 'dxon', 'dxo', 'dx', 'd', 'd', 'dx', 'dxo', 'dxon', 'dxont', 'dxonto', 'dxontop' ]; /* ★ */
var TAB_INTERVAL = 200; /* ★ ms between frames */

/* ════════════════════════════════════════════════
   ★ MUSIC (plays on splash tap — leave '' to disable)
   ════════════════════════════════════════════════ */
var MUSIC_SRC = 'https://github.com/dxontop/dxontop.github.io/blob/main/2.%20%20SINALOA%20-%20BUDDAHBEADS%2C%20LEXUS%2C%20EJAC%20(YELLOWTAPES%20VOL.1).mp3'; /* ★ path to your .mp3 */
var MUSIC_VOL = 0.5;               /* ★ 0.0 – 1.0 */

/* ════════════════════════════════════════════════
   ★ TERMINAL INFO
   ════════════════════════════════════════════════ */
var TERM = {
  user:    'dx',           /* ★ */
  host:    'personal',     /* ★ */
  server:  'dx personal',  /* ★ */
  role:    'founder',      /* ★ */
  since:   '2025',         /* ★ */
  location:'earth',        /* ★ */
  discord: 'dx',           /* ★ */
  twitter: '@dx',          /* ★ */
  github:  'github.com/dx',/* ★ */
};

/* ════════════════════════════════════════════════
   ★ AUTO-TYPED TERMINAL BOOT LINES
   ════════════════════════════════════════════════ */
var AUTO_SCRIPT = [
  { text:'',                                                   delay:200, cls:''         },
  { text:'  ██████╗ ██╗  ██╗',                                delay:0,   cls:'t-red' },
  { text:'  ██╔══██╗╚██╗██╔╝',                                delay:0,   cls:'t-red' },
  { text:'  ██║  ██║ ╚███╔╝ ',                                delay:0,   cls:'t-red' },
  { text:'  ██║  ██║ ██╔██╗ ',                                delay:0,   cls:'t-red' },
  { text:'  ██████╔╝██╔╝ ██╗',                                delay:0,   cls:'t-red' },
  { text:'  ╚═════╝ ╚═╝  ╚═╝  ',            delay:0,   cls:'t-purple' },
  { text:'',                                                   delay:300, cls:''         },
  { text:'[$] target: dx ',  delay:400, cls:'t-green'  },
  { text:'[$] geolocation: resolving...',                     delay:600, cls:'t-green'  },
  { text:'[$] ISP: 1of1 · user: dx',                     delay:500, cls:'t-green'  },
  { text:'',                                                   delay:300, cls:''         },
  { text:'[>] running port scan... (0-1998)',                delay:800, cls:'t-yellow' },
  { text:'  22/tcp   open  ssh',                              delay:300, cls:'t-muted'  },
  { text:'  80/tcp   open  http',                             delay:200, cls:'t-muted'  },
  { text:'  443/tcp  open  https',                            delay:200, cls:'t-muted'  },
  { text:'',                                                   delay:200, cls:''         },
  { text:'[$] scan complete — 3 open ports detected',        delay:500, cls:'t-green'  },
  { text:'[>] checking identity...',                          delay:600, cls:'t-yellow' },
  { text:'[$] user confirmed — dx',                          delay:400, cls:'t-green'  },
  { text:'[$] threat level — world threat',                    delay:300, cls:'t-red'  },
  { text:'',                                                   delay:400, cls:''         },
  { text:'root@dx : ~ $',                           delay:200, cls:'t-bright' },
];

/* ─────────────────────────────────────────────
   INTERNALS — don't edit below
   ───────────────────────────────────────────── */
var STATUS_COLOR = { online:'#3ba55d', idle:'#faa61a', dnd:'#ed4245', offline:'#747f8d' };
var STATUS_LABEL = { online:'online',  idle:'idle',    dnd:'do not disturb', offline:'offline' };
window._bootTime = Date.now();

/* ── Lanyard (user presence) ── */
function lanyard(id) {
  return fetch('https://api.lanyard.rest/v1/users/' + id)
    .then(function(r){ return r.json(); })
    .then(function(j){ return j.success ? j.data : null; })
    .catch(function(){ return null; });
}

/* ── Discord Widget API (server stats — no bot token needed) ── */
function discordWidget(guildId) {
  if (!guildId || guildId === 'YOUR_GUILD_ID_HERE' || guildId === '') return Promise.resolve(null);
  return fetch('https://discord.com/api/guilds/' + guildId + '/widget.json')
    .then(function(r){ return r.ok ? r.json() : null; })
    .catch(function(){ return null; });
}

function avatarUrl(id, hash, size) {
  size = size || 256;
  var ext = (hash && hash.indexOf('a_') === 0) ? 'gif' : 'webp';
  return 'https://cdn.discordapp.com/avatars/' + id + '/' + hash + '.' + ext + '?size=' + size;
}
function bannerUrl(id, hash) {
  var ext = (hash && hash.indexOf('a_') === 0) ? 'gif' : 'webp';
  return 'https://cdn.discordapp.com/banners/' + id + '/' + hash + '.' + ext + '?size=600';
}
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function pad(s,n){ s=String(s); while(s.length<n) s+=' '; return s; }
function fmtNum(n){ return n >= 1000 ? (n/1000).toFixed(1)+'k' : String(n); }

/* ── Animated tab title ── */
var tabIdx = 0;
setInterval(function(){ document.title = TAB_FRAMES[tabIdx++ % TAB_FRAMES.length]; }, TAB_INTERVAL);

/* ── Splash ── */
document.getElementById('splash').addEventListener('click', function() {
  var sp = this; sp.classList.add('clicked');
  if (MUSIC_SRC) { var a=new Audio(MUSIC_SRC); a.volume=MUSIC_VOL; a.loop=true; a.play().catch(function(){}); }
  setTimeout(function(){
    sp.classList.add('hide');
    setTimeout(function(){
      var el=document.getElementById('profile');
      if(el) el.scrollIntoView({behavior:'smooth'});
    }, 400);
  }, 380);
});

/* ── Scroll reveal ── */
var revObs = new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('visible'); });
},{ threshold:0.08 });
document.querySelectorAll('.reveal').forEach(function(el){ revObs.observe(el); });

/* ── Profile card (Lanyard) ── */
function loadProfile() {
  lanyard(PROFILE_ID).then(function(data) {
    if (!data) return;
    var u=data.discord_user, st=data.discord_status||'offline', acts=data.activities||[];
    /* avatar */
    var av=document.querySelector('.halo-avatar');
    if(u.avatar) av.innerHTML='<img src="'+avatarUrl(u.id,u.avatar)+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';
    /* username */
    var nameEl=document.querySelector('.halo-username');
    nameEl.childNodes[0].textContent = u.global_name||u.username;
    /* status */
    var dot=document.querySelector('.status-dot'), pill=document.querySelector('.halo-status-pill');
    var col=STATUS_COLOR[st]||STATUS_COLOR.offline;
    dot.style.background=col; dot.style.boxShadow='0 0 8px '+col;
    var tn=pill.lastChild; if(tn&&tn.nodeType===3) tn.textContent=' '+(STATUS_LABEL[st]||'offline');
    /* activity */
    var act=null;
    for(var i=0;i<acts.length;i++){if(acts[i].type===0||acts[i].type===4){act=acts[i];break;}}
    document.querySelector('.discord-name').textContent=u.username;
    document.querySelector('.discord-activity').textContent=act?(act.name||act.state||'No activity'):'No activity';
    /* banner */
    var bn=document.querySelector('.halo-banner');
    if(!bn.style.backgroundImage || bn.style.backgroundImage==='none') {
      if(u.banner) bn.style.background='url('+bannerUrl(u.id,u.banner)+') center/cover no-repeat';
      else if(u.accent_color){ var hex='#'+(u.accent_color).toString(16).padStart(6,'0'); bn.style.background='linear-gradient(135deg,'+hex+'55,'+hex+'11)'; }
    }
  });
}

/* ── HOF cards (Lanyard) ── */
function loadHOF() {
  var cards=document.querySelectorAll('.hof-card');
  cards.forEach(function(card,i){
    var m=HOF_MEMBERS[i]; if(!m) return;
    card.querySelector('.hof-name').textContent=m.name;
    card.querySelector('.hof-role').textContent=m.role;
    if(!m.id||m.id==='000000000000000000') return;
    lanyard(m.id).then(function(data){
      if(!data) return;
      var u=data.discord_user, st=data.discord_status||'offline';
      if(u.avatar){
        var fill=card.querySelector('.hof-phfill');
        if(fill){
          var img=document.createElement('img');
          img.className='hof-bg'; img.src=avatarUrl(u.id,u.avatar,512); img.alt=u.username;
          fill.parentNode.replaceChild(img,fill);
        }
      }
      var col=STATUS_COLOR[st]||STATUS_COLOR.offline;
      var badge=document.createElement('div');
      badge.style.cssText='position:absolute;top:0.75rem;left:0.75rem;width:9px;height:9px;border-radius:50%;background:'+col+';box-shadow:0 0 6px '+col+';border:2px solid #000;z-index:4';
      card.appendChild(badge);
      card.querySelector('.hof-name').textContent=u.global_name||u.username;
    });
  });
}

/* ── Server widget stats (Discord Widget API — no token) ── */
function loadServerStats() {
  /* featured server */
  discordWidget(MAIN_GUILD_ID).then(function(data){
    if(!data) return;
    var onlineEl=document.getElementById('featOnline');
    var membEl=document.getElementById('featMembers');
    if(onlineEl) onlineEl.textContent=(data.presence_count||0)+' online';
    /* Widget doesn't give total member count — use approximate_member_count if available */
    if(membEl) membEl.textContent=data.members ? data.members.length+' online visible' : 'join to see count';
  });

  /* individual server cards */
  document.querySelectorAll('.srv-card[data-guild-id]').forEach(function(card){
    var gid=card.getAttribute('data-guild-id');
    if(!gid||gid==='YOUR_GUILD_ID_HERE'||gid==='') return;
    discordWidget(gid).then(function(data){
      if(!data) return;
      var countEl=card.querySelector('.srv-count');
      if(countEl) countEl.textContent=(data.presence_count||0)+' online';
    });
  });
}

/* ── Featured server typed description ── */
(function(){
  var el=document.getElementById('srvFeatDesc'); if(!el) return;
  var txt=SERVER_DESC, i=0;
  function type(){ if(i<txt.length){ el.textContent+=txt[i++]; setTimeout(type,22+Math.random()*18); } }
  var obs=new IntersectionObserver(function(es){
    if(es[0].isIntersecting){ obs.disconnect(); setTimeout(type,600); }
  },{threshold:0.3});
  obs.observe(el);
})();

/* ── Dual-row server train ── */
(function(){
  ['srvRow1','srvRow2'].forEach(function(id){
    var train=document.getElementById(id); if(!train) return;
    var clone=train.cloneNode(false); clone.id=''; clone.setAttribute('aria-hidden','true');
    train.parentNode.appendChild(clone);
    var wrap=train.closest('.srv-train-wrap');
    function pause(){ train.style.animationPlayState='paused'; clone.style.animationPlayState='paused'; }
    function run()  { train.style.animationPlayState='running'; clone.style.animationPlayState='running'; }
    wrap.addEventListener('mouseenter',pause);
    wrap.addEventListener('mouseleave',run);
  });
})();

/* ══════════════════════════════════════════════
   WORKING TERMINAL
   ══════════════════════════════════════════════ */
var termAutoOut=document.getElementById('term-auto-output');
var termOutput =document.getElementById('term-output');
var termInput  =document.getElementById('term-input');
var termForm   =document.getElementById('term-form');
var termPrompt =document.getElementById('term-prompt-text');
var termBody   =document.getElementById('termBody');

termPrompt.textContent='root@'+TERM.host+':~$';
var cmdHistory=[],histIdx=-1;

/* auto-typed boot sequence */
var autoStarted=false;
var autoObs=new IntersectionObserver(function(es){
  if(es[0].isIntersecting&&!autoStarted){ autoStarted=true; autoObs.disconnect(); runAutoScript(); }
},{threshold:0.25});
autoObs.observe(document.getElementById('terminal'));

function runAutoScript(){
  var idx=0;
  function next(){
    if(idx>=AUTO_SCRIPT.length) return;
    var line=AUTO_SCRIPT[idx++];
    setTimeout(function(){ typeLine(termAutoOut,line.text,line.cls,16,function(){ next(); }); }, line.delay||0);
  }
  next();
}

function typeLine(container,text,cls,speed,cb){
  var div=document.createElement('div');
  div.className='tl'+(cls?' '+cls:'');
  container.appendChild(div);
  if(!text){ if(cb) cb(); return; }
  var i=0;
  function t(){
    if(i<text.length){ div.textContent+=text[i++]; termBody.scrollTop=termBody.scrollHeight; setTimeout(t,speed+Math.random()*14); }
    else{ if(cb) setTimeout(cb,35); }
  }
  t();
}

/* commands */
var COMMANDS = {
  help:function(){
    return ['<span class="t-purple">available commands</span>',
      '<span class="t-gray">────────────────────────────────</span>',
      '<span class="t-green">whoami</span>           who you are',
      '<span class="t-green">id</span>               uid / gid info',
      '<span class="t-green">cat identity</span>     full profile',
      '<span class="t-green">ls</span>               list directories',
      '<span class="t-green">ls links</span>         social links',
      '<span class="t-green">ls hof</span>           hall of fame list',
      '<span class="t-green">neofetch</span>         system info card',
      '<span class="t-green">status</span>           live discord status',
      '<span class="t-green">uptime</span>           session uptime',
      '<span class="t-green">date</span>             current datetime',
      '<span class="t-green">servers</span>          list discord servers',
      '<span class="t-green">clear</span>            clear terminal',
      '<span class="t-green">history</span>          command history',
      '<span class="t-gray">────────────────────────────────</span>',
    ].join('\n');
  },
  whoami:function(){ return '<span class="t-bright">'+esc(TERM.user)+'</span>'; },
  id:function(){ return 'uid=1000(<span class="t-green">'+esc(TERM.user)+'</span>) gid=1000(<span class="t-green">'+esc(TERM.user)+'</span>) groups=1000,27(sudo)'; },
  'cat identity':function(){
    return ['<span class="t-gray">name         </span><span class="t-white">'+esc(TERM.user)+'</span>',
      '<span class="t-gray">server       </span><span class="t-white">'+esc(TERM.server)+'</span>',
      '<span class="t-gray">role         </span><span class="t-red">'+esc(TERM.role)+'</span>',
      '<span class="t-gray">status       </span><span class="t-green">active</span>',
      '<span class="t-gray">since        </span><span class="t-white">'+esc(TERM.since)+'</span>',
      '<span class="t-gray">location     </span><span class="t-white">'+esc(TERM.location)+'</span>',
    ].join('\n');
  },
  ls:function(){ return '<span class="t-blue">links/</span>   <span class="t-blue">hof/</span>   <span class="t-blue">servers/</span>   <span class="t-gray">identity</span>   <span class="t-gray">readme.md</span>'; },
  'ls links':function(){
    return ['<span class="t-muted">drwxr-xr-x</span>  <span class="t-blue">discord</span>   <span class="t-gray">→  '+esc(TERM.discord)+'</span>',
      '<span class="t-muted">drwxr-xr-x</span>  <span class="t-blue">twitter</span>   <span class="t-gray">→  '+esc(TERM.twitter)+'</span>',
      '<span class="t-muted">drwxr-xr-x</span>  <span class="t-blue">github</span>    <span class="t-gray">→  '+esc(TERM.github)+'</span>',
    ].join('\n');
  },
  'ls hof':function(){
    var rows=HOF_MEMBERS.map(function(m,i){
      return '<span class="t-gray">'+String(i+1).padStart(2,'0')+'</span>  <span class="t-bright">'+pad(esc(m.name),16)+'</span><span class="t-muted">'+esc(m.role)+'</span>';
    });
    return ['<span class="t-purple">hall of fame</span>','<span class="t-gray">────────────────────────────────</span>'].concat(rows).join('\n');
  },
  neofetch:function(){
    var up=Math.floor((Date.now()-window._bootTime)/1000),m=Math.floor(up/60),s=up%60;
    return ['<span class="t-purple">     ██████╗ ██╗  ██╗  </span>  <span class="t-bright">'+esc(TERM.user)+'</span><span class="t-gray">@</span><span class="t-bright">'+esc(TERM.host)+'</span>',
      '<span class="t-purple">     ██╔══██╗╚██╗██╔╝  </span>  <span class="t-gray">──────────────────────</span>',
      '<span class="t-purple">     ██║  ██║ ╚███╔╝   </span>  <span class="t-green">OS:</span>    <span class="t-white">dx-personal 1.0</span>',
      '<span class="t-purple">     ██║  ██║ ██╔██╗   </span>  <span class="t-green">Role:</span>  <span class="t-white">'+esc(TERM.role)+'</span>',
      '<span class="t-purple">     ██████╔╝██╔╝ ██╗  </span>  <span class="t-green">Since:</span> <span class="t-white">'+esc(TERM.since)+'</span>',
      '<span class="t-purple">     ╚═════╝ ╚═╝  ╚═╝  </span>  <span class="t-green">Up:</span>    <span class="t-white">'+m+'m '+s+'s</span>',
    ].join('\n');
  },
  status:function(){
    return lanyard(PROFILE_ID).then(function(data){
      if(!data) return '<span class="t-red">error:</span> <span class="t-white">lanyard unreachable — join discord.gg/lanyard</span>';
      var u=data.discord_user,st=data.discord_status||'offline',col=STATUS_COLOR[st]||STATUS_COLOR.offline;
      var acts=data.activities||[],act=null;
      for(var i=0;i<acts.length;i++){if(acts[i].type===0||acts[i].type===4){act=acts[i];break;}}
      return ['<span class="t-gray">user      </span><span class="t-bright">'+esc(u.username)+'</span>',
        '<span class="t-gray">status    </span><span style="color:'+col+'">'+st+'</span>',
        '<span class="t-gray">activity  </span><span class="t-white">'+(act?esc(act.name||act.state||'none'):'none')+'</span>',
      ].join('\n');
    });
  },
  servers:function(){
    return discordWidget(MAIN_GUILD_ID).then(function(data){
      if(!data) return '<span class="t-red">error:</span> <span class="t-white">enable Widget in Server Settings → Widget → Enable</span>';
      return ['<span class="t-purple">'+esc(data.name||'server')+'</span>',
        '<span class="t-gray">online now  </span><span class="t-green">'+(data.presence_count||0)+'</span>',
        '<span class="t-gray">invite      </span><span class="t-blue">discord.gg/c22NWFfMEN</span>',
      ].join('\n');
    });
  },
  uptime:function(){
    var up=Math.floor((Date.now()-window._bootTime)/1000),h=Math.floor(up/3600),m=Math.floor((up%3600)/60),s=up%60;
    return 'up <span class="t-white">'+h+'h '+m+'m '+s+'s</span>  load: <span class="t-green">0.00 0.00 0.00</span>';
  },
  date:function(){ return '<span class="t-white">'+new Date().toString()+'</span>'; },
  history:function(){
    if(!cmdHistory.length) return '<span class="t-muted">no commands yet</span>';
    return cmdHistory.map(function(c,i){ return '  <span class="t-gray">'+String(i+1).padStart(3,' ')+'</span>  <span class="t-white">'+esc(c)+'</span>'; }).join('\n');
  },
  clear:function(){ return '__CLEAR__'; },
};

function appendLine(raw,html){
  var d=document.createElement('div'); d.className='tl';
  d.innerHTML='<span class="t-prompt">'+esc(termPrompt.textContent)+'</span> <span class="t-cmd">'+esc(raw)+'</span>';
  termOutput.appendChild(d);
  if(html&&html!=='__CLEAR__'){
    var o=document.createElement('div'); o.className='tl term-out'; o.innerHTML=html;
    termOutput.appendChild(o);
  }
  termBody.scrollTop=termBody.scrollHeight;
}

function runCommand(raw){
  var cmd=raw.trim().toLowerCase().replace(/\s+/g,' ');
  if(!cmd) return;
  cmdHistory.push(raw.trim()); histIdx=cmdHistory.length;
  if(cmd==='clear'){ appendLine(raw,''); termOutput.innerHTML=''; termAutoOut.innerHTML=''; return; }
  var h=COMMANDS[cmd];
  if(!h){ appendLine(raw,'<span class="t-red">bash:</span> <span class="t-white">'+esc(cmd)+'</span><span class="t-gray">: not found — type </span><span class="t-green">help</span>'); return; }
  var res=h();
  if(res&&typeof res.then==='function'){
    var d=document.createElement('div'); d.className='tl';
    d.innerHTML='<span class="t-prompt">'+esc(termPrompt.textContent)+'</span> <span class="t-cmd">'+esc(raw)+'</span>';
    termOutput.appendChild(d);
    res.then(function(html){
      if(html){ var o=document.createElement('div'); o.className='tl term-out'; o.innerHTML=html; termOutput.appendChild(o); }
      termBody.scrollTop=termBody.scrollHeight;
    });
  } else { appendLine(raw,res); }
}

termForm.addEventListener('submit',function(e){ e.preventDefault(); var v=termInput.value; termInput.value=''; runCommand(v); });
termInput.addEventListener('keydown',function(e){
  if(e.key==='ArrowUp'){e.preventDefault();if(histIdx>0)histIdx--;termInput.value=cmdHistory[histIdx]||'';}
  if(e.key==='ArrowDown'){e.preventDefault();if(histIdx<cmdHistory.length-1){histIdx++;termInput.value=cmdHistory[histIdx]||'';}else{histIdx=cmdHistory.length;termInput.value='';}}
  if(e.key==='Tab'){e.preventDefault();var v=termInput.value.toLowerCase(),ks=Object.keys(COMMANDS);for(var i=0;i<ks.length;i++){if(ks[i].indexOf(v)===0){termInput.value=ks[i];break;}}}
});
document.querySelector('.term-body').addEventListener('click',function(){ termInput.focus(); });

/* ── INIT ── */
loadProfile();
loadHOF();
loadServerStats();
setInterval(function(){ loadProfile(); loadServerStats(); }, 30000);
