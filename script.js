/* ============================================================
   script.js — dx personal site
   ★ = values you can change
   ============================================================ */

/* ════════════════════════════════════════════════
   ★ YOUR DISCORD USER ID (main profile card)
   1. Discord → Settings → Advanced → Developer Mode ON
   2. Right-click your name anywhere → Copy User ID
   ════════════════════════════════════════════════ */
var PROFILE_ID = '745985998479163443'; /* ★ your Discord User ID */

/* ════════════════════════════════════════════════
   ★ HOF MEMBERS
   Add each person's Discord User ID + name + role.
   They must join discord.gg/lanyard for avatar to load.
   ════════════════════════════════════════════════ */
var HOF_MEMBERS = [
  { id:'000000000000000000', name:'dx',     role:'founder · since 2025' },
  { id:'000000000000000000', name:'Name 2', role:'elite'                },
  { id:'000000000000000000', name:'Name 3', role:'legend'               },
  { id:'000000000000000000', name:'Name 4', role:'dedicated'            },
  { id:'000000000000000000', name:'Name 5', role:'respected'            },
  { id:'000000000000000000', name:'Name 6', role:'recognized'           },
];

/* ════════════════════════════════════════════════
   ★ FEATURED SERVER DESCRIPTION (typed animation)
   This text types itself out inside the server card.
   ════════════════════════════════════════════════ */
var SERVER_DESC = 'Welcome to 1998 — where the most skillful, undefeated minds converge. Pure skill, elite execution, unmatched presence. We don\'t end debates... we end eras.';

/* ════════════════════════════════════════════════
   ★ ANIMATED TAB TITLE FRAMES
   Cycles through these in the browser tab.
   ════════════════════════════════════════════════ */
var TAB_FRAMES = ['dxontop', 'dxonto', 'dxont', 'dxon', 'dxo', 'dx', 'd', 'dx', 'dxo', 'dxon', 'dxont', 'dxonto', 'dxontop'];
var TAB_INTERVAL = 300; /* ★ ms per frame */

/* ════════════════════════════════════════════════
   ★ MUSIC (plays on splash tap)
   Set to '' to disable.
   ════════════════════════════════════════════════ */
var MUSIC_SRC = 'https://raw.githubusercontent.com/dxontop/dxontop.github.io/main/2.%20%20SINALOA%20-%20BUDDAHBEADS%2C%20LEXUS%2C%20EJAC%20(YELLOWTAPES%20VOL.1).mp3'; /* ★ path to your .mp3 */
var MUSIC_VOL = 0.5;               /* ★ 0.0 – 1.0         */

/* ════════════════════════════════════════════════
   ★ TERMINAL — your info printed by commands
   ════════════════════════════════════════════════ */
var TERM = {
  user:     'thegoat',
  location: 'earth',
  threat:  'worldwide',
};

/* ════════════════════════════════════════════════
   ★ AUTO-TYPED TERMINAL SCRIPT (arcsendo style)
   Each line has: text, delay before typing, colour class.
   This plays automatically when the terminal scrolls into view.
   ════════════════════════════════════════════════ */
var AUTO_SCRIPT = [
  { text:'',                                                      delay:100,  cls:'t-muted'  },
  { text:'  ██████╗ ██╗  ██╗',                                   delay:0,    cls:'t-purple' },
  { text:'  ██╔══██╗╚██╗██╔╝',                                   delay:0,    cls:'t-purple' },
  { text:'  ██║  ██║ ╚███╔╝ ',                                   delay:0,    cls:'t-purple' },
  { text:'  ██║  ██║ ██╔██╗ ',                                   delay:0,    cls:'t-purple' },
  { text:'  ██████╔╝██╔╝ ██╗',                                   delay:0,    cls:'t-purple' },
  { text:'  ╚═════╝ ╚═╝  ╚═╝  ',               delay:0,    cls:'t-purple' },
  { text:'',                                                      delay:100,  cls:''         },
  { text:'[$] target: dx ',     delay:400,  cls:'t-green'  },
  { text:'[$] geolocation: resolving...',                        delay:200,  cls:'t-green'  },
  { text:'[$] ISP: goat · user: dx',                        delay:200,  cls:'t-green'  },
  { text:'',                                                      delay:300,  cls:''         },
  { text:'[>] running port scan... (0-65535)',                   delay:200,  cls:'t-yellow' },
  { text:'  22/tcp   open  ssh',                                 delay:200,  cls:'t-muted'  },
  { text:'  80/tcp   open  http',                                delay:200,  cls:'t-muted'  },
  { text:'  443/tcp  open  https',                               delay:200,  cls:'t-muted'  },
  { text:'',                                                      delay:200,  cls:''         },
  { text:'[$] scan complete — 3 open ports detected',           delay:200,  cls:'t-green'  },
  { text:'[>] checking identity...',                             delay:200,  cls:'t-yellow' },
  { text:'[$] user confirmed — dx',                             delay:200,  cls:'t-green'  },
  { text:'[$] threat level — world threat',                       delay:300,  cls:'t-red'  },
  { text:'',                                                      delay:200,  cls:''         },
  { text:'root@dx : ~/wrldthreat $',                              delay:200,  cls:'t-bright' },
];

