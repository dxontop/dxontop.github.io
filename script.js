document.getElementById('root').innerHTML = `
<div id="splash">
  <div class="stars" id="splashStars"></div>
  <pre id="asciiArt" class="ascii-art"></pre>
  <div class="splash-hint" id="splashHint">[ click to access ]</div>
</div>

<div id="sectionLoader" class="section-loader">
  <pre id="loaderAscii" class="loader-ascii"></pre>
</div>

<audio id="bgMusicEl" preload="none" loop></audio>
<audio id="profileMusicEl" preload="none" loop></audio>

<div id="app">
  <nav>
    <div class="logo display" id="navLogo" aria-label="Threat2Society"></div>
    <div class="navlinks">
      <a href="home" data-nav="home" class="active" id="navHome">home</a>
      <a href="mainthreats" data-nav="mainthreats">main threats</a>
      <a href="bigthreats" data-nav="bigthreats">big threats</a>
      <a href="about" data-nav="about">about</a>
      <a href="affiliations" data-nav="affiliations">gengo</a>
    </div>
    <a href="about" class="nav-cta" id="navCta">&bull; join</a>
  </nav>

  <main>
    <section class="page active" id="home">
      <div class="glow-bg"><div class="stars" id="heroStars"></div></div>
      <div class="hero">
        <h1 class="display" id="heroTitle"></h1>
        <div class="divider-label"><span id="heroTaglineText"></span></div>
      </div>
    </section>
    <section class="page" id="mainthreats">
      <div class="sec-head">
        <h2 class="display">HOF</h2>
        <div class="divider-label"><span id="hofSubtitleText"></span></div>
      </div>
      <div class="main-threats-row" id="mainThreatsGrid"></div>
    </section>
    <section class="page" id="bigthreats">
      <div class="threat-bg-stack" id="threatBgStack">
        <div class="threat-bg-layer" id="threatBgLayer-bigThreatsBlock"></div>
        <div class="threat-bg-layer" id="threatBgLayer-exclusiveThreatsBlock"></div>
        <div class="threat-bg-layer" id="threatBgLayer-membersBlock"></div>
      </div>
      <div class="threat-block" id="bigThreatsBlock">
        <div class="sec-head">
          <h2 class="display accent">THREATS</h2>
          <div class="divider-label"><span id="bigThreatsSubtitleText"></span></div>
        </div>
        <div class="big-threats-grid" id="bigThreatsGrid"></div>
      </div>
      <div class="threat-block" id="exclusiveThreatsBlock">
        <div class="sec-head">
          <h2 class="display accent">EXCLUSIVE THREATS</h2>
          <div class="divider-label"><span id="exclusiveThreatsSubtitleText"></span></div>
        </div>
        <div class="big-threats-grid" id="exclusiveThreatsGrid"></div>
      </div>
      <div class="threat-block" id="membersBlock">
        <div class="sec-head">
          <h2 class="display">MEMBERS</h2>
          <div class="divider-label"><span id="membersSubtitleText"></span></div>
        </div>
        <div class="big-threats-grid" id="membersGrid"></div>
      </div>
    </section>
    <section class="page" id="hallofshame">
      <div class="sec-head">
        <h2 class="display accent">HALL OF SHAME</h2>
        <div class="divider-label"><span>you weren't supposed to find this</span></div>
      </div>
      <div class="shame-grid" id="shameGrid"></div>
    </section>
    <section class="page" id="about">
      <div class="sec-head">
        <h2 class="display" id="aboutHeading"></h2>
      </div>
      <div class="about-body">
        <span class="tag-script script" id="aboutTagScript"></span>
        <div class="terminal" id="aboutTerminal">
          <div class="term-bar">
            <span class="term-dot r"></span><span class="term-dot y"></span><span class="term-dot g"></span>
            <span class="term-title">terminal — about_us.cli</span>
          </div>
          <div class="term-body" id="termBody">
            <pre id="aboutAscii" class="about-ascii"></pre>
          </div>
        </div>

        <div class="discord-invite" id="discordInvite">
          <div class="discord-invite-banner">
            <span class="discord-invite-banner-text" id="discordInviteBannerText"></span>
          </div>
          <div class="discord-invite-body">
            <div class="discord-invite-icon-wrap" id="discordInviteIconWrap">
              <span class="discord-invite-icon-fallback" id="discordInviteIconFallback"></span>
            </div>
            <div class="discord-invite-name" id="discordInviteName"></div>
            <div class="discord-invite-members" id="discordInviteMembers"></div>
            <a class="discord-invite-btn" id="discordInviteBtn" target="_blank" rel="noopener noreferrer">join server</a>
          </div>
        </div>
      </div>
    </section>
    <section class="page" id="affiliations">
      <div class="sec-head">
        <h2 class="display">Gengo</h2>
        <div class="divider-label"><span id="affSubtitleText"></span></div>
      </div>
      <div class="aff-grid" id="affGrid"></div>
    </section>

  </main>
</div>

<div id="profileModal" class="profile-modal">
  <canvas id="profileTrailCanvas" class="profile-modal-trail-canvas"></canvas>
  <button class="profile-modal-close" id="profileModalClose" aria-label="Close profile">&times;</button>
  <div class="profile-modal-content">
    <div class="profile-modal-avatar-wrap" id="profileModalAvatarWrap">
      <div class="profile-modal-avatar-fallback" id="profileModalAvatarFallback"></div>
      <span class="profile-modal-status-dot" id="profileModalStatusDot" data-status="offline"></span>
    </div>
    <h2 class="profile-modal-name display" id="profileModalName"></h2>
    <div class="profile-modal-music-card" id="profileModalMusicCard">
      <div class="profile-modal-nowplaying">
        <span class="now-playing-label">now playing</span>
        <div class="now-playing-wave">${buildWaveBarsHTML(28)}</div>
      </div>
      <div class="profile-modal-spotify" id="profileModalSpotify"></div>
    </div>
    <div class="profile-modal-role" id="profileModalRole"></div>
    <div class="profile-modal-status-text" id="profileModalStatusText"></div>
    <div class="profile-modal-views" id="profileModalViews">
      <span class="profile-modal-views-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </span>
      <span class="profile-modal-views-count" id="profileModalViewsCount">···</span>
      <span class="profile-modal-views-label">views</span>
    </div>
  </div>
</div>
`;

