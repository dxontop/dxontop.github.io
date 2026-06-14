/* ============================================================
   script.js — dx personal site
   ============================================================ */

/* ════════════════════════════════════════════════════════════
   ★ EDITABLE — YOUR DISCORD USER ID
   
   HOW TO GET YOUR DISCORD USER ID:
   1. Discord → Settings → Advanced → Enable Developer Mode
   2. Right-click your profile anywhere → "Copy User ID"
   
   HOW TO CONNECT (one step):
   1. Join discord.gg/lanyard — done.
   ════════════════════════════════════════════════════════════ */
var PROFILE_ID = '745985998479163443'; /* ★ YOUR Discord User ID */

/* ════════════════════════════════════════════════════════════
   ★ EDITABLE — HOF MEMBERS
   Add each person's Discord User ID + name/role.
   IDs come from Discord Developer Mode (right-click → Copy ID).
   If someone hasn't joined the Lanyard server, their avatar
   won't load but their name/role will still show.
   ════════════════════════════════════════════════════════════ */
var HOF_MEMBERS = [
  { id: '780737657910984704', name: 'sewuser',     role: 'Founder of 1998' },
  { id: '720212864396427314', name: 'daz', role: 'Founder of ATK'          },
  { id: '000000000000000000', name: 'Name 3', role: 'legend'               },
  { id: '000000000000000000', name: 'Name 4', role: 'dedicated'            },
  { id: '000000000000000000', name: 'Name 5', role: 'respected'            },
  { id: '000000000000000000', name: 'Name 6', role: 'recognized'           },
];

/* ════════════════════════════════════════════════════════════
   ★ EDITABLE — MUSIC
   Path to your audio file. Leave empty ('') to disable.
   ════════════════════════════════════════════════════════════ */
var MUSIC_SRC = 'https://raw.githubusercontent.com/dxontop/dxontop.github.io/main/2.%20%20SINALOA%20-%20BUDDAHBEADS%2C%20LEXUS%2C%20EJAC%20(YELLOWTAPES%20VOL.1).mp3'; /* ★ your .mp3 path */
var MUSIC_VOL = 0.4;

/* ════════════════════════════════════════════════════════════
   ★ EDITABLE — TERMINAL INFO
   ════════════════════════════════════════════════════════════ */
var TERM = {
  user:     'dx',
  host:     'personal',
  server:   'dx personal',
  role:     'founder',
  since:    '2025',
  location: 'earth',
  discord:  'dx',
  twitter:  '@dx',
  github:   'github.com/dx',
};

/* ============================================================
   — INTERNALS — do not edit below —
   ============================================================ */

var STATUS_COLOR = { online:'#3ba55d', idle:'#faa61a', dnd:'#ed4245', offline:'#747f8d' };
var STATUS_LABEL = { online:'online',  idle:'idle',    dnd:'do not disturb', offline:'offline' };

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

/* ── SPLASH + MUSIC ── */
window._bootTime = Date.now();

document.getElementById('splash').addEventListener('click', function() {
  var splash = this;
  splash.classList.add('clicked');

  if (MUSIC_SRC) {
    var audio = new Audio(MUSIC_SRC);
    audio.volume = MUSIC_VOL;
    audio.loop = true;
    audio.play().catch(function(){});
  }

  setTimeout(function() { splash.classList.add('hide'); }, 400);
});

/* ── SCROLL REVEAL ── */
var revealEls = document.querySelectorAll('.reveal');
var revealObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
revealEls.forEach(function(el) { revealObs.observe(el); });

