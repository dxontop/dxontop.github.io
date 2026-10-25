// all hail t2s
// caliber almighty

const DEVTOOLS_REDIRECT_URL = '';
const IS_MOBILE_DEVICE = matchMedia('(pointer: coarse)').matches
  || /Android|iPhone|iPad|iPod|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent);
let devtoolsCaught = false;

function isDevtoolsKey(e){
  const k = String(e.key || '').toLowerCase();
  if(k === 'f12') return true;
  if((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c', 'k'].indexOf(k) > -1) return true;
  if((e.ctrlKey || e.metaKey) && !e.shiftKey && k === 'u') return true;
  if(e.metaKey && e.altKey && ['i', 'j', 'c', 'u'].indexOf(k) > -1) return true;
  return false;
}

function devtoolsBust(){
  if(devtoolsCaught || IS_MOBILE_DEVICE || !DEVTOOLS_REDIRECT_URL) return;
  devtoolsCaught = true;
  location.replace(DEVTOOLS_REDIRECT_URL);
}

document.addEventListener('keydown', e => {
  if(isDevtoolsKey(e)){
    e.preventDefault();
    e.stopPropagation();
    devtoolsBust();
  }
}, true);

if(!IS_MOBILE_DEVICE && DEVTOOLS_REDIRECT_URL){
  const baseW = window.outerWidth - window.innerWidth;
  const baseH = window.outerHeight - window.innerHeight;
  let probe = null;
  try{ probe = Function('debugger'); probe(); }catch(e){ probe = null; }
  setInterval(() => {
    const w = window.outerWidth - window.innerWidth - baseW;
    const h = window.outerHeight - window.innerHeight - baseH;
    if(w > 150 || h > 150) devtoolsBust();
  }, 900);
  setInterval(() => {
    if(!probe) return;
    const start = performance.now();
    probe();
    if(performance.now() - start > 300) devtoolsBust();
  }, 1600);
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

document.getElementById('root').innerHTML = `
<canvas id="c"></canvas>
<div id="hint">click to enter<span class="cur">_</span></div>

<div id="bgs"></div>
<div id="ro"></div>
<div id="nv"><div id="isl"></div></div>

<audio id="bgMusicEl" preload="none" loop></audio>
<audio id="profileMusicEl" preload="none" loop></audio>

<div id="profileModal">
  <canvas id="profileTrailCanvas" class="pm-trail"></canvas>
  <button class="pm-x" id="profileModalClose" aria-label="Close profile">&times;</button>
  <div class="pm-card">
    <div class="mh">
      <div class="u xl offline" id="profileModalAvatarWrap"><img class="a" id="profileModalAvatar" src="" alt=""><span class="s"></span></div>
      <div class="mn" id="profileModalName"></div>
      <div class="mu" id="profileModalHandle"></div>
    </div>
    <div class="sec">
      <div class="lb">status</div>
      <div class="st offline" id="profileModalStatus"><i></i><span>offline</span></div>
      <div class="cs" id="profileModalStatusText"></div>
    </div>
    <div class="pm-music" id="profileModalMusicCard">
      <div class="pm-np"><span class="lb">now playing</span><div class="wave">${buildWaveBarsHTML(28)}</div></div>
      <div id="profileModalSpotify"></div>
    </div>
    <div class="sec">
      <div class="lb">views</div>
      <div class="vw">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        <b id="profileModalViewsCount">···</b>
      </div>
    </div>
  </div>
</div>
`;


const CONFIG = {
  siteName: 'Threat2Society',

  copy: {
    heroTagline:        'they hate us cuz they aint us',
    hofSubtitle:         "bet you can't be us",
    bigThreatsSubtitle:  'ingat sa mga to baka patayin ka nila',
    exclusiveThreatsSubtitle: 'hindi lahat kasali dito',
    membersSubtitle:     'mga bawal batahin',
    aboutTagScript:      'all hail T2S',
    affSubtitle:         'nagsama sama mga tirador',
  },

  terminal: {
    command: 'whoami t2s',
    lines: [
      { text:'wala kaming sinasanto kinginaniyo', name:'dx/daz' },
      { divider:true },
      { text:'"we don\'t repeat history. we rewrite it"', name:'t2s', quote:true },
    ],
  },
  
  discordInvite: {
    bannerText: 'threat2society',
    banner: 'images/banner.gif',
    logo: 'images/logo.gif',
    name: 'Threat2Society',
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
    { name:'allie', spotify:'', music:'', background:'', discordId:'1441623190412726355' },
  ],

  bigThreats: [
    { name:'zowi', spotify:'https://open.spotify.com/track/78TC2xIVRqJNzzBS6abuNP?si=c4ed0a0b479b48cd', music:'pf/zowi.mp3', background:'pf/zowi.gif', discordId:'1081132499767410688' },
    { name:'sevi', spotify:'', music:'', background:'',  discordId:'769457309562568706' },
    { name:'sao', spotify:'https://open.spotify.com/track/3XE4ONqvAqbyADR17aoGO4?si=fsVhQGnDSuOta2BmNNc1Yw&utm_source=copy-link', music:'pf/sao.mp3', background:'pf/sao.gif', discordId:'747746641590616064' },
    { name:'aeri', spotify:'https://open.spotify.com/track/1RClPeUFVHngyLuHGB5M7g?si=jK3wf991SOyowzFZbKg22g&utm_source=copy-link', music:'pf/aeri.mp3', background:'pf/aeri.gif', discordId:'992033485973880842' },
    { name:'jon', spotify:'https://open.spotify.com/track/1QrbZhFYlViXd60g130vw1?si=LMQOdp47TJaVevTbsV2udA&utm_source=copy-link', music:'pf/jon.mp3', background:'pf/jon.gif', discordId:'1010028872282157106' },
    { name:'gun', spotify:'https://open.spotify.com/track/5mtTAScDytxMMqZj14NmlN?si=BsAhMwSeSQq0yidxidyEFQ&utm_source=copy-link', music:'pf/gun.mp3', background:'pf/gun.gif', discordId:'1495036966360842260' },
    { name:'yuzuki', spotify:'https://open.spotify.com/track/3hEfpBHxgieRLz4t3kLNEg?si=05f13e1472ed4956', music:'pf/yuzuki.mp3', background:'pf/yuzuki.gif', discordId:'1518082674017701888' },
    { name:'zy', spotify:'https://open.spotify.com/track/6deBk1BSZkEO7WxvXKnqOZ?si=afa7c9db66d34a4f', music:'pf/zy.mp3', background:'pf/zy.gif', discordId:'1245749945353375766' },
    { name:'kio', spotify:'https://open.spotify.com/track/2c2tlXfEmLgUNvxngIi1qL?si=e1264ebcc6844dea', music:'pf/kio.mp3', background:'pf/kio.gif',  discordId:'751387160057217066' },
    { name:'rue', spotify:'https://open.spotify.com/track/3tTpvK7QgjjQCKGnHt5xn3?si=at7oRgLVRI6YU--3oe0qtA&utm_source=copy-link', music:'pf/rue.mp3', background:'pf/rue.gif', discordId:'1502126548096909353' },
  ],

  exclusiveThreats: [
    { name:'exil',  discordId:'1533371972241723589' },
    { name:'blake', spotify:'', music:'pf/blake.mp3', background:'pf/blake.gif',  discordId:'1244678008175071263' },
    { name:'hesu',   discordId:'795725566476812348' },
    { name:'jor', spotify:'https://open.spotify.com/track/6MKfYl08wrrIrH3a0MyGt6?si=2cGU_NDFQouXyTjsIuVxzQ&utm_source=copy-link&context=spotify%3Atrack%3A6MKfYl08wrrIrH3a0MyGt6', music:'pf/jor.mp3', background:'pf/jor.gif', discordId:'1403234492419670038' },
    { name:'ghost',   discordId:'965848814164520970' },
  ],

  members: [
    { name:'louve',    discordId:'902804741883588619' },
    { name:'hunter',    discordId:'1511980297149747246' },
    { name:'ryokai',   discordId:'900336233031540787' },
    { name:'zei',   discordId:'1248910763494473728' },
    { name:'wiz',   discordId:'1280059534169210896' },
    { name:'forth',    discordId:'1505315891087282176' },
    { name:'mimi',   discordId:'1444205221814210700' },
    { name:'soul',    discordId:'1446067102900551741' },
    { name:'cho',     discordId:'1503083605444788235' },
    { name:'seia',    discordId:'748713264652746813' },
  ],

  affiliations: [
    {
      name: 'CTRL',
      image: 'images/ctrl.jpg',
      description: 'we hate larpers.',
      invite: 'https://discord.gg/ZjWacnA6YK',
    },
    {
      name: 'NV$',
      image: 'images/nvs.png',
      description: 'loudest in asia.',
      invite: 'https://discord.gg/SrhEmsKfcS',
    },
    {
      name:'EBK',
      image: 'images/ebk.gif',
      description: 'everybody killa',
      invite: 'https://discord.gg/wHNEUrruSm',
    },
    {
      name: 'heavensxnt',
      image: 'images/heavensent.gif',
      description: 'sa ngalan ng, heavensxnt Amen.',
      invite: 'https://discord.gg/GuVSYxGyZq',
    },
  ],

  music: {
    url: 'music/t2sontop_V1.mp3',
    volume: 0.50,
  },

  profileDefaults: {
    background: 'images/banner.gif',
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
    mainthreats:  '',
    bigThreatsBlock: '',
    about:        '',
    affiliations: '',
  },
};

const CDN = 'https://cdn.discordapp.com/';
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rnd = (i, seed = 0) => {
  let t = (Math.imul(i + 1, 374761393) + Math.imul(seed + 1, 668265263)) | 0;
  t = Math.imul(t ^ (t >>> 13), 1274126177); t ^= t >>> 16;
  return (t >>> 0) / 4294967296;
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function slugify(str){
  return (str || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'member';
}
function def(id){
  try{ return CDN + 'embed/avatars/' + Number((BigInt(id) >> 22n) % 6n) + '.png'; }
  catch(e){ return CDN + 'embed/avatars/0.png'; }
}
function avatarUrl(u, id){
  if(!u) return def(id);
  return u.avatar
    ? CDN + 'avatars/' + u.id + '/' + u.avatar + '.' + (u.avatar.indexOf('a_') === 0 ? 'gif' : 'png') + '?size=256'
    : def(u.id);
}
function decoUrl(u){
  const dc = u && u.avatar_decoration_data;
  return dc && dc.asset ? CDN + 'avatar-decoration-presets/' + dc.asset + '.png?size=128&passthrough=true' : '';
}
function applyBackground(el, val){
  const v = (val || '').trim();
  if(!v) return false;
  if(/^(url\(|linear-gradient|radial-gradient|conic-gradient)/i.test(v)){ el.style.backgroundImage = v; return true; }
  if(/\.(png|jpe?g|gif|webp|avif|svg)$/i.test(v) || /^(https?:)?\//.test(v) || v.startsWith('data:')){ el.style.backgroundImage = 'url("' + v + '")'; return true; }
  el.style.backgroundColor = v; return false;
}

const validOnly = arr => arr.filter(m => m && m.name && m.name.trim());
const BYID = {};
[CONFIG.mainThreats, CONFIG.bigThreats, CONFIG.exclusiveThreats, CONFIG.members].forEach(pool => validOnly(pool).forEach(m => { if(!BYID[m.discordId]) BYID[m.discordId] = m; }));
const ALL = Object.keys(BYID);
function findMemberBySlug(slug){
  const pools = [CONFIG.mainThreats, CONFIG.bigThreats, CONFIG.exclusiveThreats, CONFIG.members];
  for(const pool of pools){
    const found = pool.find(m => m && m.name && slugify(m.name) === slug);
    if(found) return found;
  }
  return null;
}
const pathSlug = location.pathname.replace(/^\/+|\/+$/g, '');
const deepLinkedProfile = pathSlug ? findMemberBySlug(pathSlug) : null;

(function asciiLanding(){
  const cv = document.getElementById('c'), vx = cv.getContext && cv.getContext('2d');
  if(!vx) return;
  const motion = !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const FONT = 'ui-monospace,SFMono-Regular,Menlo,Consolas,"DejaVu Sans Mono",monospace';
  const F = 14, CW = .6, PAD = F * 1.5, POOL = Array.from('◆◇♦⋄·'), T = 3200;
  const lines = CONFIG.asciiArt.replace(/\r/g, '').split('\n');
  const rows = lines.length, cols = Math.max.apply(null, lines.map(l => l.length));
  const cells = []; let bx0 = cols, bx1 = 0;
  const LIGHT = '.\'`,:;"-_^~', MID = '+=*!?/|\\()<>';
  lines.forEach((ln, r) => {
    for(let c = 0; c < ln.length; c++){
      const ch = ln[c]; if(ch === ' ') continue;
      const i = r * cols + c;
      cells.push({ c, r, i, ch, a: LIGHT.indexOf(ch) > -1 ? .55 : MID.indexOf(ch) > -1 ? .78 : .95, d: (rnd(i, 5) * .66 + rnd(i, 1) * .1) * T, s: T * (.14 + rnd(i, 2) * .12) });
      if(c < bx0) bx0 = c; if(c > bx1) bx1 = c;
    }
  });
  if(!cells.length) return;

  const src = document.createElement('canvas'), sx = src.getContext('2d');
  const lay = document.createElement('canvas'), lx = lay.getContext('2d');
  const glo = document.createElement('canvas'), gx = glo.getContext('2d');
  const W0 = cols * F * CW + PAD * 2, H0 = rows * F + PAD * 2;
  const HAS_FILTER = typeof CanvasRenderingContext2D !== 'undefined' && 'filter' in CanvasRenderingContext2D.prototype;
  const done = new Uint8Array(cols * rows);
  let k = 1, Wd = 2, Hd = 2, cwD = 1, chD = 1, padD = 0, fontPx = 10, xs = [0, 2];
  let introDone = !motion, glowAt = null, glowReady = false, t0 = performance.now(), last = 0;
  let tw = [], pointer = null, mix = 0, goal = 0, lastU = 0, tx = 0, ty0 = 0, px = 0, py = 0;
  window.asciiKick = () => { goal = 1; };

  function prep(ctx){ ctx.font = fontPx + 'px ' + FONT; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; }
  function geom(kk){
    k = kk; cwD = F * CW * k; chD = F * k; padD = PAD * k; fontPx = Math.max(1, Math.round(F * k * .98));
    Wd = Math.max(2, Math.round(W0 * k / 2) * 2); Hd = Math.max(2, Math.round(H0 * k / 2) * 2);
    src.width = lay.width = glo.width = Wd; src.height = lay.height = glo.height = Hd;
    prep(sx); prep(lx);
    xs = [0]; for(let c = 0; c <= cols; c++) xs.push(Math.round(padD + c * cwD)); xs.push(Wd);
  }
  function glyph(ctx, cell, ch, fill, alpha){
    ctx.globalAlpha = alpha; ctx.fillStyle = fill;
    ctx.fillText(ch, padD + (cell.c + .5) * cwD, padD + (cell.r + .5) * chD);
  }
  function repaint(){
    lx.setTransform(1, 0, 0, 1, 0, 0); lx.clearRect(0, 0, Wd, Hd); prep(lx);
    for(const c of cells) if(done[c.i]) glyph(lx, c, c.ch, '#ff3b52', c.a);
    lx.globalAlpha = 1;
  }
  function buildGlow(){
    gx.setTransform(1, 0, 0, 1, 0, 0); gx.clearRect(0, 0, Wd, Hd);
    if(HAS_FILTER){ gx.filter = 'blur(' + (F * k * 1.1).toFixed(1) + 'px)'; gx.drawImage(lay, 0, 0); gx.filter = 'none'; glowReady = true; }
  }
  function fit(){
    let z = Math.min(innerWidth / W0, innerHeight / H0);
    if(innerWidth <= 760){
      const z1 = Math.min(innerWidth * .98 / ((bx1 - bx0 + 1) * F * CW), innerHeight * .7 / (rows * F));
      if(z1 > z) z = z1;
    }
    cv.style.width = (W0 * z) + 'px'; cv.style.height = (H0 * z) + 'px';
    return Math.min(z * Math.min(2, window.devicePixelRatio || 1), 6);
  }

  function draw(now){
    const t = now - t0;
    sx.setTransform(1, 0, 0, 1, 0, 0); sx.globalAlpha = 1; sx.globalCompositeOperation = 'source-over'; sx.clearRect(0, 0, Wd, Hd);
    let fade = 0;
    if(glowReady && glowAt != null) fade = clamp((now - glowAt) / 800, 0, 1);
    if(fade > 0){
      sx.globalCompositeOperation = 'lighter';
      sx.globalAlpha = .92 * fade * (1 + .08 * Math.sin(now / 1300));
      sx.drawImage(glo, 0, 0);
      sx.globalCompositeOperation = 'source-over'; sx.globalAlpha = 1;
    }
    if(!introDone){
      let pending = 0; const live = [];
      for(const c of cells){
        if(done[c.i]) continue;
        if(t < c.d){ pending++; continue; }
        if(t >= c.d + c.s){ done[c.i] = 1; glyph(lx, c, c.ch, '#ff3b52', c.a); continue; }
        pending++; live.push(c);
      }
      sx.drawImage(lay, 0, 0);
      for(const c of live){
        const u = (t - c.d) / c.s;
        if(u < .7) glyph(sx, c, POOL[Math.floor(rnd(c.i, Math.floor(t / 60) + 3) * POOL.length)], '#ff7a8a', .55 + .4 * (1 - u / .7));
        else { glyph(sx, c, c.ch, '#ff3b52', c.a); glyph(sx, c, c.ch, '#ffb3bc', (1 - (u - .7) / .3) * .7); }
      }
      if(!pending){ introDone = true; buildGlow(); glowAt = now; }
    }else{
      sx.drawImage(lay, 0, 0);
      if(motion) shimmer(now);
    }
    sx.globalAlpha = 1;
  }

  function shimmer(now){
    const bp = ((now % 6500) / 6500) * 1.3 - .15, BW = .07;
    for(const c of cells){
      const d = Math.abs(c.c / cols - bp); if(d >= BW) continue;
      const a = 1 - d / BW; glyph(sx, c, c.ch, '#ffc2c8', a * a * .55);
    }
    const target = Math.max(10, Math.round(cells.length / 90));
    while(tw.length < target){ tw.push({ c: cells[(Math.random() * cells.length) | 0], b: now - Math.random() * 400, life: 500 + Math.random() * 900 }); }
    for(let a = tw.length - 1; a >= 0; a--){
      const w = tw[a], u = (now - w.b) / w.life;
      if(u >= 1){ tw[a] = tw[tw.length - 1]; tw.pop(); continue; }
      glyph(sx, w.c, w.c.ch, '#ffd0d5', Math.sin(Math.PI * u) * .8);
    }
    if(pointer){
      const R = 6;
      for(const c of cells){
        const d = Math.hypot(c.c - pointer.c, c.r - pointer.r); if(d >= R) continue;
        const a = 1 - d / R; glyph(sx, c, c.ch, '#ffd0d5', a * a * .9);
      }
    }
    sx.globalAlpha = 1;
  }

  function motionStep(now){
    const dt = lastU ? Math.min(.05, (now - lastU) / 1000) : .016; lastU = now;
    mix += (goal - mix) * (1 - Math.exp(-dt * 1.5));
    px += (tx - px) * (1 - Math.exp(-dt * 4)); py += (ty0 - py) * (1 - Math.exp(-dt * 4));
    const t = now / 1000, m = mix, sw = Math.sin(t * 2 * Math.PI / 8.5), vw = Math.min(1.4, Math.max(.45, innerWidth / 1000)), amp = (1 + .35 * m) * Math.min(1, Math.max(.3, innerWidth / 900));
    const rz = -3.2 * sw * amp, dx = 34 * sw * amp * vw + px * 8 * m, dy = -sw * sw * 7 * amp + Math.sin(t * .55) * 3 * m;
    const ry = 6 * sw * amp + px * 5 * m, rx = -py * 4.5 * m, sc = 1 + m * (.04 + .01 * Math.sin(t * .5));
    cv.style.transformOrigin = '50% -32%';
    cv.style.transform = 'perspective(1500px) translate(' + dx.toFixed(2) + 'px,' + dy.toFixed(2) + 'px) rotateX(' + rx.toFixed(3) + 'deg) rotateY(' + ry.toFixed(3) + 'deg) rotateZ(' + rz.toFixed(3) + 'deg) scale(' + sc.toFixed(4) + ')';
  }
  function present(now){
    if(!src.width) return;
    if(cv.width !== src.width || cv.height !== src.height){ cv.width = src.width; cv.height = src.height; }
    vx.setTransform(1, 0, 0, 1, 0, 0); vx.clearRect(0, 0, cv.width, cv.height);
    const wv = 1 - mix;
    if(!motion || wv < .01){ vx.drawImage(src, 0, 0); return; }
    const t = now / 1000, W = src.width, H = src.height;
    const A = chD * .55 * wv, sp = 1.7, tilt = chD * 1.6 * Math.sin(t * .9) * wv;
    for(let q = 0; q < xs.length - 1; q++){
      const x0 = xs[q], x1 = xs[q + 1]; if(x1 <= x0) continue;
      const u = (x0 + x1) / 2 / W;
      const dy = Math.round(A * (Math.sin(u * 6.5 - t * sp) * .62 + Math.sin(u * 13.5 + t * sp * .65) * .38) + tilt * (u - .5) * 2);
      vx.drawImage(src, x0, 0, x1 - x0, H, x0, dy, x1 - x0, H);
    }
  }
  function loop(now){
    requestAnimationFrame(loop);
    if(document.hidden) return;
    if(motion) motionStep(now);
    if(now - last >= 30 || !introDone){ last = now; draw(now); }
    present(now);
  }

  geom(fit());
  if(!motion){ cells.forEach(c => { done[c.i] = 1; }); repaint(); buildGlow(); glowAt = -1e9; introDone = true; }
  else{ repaint(); }
  draw(performance.now()); present(performance.now());
  requestAnimationFrame(loop);
  addEventListener('resize', () => { geom(fit()); repaint(); if(introDone) buildGlow(); });
  document.addEventListener('pointermove', e => { tx = e.clientX / innerWidth - .5; ty0 = e.clientY / innerHeight - .5; });
  cv.addEventListener('pointermove', e => {
    const r = cv.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width * Wd, y = (e.clientY - r.top) / r.height * Hd;
    pointer = { c: Math.floor((x - padD) / cwD), r: Math.floor((y - padD) / chD) };
  });
  cv.addEventListener('pointerleave', () => { pointer = null; });
})();

const NAV = [
  ['home', 'home'],
  ['mainthreats', 'HOF'],
  ['bigthreats', 'Members'],
  ['about', 'about'],
  ['affiliations', 'gengo'],
];
const PAGE_IDS = NAV.map(n => n[0]);
const PAGEBG = {
  home: CONFIG.sectionBackgrounds.home, mainthreats: CONFIG.sectionBackgrounds.mainthreats,
  bigthreats: CONFIG.sectionBackgrounds.bigThreatsBlock,
  about: CONFIG.sectionBackgrounds.about, affiliations: CONFIG.sectionBackgrounds.affiliations,
};
let seq = 0;
const nextI = () => Math.min(seq++, 16);
const hdHTML = (title, sub) => '<div class="hd an" style="--i:' + nextI() + '"><b>' + esc(title) + '</b>' + (sub ? '<span>' + esc(sub) + '</span>' : '') + '</div>';

function uItem(m, big){
  const id = m.discordId;
  return '<div class="ui an' + (big ? ' hof' : '') + '" tabindex="0" role="button" data-id="' + esc(id) + '" style="--i:' + nextI() + '">'
    + '<div class="u offline' + (big ? ' lg' : '') + '"><img class="a" src="' + def(id) + '" alt=""><span class="s"></span></div>'
    + '<div class="nm">' + esc(m.name.toLowerCase()) + '</div>'
    + (big ? '<div class="ss offline"><i></i><span>offline</span></div>' : '') + '</div>';
}
function group(title, sub, list, big){
  return '<div class="sc">' + hdHTML(title, sub) + '<div class="grid">' + validOnly(list).map(m => uItem(m, big)).join('') + '</div></div>';
}

const ARR = '<svg class="dc" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg>';
function island(o){
  return '<div class="an" style="--i:' + nextI() + '"><div class="dv" data-ix="' + o.ix + '" tabindex="0" role="button" aria-expanded="false"><div class="dbg"></div>'
    + '<div class="dh"><span class="di">' + (o.icon ? '<img src="' + esc(o.icon) + '" alt="">' : esc(o.name.charAt(0).toUpperCase())) + '</span><span class="dn">' + esc(o.name) + '</span><span class="dd"></span>' + ARR + '</div>'
    + '<div class="dx"><div class="dy">' + (o.desc ? '<p class="dt" style="--k:0">' + o.desc + '</p>' : '') + '<div class="ds" style="--k:1"></div>'
    + (o.inv ? '<a class="dj" style="--k:2" href="' + esc(o.inv) + '" target="_blank" rel="noopener noreferrer">join server</a>' : '<span class="dj off" style="--k:2">no invite yet</span>')
    + '</div></div></div></div>';
}
const inviteCode = url => ((url || '').match(/discord(?:app)?\.(?:gg|com\/invite)\/([\w-]+)/i) || [])[1] || '';
const INV = {
  ix: 0, name: CONFIG.discordInvite.name, icon: CONFIG.discordInvite.logo, bg: CONFIG.discordInvite.banner,
  desc: CONFIG.discordInvite.bannerText, inv: CONFIG.discordInvite.url,
  code: inviteCode(CONFIG.discordInvite.url),
};
const AFFS = validOnly(CONFIG.affiliations).map((a, k) => ({
  ix: k + 1, name: a.name, icon: a.image, bg: a.image, desc: a.description, inv: a.invite, code: inviteCode(a.invite),
}));

const C = CONFIG.copy;
const pageHTML = {
  home: () => { seq = 0; return '<div class="aw"><p class="tx an" style="--i:0">' + esc(C.heroTagline) + '</p></div>'; },
  mainthreats: () => { seq = 0; return '<div class="aw">' + group('hof', C.hofSubtitle, CONFIG.mainThreats, true) + '</div>'; },
  bigthreats: () => { seq = 0; return '<div class="aw gr">'
    + group('threats', C.bigThreatsSubtitle, CONFIG.bigThreats)
    + group('exclusive threats', C.exclusiveThreatsSubtitle, CONFIG.exclusiveThreats)
    + group('members', C.membersSubtitle, CONFIG.members) + '</div>'; },
  about: () => { seq = 0; return '<div class="aw">' + hdHTML('about ' + CONFIG.siteName, C.aboutTagScript)
    + '<div class="term an" style="--i:' + nextI() + '"><div class="term-h">terminal — about_us.cli</div><div class="term-b" id="termBody"><pre id="aboutAscii" class="about-ascii"></pre></div></div>'
    + island(INV) + '</div>'; },
  affiliations: () => { seq = 0; return '<div class="aw gl">' + hdHTML('gengo', C.affSubtitle) + AFFS.map(island).join('') + '</div>'; },
};

const ro = document.getElementById('ro'), isl = document.getElementById('isl'), bgs = document.getElementById('bgs');
const initialHash = location.hash.replace('#', '');
let cur = NAV.some(n => n[0] === initialHash) ? initialHash : 'home';
let busy = false, entered = false;

ro.innerHTML = PAGE_IDS.map(id => '<section class="pg' + (id === cur ? ' on' : '') + '" id="p-' + id + '">' + pageHTML[id]() + '</section>').join('');
bgs.innerHTML = PAGE_IDS.map(id => '<div class="bgl" data-p="' + id + '"></div>').join('');
PAGE_IDS.forEach(id => { const l = bgs.querySelector('[data-p="' + id + '"]'); if(l) applyBackground(l, PAGEBG[id]); });
isl.innerHTML = '<i id="pl"></i>' + NAV.map((n, i) => '<button class="ni' + (n[0] === cur ? ' on' : '') + '" data-p="' + n[0] + '" style="--i:' + i + '">' + n[1] + '</button>').join('');

const pl = document.getElementById('pl');
function pill(){
  const b = isl.querySelector('.ni.on');
  if(!b){ pl.style.width = '0px'; return; }
  pl.style.width = b.offsetWidth + 'px'; pl.style.transform = 'translateX(' + b.offsetLeft + 'px)';
  if(entered) b.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
}
function setBg(k){
  bgs.querySelectorAll('.bgl').forEach(l => l.classList.toggle('on', l.dataset.p === k && !!PAGEBG[k].trim()));
  document.body.classList.toggle('hasbg', !!PAGEBG[k].trim());
}

function go(k){
  if(busy || k === cur || !document.getElementById('p-' + k)) return;
  busy = true;
  const a = document.getElementById('p-' + cur), b = document.getElementById('p-' + k);
  isl.classList.remove('sq'); void isl.offsetWidth; isl.classList.add('sq');
  isl.querySelectorAll('.ni').forEach(n => n.classList.toggle('on', n.dataset.p === k)); pill();
  setBg(k);
  a.classList.remove('in'); a.classList.add('out');
  setTimeout(() => {
    a.classList.remove('on', 'out'); b.classList.add('on'); b.scrollTop = 0; void b.offsetWidth; b.classList.add('in');
    cur = k; busy = false;
    if(k === 'about') typeAbout();
  }, 520);
}
isl.addEventListener('click', e => { const b = e.target.closest('.ni'); if(b) go(b.dataset.p); });

const S = {};
const statusLabels = { online:'online', idle:'idle', dnd:'do not disturb', offline:'offline' };
const activityTypeLabel = ['playing ', 'streaming ', 'listening to ', 'watching ', '', 'competing in '];
function describeActivity(data, status){
  if(!data) return statusLabels[status] || status;
  const custom = (data.activities || []).find(a => a.type === 4);
  if(custom && custom.state) return custom.state;
  if(data.listening_to_spotify && data.spotify){
    return 'listening to ' + (data.spotify.song || data.spotify.track_name) + ' — ' + (data.spotify.artist || data.spotify.artist_name);
  }
  const act = (data.activities || []).find(a => a.type !== 4);
  if(act) return (activityTypeLabel[act.type] || '') + act.name;
  return statusLabels[status] || status;
}
const ST = ['online', 'idle', 'dnd', 'offline'];
function setSt(el, st){ ST.forEach(s => el.classList.toggle(s, s === st)); }
function setDeco(box, ds){
  let d = box.querySelector('.d');
  if(ds){
    if(!d){ d = document.createElement('img'); d.className = 'd'; d.alt = ''; box.insertBefore(d, box.querySelector('.s')); }
    if(d.getAttribute('src') !== ds) d.src = ds;
  }else if(d) d.remove();
}
function render(id){
  const p = S[id], u = p && p.discord_user, st = p ? (p.discord_status || 'offline') : 'offline';
  const av = avatarUrl(u, id), ds = decoUrl(u), nm = u ? (u.display_name || u.global_name || u.username) : '';
  document.querySelectorAll('.ui[data-id="' + id + '"]').forEach(el => {
    const box = el.querySelector('.u'), a = box.querySelector('.a');
    setSt(box, st);
    if(a.getAttribute('src') !== av) a.src = av;
    setDeco(box, ds);
    if(nm) el.querySelector('.nm').textContent = nm.toLowerCase();
    el.title = (nm || (BYID[id] && BYID[id].name) || id) + ' · ' + st;
    const ss = el.querySelector('.ss');
    if(ss){ setSt(ss, st); ss.querySelector('span').textContent = describeActivity(p, st); }
  });
  if(openMember && openMember.discordId === id) fillProfile(openMember);
}
function startPresence(){
  Promise.all(ALL.map(id =>
    fetch('https://api.lanyard.rest/v1/users/' + id).then(r => r.json()).then(j => { if(j.success){ S[id] = j.data; render(id); } }).catch(() => {})
  )).then(socket);
  function socket(){
    let w, hb;
    try{ w = new WebSocket('wss://api.lanyard.rest/socket'); }catch(e){ return; }
    w.onmessage = m => {
      const j = JSON.parse(m.data);
      if(j.op === 1){ w.send(JSON.stringify({ op: 2, d: { subscribe_to_ids: ALL } })); hb = setInterval(() => { if(w.readyState === 1) w.send('{"op":3}'); }, j.d.heartbeat_interval); }
      else if(j.op === 0 && j.t === 'INIT_STATE'){ for(const key in j.d) if(j.d[key] && j.d[key].discord_user){ S[key] = j.d[key]; render(key); } }
      else if(j.op === 0 && j.t === 'PRESENCE_UPDATE' && j.d && j.d.discord_user){ S[j.d.discord_user.id] = j.d; render(j.d.discord_user.id); }
    };
    w.onclose = () => { clearInterval(hb); setTimeout(socket, 5000); };
  }
}

function setupIsland(o){
  const dv = document.querySelector('.dv[data-ix="' + o.ix + '"]');
  if(!dv) return;
  if(o.bg) dv.querySelector('.dbg').style.backgroundImage = 'url("' + o.bg + '")';
  function dToggle(x){
    const want = x === undefined ? !dv.classList.contains('open') : x;
    if(want === dv.classList.contains('open')) return;
    dv.classList.remove('sq'); void dv.offsetWidth; dv.classList.add('sq');
    dv.classList.toggle('open', want); dv.setAttribute('aria-expanded', want);
  }
  dv.addEventListener('click', e => { if(e.target.closest('.dj')) return; if(dv.classList.contains('open') && !e.target.closest('.dh')) return; dToggle(); });
  dv.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); e.stopPropagation(); dToggle(); } });
  document.addEventListener('click', e => { if(!dv.contains(e.target)) dToggle(false); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') dToggle(false); });
  const stats = (on, m) => {
    let h = '';
    if(on != null) h += '<span><i></i><b>' + Number(on).toLocaleString() + '</b> online</span>';
    if(m != null) h += '<span><i class="g"></i><b>' + Number(m).toLocaleString() + '</b> members</span>';
    dv.querySelector('.ds').innerHTML = h;
  };
  if(!o.code) return;
  fetch('https://discord.com/api/v10/invites/' + o.code + '?with_counts=true').then(r => r.json()).then(j => {
    if(j && (j.approximate_member_count != null || j.approximate_presence_count != null)) stats(j.approximate_presence_count, j.approximate_member_count);
  }).catch(() => {});
}

function fitAsciiEl(el, text, { maxFont=16, maxWidthRatio=0.92, maxWidthPx=1300 } = {}){
  const lines = text.split('\n');
  const longest = Math.max(...lines.map(l => l.length));
  const available = Math.min(window.innerWidth * maxWidthRatio, maxWidthPx);
  let fontSize = available / (longest * 0.6);
  fontSize = Math.max(3, Math.min(fontSize, maxFont));
  el.style.fontSize = fontSize + 'px';
}
function revealAscii(el, text, onComplete, { step=5, interval=6, holdAfter=700 } = {}){
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){
    el.textContent = text;
    setTimeout(onComplete, Math.min(holdAfter, 300));
    return;
  }
  let i = 0;
  function tick(){
    i = Math.min(text.length, i + step);
    el.innerHTML = esc(text.slice(0, i)) + '<span class="cursor-blink">&nbsp;</span>';
    if(i < text.length){ setTimeout(tick, interval); }
    else{ el.innerHTML = esc(text); setTimeout(onComplete, holdAfter); }
  }
  tick();
}


let aboutAnimated = false;
function typeAbout(){
  if(aboutAnimated) return;
  aboutAnimated = true;
  const el = document.getElementById('aboutAscii');
  fitAsciiEl(el, CONFIG.loadingAscii, { maxFont:15, maxWidthRatio:.82, maxWidthPx:640 });
  revealAscii(el, CONFIG.loadingAscii, typeTerminalLines, { step:4, interval:9, holdAfter:350 });
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
    div.innerHTML = prefixHTML + `<span class="${cls}">${esc(text)}</span>`;
    setTimeout(onDone, 120);
    return;
  }
  let i = 0;
  const step = 2, interval = 16;
  function tick(){
    i = Math.min(text.length, i + step);
    div.innerHTML = prefixHTML + `<span class="${cls}">${esc(text.slice(0, i))}</span><span class="cursor-blink">&nbsp;</span>`;
    if(i < text.length){ setTimeout(tick, interval); }
    else{
      div.innerHTML = prefixHTML + `<span class="${cls}">${esc(text)}</span>`;
      setTimeout(onDone, holdAfter);
    }
  }
  tick();
}
function typeTerminalLines(){
  const body = document.getElementById('termBody');
  body.querySelectorAll('.ln').forEach(el => el.remove());
  const term = CONFIG.terminal;
  const slug = CONFIG.siteName.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const lines = term.lines;

  const steps = [
    (next) => typeSegment(body, `<span class="prompt">root@${slug}:~$</span>&nbsp;`, term.command, 'out', next, 260),
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
    if(idx >= steps.length) return;
    const step = steps[idx];
    idx++;
    step(next);
  }
  next();
}


let started = false;
function startAmbientAudio(){
  if(started) return;
  started = true;
  const el = document.getElementById('bgMusicEl');
  el.src = CONFIG.music.url;
  el.volume = CONFIG.music.volume;
  el.play().catch(e => console.warn('background music blocked/unavailable', e));
}

function duckSiteAudio(){
  const bg = document.getElementById('bgMusicEl');
  if(bg && !bg.paused){ bg.dataset.wasPlaying = '1'; bg.pause(); }
}
function unduckSiteAudio(){
  const bg = document.getElementById('bgMusicEl');
  if(bg && bg.dataset.wasPlaying === '1'){ bg.play().catch(()=>{}); delete bg.dataset.wasPlaying; }
}


const profileModal = document.getElementById('profileModal');
let currentProfileMember = null;
let openMember = null;

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
      }catch(err){ }
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


function fillProfile(member){
  const id = member.discordId, p = S[id], u = p && p.discord_user, st = p ? (p.discord_status || 'offline') : 'offline';
  const box = document.getElementById('profileModalAvatarWrap'), a = document.getElementById('profileModalAvatar'), av = avatarUrl(u, id);
  setSt(box, st);
  if(a.getAttribute('src') !== av) a.src = av;
  setDeco(box, decoUrl(u));
  document.getElementById('profileModalName').textContent = u ? (u.display_name || u.global_name || u.username) : member.name;
  document.getElementById('profileModalHandle').textContent = u ? '@' + u.username : '';
  const sEl = document.getElementById('profileModalStatus');
  setSt(sEl, st); sEl.querySelector('span').textContent = statusLabels[st] || st;
  const txt = p ? describeActivity(p, st) : 'no presence data';
  const stEl = document.getElementById('profileModalStatusText');
  stEl.textContent = txt === (statusLabels[st] || st) ? '' : txt;
  stEl.style.display = stEl.textContent ? '' : 'none';
}

async function openProfile(member){
  if(!member) return;
  const slug = slugify(member.name);
  openMember = member; currentProfileMember = member;
  fillProfile(member);

  profileModal.style.backgroundImage = ''; profileModal.style.backgroundColor = '';
  profileModal.style.removeProperty('--pm-bg');
  const bgVal = member.background || CONFIG.profileDefaults.background;
  const hasBg = applyBackground(profileModal, bgVal);
  if(profileModal.style.backgroundImage){
    profileModal.style.setProperty('--pm-bg', profileModal.style.backgroundImage);
    profileModal.style.backgroundImage = '';
  }
  profileModal.classList.toggle('has-image', hasBg);

  profileModal.classList.add('visible');
  try{ history.pushState({ profile:slug }, '', '/' + slug); }catch(err){ console.warn('pushState failed', err); }

  const pm = document.getElementById('profileMusicEl');
  const musicVal = member.music || '';
  if(musicVal){
    duckSiteAudio();
    pm.src = musicVal;
    pm.volume = 0.5;
    pm.play().catch(()=>{});
  }
  const spotifyVal = member.spotify || '';
  renderProfileSpotify(document.getElementById('profileModalMusicCard'), document.getElementById('profileModalSpotify'), spotifyVal, { autoplay: !musicVal });

  const viewsCountEl = document.getElementById('profileModalViewsCount');
  viewsCountEl.textContent = '···';
  bumpProfileViewCount(slug).then(count => {
    if(currentProfileMember !== member) return;
    viewsCountEl.textContent = typeof count === 'number' ? count.toLocaleString() : '—';
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
    startAmbientAudio();
  }
  if(location.pathname !== '/'){
    try{ history.pushState(null, '', '/'); }catch(err){ console.warn('pushState failed', err); }
  }
  openMember = null; currentProfileMember = null;
}
document.getElementById('profileModalClose').addEventListener('click', closeProfile);
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeProfile(); });
window.addEventListener('popstate', closeProfile);

ro.addEventListener('click', e => { const el = e.target.closest('.ui'); if(el && entered) openProfile(BYID[el.dataset.id]); });
ro.addEventListener('keydown', e => {
  if((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('ui')){
    e.preventDefault(); e.stopPropagation(); openProfile(BYID[e.target.dataset.id]);
  }
});

function enter(){
  if(entered) return;
  entered = true;
  document.body.classList.add('in');
  if(window.asciiKick) window.asciiKick();
  setTimeout(() => {
    document.getElementById('p-' + cur).classList.add('in');
    pill(); setBg(cur);
    if(cur === 'about') typeAbout();
  }, 800);
  startAmbientAudio();
  if(deepLinkedProfile) setTimeout(() => openProfile(deepLinkedProfile), 300);
}
document.addEventListener('click', enter);
document.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') enter(); });

pill();
addEventListener('resize', pill);
setupIsland(INV);
AFFS.forEach(setupIsland);
startPresence();

(function setupProfileMouseTrail(){
  const canvas = document.getElementById('profileTrailCanvas');
  if(!canvas || !canvas.getContext) return;
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;

  const ctx = canvas.getContext('2d');
  const COLOR_STOPS = [
    [255, 255, 255],
    [255, 59, 82],
    [179, 24, 47],
    [12, 6, 6],
  ];
  const CYCLE_MS = 1400; 
  const LIFESPAN_MS = 950;
  const MAX_PARTICLES = 90;
  const MIN_RADIUS = 3;   
  const MAX_RADIUS = 10; 

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

    for(const p of particles){
      const age = (now - p.born) / LIFESPAN_MS; 
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

  const visibilityObserver = new MutationObserver(() => {
    if(profileModal.classList.contains('visible')) resizeCanvas();
  });
  visibilityObserver.observe(profileModal, { attributes: true, attributeFilter: ['class'] });
  resizeCanvas();
})();