const CONFIG = {

  theme: {
    bg:            '#050505',
    bgAlt:         '#0b0707',
    surface:       '#120a0a',
    border:        'rgba(255,255,255,.08)',
    borderStrong:  'rgba(255,60,70,.35)',
    text:          '#f3efe9',
    textDim:       '#a08e8e',
    textFaint:     '#5c4d4d',
    accent:        '#b3182f',
    accent2:       '#7a0f22',
    accent3:       '#ff3b52',
  },

  fonts: {
    display:   "'Cinzel', serif",
    mono:      "'JetBrains Mono', monospace",
    script:    "'Cormorant Garamond', serif",
    signature: "'Alex Brush', cursive",
  },

  siteName: 'Threat2Society',

  copy: {
    heroTitle:          'Threat2Society',
    heroTagline:        'they hate us cuz they aint us',
    hofSubtitle:         "bet you can't be us",
    bigThreatsSubtitle:  'ingat sa mga to baka patayin ka nila',
    exclusiveThreatsSubtitle: 'hindi lahat kasali dito',
    membersSubtitle:     'ang dami na naming',
    aboutTagScript:      'all hail T2S',
    affSubtitle:         'nagsama sama mga tirador',
  },

  terminal: {
    command: 'whoami t2s',
    lines: [
      { text:'ayaw ko sa mga feeling gods', name:'dx' },
      { text:'ayaw ko sa mga tanga', name:'daz' },
      { text:'mahilig ako makipag esex', name:'faiyaz' },
      { text:'ayaw ko sa tangahin', name:'zowi' },
      { text:'allergic ako sa sinungaling', name:'sevi' },
      { text:'hi, sao nga pala', name:'sao' },
      { divider:true },
      { text:'"we don\'t repeat history. we rewrite it"', name:'t2s', quote:true },
    ],
  },
  
  discordInvite: {
    bannerText: 'threat2society',
    banner: 'images/banner.gif',
    logo: 'images/logo.gif',
    name: 'Threat2Society',
    tags: '',
    memberCount: null,
    url: 'https://discord.gg/nNW8WBtxGw',
  },

  asciiArt: `     s                                                         s                      .x+=:.                            .                    s                 
    :8      .uef^"                                            :8      .--~*teu.      z\`    ^%                          @88>                 :8      ..         
   .88    :d88E          .u    .                             .88     dF     988Nx       .   <k        u.               %8P                 .88     @L          
  :888ooo \`888E        .d88B :@8c       .u          u       :888ooo d888b   \`8888>    .@8Ned8"  ...ue888b        .      .         .u      :888ooo 9888i   .dL  
-*8888888  888E .z8k  ="8888f8888r   ud8888.     us888u.  -*8888888 ?8888>  98888F  .@^%8888"   888R Y888r  .udR88N   .@88u    ud8888.  -*8888888 \`Y888k:*888. 
  8888     888E~?888L   4888>'88"  :888'8888. .@88 "8888"   8888     "**"  x88888~ x88:  \`)8b.  888R I888> <888'888k ''888E\` :888'8888.   8888      888E  888I 
  8888     888E  888E   4888> '    d888 '88%" 9888  9888    8888          d8888*\`  8888N=*8888  888R I888> 9888 'Y"    888E  d888 '88%"   8888      888E  888I 
  8888     888E  888E   4888>      8888.+"    9888  9888    8888        z8**"\`   :  %8"    R88  888R I888> 9888        888E  8888.+"      8888      888E  888I 
 .8888Lu=  888E  888E  .d888L .+   8888L      9888  9888   .8888Lu=   :?.....  ..F   @8Wou 9%  u8888cJ888  9888        888E  8888L       .8888Lu=   888E  888I 
 ^%888*    888E  888E  ^"8888*"    '8888c. .+ 9888  9888   ^%888*    <""888888888~ .888888P\`    "*888*P"   ?8888u../   888&  '8888c. .+  ^%888*    x888N><888' 
   'Y"    m888N= 888>     "Y"       "88888%   "888*""888"    'Y"     8:  "888888*  \`   ^"F        'Y"       "8888P'    R888"  "88888%      'Y"      "88"  888  
           \`Y"   888                  "YP'     ^Y"   ^Y'             ""    "**"\`                              "P'       ""      "YP'                      88F  
                J88"                                                                                                                                     98"   
                @%                                                                                                                                     ./"     
              :"                                                                                                                                      ~\``,

  mainThreats: [
    { name:'daz', spotify:'https://open.spotify.com/track/0IjdXwCEhZR7JIwq6Za8j5?si=caDMjCG_QhOm0ZOOqj7wRQ&utm_source=copy-link', music:'pf/daz.mp3', background:'pf/daz.gif', discordId:'1521890728094208122' },
    { name:'caliber', spotify:'https://open.spotify.com/track/1hoEI997iy6tutEfF5a9M6?si=ef153006a2e64c3a', music:'pf/caliber.mp3', background: 'pf/caliber.gif', discordId:'1512675755459612835' },
    { name:'faiyaz', spotify:'', music:'', background:'', discordId:'1402292483584426134' },
  ],

  bigThreats: [
    { name:'zowi', spotify:'https://open.spotify.com/track/78TC2xIVRqJNzzBS6abuNP?si=c4ed0a0b479b48cd', music:'pf/zowi.mp3', background:'pf/zowi.gif', discordId:'1081132499767410688' },
    { name:'sevi', spotify:'', music:'', background:'',  discordId:'769457309562568706' },
    { name:'sao', spotify:'https://open.spotify.com/track/3XE4ONqvAqbyADR17aoGO4?si=fsVhQGnDSuOta2BmNNc1Yw&utm_source=copy-link', music:'pf/sao.mp3', background:'', discordId:'747746641590616064' },
    { name:'aeri', spotify:'', music:'', background:'', discordId:'992033485973880842' },
    { name:'jon', spotify:'https://open.spotify.com/track/1QrbZhFYlViXd60g130vw1?si=LMQOdp47TJaVevTbsV2udA&utm_source=copy-link', music:'pf/jon.mp3', background:'pf/jon.gif', discordId:'1010028872282157106' },
    { name:'gun', spotify:'https://open.spotify.com/track/5mtTAScDytxMMqZj14NmlN?si=BsAhMwSeSQq0yidxidyEFQ&utm_source=copy-link', music:'pf/gun.mp3', background:'pf/gun.gif', discordId:'1495036966360842260' },
    { name:'yuzuki', spotify:'https://open.spotify.com/track/3hEfpBHxgieRLz4t3kLNEg?si=05f13e1472ed4956', music:'pf/yuzuki.mp3', background:'pf/yuzuki.gif', discordId:'1518082674017701888' },
    { name:'cholo', spotify:'', music:'', background:'', discordId:'1503083605444788235' },
    { name:'kio', spotify:'', music:'', background:'',  discordId:'751387160057217066' },
    { name:'rue', spotify:'https://open.spotify.com/track/3tTpvK7QgjjQCKGnHt5xn3?si=at7oRgLVRI6YU--3oe0qtA&utm_source=copy-link', music:'pf/rue.mp3', background:'pf/rue.gif', discordId:'1502126548096909353' },
  ],

  exclusiveThreats: [
    { name:'exil',  discordId:'1533371972241723589' },
    { name:'blake', spotify:'', music:'pf/blake.mp3', background:'pf/blake.gif',  discordId:'1244678008175071263' },
    { name:'hesu',   discordId:'795725566476812348' },
    { name:'jor', spotify:'https://open.spotify.com/track/6MKfYl08wrrIrH3a0MyGt6?si=2cGU_NDFQouXyTjsIuVxzQ&utm_source=copy-link&context=spotify%3Atrack%3A6MKfYl08wrrIrH3a0MyGt6', music:'pf/jor.mp3', background:'pf/jor.gif', discordId:'1403234492419670038' },
    { name:'ryuzaki',   discordId:'1266998522151047192' },
  ],

  members: [
    { name:'louve',    discordId:'902804741883588619' },
    { name:'hunter',    discordId:'1511980297149747246' },
    { name:'ryokai',   discordId:'900336233031540787' },
    { name:'ttttt',   discordId:'1248910763494473728' },
    { name:'tttttt',   discordId:'1280059534169210896' },
    { name:'forth',    discordId:'1505315891087282176' },
    { name:'mimi',   discordId:'1444205221814210700' },
    { name:'ttttttttt',    discordId:'1446067102900551741' },
    { name:'zy',     discordId:'1505594070565654778' },
    { name:'ttttttttttt',    discordId:'748713264652746813' },
  ],

  hallOfShame: [
    { name:'', discordName:'', video:'', poster:'' },
    { name:'', discordName:'', video:'', poster:'' },
    { name:'', discordName:'', video:'', poster:'' },
    { name:'', discordName:'', video:'', poster:'' },
    { name:'', discordName:'', video:'', poster:'' },
  ],

  affiliations: [
    {
      name: 'CTRL',
      tag: '',
      image: 'images/ctrl.jpg',
      description: 'we hate larpers.',
      invite: 'https://discord.gg/ZjWacnA6YK',
    },
    {
      name: 'Nemesis',
      tag: '',
      image: 'images/nemesis.png',
      description: 'nemesis till i die.',
      invite: 'https://discord.gg/n3jacUmwrR',
    },
    {
      name:'EBK',
      tag: '',
      image: 'images/ebk.gif',
      description: 'everybody killa',
      invite: 'https://discord.gg/wHNEUrruSm',
    },
    {
      name: 'heavensxnt',
      tag: '',
      image: 'images/heavensent.gif',
      description: 'sa ngalan ng, heavensxnt Amen',
      invite: 'https://discord.gg/GuVSYxGyZq',
    },
  ],

  logo: ':p',

  music: {
    url: 'music/t2sontop_V1.mp3',
    volume: 0.80,
  },

  hallOfShameMusic: {
    url: '',
    volume: 0.80,
  },
  profileDefaults: {
    background: '',
    music: '',
    spotify: '',
  },

  loadingAscii: `     s                      .x+=:.   
    :8      .--~*teu.      z\`    ^%  
   .88     dF     988Nx       .   <k 
  :888ooo d888b   \`8888>    .@8Ned8" 
-*8888888 ?8888>  98888F  .@^%8888"  
  8888     "**"  x88888~ x88:  \`)8b. 
  8888          d8888*\`  8888N=*8888 
  8888        z8**"\`   :  %8"    R88 
 .8888Lu=   :?.....  ..F   @8Wou 9%  
 ^%888*    <""888888888~ .888888P\`   
   'Y"     8:  "888888*  \`   ^"F     
           ""    "**"\``,

  sectionBackgrounds: {
    home:         '',
    mainthreats:  'images/main threats.jpg',
    bigThreatsBlock:       'images/big threats.jpg',
    exclusiveThreatsBlock: 'images/big threats.jpg',
    membersBlock:          'images/big threats.jpg',
    about:        'images/about.jpg',
    affiliations: 'images/associate.jpg',
    hallofshame:  '',
  },
};