/* ── PROFILE CARD ── */
function loadProfile() {
  lanyard(PROFILE_ID).then(function(data) {
    if (!data) return;

    var u  = data.discord_user;
    var st = data.discord_status || 'offline';
    var acts = data.activities || [];

    /* avatar */
    var avatarEl = document.querySelector('.halo-avatar');
    if (u.avatar) {
      avatarEl.innerHTML = '<img src="' + avatarUrl(u.id, u.avatar) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
    }

    /* username */
    var nameEl = document.querySelector('.halo-username');
    var badge  = nameEl.querySelector('.halo-badge');
    nameEl.childNodes[0].textContent = u.global_name || u.username;

    /* status pill */
    var dot  = document.querySelector('.status-dot');
    var pill = document.querySelector('.halo-status-pill');
    var col  = STATUS_COLOR[st] || STATUS_COLOR.offline;
    dot.style.background = col;
    dot.style.boxShadow  = '0 0 6px ' + col;
    /* update text node (second child after the dot div) */
    var textNode = pill.childNodes[pill.childNodes.length - 1];
    if (textNode) textNode.textContent = ' ' + (STATUS_LABEL[st] || 'offline');

    /* discord block */
    var activity = null;
    for (var i = 0; i < acts.length; i++) {
      if (acts[i].type === 0 || acts[i].type === 4) { activity = acts[i]; break; }
    }
    document.querySelector('.discord-name').textContent     = u.username;
    document.querySelector('.discord-activity').textContent = activity
      ? (activity.name || activity.state || 'No activity')
      : 'No activity';

    /* banner */
    var bannerEl = document.querySelector('.halo-banner');
    if (u.banner) {
      bannerEl.style.background = 'url(' + bannerUrl(u.id, u.banner) + ') center/cover no-repeat';
    } else if (u.accent_color) {
      var hex = '#' + u.accent_color.toString(16).padStart(6, '0');
      bannerEl.style.background = 'linear-gradient(135deg,' + hex + '33,' + hex + '11)';
    }
  });
}

/* ── HOF CARDS ── */
function loadHOF() {
  var cards = document.querySelectorAll('.hof-card');

  cards.forEach(function(card, i) {
    var member = HOF_MEMBERS[i];
    if (!member) return;

    card.querySelector('.hof-name').textContent = member.name;
    card.querySelector('.hof-role').textContent = member.role;

    if (!member.id || member.id === '000000000000000000') return;

    lanyard(member.id).then(function(data) {
      if (!data) return;
      var u  = data.discord_user;
      var st = data.discord_status || 'offline';

      /* real avatar as card background */
      if (u.avatar) {
        var fill = card.querySelector('.hof-phfill');
        if (fill) {
          var img = document.createElement('img');
          img.className = 'hof-bg';
          img.src = avatarUrl(u.id, u.avatar, 512);
          img.alt = u.username;
          fill.parentNode.replaceChild(img, fill);
        }
      }

      /* live status dot on card */
      var col   = STATUS_COLOR[st] || STATUS_COLOR.offline;
      var badge = document.createElement('div');
      badge.style.cssText = [
        'position:absolute', 'top:0.75rem', 'left:0.75rem',
        'width:9px', 'height:9px', 'border-radius:50%',
        'background:' + col, 'box-shadow:0 0 6px ' + col,
        'border:2px solid #000', 'z-index:4'
      ].join(';');
      card.appendChild(badge);

      /* update name to real display name */
      card.querySelector('.hof-name').textContent = u.global_name || u.username;
    });
  });
}

/* ════════════════════════════════════════════════════════════
   WORKING TERMINAL
   ════════════════════════════════════════════════════════════ */
var termOutput  = document.getElementById('term-output');
var termInput   = document.getElementById('term-input');
var termForm    = document.getElementById('term-form');
var termPromptEl = document.getElementById('term-prompt-text');

var cmdHistory = [];
var histIdx    = -1;

/* set prompt */
termPromptEl.textContent = TERM.user + '@' + TERM.host + ':~$';

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function pad(s, n) {
  s = String(s);
  while (s.length < n) s += ' ';
  return s;
}