/* ──────────────────────────────────────────────
   INTERNALS — don't edit below
   ────────────────────────────────────────────── */
var STATUS_COLOR = { online:'#3ba55d', idle:'#faa61a', dnd:'#ed4245', offline:'#747f8d' };
var STATUS_LABEL = { online:'online', idle:'idle', dnd:'do not disturb', offline:'offline' };
window._bootTime = Date.now();

function lanyard(id) {
  return fetch('https://api.lanyard.rest/v1/users/' + id)
    .then(function(r){ return r.json(); })
    .then(function(j){ return j.success ? j.data : null; })
    .catch(function(){ return null; });
}
function avatarUrl(id, hash, size) {
  size = size || 256;
  var ext = hash && hash.indexOf('a_') === 0 ? 'gif' : 'webp';
  return 'https://cdn.discordapp.com/avatars/' + id + '/' + hash + '.' + ext + '?size=' + size;
}
function bannerUrl(id, hash) {
  var ext = hash && hash.indexOf('a_') === 0 ? 'gif' : 'webp';
  return 'https://cdn.discordapp.com/banners/' + id + '/' + hash + '.' + ext + '?size=600';
}
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function pad(s, n) { s = String(s); while(s.length < n) s += ' '; return s; }

/* ── ANIMATED TAB TITLE ── */
var tabIdx = 0;
setInterval(function() {
  document.title = TAB_FRAMES[tabIdx % TAB_FRAMES.length];
  tabIdx++;
}, TAB_INTERVAL);