function applyTheme(){
  const r = document.documentElement.style;
  const t = CONFIG.theme;
  r.setProperty('--bg', t.bg);
  r.setProperty('--bg-alt', t.bgAlt);
  r.setProperty('--surface', t.surface);
  r.setProperty('--border', t.border);
  r.setProperty('--border-strong', t.borderStrong);
  r.setProperty('--text', t.text);
  r.setProperty('--text-dim', t.textDim);
  r.setProperty('--text-faint', t.textFaint);
  r.setProperty('--accent', t.accent);
  r.setProperty('--accent-2', t.accent2);
  r.setProperty('--accent-3', t.accent3);
  r.setProperty('--glow-accent', `0 0 26px ${hexToRgba(t.accent, .45)}`);
  r.setProperty('--font-display', CONFIG.fonts.display);
  r.setProperty('--font-mono', CONFIG.fonts.mono);
  r.setProperty('--font-script', CONFIG.fonts.script);
  r.setProperty('--font-signature', CONFIG.fonts.signature);
}
function hexToRgba(hex, a){
  const n = hex.replace('#','');
  const bigint = parseInt(n.length === 3 ? n.split('').map(c=>c+c).join('') : n, 16);
  const r = (bigint >> 16) & 255, g = (bigint >> 8) & 255, b = bigint & 255;
  return `rgba(${r},${g},${b},${a})`;
}

function applyCopy(){
  document.getElementById('heroTitle').textContent = CONFIG.copy.heroTitle;
  document.getElementById('heroTaglineText').textContent = CONFIG.copy.heroTagline;
  document.getElementById('hofSubtitleText').textContent = CONFIG.copy.hofSubtitle;
  document.getElementById('bigThreatsSubtitleText').textContent = CONFIG.copy.bigThreatsSubtitle;
  document.getElementById('exclusiveThreatsSubtitleText').textContent = CONFIG.copy.exclusiveThreatsSubtitle;
  document.getElementById('membersSubtitleText').textContent = CONFIG.copy.membersSubtitle;
  document.getElementById('aboutHeading').textContent = 'about ' + CONFIG.siteName;
  document.getElementById('aboutTagScript').textContent = CONFIG.copy.aboutTagScript;
  document.getElementById('affSubtitleText').textContent = CONFIG.copy.affSubtitle;
}

function applyLogo(){
  const el = document.getElementById('navLogo');
  const val = (CONFIG.logo || '').trim();
  const looksLikeImage = /^(https?:)?\/\//.test(val) || val.startsWith('data:') || /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(val);
  if(looksLikeImage){
    el.innerHTML = `<img src="${val}" alt="${CONFIG.siteName}" class="logo-img">`;
  }else{
    el.textContent = val;
  }
}

function buildWaveBarsHTML(count){
  let html = '';
  for(let i = 0; i < count; i++){
    const delay = (Math.random() * 1.1).toFixed(2);
    const dur = (0.6 + Math.random() * 0.7).toFixed(2);
    html += `<span style="animation-delay:${delay}s; animation-duration:${dur}s;"></span>`;
  }
  return html;
}