/* command handlers — return HTML string or Promise<string> */
var COMMANDS = {

  help: function() {
    return [
      '<span class="t-yellow">available commands</span>',
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

  whoami: function() {
    return '<span class="t-bright">' + esc(TERM.user) + '</span>';
  },

  id: function() {
    return 'uid=1000(<span class="t-green">' + esc(TERM.user) + '</span>) gid=1000(<span class="t-green">' + esc(TERM.user) + '</span>) groups=1000(<span class="t-green">' + esc(TERM.user) + '</span>),27(sudo)';
  },

  'cat identity': function() {
    return [
      '<span class="t-gray">name' + '         </span><span class="t-white">' + esc(TERM.user) + '</span>',
      '<span class="t-gray">server       </span><span class="t-white">' + esc(TERM.server) + '</span>',
      '<span class="t-gray">role         </span><span class="t-red">' + esc(TERM.role) + '</span>',
      '<span class="t-gray">status       </span><span class="t-green">active</span>',
      '<span class="t-gray">since        </span><span class="t-white">' + esc(TERM.since) + '</span>',
      '<span class="t-gray">location     </span><span class="t-white">' + esc(TERM.location) + '</span>',
    ].join('\n');
  },

  ls: function() {
    return '<span class="t-blue">links/</span>   <span class="t-blue">hof/</span>   <span class="t-blue">servers/</span>   <span class="t-gray">identity</span>   <span class="t-gray">readme.md</span>';
  },

  'ls links': function() {
    return [
      '<span class="t-muted">drwxr-xr-x</span>  <span class="t-blue">discord</span>   <span class="t-gray">→  ' + esc(TERM.discord) + '</span>',
      '<span class="t-muted">drwxr-xr-x</span>  <span class="t-blue">twitter</span>   <span class="t-gray">→  ' + esc(TERM.twitter) + '</span>',
      '<span class="t-muted">drwxr-xr-x</span>  <span class="t-blue">github</span>    <span class="t-gray">→  ' + esc(TERM.github) + '</span>',
    ].join('\n');
  },

  'ls hof': function() {
    var rows = HOF_MEMBERS.map(function(m, i) {
      return '<span class="t-gray">' + String(i+1).padStart(2,'0') + '</span>  <span class="t-bright">' + pad(esc(m.name), 16) + '</span><span class="t-muted">' + esc(m.role) + '</span>';
    });
    return ['<span class="t-yellow">hall of fame</span>', '<span class="t-gray">────────────────────────────────</span>'].concat(rows).join('\n');
  },

  neofetch: function() {
    var up   = Math.floor((Date.now() - window._bootTime) / 1000);
    var mins = Math.floor(up / 60);
    var secs = up % 60;
    return [
      '<span class="t-red">        .__ ___  </span>   <span class="t-bright">' + esc(TERM.user) + '</span><span class="t-gray">@</span><span class="t-bright">' + esc(TERM.host) + '</span>',
      '<span class="t-red">        |  Y  \\  </span>   <span class="t-gray">──────────────────</span>',
      '<span class="t-red">   _____|  |  /  </span>   <span class="t-green">OS:    </span><span class="t-white">dx-personal 1.0</span>',
      '<span class="t-red">  |  _  \\    \\   </span>   <span class="t-green">Host:  </span><span class="t-white">' + esc(TERM.server) + '</span>',
      '<span class="t-red">  |_____/__|  \\  </span>   <span class="t-green">Shell: </span><span class="t-white">dx-sh 1.0</span>',
      '<span class="t-red">          Dx     </span>   <span class="t-green">Role:  </span><span class="t-white">' + esc(TERM.role) + '</span>',
      '                     <span class="t-green">Since: </span><span class="t-white">' + esc(TERM.since) + '</span>',
      '                     <span class="t-green">Up:    </span><span class="t-white">' + mins + 'm ' + secs + 's</span>',
    ].join('\n');
  },

  status: function() {
    return lanyard(PROFILE_ID).then(function(data) {
      if (!data) return '<span class="t-red">error:</span> <span class="t-white">could not reach Lanyard. have you joined discord.gg/lanyard?</span>';
      var u   = data.discord_user;
      var st  = data.discord_status || 'offline';
      var col = STATUS_COLOR[st] || STATUS_COLOR.offline;
      var acts = data.activities || [];
      var act  = null;
      for (var i = 0; i < acts.length; i++) {
        if (acts[i].type === 0 || acts[i].type === 4) { act = acts[i]; break; }
      }
      return [
        '<span class="t-gray">user      </span><span class="t-bright">' + esc(u.username) + '</span>',
        '<span class="t-gray">status    </span><span style="color:' + col + '">' + st + '</span>',
        '<span class="t-gray">activity  </span><span class="t-white">' + (act ? esc(act.name || act.state || 'none') : 'none') + '</span>',
      ].join('\n');
    });
  },

  uptime: function() {
    var up   = Math.floor((Date.now() - window._bootTime) / 1000);
    var h    = Math.floor(up / 3600);
    var m    = Math.floor((up % 3600) / 60);
    var s    = up % 60;
    return 'up <span class="t-white">' + h + 'h ' + m + 'm ' + s + 's</span>  load: <span class="t-green">0.00</span>';
  },

  date: function() {
    return '<span class="t-white">' + new Date().toString() + '</span>';
  },

  history: function() {
    if (!cmdHistory.length) return '<span class="t-muted">no commands yet</span>';
    return cmdHistory.map(function(c, i) {
      return '  <span class="t-gray">' + String(i+1).padStart(3,' ') + '</span>  <span class="t-white">' + esc(c) + '</span>';
    }).join('\n');
  },

  clear: function() { return '__CLEAR__'; },
};

function appendLine(cmdText, outputHtml) {
  /* command echo */
  var cmdDiv = document.createElement('div');
  cmdDiv.className = 'tl';
  cmdDiv.innerHTML = '<span class="t-prompt">' + esc(termPromptEl.textContent) + '</span> <span class="t-cmd">' + esc(cmdText) + '</span>';
  termOutput.appendChild(cmdDiv);

  /* output */
  if (outputHtml && outputHtml !== '__CLEAR__') {
    var outDiv = document.createElement('div');
    outDiv.className = 'tl term-out';
    outDiv.innerHTML = outputHtml;
    termOutput.appendChild(outDiv);
  }

  /* scroll */
  var body = termOutput.closest('.term-body');
  if (body) body.scrollTop = body.scrollHeight;
}

function runCommand(raw) {
  var cmd = raw.trim().toLowerCase().replace(/\s+/g, ' ');
  if (!cmd) return Promise.resolve();

  cmdHistory.push(raw.trim());
  histIdx = cmdHistory.length;

  if (cmd === 'clear') {
    appendLine(raw, '');
    termOutput.innerHTML = '';
    return Promise.resolve();
  }

  var handler = COMMANDS[cmd];
  if (!handler) {
    appendLine(raw, '<span class="t-red">bash:</span> <span class="t-white">' + esc(cmd) + '</span><span class="t-gray">: command not found — type </span><span class="t-green">help</span>');
    return Promise.resolve();
  }

  var result = handler();

  if (result && typeof result.then === 'function') {
    /* async: echo command immediately, await output */
    var cmdDiv = document.createElement('div');
    cmdDiv.className = 'tl';
    cmdDiv.innerHTML = '<span class="t-prompt">' + esc(termPromptEl.textContent) + '</span> <span class="t-cmd">' + esc(raw) + '</span>';
    termOutput.appendChild(cmdDiv);

    return result.then(function(html) {
      if (html) {
        var outDiv = document.createElement('div');
        outDiv.className = 'tl term-out';
        outDiv.innerHTML = html;
        termOutput.appendChild(outDiv);
      }
      var body = termOutput.closest('.term-body');
      if (body) body.scrollTop = body.scrollHeight;
    });
  }

  appendLine(raw, result);
  return Promise.resolve();
}

termForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var val = termInput.value;
  termInput.value = '';
  runCommand(val);
});