/* ── SPLASH ── */
document.getElementById('splash').addEventListener('click', function() {
  var splash = this;
  splash.classList.add('clicked');
  if (MUSIC_SRC) {
    var audio = new Audio(MUSIC_SRC);
    audio.volume = MUSIC_VOL; audio.loop = true;
    audio.play().catch(function(){});
  }
  setTimeout(function() {
    splash.classList.add('hide');
    /* scroll to profile after splash */
    setTimeout(function() {
      var el = document.getElementById('profile');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  }, 380);
});

/* ── SCROLL REVEAL ── */
var revObs = new IntersectionObserver(function(es) {
  es.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(function(el) { revObs.observe(el); });

/* ── PROFILE CARD ── */
function loadProfile() {
  lanyard(PROFILE_ID).then(function(data) {
    if (!data) return;
    var u = data.discord_user, st = data.discord_status || 'offline', acts = data.activities || [];
    /* avatar */
    var av = document.querySelector('.halo-avatar');
    if (u.avatar) av.innerHTML = '<img src="' + avatarUrl(u.id, u.avatar) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';
    /* name */
    var nameEl = document.querySelector('.halo-username');
    var badge = nameEl.querySelector('.halo-badge');
    nameEl.childNodes[0].textContent = u.global_name || u.username;
    /* status */
    var dot = document.querySelector('.status-dot'), pill = document.querySelector('.halo-status-pill');
    var col = STATUS_COLOR[st] || STATUS_COLOR.offline;
    dot.style.background = col; dot.style.boxShadow = '0 0 8px ' + col;
    var tn = pill.lastChild; if (tn && tn.nodeType === 3) tn.textContent = ' ' + (STATUS_LABEL[st] || 'offline');
    /* activity */
    var act = null;
    for (var i=0;i<acts.length;i++) { if (acts[i].type===0||acts[i].type===4){act=acts[i];break;} }
    document.querySelector('.discord-name').textContent = u.username;
    document.querySelector('.discord-activity').textContent = act ? (act.name||act.state||'No activity') : 'No activity';
    /* banner */
    var bn = document.querySelector('.halo-banner');
    if (u.banner) bn.style.background = 'url(' + bannerUrl(u.id, u.banner) + ') center/cover no-repeat';
    else if (u.accent_color) {
      var hex = '#' + (u.accent_color).toString(16).padStart(6,'0');
      bn.style.background = 'linear-gradient(135deg,' + hex + '44,' + hex + '11)';
    }
  });
}

/* ── HOF ── */
function loadHOF() {
  var cards = document.querySelectorAll('.hof-card');
  cards.forEach(function(card, i) {
    var m = HOF_MEMBERS[i]; if (!m) return;
    card.querySelector('.hof-name').textContent = m.name;
    card.querySelector('.hof-role').textContent = m.role;
    if (!m.id || m.id === '000000000000000000') return;
    lanyard(m.id).then(function(data) {
      if (!data) return;
      var u = data.discord_user, st = data.discord_status || 'offline';
      if (u.avatar) {
        var fill = card.querySelector('.hof-phfill');
        if (fill) {
          var img = document.createElement('img');
          img.className = 'hof-bg'; img.src = avatarUrl(u.id, u.avatar, 512); img.alt = u.username;
          fill.parentNode.replaceChild(img, fill);
        }
      }
      var col = STATUS_COLOR[st]||STATUS_COLOR.offline;
      var badge = document.createElement('div');
      badge.style.cssText = 'position:absolute;top:0.75rem;left:0.75rem;width:9px;height:9px;border-radius:50%;background:'+col+';box-shadow:0 0 6px '+col+';border:2px solid #000;z-index:4';
      card.appendChild(badge);
      card.querySelector('.hof-name').textContent = u.global_name || u.username;
    });
  });
}

/* ── FEATURED SERVER TYPED DESCRIPTION ── */
(function() {
  var el = document.getElementById('srvFeatDesc');
  if (!el) return;
  var txt = SERVER_DESC, i = 0, speed = 28; /* ★ EDITABLE: typing speed in ms */
  function type() {
    if (i < txt.length) {
      el.textContent += txt[i++];
      setTimeout(type, speed + Math.random() * 20);
    }
  }
  /* start when section scrolls into view */
  var obs = new IntersectionObserver(function(es) {
    if (es[0].isIntersecting) { obs.disconnect(); setTimeout(type, 500); }
  }, { threshold: 0.3 });
  obs.observe(el);
})();

/* ── SERVER TRAIN CLONE ── */
(function() {
  var train = document.getElementById('srvTrain');
  if (!train) return;
  var clone = train.cloneNode(true);
  clone.id = ''; clone.setAttribute('aria-hidden','true');
  train.parentNode.appendChild(clone);
  var wrap = document.querySelector('.srv-train-wrap');
  function pause(){ train.style.animationPlayState='paused'; clone.style.animationPlayState='paused'; }
  function run()  { train.style.animationPlayState='running';clone.style.animationPlayState='running';}
  wrap.addEventListener('mouseenter', pause);
  wrap.addEventListener('mouseleave', run);
})();

/* ════════════════════════════════════════════════
   WORKING TERMINAL
   ════════════════════════════════════════════════ */
var termAutoOut = document.getElementById('term-auto-output');
var termOutput  = document.getElementById('term-output');
var termInput   = document.getElementById('term-input');
var termForm    = document.getElementById('term-form');
var termPrompt  = document.getElementById('term-prompt-text');
var termBody    = document.getElementById('termBody');

termPrompt.textContent = 'root@' + TERM.host + ':~$';

var cmdHistory = [], histIdx = -1;

/* ── auto-typed boot sequence ── */
var autoStarted = false;
var autoObs = new IntersectionObserver(function(es) {
  if (es[0].isIntersecting && !autoStarted) {
    autoStarted = true;
    autoObs.disconnect();
    runAutoScript();
  }
}, { threshold: 0.3 });
autoObs.observe(document.getElementById('terminal'));

function runAutoScript() {
  var idx = 0;
  function next() {
    if (idx >= AUTO_SCRIPT.length) return;
    var line = AUTO_SCRIPT[idx++];
    setTimeout(function() {
      typeLine(termAutoOut, line.text, line.cls, 18, function() { next(); });
    }, line.delay || 0);
  }
  next();
}

function typeLine(container, text, cls, speed, cb) {
  var div = document.createElement('div');
  div.className = 'tl' + (cls ? ' ' + cls : '');
  container.appendChild(div);
  if (!text) { if (cb) cb(); return; }
  var i = 0;
  function t() {
    if (i < text.length) {
      div.textContent += text[i++];
      termBody.scrollTop = termBody.scrollHeight;
      setTimeout(t, speed + Math.random() * 15);
    } else { if (cb) setTimeout(cb, 40); }
  }
  t();
}

/* ── interactive commands ── */
var COMMANDS = {
  help: function() {
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
      '<span class="t-green">clear</span>            clear terminal',
      '<span class="t-green">history</span>          command history',
      '<span class="t-gray">────────────────────────────────</span>',
    ].join('\n');
  },
  whoami:       function(){ return '<span class="t-bright">'+esc(TERM.user)+'</span>'; },
  id:           function(){ return 'uid=1000(<span class="t-green">'+esc(TERM.user)+'</span>) gid=1000(<span class="t-green">'+esc(TERM.user)+'</span>) groups=1000,27(sudo)'; },
  'cat identity': function(){
    return ['<span class="t-gray">name         </span><span class="t-white">'+esc(TERM.user)+'</span>',
      '<span class="t-gray">server       </span><span class="t-white">'+esc(TERM.server)+'</span>',
      '<span class="t-gray">role         </span><span class="t-red">'+esc(TERM.role)+'</span>',
      '<span class="t-gray">status       </span><span class="t-green">active</span>',
      '<span class="t-gray">since        </span><span class="t-white">'+esc(TERM.since)+'</span>',
      '<span class="t-gray">location     </span><span class="t-white">'+esc(TERM.location)+'</span>',
    ].join('\n');
  },
  ls:           function(){ return '<span class="t-blue">links/</span>   <span class="t-blue">hof/</span>   <span class="t-blue">servers/</span>   <span class="t-gray">identity</span>   <span class="t-gray">readme.md</span>'; },
  'ls links':   function(){
    return ['<span class="t-muted">drwxr-xr-x</span>  <span class="t-blue">discord</span>   <span class="t-gray">→  '+esc(TERM.discord)+'</span>',
      '<span class="t-muted">drwxr-xr-x</span>  <span class="t-blue">twitter</span>   <span class="t-gray">→  '+esc(TERM.twitter)+'</span>',
      '<span class="t-muted">drwxr-xr-x</span>  <span class="t-blue">github</span>    <span class="t-gray">→  '+esc(TERM.github)+'</span>',
    ].join('\n');
  },
  'ls hof':     function(){
    var rows = HOF_MEMBERS.map(function(m,i){
      return '<span class="t-gray">'+String(i+1).padStart(2,'0')+'</span>  <span class="t-bright">'+pad(esc(m.name),16)+'</span><span class="t-muted">'+esc(m.role)+'</span>';
    });
    return ['<span class="t-purple">hall of fame</span>','<span class="t-gray">────────────────────────────────</span>'].concat(rows).join('\n');
  },
  neofetch: function(){
    var up=Math.floor((Date.now()-window._bootTime)/1000),m=Math.floor(up/60),s=up%60;
    return [
      '<span class="t-red">     ██████╗ ██╗  ██╗  </span>  <span class="t-bright">'+esc(TERM.user)+'</span><span class="t-gray">@</span><span class="t-bright">'+esc(TERM.host)+'</span>',
      '<span class="t-red">     ██╔══██╗╚██╗██╔╝  </span>  <span class="t-gray">──────────────────────</span>',
      '<span class="t-red">     ██║  ██║ ╚███╔╝   </span>  <span class="t-green">OS:</span>    <span class="t-white">dx-personal 1.0</span>',
      '<span class="t-red">     ██║  ██║ ██╔██╗   </span>  <span class="t-green">Role:</span>  <span class="t-white">'+esc(TERM.role)+'</span>',
      '<span class="t-red">     ██████╔╝██╔╝ ██╗  </span>  <span class="t-green">Since:</span> <span class="t-white">'+esc(TERM.since)+'</span>',
      '<span class="t-red">     ╚═════╝ ╚═╝  ╚═╝  </span>  <span class="t-green">Up:</span>    <span class="t-white">'+m+'m '+s+'s</span>',
    ].join('\n');
  },
  status: function(){
    return lanyard(PROFILE_ID).then(function(data){
      if (!data) return '<span class="t-red">error:</span> <span class="t-white">lanyard unreachable — join discord.gg/lanyard first</span>';
      var u=data.discord_user,st=data.discord_status||'offline',col=STATUS_COLOR[st]||STATUS_COLOR.offline;
      var acts=data.activities||[],act=null;
      for(var i=0;i<acts.length;i++){if(acts[i].type===0||acts[i].type===4){act=acts[i];break;}}
      return ['<span class="t-gray">user      </span><span class="t-bright">'+esc(u.username)+'</span>',
        '<span class="t-gray">status    </span><span style="color:'+col+'">'+st+'</span>',
        '<span class="t-gray">activity  </span><span class="t-white">'+(act?esc(act.name||act.state||'none'):'none')+'</span>',
      ].join('\n');
    });
  },
  uptime: function(){
    var up=Math.floor((Date.now()-window._bootTime)/1000),h=Math.floor(up/3600),m=Math.floor((up%3600)/60),s=up%60;
    return 'up <span class="t-white">'+h+'h '+m+'m '+s+'s</span>  load: <span class="t-green">0.00 0.00 0.00</span>';
  },
  date:    function(){ return '<span class="t-white">'+new Date().toString()+'</span>'; },
  history: function(){
    if (!cmdHistory.length) return '<span class="t-muted">no commands yet</span>';
    return cmdHistory.map(function(c,i){ return '  <span class="t-gray">'+String(i+1).padStart(3,' ')+'</span>  <span class="t-white">'+esc(c)+'</span>'; }).join('\n');
  },
  clear: function(){ return '__CLEAR__'; },
};

function appendLine(cmdText, outputHtml) {
  var d = document.createElement('div'); d.className='tl';
  d.innerHTML='<span class="t-prompt">'+esc(termPrompt.textContent)+'</span> <span class="t-cmd">'+esc(cmdText)+'</span>';
  termOutput.appendChild(d);
  if (outputHtml && outputHtml!=='__CLEAR__') {
    var o = document.createElement('div'); o.className='tl term-out'; o.innerHTML=outputHtml;
    termOutput.appendChild(o);
  }
  termBody.scrollTop = termBody.scrollHeight;
}

function runCommand(raw) {
  var cmd = raw.trim().toLowerCase().replace(/\s+/g,' ');
  if (!cmd) return;
  cmdHistory.push(raw.trim()); histIdx = cmdHistory.length;
  if (cmd==='clear') { appendLine(raw,''); termOutput.innerHTML=''; termAutoOut.innerHTML=''; return; }
  var h = COMMANDS[cmd];
  if (!h) { appendLine(raw,'<span class="t-red">bash:</span> <span class="t-white">'+esc(cmd)+'</span><span class="t-gray">: command not found — type </span><span class="t-green">help</span>'); return; }
  var res = h();
  if (res && typeof res.then==='function') {
    var d=document.createElement('div');d.className='tl';
    d.innerHTML='<span class="t-prompt">'+esc(termPrompt.textContent)+'</span> <span class="t-cmd">'+esc(raw)+'</span>';
    termOutput.appendChild(d);
    res.then(function(html){
      if(html){var o=document.createElement('div');o.className='tl term-out';o.innerHTML=html;termOutput.appendChild(o);}
      termBody.scrollTop=termBody.scrollHeight;
    });
  } else { appendLine(raw, res); }
}

termForm.addEventListener('submit', function(e){ e.preventDefault(); var v=termInput.value; termInput.value=''; runCommand(v); });
termInput.addEventListener('keydown', function(e){
  if (e.key==='ArrowUp'){e.preventDefault();if(histIdx>0)histIdx--;termInput.value=cmdHistory[histIdx]||'';}
  if (e.key==='ArrowDown'){e.preventDefault();if(histIdx<cmdHistory.length-1){histIdx++;termInput.value=cmdHistory[histIdx]||'';}else{histIdx=cmdHistory.length;termInput.value='';}}
  if (e.key==='Tab'){e.preventDefault();var v=termInput.value.toLowerCase(),ks=Object.keys(COMMANDS);for(var i=0;i<ks.length;i++){if(ks[i].indexOf(v)===0){termInput.value=ks[i];break;}}}
});
document.querySelector('.term-body').addEventListener('click', function(){ termInput.focus(); });

/* ── INIT ── */
loadProfile();
loadHOF();
setInterval(function(){ loadProfile(); }, 30000);