function resolveBackgroundValue(val){
  const v = (val || '').trim();
  if(!v) return null;
  if(/^(url\(|linear-gradient|radial-gradient|conic-gradient)/i.test(v)) return { type:'image', css:v };
  if(/\.(png|jpe?g|gif|webp|avif|svg)$/i.test(v) || /^(https?:)?\//.test(v) || v.startsWith('data:')) return { type:'image', css:`url('${v}')` };
  return { type:'color', css:v };
}
function applyBackground(el, val){
  const resolved = resolveBackgroundValue(val);
  if(!resolved) return;
  if(resolved.type === 'image') el.style.backgroundImage = resolved.css;
  else el.style.backgroundColor = resolved.css;
}
const BIG_THREATS_BG_LAYER_MAP = {
  bigThreatsBlock:       'threatBgLayer-bigThreatsBlock',
  exclusiveThreatsBlock: 'threatBgLayer-exclusiveThreatsBlock',
  membersBlock:          'threatBgLayer-membersBlock',
};
function applySectionBackgrounds(){
  Object.entries(CONFIG.sectionBackgrounds || {}).forEach(([id, bg])=>{
    const targetId = BIG_THREATS_BG_LAYER_MAP[id] || id;
    const el = document.getElementById(targetId);
    if(!el) return;
    applyBackground(el, bg);
  });
}

const BIG_THREATS_BLOCKS = Object.keys(BIG_THREATS_BG_LAYER_MAP);
let threatCrossfadeQueued = false;
function updateThreatCrossfade(){
  const container = document.getElementById('bigthreats');
  if(!container) return;
  const viewportH = container.clientHeight || window.innerHeight;
  const scrollTop = container.scrollTop;
  BIG_THREATS_BLOCKS.forEach(blockId=>{
    const blockEl = document.getElementById(blockId);
    const layerEl = document.getElementById(BIG_THREATS_BG_LAYER_MAP[blockId]);
    if(!blockEl || !layerEl) return;
    const top = blockEl.offsetTop;
    const bottom = top + blockEl.offsetHeight;
    const overlapTop = Math.max(top, scrollTop);
    const overlapBottom = Math.min(bottom, scrollTop + viewportH);
    const overlap = Math.max(0, overlapBottom - overlapTop);
    const span = Math.max(1, Math.min(viewportH, blockEl.offsetHeight));
    const ratio = Math.max(0, Math.min(1, overlap / span));
    layerEl.style.opacity = ratio;
  });
  threatCrossfadeQueued = false;
}
function queueThreatCrossfade(){
  if(threatCrossfadeQueued) return;
  threatCrossfadeQueued = true;
  requestAnimationFrame(updateThreatCrossfade);
}
function initThreatCrossfade(){
  const container = document.getElementById('bigthreats');
  if(!container) return;
  container.addEventListener('scroll', queueThreatCrossfade, { passive:true });
  window.addEventListener('resize', queueThreatCrossfade);
  queueThreatCrossfade();
}

function buildStarfield(container, count){
  for(let i=0;i<count;i++){
    const s = document.createElement('span');
    s.className = 'star';
    s.style.top = Math.random()*100+'%';
    s.style.left = Math.random()*100+'%';
    const size = (Math.random()*2+1).toFixed(1);
    s.style.width = size+'px';
    s.style.height = size+'px';
    s.style.animationDelay = (Math.random()*4).toFixed(2)+'s';
    s.style.setProperty('--tw-dur', (3+Math.random()*3).toFixed(2)+'s');
    s.style.setProperty('--dr-dur', (6+Math.random()*8).toFixed(2)+'s');
    s.style.setProperty('--dx', (Math.random()*30-15).toFixed(1)+'px');
    s.style.setProperty('--dy', (Math.random()*30-15).toFixed(1)+'px');
    container.appendChild(s);
  }
}

function buildMainCard(member){
  const card = document.createElement('div');
  card.className = 'main-card';
  const initial = escapeHtml(member.name[0].toUpperCase());
  const displayName = escapeHtml(member.name);
  card.innerHTML = `
    <div class="main-card-inner">

      <div class="main-collapsed">
        <div class="main-avatar-wrap">
          <div class="main-avatar-fallback">${initial}</div>
          <span class="main-status-dot" data-status="offline"></span>
        </div>
        <div class="main-id-row">
          <span class="main-id-name">${displayName}</span>
        </div>
      </div>

      <div class="main-expanded">
        <div class="main-expanded-avatar">
          <div class="main-avatar-fallback">${initial}</div>
          <span class="main-status-dot-lg" data-status="offline"></span>
        </div>
        <div class="main-expanded-info">
          <div class="main-expanded-name">${displayName}</div>
          <div class="main-status-line">
            <span class="main-mini-dot" data-status="offline"></span>
            <span class="main-status-text">Offline</span>
          </div>
        </div>
      </div>

    </div>
  `;
  const fallbacks = Array.from(card.querySelectorAll('.main-avatar-fallback'));
  const avatarWraps = [card.querySelector('.main-avatar-wrap'), card.querySelector('.main-expanded-avatar')];
  const dots = [card.querySelector('.main-status-dot'), card.querySelector('.main-status-dot-lg')];
  const tooltipDot = card.querySelector('.main-mini-dot');
  const tooltipStatusText = card.querySelector('.main-status-text');
  const nameEls = [card.querySelector('.main-id-name'), card.querySelector('.main-expanded-name')];
  fetchLanyard(member, {
    dot: dots, avatarWrap: avatarWraps, fallback: fallbacks, nameEl: nameEls,
    kind:'main', size:84, tooltipDot, tooltipStatusText
  });
  card.addEventListener('click', () => openProfile(member));
  return card;
}
function buildBigAvatar(member){
  const item = document.createElement('div');
  item.className = 'mini-badge';
  item.innerHTML = `
    <div class="mini-avatar-wrap">
      <div class="mini-tooltip">
        <div class="mini-tooltip-name">${escapeHtml(member.name)}</div>
        <div class="mini-tooltip-status">
          <span class="mini-tooltip-dot" data-status="offline"></span>
          <span class="mini-tooltip-status-text">offline</span>
        </div>
      </div>
      <div class="mini-avatar-fallback">${member.name[0].toUpperCase()}</div>
      <span class="mini-status-dot" data-status="offline"></span>
    </div>
    <div class="mini-name">loading</div>
  `;
  const dot = item.querySelector('.mini-status-dot');
  const avatarWrap = item.querySelector('.mini-avatar-wrap');
  const fallback = item.querySelector('.mini-avatar-fallback');
  const nameEl = item.querySelector('.mini-name');
  const tooltipName = item.querySelector('.mini-tooltip-name');
  const tooltipDot = item.querySelector('.mini-tooltip-dot');
  const tooltipStatusText = item.querySelector('.mini-tooltip-status-text');
  fetchLanyard(member, { dot, avatarWrap, fallback, nameEl, kind:'mini', size:76, tooltipName, tooltipDot, tooltipStatusText });
  item.addEventListener('click', () => openProfile(member));
  return item;
}
function renderRosters(){
  const validOnly = arr => (arr || []).filter(m => m && m.name && m.name.trim());
  const mainWrap = document.getElementById('mainThreatsGrid');
  validOnly(CONFIG.mainThreats).forEach(m => mainWrap.appendChild(buildMainCard(m)));
  const bigWrap = document.getElementById('bigThreatsGrid');
  validOnly(CONFIG.bigThreats).forEach(m => bigWrap.appendChild(buildBigAvatar(m)));
  const exclusiveWrap = document.getElementById('exclusiveThreatsGrid');
  if(exclusiveWrap) validOnly(CONFIG.exclusiveThreats).forEach(m => exclusiveWrap.appendChild(buildBigAvatar(m)));
  const membersWrap = document.getElementById('membersGrid');
  if(membersWrap) validOnly(CONFIG.members).forEach(m => membersWrap.appendChild(buildBigAvatar(m)));
}

function buildAffCard(aff){
  const isLink = !!aff.invite;
  const card = document.createElement(isLink ? 'a' : 'div');
  card.className = 'aff-card';
  if(isLink){ card.href = aff.invite; card.target = '_blank'; card.rel = 'noopener noreferrer'; }
  const bannerContent = aff.image
    ? `<img src="${aff.image}" alt="${escapeHtml(aff.name)}" class="aff-banner-img">`
    : `<div class="aff-banner-fallback">${escapeHtml(aff.tag || aff.name.slice(0,6).toUpperCase())}</div>`;
  card.innerHTML = `
    <div class="aff-banner">${bannerContent}</div>
    <div class="aff-info">
      <h3>${escapeHtml(aff.name)}</h3>
      <p>${aff.description || ''}</p>
    </div>
  `;
  return card;
}
function renderAffiliations(){
  const wrap = document.getElementById('affGrid');
  if(!wrap) return;
  (CONFIG.affiliations || []).filter(a => a && a.name && a.name.trim()).slice(0, 4).forEach(a => wrap.appendChild(buildAffCard(a)));
}

function buildShameCard(entry){
  const card = document.createElement('div');
  card.className = 'shame-card';
  const name = escapeHtml(entry.name || 'unknown');
  const discordName = escapeHtml(entry.discordName || '');
  card.innerHTML = `
    <div class="shame-video-wrap">
      ${entry.video
        ? `<video class="shame-video" controls preload="none"${entry.poster ? ` poster="${entry.poster}"` : ''}><source src="${entry.video}"></video>`
        : `<div class="shame-video-empty">no clip yet</div>`}
    </div>
    <div class="shame-info">
      <div class="shame-name">${name}</div>
      ${discordName ? `<div class="shame-discord">@${discordName}</div>` : ''}
    </div>
  `;
  return card;
}
function renderHallOfShame(){
  const wrap = document.getElementById('shameGrid');
  if(!wrap) return;
  (CONFIG.hallOfShame || []).forEach(entry => wrap.appendChild(buildShameCard(entry)));
}

function renderDiscordInvite(){
  const cfg = CONFIG.discordInvite;
  if(!cfg) return;
  const wrap = document.getElementById('discordInvite');
  if(!wrap) return;

  document.getElementById('discordInviteBannerText').textContent = cfg.bannerText || cfg.name || '';
  document.getElementById('discordInviteName').textContent =
    [cfg.name, cfg.tags].filter(Boolean).join('  ');

  const bannerEl = document.querySelector('.discord-invite-banner');
  if(cfg.banner && bannerEl){
    bannerEl.style.backgroundImage = `url('${cfg.banner}')`;
    bannerEl.classList.add('has-image');
  }

  const membersEl = document.getElementById('discordInviteMembers');
  if(cfg.memberCount != null){
    membersEl.textContent = `${cfg.memberCount} member${cfg.memberCount === 1 ? '' : 's'}`;
    membersEl.style.display = '';
  }else{
    membersEl.style.display = 'none';
  }

  const iconWrap = document.getElementById('discordInviteIconWrap');
  const fallback = document.getElementById('discordInviteIconFallback');
  if(cfg.logo){
    const img = document.createElement('img');
    img.className = 'discord-invite-icon';
    img.src = cfg.logo;
    img.alt = cfg.name || '';
    img.onload = () => fallback.replaceWith(img);
  }else{
    fallback.textContent = (cfg.name || '?').trim()[0]?.toUpperCase() || '?';
  }

  const btn = document.getElementById('discordInviteBtn');
  if(cfg.url){
    btn.href = cfg.url;
  }else{
    btn.href = '#';
    btn.addEventListener('click', e => e.preventDefault());
  }
}

const LANYARD_BASE = 'https://api.lanyard.rest/v1/users/';
const statusLabels = { online:'Online', idle:'Idle', dnd:'Do Not Disturb', offline:'Offline' };

function discordDefaultAvatarUrl(du){
  let index = 0;
  try{
    if(du.discriminator && du.discriminator !== '0'){
      index = parseInt(du.discriminator, 10) % 5;
    }else{
      index = Number((BigInt(du.id) >> 22n) % 6n);
    }
  }catch(err){ index = 0; }
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}
const activityTypeLabel = ['playing ', 'streaming ', 'listening to ', 'watching ', '', 'competing in '];

async function fetchLanyard(member, { dot, avatarWrap, fallback, nameEl, kind, size, tooltipName, tooltipDot, tooltipStatusText }){
  const avatarWraps = (Array.isArray(avatarWrap) ? avatarWrap : [avatarWrap]).filter(Boolean);
  const fallbacks = (Array.isArray(fallback) ? fallback : [fallback]).filter(Boolean);
  const nameEls = (Array.isArray(nameEl) ? nameEl : [nameEl]).filter(Boolean);
  const dots = (Array.isArray(dot) ? dot : [dot]).filter(Boolean);
  let resolvedName = member.name;
  try{
    const res = await fetch(LANYARD_BASE + member.discordId);
    if(!res.ok) throw new Error('not linked');
    const json = await res.json();
    if(!json.success) throw new Error('not linked');

    const data = json.data;
    const status = data.discord_status || data.status || 'offline';
    dots.forEach(d => d.dataset.status = status);
    const activityDesc = describeActivity(data, status);
    if(tooltipDot) tooltipDot.dataset.status = status;
    if(tooltipStatusText) tooltipStatusText.textContent = activityDesc;

    const du = data.discord_user;
    if(du){
      resolvedName = du.global_name || du.username || member.name;
      if(tooltipName) tooltipName.textContent = resolvedName;
      const src = du.avatar
        ? `https://cdn.discordapp.com/avatars/${du.id}/${du.avatar}.${du.avatar.startsWith('a_') ? 'gif' : 'png'}?size=128`
        : discordDefaultAvatarUrl(du);
      fallbacks.forEach(fb => {
        if(!fb.isConnected) return;
        const img = document.createElement('img');
        img.className = kind === 'main' ? 'main-avatar-img' : kind === 'profile' ? 'profile-modal-avatar-img' : 'mini-avatar-img';
        img.src = src;
        img.alt = du.username || '';
        img.onload = () => {
          fb.style.display = 'none';
          fb.insertAdjacentElement('afterend', img);
        };
      });
      if(du.avatar_decoration_data && du.avatar_decoration_data.asset){
        avatarWraps.forEach(wrap => {
          const deco = document.createElement('img');
          deco.className = 'decoration';
          deco.src = `https://cdn.discordapp.com/avatar-decoration-presets/${du.avatar_decoration_data.asset}.png?size=160`;
          deco.alt = '';
          wrap.appendChild(deco);
          // Size/center the decoration ring off the wrap's own *actual* rendered
          // size rather than the passed-in `size` guess, so it always sticks
          // correctly to the avatar even if a wrap's CSS size changes or (as
          // with the main card's hover-expanded avatar) differs from the
          // other wraps sharing this same fetchLanyard call.
          const stickToAvatar = () => {
            const base = wrap.offsetWidth || wrap.getBoundingClientRect().width || size;
            const dsize = Math.round(base * 1.3);
            deco.style.width = dsize + 'px';
            deco.style.height = dsize + 'px';
            deco.style.left = Math.round((base - dsize) / 2) + 'px';
            deco.style.top = Math.round((base - dsize) / 2) + 'px';
          };
          if(deco.complete) stickToAvatar(); else deco.addEventListener('load', stickToAvatar, { once:true });
        });
      }
    }
  }catch(err){
    dots.forEach(d => d.dataset.status = 'offline');
    if(tooltipDot) tooltipDot.dataset.status = 'offline';
    if(tooltipStatusText) tooltipStatusText.textContent = 'Offline';
  }
  nameEls.forEach(el => {
    el.textContent = kind === 'mini' ? resolvedName.toLowerCase() : resolvedName;
  });
}
function describeActivity(data, status){
  const custom = (data.activities||[]).find(a => a.type === 4);
  if(custom && custom.state) return custom.state;
  if(data.listening_to_spotify && data.spotify){
    return `listening to ${data.spotify.song || data.spotify.track_name} — ${data.spotify.artist || data.spotify.artist_name}`;
  }
  const act = (data.activities||[]).find(a => a.type !== 4);
  if(act) return (activityTypeLabel[act.type]||'') + act.name;
  return statusLabels[status] || status;
}

const splash = document.getElementById('splash');
const app = document.getElementById('app');
const asciiEl = document.getElementById('asciiArt');
const hintEl = document.getElementById('splashHint');
let splashTyping = false;
let splashRevealed = false;

function fitAsciiEl(el, text, { maxFont=16, maxWidthRatio=0.92, maxWidthPx=1300 } = {}){
  const lines = text.split('\n');
  const longest = Math.max(...lines.map(l => l.length));
  const available = Math.min(window.innerWidth * maxWidthRatio, maxWidthPx);
  let fontSize = available / (longest * 0.6);
  fontSize = Math.max(3, Math.min(fontSize, maxFont));
  el.style.fontSize = fontSize + 'px';
}
function fitAsciiArt(){ fitAsciiEl(asciiEl, CONFIG.asciiArt, { maxFont:13, maxWidthRatio:.92, maxWidthPx:1300 }); }

function escapeHtml(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function revealAscii(el, text, onComplete, { mode='sequential', step=5, interval=6, holdAfter=700 } = {}){
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){
    el.textContent = text;
    setTimeout(onComplete, Math.min(holdAfter, 300));
    return;
  }
  if(mode === 'build'){
    const chars = text.split('');
    const order = [];
    chars.forEach((c,i)=>{ if(c !== '\n') order.push(i); });
    for(let i=order.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    const revealed = new Array(chars.length).fill(false);
    chars.forEach((c,i)=>{ if(c === '\n') revealed[i] = true; });
    let p = 0;
    function tick(){
      for(let k=0; k<step && p<order.length; k++, p++){ revealed[order[p]] = true; }
      el.textContent = chars.map((c,i)=> revealed[i] ? c : (c === '\n' ? '\n' : ' ')).join('');
      if(p < order.length){ setTimeout(tick, interval); }
      else{ el.textContent = text; setTimeout(onComplete, holdAfter); }
    }
    tick();
  }else{
    let i = 0;
    function tick(){
      i = Math.min(text.length, i + step);
      el.innerHTML = escapeHtml(text.slice(0, i)) + '<span class="cursor-blink">&nbsp;</span>';
      if(i < text.length){ setTimeout(tick, interval); }
      else{ el.innerHTML = escapeHtml(text); setTimeout(onComplete, holdAfter); }
    }
    tick();
  }
}

function enterSite(){
  splash.classList.add('hidden');
  app.classList.add('ready');
  setTimeout(()=> splash.remove(), 1000);
}

function slugify(str){
  return (str || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'member';
}
function findMemberBySlug(slug){
  const pools = [CONFIG.mainThreats, CONFIG.bigThreats, CONFIG.exclusiveThreats, CONFIG.members];
  for(const pool of pools){
    if(!pool) continue;
    const found = pool.find(m => m && m.name && (m.slug || slugify(m.name)) === slug);
    if(found) return found;
  }
  return null;
}
const pathSlug = location.pathname.replace(/^\/+|\/+$/g, '');
const deepLinkedProfile = pathSlug ? findMemberBySlug(pathSlug) : null;

splash.addEventListener('click', ()=>{
  if(splashTyping || splashRevealed) return;
  splashTyping = true;
  hintEl.classList.add('hidden');

  if(deepLinkedProfile){
    splashRevealed = true;
    // don't start the default site music — openProfile() below will play this
    // member's custom music/Spotify track instead
    enterSite();
    openProfile(deepLinkedProfile);
    return;
  }

  revealAscii(asciiEl, CONFIG.asciiArt, ()=>{
    splashRevealed = true;
    startAmbientAudio();
    enterSite();
  }, { mode:'build', step:13, interval:9, holdAfter:450 });
});

window.addEventListener('resize', ()=>{
  fitAsciiArt();
  fitAsciiEl(document.getElementById('loaderAscii'), CONFIG.loadingAscii, { maxFont:20, maxWidthRatio:.7, maxWidthPx:480 });
});

const sectionLoader = document.getElementById('sectionLoader');
const loaderAsciiEl = document.getElementById('loaderAscii');
function showLoader(){
  fitAsciiEl(loaderAsciiEl, CONFIG.loadingAscii, { maxFont:20, maxWidthRatio:.7, maxWidthPx:480 });
  sectionLoader.classList.add('visible');
  return new Promise(resolve=>{
    revealAscii(loaderAsciiEl, CONFIG.loadingAscii, resolve, { mode:'sequential', step:4, interval:7, holdAfter:220 });
  });
}
function hideLoader(){
  sectionLoader.classList.remove('visible');
}

const navLinks = document.querySelectorAll('.navlinks a');
const pages = document.querySelectorAll('.page');
let usingHofsMusic = false;
function applyPageMusic(id){
  const bg = document.getElementById('bgMusicEl');
  const hofs = CONFIG.hallOfShameMusic;
  if(id === 'hallofshame' && hofs && hofs.url){
    if(usingHofsMusic) return;
    usingHofsMusic = true;
    bg.src = hofs.url;
    bg.volume = hofs.volume ?? (CONFIG.music?.volume ?? 0.35);
    bg.currentTime = 0;
    bg.play().catch(()=>{});
  }else if(usingHofsMusic){
    usingHofsMusic = false;
    if(CONFIG.music && CONFIG.music.url){
      bg.src = CONFIG.music.url;
      bg.volume = CONFIG.music.volume ?? 0.35;
      bg.currentTime = 0;
      bg.play().catch(()=>{});
    }else{
      bg.pause();
    }
  }
}
function go(id){
  pages.forEach(p => p.classList.toggle('active', p.id === id));
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.nav === id));
  if(id === 'about') typeAbout();
  if(id === 'bigthreats') queueThreatCrossfade();
  applyPageMusic(id);
}
async function navigateTo(id){
  const current = document.querySelector('.page.active');
  if(current && current.id === id) return;
  await showLoader();
  go(id);
  hideLoader();
}
navLinks.forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    navigateTo(a.dataset.nav);
  });
});
let secretBuffer = '';
document.addEventListener('keydown', e => {
  const about = document.getElementById('about');
  if(!about.classList.contains('active')){ secretBuffer = ''; return; }
  const active = document.activeElement;
  if(active && ['INPUT','TEXTAREA'].includes(active.tagName)) return;

  if(e.key === 'Enter'){
    const attempt = secretBuffer.toLowerCase();
    const typedEl = document.getElementById('termTypedText');
    if(attempt === 'eww'){
      navigateTo('hallofshame');
    }else if(attempt){
      const body = document.getElementById('termBody');
      const inputLine = document.getElementById('termInputLine');
      const resp = document.createElement('div');
      resp.className = 'ln show';
      resp.innerHTML = '<span class="chevron">&gt;</span>&nbsp;<span class="divider">engkk engot</span>';
      if(inputLine) body.insertBefore(resp, inputLine);
      else body.appendChild(resp);
    }
    secretBuffer = '';
    if(typedEl) typedEl.textContent = '';
    return;
  }
  if(e.key === 'Backspace'){
    secretBuffer = secretBuffer.slice(0, -1);
  }else if(e.key.length === 1 && /[a-z0-9]/i.test(e.key)){
    secretBuffer = (secretBuffer + e.key).slice(-20);
  }else{
    return;
  }
  const typedEl = document.getElementById('termTypedText');
  if(typedEl) typedEl.textContent = secretBuffer;
});
document.getElementById('navCta').addEventListener('click', async e=>{
  e.preventDefault();
  await navigateTo('about');
  document.getElementById('discordInvite')?.scrollIntoView({ behavior:'smooth', block:'center' });
});