termInput.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (histIdx > 0) histIdx--;
    termInput.value = cmdHistory[histIdx] || '';
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (histIdx < cmdHistory.length - 1) { histIdx++; termInput.value = cmdHistory[histIdx] || ''; }
    else { histIdx = cmdHistory.length; termInput.value = ''; }
  }
  if (e.key === 'Tab') {
    e.preventDefault();
    var val = termInput.value.toLowerCase();
    var keys = Object.keys(COMMANDS);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].indexOf(val) === 0) { termInput.value = keys[i]; break; }
    }
  }
});

document.querySelector('.term-body').addEventListener('click', function() {
  termInput.focus();
});

/* boot message */
(function() {
  var bootDiv = document.createElement('div');
  bootDiv.className = 'tl';
  bootDiv.innerHTML = [
    '<span class="t-comment"># ──────────────────────────────────────</span>',
    '<span class="t-comment">#              ·  DX 1of1  ·  ' + esc(TERM.since) + '</span>',
    '<span class="t-comment"># ──────────────────────────────────────</span>',
    '<span class="t-muted">type </span><span class="t-green">help</span><span class="t-muted"> to see available commands</span>',
    '',
  ].join('\n');
  termOutput.appendChild(bootDiv);
})();

/* ── INIT ── */
loadProfile();
loadHOF();
setInterval(function() { loadProfile(); }, 30000);

/* ════════════════════════════════════════════════════════════
   SERVER TRAIN CAROUSEL — infinite seamless scroll
   ════════════════════════════════════════════════════════════ */
(function() {
  var train = document.getElementById('srvTrain');
  if (!train) return;

  /* clone the set of cards to fill the track twice → seamless loop */
  var clone = train.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  train.parentNode.appendChild(clone);

  /* pause on hover */
  var wrap = document.querySelector('.srv-train-wrap');
  wrap.addEventListener('mouseenter', function() {
    train.style.animationPlayState = 'paused';
    clone.style.animationPlayState = 'paused';
  });
  wrap.addEventListener('mouseleave', function() {
    train.style.animationPlayState = 'running';
    clone.style.animationPlayState = 'running';
  });
})();