let aboutAnimated = false;
function typeAbout(){
  if(aboutAnimated) return;
  aboutAnimated = true;
  const el = document.getElementById('aboutAscii');
  fitAsciiEl(el, CONFIG.loadingAscii, { maxFont:15, maxWidthRatio:.82, maxWidthPx:640 });
  revealAscii(el, CONFIG.loadingAscii, typeTerminalLines, { mode:'sequential', step:4, interval:9, holdAfter:350 });
}
function typeSegment(container, prefixHTML, text, cls, onDone, holdAfter=320, extraClass=''){
  const div = document.createElement('div');
  div.className = extraClass ? `ln show ${extraClass}` : 'ln show';
  container.appendChild(div);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!text){
    div.innerHTML = prefixHTML;
    setTimeout(onDone, reduced ? 60 : holdAfter);
    return;
  }
  if(reduced){
    div.innerHTML = prefixHTML + `<span class="${cls}">${escapeHtml(text)}</span>`;
    setTimeout(onDone, 120);
    return;
  }
  let i = 0;
  const step = 2, interval = 16;
  function tick(){
    i = Math.min(text.length, i + step);
    div.innerHTML = prefixHTML + `<span class="${cls}">${escapeHtml(text.slice(0, i))}</span><span class="cursor-blink">&nbsp;</span>`;
    if(i < text.length){ setTimeout(tick, interval); }
    else{
      div.innerHTML = prefixHTML + `<span class="${cls}">${escapeHtml(text)}</span>`;
      setTimeout(onDone, holdAfter);
    }
  }
  tick();
}
function typeTerminalLines(){
  const body = document.getElementById('termBody');
  body.querySelectorAll('.ln').forEach(el => el.remove());
  const term = CONFIG.terminal || { command:'', lines:[] };
  const slug = (CONFIG.siteName || 'site').toLowerCase().replace(/[^a-z0-9]+/g, '') || 'site';
  const lines = term.lines || [];

  const steps = [
    (next) => typeSegment(body, `<span class="prompt">root@${slug}:~$</span>&nbsp;`, term.command || '', 'out', next, 260),
    (next) => typeSegment(body, '&nbsp;', '', '', next, 140, 'spacer'),
    ...lines.map(line => (next) => {
      if(line.divider){
        typeSegment(body, '<span class="chevron">&gt;</span>&nbsp;', '...', 'divider', next, 160);
      }else{
        const full = line.name ? `${line.text} - ${line.name}` : line.text;
        typeSegment(body, '<span class="chevron">&gt;</span>&nbsp;', full, line.quote ? 'quote' : 'out', next, 240);
      }
    }),
  ];

  let idx = 0;
  function next(){
    if(idx >= steps.length){
      const cur = document.createElement('div');
      cur.className = 'ln show';
      cur.id = 'termInputLine';
      cur.innerHTML = '<span class="prompt">$</span>&nbsp;<span class="out" id="termTypedText"></span><span class="cursor-blink">&nbsp;</span>';
      body.appendChild(cur);
      return;
    }
    const step = steps[idx];
    idx++;
    step(next);
  }
  next();
}

let audioCtx, started = false, masterGain = null, baseMasterVolume = 0.05;
function startAmbientAudio(){
  if(started) return;
  started = true;

  if(CONFIG.music && CONFIG.music.url){
    const el = document.getElementById('bgMusicEl');
    el.src = CONFIG.music.url;
    el.volume = CONFIG.music.volume ?? 0.35;
    el.play().catch(e => console.warn('background music blocked/unavailable', e));
    return;
  }

  try{
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = baseMasterVolume;
    masterGain.connect(audioCtx.destination);
    const master = masterGain;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 700;
    filter.connect(master);

    const freqs = [110, 164.81, 220, 277.18];
    freqs.forEach((f,idx)=>{
      const osc = audioCtx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.value = f;
      const g = audioCtx.createGain();
      g.gain.value = 0.18;
      osc.connect(g);
      g.connect(filter);
      osc.start();
    });

    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.045;
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 300;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    function blip(){
      const t = audioCtx.currentTime;
      const o = audioCtx.createOscillator();
      o.type = 'sine';
      o.frequency.value = 660 + Math.random()*440;
      const g = audioCtx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.03, t+0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t+0.6);
      o.connect(g); g.connect(master);
      o.start(t); o.stop(t+0.7);
      setTimeout(blip, 4000 + Math.random()*5000);
    }
    setTimeout(blip, 5000);

    if(audioCtx.state === 'suspended') audioCtx.resume();
  }catch(e){ console.warn('ambient audio unavailable', e); }
}
document.addEventListener('click', ()=>{ if(audioCtx && audioCtx.state === 'suspended') audioCtx.resume(); });

function duckSiteAudio(){
  const bg = document.getElementById('bgMusicEl');
  if(bg && !bg.paused){ bg.dataset.wasPlaying = '1'; bg.pause(); }
  if(masterGain && audioCtx){ masterGain.gain.setTargetAtTime(0.0008, audioCtx.currentTime, 0.25); }
}
function unduckSiteAudio(){
  const bg = document.getElementById('bgMusicEl');
  if(bg && bg.dataset.wasPlaying === '1'){ bg.play().catch(()=>{}); delete bg.dataset.wasPlaying; }
  if(masterGain && audioCtx){ masterGain.gain.setTargetAtTime(baseMasterVolume, audioCtx.currentTime, 0.35); }
}

const profileModal = document.getElementById('profileModal');
let currentProfileMember = null;

// ---- profile view counter -------------------------------------------------
// Uses countapi.xyz so the number is a real, shared count across every visitor
// (not something random or per-browser). If the request fails — offline, the
// service is down, the network blocks it — we fall back to a local tally
// cached in this browser so the counter still shows *something* real.
const VIEW_COUNTER_NAMESPACE = 'threat2society-site';
async function bumpProfileViewCount(slug){
  const key = `profile-${slug}`;
  try{
    const res = await fetch(`https://api.countapi.xyz/hit/${VIEW_COUNTER_NAMESPACE}/${key}`);
    if(!res.ok) throw new Error(`countapi responded ${res.status}`);
    const data = await res.json();
    if(typeof data.value === 'number'){
      try{
        const cache = JSON.parse(localStorage.getItem('t2sProfileViewsCache') || '{}');
        cache[slug] = data.value;
        localStorage.setItem('t2sProfileViewsCache', JSON.stringify(cache));
      }catch(err){ /* cache is best-effort only */ }
      return data.value;
    }
    throw new Error('countapi returned no value');
  }catch(err){
    console.warn('view counter: shared count unavailable, falling back to a local tally', err);
    try{
      const cache = JSON.parse(localStorage.getItem('t2sProfileViewsCache') || '{}');
      const next = (cache[slug] || 0) + 1;
      cache[slug] = next;
      localStorage.setItem('t2sProfileViewsCache', JSON.stringify(cache));
      return next;
    }catch(err2){ return null; }
  }
}

const SPOTIFY_TALL_TYPES = new Set(['album', 'playlist', 'artist', 'show']);
function spotifyEmbedInfo(link){
  if(!link) return null;
  let type, id;
  const uriMatch = link.match(/^spotify:(track|album|artist|playlist|episode|show):([A-Za-z0-9]+)$/);
  if(uriMatch){
    type = uriMatch[1]; id = uriMatch[2];
  }else{
    try{
      const url = new URL(link);
      const parts = url.pathname.split('/').filter(Boolean);
      const types = ['track','album','artist','playlist','episode','show'];
      const typeIdx = parts.findIndex(p => types.includes(p));
      if(typeIdx !== -1 && parts[typeIdx+1]){
        type = parts[typeIdx];
        id = parts[typeIdx+1].split('?')[0];
      }
    }catch(err){ return null; }
  }
  if(!type || !id) return null;
  return {
    type, id,
    height: SPOTIFY_TALL_TYPES.has(type) ? 352 : 152,
  };
}
function renderProfileSpotify(cardEl, spotifyWrap, link, { autoplay = true } = {}){
  const info = spotifyEmbedInfo(link);
  if(!info){
    if(link) console.warn('Spotify link could not be parsed into an embed (need an open.spotify.com/track|album|playlist|artist|episode|show/... link, not a shortened spotify.link share link):', link);
    spotifyWrap.innerHTML = '';
    cardEl.classList.remove('active');
    return;
  }
  const src = `https://open.spotify.com/embed/${info.type}/${info.id}?utm_source=generator&theme=0${autoplay ? '&autoplay=1' : ''}`;
  cardEl.classList.add('active');
  spotifyWrap.innerHTML = `<iframe src="${src}" width="100%" height="${info.height}" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
}

async function openProfile(member){
  await showLoader();

  const slug = member.slug || slugify(member.name);
  currentProfileMember = member;

  const avatarWrap = document.getElementById('profileModalAvatarWrap');
  avatarWrap.querySelectorAll('img').forEach(n => n.remove());
  const fallback = document.getElementById('profileModalAvatarFallback');
  fallback.style.display = '';
  fallback.textContent = member.name[0].toUpperCase();

  document.getElementById('profileModalName').textContent = member.name;
  const roleEl = document.getElementById('profileModalRole');
  roleEl.textContent = member.role || '';
  roleEl.style.display = member.role ? '' : 'none';
  const statusTextEl = document.getElementById('profileModalStatusText');
  statusTextEl.textContent = 'connecting...';
  document.getElementById('profileModalStatusDot').dataset.status = 'offline';

  profileModal.style.backgroundImage = '';
  profileModal.style.backgroundColor = '';
  const bgVal = member.background || (CONFIG.profileDefaults && CONFIG.profileDefaults.background) || '';
  if(bgVal) applyBackground(profileModal, bgVal);
  // Dim the background whenever a member image (not just a flat color) is set,
  // so the name stays readable on top of it.
  const bgResolved = resolveBackgroundValue(bgVal);
  profileModal.classList.toggle('has-image', !!(bgResolved && bgResolved.type === 'image'));

  profileModal.classList.add('visible');
  try{ history.pushState({ profile:slug }, '', '/' + slug); }catch(err){ console.warn('pushState failed', err); }

  const pm = document.getElementById('profileMusicEl');
  const musicVal = member.music || (CONFIG.profileDefaults && CONFIG.profileDefaults.music) || '';
  if(musicVal){
    duckSiteAudio();
    pm.src = musicVal;
    pm.volume = 0.5;
    pm.play().catch(()=>{});
  }

  const spotifyVal = member.spotify || (CONFIG.profileDefaults && CONFIG.profileDefaults.spotify) || '';
  // If a hosted mp3 is already set (and playing the full song above), the Spotify
  // widget is shown for looks only — don't also autoplay its 30s preview on top of it.
  renderProfileSpotify(document.getElementById('profileModalMusicCard'), document.getElementById('profileModalSpotify'), spotifyVal, { autoplay: !musicVal });

  const viewsCountEl = document.getElementById('profileModalViewsCount');
  viewsCountEl.textContent = '···';
  bumpProfileViewCount(slug).then(count => {
    // the modal may have already moved on to a different member (or closed)
    // by the time the count comes back — don't stomp on it in that case
    if(currentProfileMember !== member) return;
    viewsCountEl.textContent = typeof count === 'number' ? count.toLocaleString() : '—';
  });

  hideLoader();

  fetchLanyard(member, {
    dot: document.getElementById('profileModalStatusDot'),
    avatarWrap: avatarWrap,
    fallback: fallback,
    nameEl: document.getElementById('profileModalName'),
    kind: 'profile', size: 128,
    tooltipStatusText: statusTextEl,
  });
}
function closeProfile(){
  if(!profileModal.classList.contains('visible')) return;
  profileModal.classList.remove('visible');
  const pm = document.getElementById('profileMusicEl');
  if(!pm.paused) pm.pause();
  renderProfileSpotify(document.getElementById('profileModalMusicCard'), document.getElementById('profileModalSpotify'), '');
  if(started){
    unduckSiteAudio();
  }else{
    // arrived via a slug link, so the default track was never started — start it
    // now that the profile (and its custom music) is being closed
    startAmbientAudio();
  }
  if(location.pathname !== '/'){
    try{ history.pushState(null, '', '/'); }catch(err){ console.warn('pushState failed', err); }
  }
  currentProfileMember = null;
}
document.getElementById('profileModalClose').addEventListener('click', closeProfile);
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeProfile(); });
window.addEventListener('popstate', closeProfile);

// ---- profile modal mouse trail ---------------------------------------------
// A glowing trail that follows the cursor while a profile is open, cycling
// through the site's palette: white -> red -> near-black -> white, on a loop.
(function setupProfileMouseTrail(){
  const canvas = document.getElementById('profileTrailCanvas');
  if(!canvas || !canvas.getContext) return;
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;

  const ctx = canvas.getContext('2d');
  const COLOR_STOPS = [
    [255, 255, 255],  // white
    [255, 59, 82],    // accent-3 (bright red)
    [179, 24, 47],    // accent (deep red)
    [12, 6, 6],        // near black
  ];
  const CYCLE_MS = 1400; // how long one full white -> red -> black -> white loop takes
  const LIFESPAN_MS = 950;
  const MAX_PARTICLES = 90;
  const MIN_RADIUS = 3;   // smallest glowing orb
  const MAX_RADIUS = 10;  // largest glowing orb

  let particles = [];
  let rafId = null;
  let dpr = Math.max(1, window.devicePixelRatio || 1);

  function resizeCanvas(){
    const rect = profileModal.getBoundingClientRect();
    dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resizeCanvas);

  function lerp(a, b, t){ return a + (b - a) * t; }
  function colorAt(tMs){
    const segCount = COLOR_STOPS.length;
    const pos = ((tMs % CYCLE_MS) / CYCLE_MS) * segCount;
    const i = Math.floor(pos) % segCount;
    const j = (i + 1) % segCount;
    const localT = pos - Math.floor(pos);
    const c0 = COLOR_STOPS[i], c1 = COLOR_STOPS[j];
    const r = lerp(c0[0], c1[0], localT) | 0;
    const g = lerp(c0[1], c1[1], localT) | 0;
    const b = lerp(c0[2], c1[2], localT) | 0;
    return `rgb(${r}, ${g}, ${b})`;
  }

  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = performance.now();
    particles = particles.filter(p => now - p.born < LIFESPAN_MS);

    // Render each point as a soft, blurred glowing orb (radial gradient that
    // fades to fully transparent at its edge) rather than a hard-edged shape —
    // clusters of these overlapping as the cursor moves gives the hazy,
    // blood-cell-like blob look from the reference image.
    for(const p of particles){
      const age = (now - p.born) / LIFESPAN_MS; // 0 = fresh, 1 = about to vanish
      const radius = lerp(p.size, p.size * 0.4, age);
      const alpha = Math.pow(1 - age, 1.2);
      const [r, g, b] = colorAt(p.born).match(/\d+/g).map(Number);

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
      gradient.addColorStop(0,    `rgba(${r}, ${g}, ${b}, ${alpha * 0.9})`);
      gradient.addColorStop(0.4,  `rgba(${r}, ${g}, ${b}, ${alpha * 0.55})`);
      gradient.addColorStop(1,    `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    if(particles.length){
      rafId = requestAnimationFrame(draw);
    }else{
      rafId = null;
    }
  }

  function onMove(e){
    if(!profileModal.classList.contains('visible')) return;
    const rect = profileModal.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();
    // spawn a couple of jittered orbs per move so they overlap into loose
    // clusters, rather than reading as a single clean line
    for(let n = 0; n < 2; n++){
      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        size: MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS),
        born: now,
      });
    }
    if(particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES);
    if(rafId === null) rafId = requestAnimationFrame(draw);
  }
  profileModal.addEventListener('mousemove', onMove);

  // the modal is display:none-ish (opacity/visibility) while closed, so its
  // size can't be measured until it becomes visible — resize right then
  const visibilityObserver = new MutationObserver(() => {
    if(profileModal.classList.contains('visible')) resizeCanvas();
  });
  visibilityObserver.observe(profileModal, { attributes: true, attributeFilter: ['class'] });
  resizeCanvas();
})();

window.addEventListener('DOMContentLoaded', ()=>{
  applyTheme();
  applyCopy();
  applyLogo();
  applySectionBackgrounds();
  buildStarfield(document.getElementById('splashStars'), 70);
  buildStarfield(document.getElementById('heroStars'), 50);
  fitAsciiArt();
  fitAsciiEl(loaderAsciiEl, CONFIG.loadingAscii, { maxFont:20, maxWidthRatio:.7, maxWidthPx:480 });
  renderRosters();
  renderAffiliations();
  renderHallOfShame();
  renderDiscordInvite();
  initThreatCrossfade();
  const hash = location.hash.replace('#','') || 'home';
  go(document.getElementById(hash) ? hash : 'home');
});
