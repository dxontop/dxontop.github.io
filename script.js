(() => {
'use strict';


if(window.tailwind){
  window.tailwind.config = {
    theme: {
      extend: {
        colors: {
          blood: {
            DEFAULT: '#ff2438',
            soft: '#ff6b78',
            dim: '#b33a46',
            ok: '#ff4d5c',
            deep: '#7a2a33',
            ash: '#6b4046',
            dusk: '#4a1a20'
          },
          good: '#4ade80',
          warn: '#facc15',
          mute: '#5b5b63'
        },
        fontFamily: {
          mono: ['"Cascadia Code"', 'Consolas', '"Lucida Console"', 'ui-monospace', 'monospace']
        }
      }
    }
  };
}

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const CONFIG = 
{
  siteName: 'Threat2Society',

  copy: {
    heroTagline:        'they hate us cuz they aint us',
    hofSubtitle:         "bet you can't be us",
    bigThreatsSubtitle:  'ingat sa mga to baka patayin ka nila',
    membersSubtitle:     'mga bawal batahin',
    godmothersSubtitle:  'the ones who made us',
  },

  
  discordInvite: {
    name: 'Threat2Society',
    url: 'https://discord.gg/nNW8WBtxGw',
  },

  terminal: {
    user: 't2s',
    host: 'caliber',
    status: 'Status: silent but can be the reason of your nightmare',
    about: [
      'started as a small circle until it became one of the most hated names in the area',
    ],
    roster: [
      'everybody wanna be us, but they cant be us',
    ],
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

  bgAscii: `            Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶                  
        Â¶Â¶Â¶Â¶             Â¶Â¶Â¶Â¶Â¶              
       Â¶Â¶Â¶                   Â¶Â¶Â¶Â¶          
      Â¶Â¶Â¶Â¶                      Â¶Â¶Â¶        
     Â¶Â¶                          Â¶Â¶Â¶      
    Â¶Â¶                              Â¶Â¶     
   Â¶Â¶                               Â¶Â¶    
   Â¶                                  Â¶   
  Â¶Â¶                                  Â¶Â¶  
 Â¶Â¶          Â¶Â¶Â¶                       Â¶  
  Â¶         Â¶Â¶                          Â¶Â¶ 
  Â¶         Â¶               Â¶Â¶Â¶         Â¶Â¶ 
  Â¶    Â¶Â¶ Â¶Â¶ Â¶Â¶Â¶Â¶Â¶ Â¶          Â¶Â¶Â¶        Â¶ 
  Â¶        Â¶   Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶    Â¶Â¶Â¶        Â¶ 
  Â¶Â¶     Â¶Â¶Â¶Â¶  Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶  Â¶Â¶Â¶ Â¶Â¶   Â¶Â¶Â¶
  Â¶Â¶   Â¶Â¶Â¶Â¶Â¶Â¶  Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶ Â¶Â¶Â¶Â¶Â¶Â¶Â¶ Â¶Â¶ 
  Â¶   Â¶Â¶Â¶Â¶Â¶Â¶Â¶   Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶ Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶  
 Â¶Â¶  Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶   Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶ Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶  
    Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶    Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶ Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶  
      Â¶Â¶Â¶Â¶Â¶Â¶Â¶  Â¶Â¶    Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶   Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶  
      Â¶  Â¶Â¶Â¶   Â¶Â¶Â¶                 Â¶Â¶Â¶Â¶Â¶Â¶Â¶   
     Â¶Â¶       Â¶Â¶Â¶Â¶Â¶Â¶ Â¶               Â¶Â¶Â¶     
     Â¶Â¶     Â¶Â¶Â¶    Â¶Â¶Â¶Â¶           Â¶Â¶Â¶Â¶       
      Â¶Â¶     Â¶      Â¶Â¶        Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶      
       Â¶Â¶Â¶Â¶Â¶          Â¶  Â¶ Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶Â¶       
          Â¶Â¶Â¶   Â¶Â¶Â¶Â¶ Â¶Â¶ Â¶Â¶Â¶  Â¶Â¶Â¶Â¶Â¶  Â¶Â¶       
           Â¶Â¶Â¶Â¶Â¶ Â¶  Â¶Â¶ Â¶ Â¶ Â¶   Â¶Â¶    Â¶       
            Â¶          Â¶Â¶    Â¶     Â¶       
             Â¶Â¶Â¶Â¶Â¶ Â¶Â¶Â¶Â¶Â¶Â¶       Â¶Â¶    Â¶       
                  Â¶Â¶Â¶Â¶Â¶Â¶          Â¶    Â¶       
                   Â¶Â¶ Â¶Â¶          Â¶Â¶  Â¶Â¶       
                    Â¶Â¶Â¶Â¶Â¶          Â¶    Â¶       
                     Â¶Â¶Â¶Â¶Â¶        Â¶Â¶    Â¶Â¶      
                     Â¶Â¶Â¶Â¶Â¶       Â¶ Â¶     Â¶      
                     Â¶ Â¶Â¶Â¶      Â¶  Â¶Â¶    Â¶      
                     Â¶Â¶Â¶Â¶Â¶     Â¶Â¶  Â¶Â¶  Â¶       
                     Â¶Â¶Â¶Â¶Â¶   Â¶Â¶Â¶  Â¶Â¶  Â¶       
                      Â¶Â¶Â¶Â¶Â¶Â¶Â¶  Â¶Â¶Â¶   Â¶Â¶       
                       Â¶Â¶    Â¶Â¶Â¶    Â¶          
                           Â¶Â¶Â¶Â¶     Â¶          
                             Â¶Â¶    Â¶Â¶          
                              Â¶Â¶Â¶Â¶Â¶Â¶Â¶`,

  mainThreats: [
    { name:'daz', music:'pf/daz.mp3', background:'pf/daz.gif', discordId:'1521890728094208122' },
    { name:'caliber', music:'pf/caliber.mp3', background: 'pf/caliber.gif', discordId:'1512675755459612835' },
    { name:'faiyaz', music:'', background:'', discordId:'1402292483584426134' },
  ],

  bigThreats: [
    { name:'zowi', music:'pf/zowi.mp3', background:'pf/zowi.gif', discordId:'1081132499767410688' },
    { name:'sevi', music:'', background:'',  discordId:'769457309562568706' },
    { name:'jon', music:'pf/jon.mp3', background:'pf/jon.gif', discordId:'1010028872282157106' },
    { name:'gun', music:'pf/gun.mp3', background:'pf/gun.gif', discordId:'1495036966360842260' },
    { name:'yuzuki', music:'pf/yuzuki.mp3', background:'pf/yuzuki.gif', discordId:'1518082674017701888' },
    { name:'zy', music:'pf/zy.mp3', background:'pf/zy.gif', discordId:'1245749945353375766' },
    { name:'kio', music:'pf/kio.mp3', background:'pf/kio.gif',  discordId:'751387160057217066' },
    { name:'rue', music:'pf/rue.mp3', background:'pf/rue.gif', discordId:'1502126548096909353' },
    { name:'cho',     discordId:'1503083605444788235' },
    { name:'zei',   discordId:'1248910763494473728' },
    { name:'forth',    discordId:'1505315891087282176' },
    { name:'soul',    discordId:'1446067102900551741' },
    { name:'blake', music:'pf/blake.mp3', background:'pf/blake.gif',  discordId:'1244678008175071263' },
    { name:'jor', music:'pf/jor.mp3', background:'pf/jor.gif', discordId:'1403234492419670038' },
  ],

  heirs: [
    { name:'hesu',   discordId:'795725566476812348' },
    { name:'mudd',   discordId:'1550100417185058816' },
  ],

  godmothers: [
    { name:'sao', music:'pf/sao.mp3', background:'pf/sao.gif', discordId:'1310763051636752415' },
    { name:'aeri', music:'pf/aeri.mp3', background:'pf/aeri.gif', discordId:'992033485973880842' },
  ],

  members: [
    { name:'louve',    discordId:'902804741883588619' },
    { name:'hunter',    discordId:'1511980297149747246' },
    { name:'ryokai',   discordId:'900336233031540787' },
    { name:'zei',   discordId:'1248910763494473728' },
    { name:'wiz',   discordId:'1280059534169210896' },
    { name:'mimi',   discordId:'1444205221814210700' },
    { name:'seia',    discordId:'748713264652746813' },
    { name:'ghost',   discordId:'965848814164520970' },
  ],

  gangnem: [
    { name: '', invite: 'https://discord.gg/UdMCNRW2Fk', online: null, members: null },
    { name: '', invite: 'https://discord.gg/86bvBVXaFV', online: null, members: null },
    { name: '', invite: 'https://discord.gg/sPRtUMTzfC', online: null, members: null },
    { name: '', invite: 'https://discord.gg/QXxs5Pxp48', online: null, members: null },
    { name: '', invite: 'https://discord.gg/zXdMdcRgCM', online: null, members: null },
  ],

  music: {
    url: 'music/t2sontop_V1.mp3',
    volume: 0.50,
  },

  profileDefaults: {
    banner: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="340" viewBox="0 0 1200 340">'
      + '<defs>'
      + '<linearGradient id="g" x1="0" y1="0" x2=".85" y2="1">'
      + '<stop offset="0" stop-color="#2b0509"/><stop offset=".55" stop-color="#150207"/><stop offset="1" stop-color="#070102"/>'
      + '</linearGradient>'
      + '<radialGradient id="r" cx=".16" cy=".08" r=".95">'
      + '<stop offset="0" stop-color="#ff2438" stop-opacity=".38"/><stop offset="1" stop-color="#ff2438" stop-opacity="0"/>'
      + '</radialGradient>'
      + '<pattern id="d" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">'
      + '<line x1="0" y1="0" x2="0" y2="24" stroke="#ff2438" stroke-opacity=".07" stroke-width="1"/>'
      + '</pattern>'
      + '</defs>'
      + '<rect width="1200" height="340" fill="url(#g)"/>'
      + '<rect width="1200" height="340" fill="url(#r)"/>'
      + '<rect width="1200" height="340" fill="url(#d)"/>'
      + '<path d="M0 292 L1200 202" stroke="#ff2438" stroke-opacity=".12" stroke-width="2"/>'
      + '<path d="M0 310 L1200 220" stroke="#ff2438" stroke-opacity=".07" stroke-width="1"/>'
      + '<text x="1136" y="300" text-anchor="end" font-family="Consolas,monospace" font-size="196" font-weight="700" letter-spacing="-10" fill="#ff2438" fill-opacity=".08">T2S</text>'
      + '</svg>'
    ),
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

};
document.getElementById('root').innerHTML = `
<div id="bg" aria-hidden="true"></div>
<canvas id="matrix" aria-hidden="true"></canvas>
<canvas id="smoke" aria-hidden="true"></canvas>

<div id="enter" role="button" tabindex="0" aria-label="Playing intro" class="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-hidden bg-black p-5 text-blood focus:outline-none">
  <div class="splash" aria-hidden="true">
    <img id="splashArt" class="splash-video" src="media/intro-3s.gif" width="600" height="600" alt="" draggable="false">
    <img id="splashEnd" class="splash-video splash-end" src="media/intro-hold.png" width="600" height="600" alt="" draggable="false">
  </div>
  <div class="enter-inner relative z-[1] flex max-w-full flex-col items-center">
    <pre id="enterArt" class="relative z-[1] m-0 select-none whitespace-pre font-mono leading-none text-blood" aria-hidden="true"></pre>
    <div class="enter-load" aria-hidden="true">
      <span class="enter-load-label">loading</span>
      <span class="enter-load-bar"><i id="enterLoadFill"></i></span>
      <span class="enter-load-pct" id="enterLoadPct">0%</span>
    </div>
    <span class="enter-tag" aria-hidden="true">@ t2s</span>
  </div>
  <span class="enter-hint">[ click to enter ]</span>
</div>

<div id="shell" class="relative z-[3] flex h-full flex-col items-center overflow-x-hidden overflow-y-auto px-[4vw] pb-[7vh] pt-[6vh] max-[700px]:pb-[6vh] max-[700px]:pt-[5vh]">
  <section id="hero" class="relative flex min-h-[calc(100dvh_-_6vh)] w-full flex-col items-center justify-center max-[700px]:min-h-[calc(100dvh_-_5vh)]">
    <div class="banner-wrap relative flex w-full justify-center overflow-hidden"><pre id="banner" class="relative m-0 select-none whitespace-pre font-mono leading-none text-blood" aria-hidden="true"></pre></div>
    <p class="mt-[46px] text-center text-[17px] tracking-[.02em] max-[700px]:text-[15px]"><span class="tagline">${esc(CONFIG.copy.heroTagline)}</span></p>
  </section>
  <div id="roster" class="mt-12 flex w-[min(1120px,100%)] flex-col items-center gap-[34px] max-[700px]:mt-10 max-[700px]:gap-7"></div>
  <section id="gangnem" class="reveal mt-[34px] w-[min(1120px,100%)] max-[700px]:mt-7" aria-label="servers">
    <div class="sec-title">gangnem</div>
    <div id="gangnemRow" class="marquee"></div>
  </section>
  <section id="term" class="reveal mt-14 w-[min(1120px,100%)]" aria-label="terminal">
    <div class="overflow-hidden rounded-xl border border-blood/25 bg-[#050102] shadow-[0_26px_80px_rgba(0,0,0,.85),0_0_56px_rgba(255,36,56,.08)]">
      <div class="flex items-center gap-3 border-b border-blood/20 bg-[#0c0205] px-3.5 py-2">
        <span class="flex flex-none items-center gap-1.5" aria-hidden="true">
          <i class="h-2.5 w-2.5 rounded-full bg-blood shadow-[0_0_8px_rgba(255,36,56,.55)]"></i>
          <i class="h-2.5 w-2.5 rounded-full bg-blood-dim"></i>
          <i class="h-2.5 w-2.5 rounded-full bg-blood-dusk"></i>
        </span>
        <span class="min-w-0 flex-1 truncate text-center text-[10.5px] tracking-[.14em] text-blood-dim">${esc(CONFIG.terminal.user)}@${esc(CONFIG.terminal.host)}: ~</span>
        <span class="w-[46px] flex-none select-none text-right text-[9px] tracking-[.2em] text-blood-ash" aria-hidden="true">tty1</span>
      </div>
      <div id="termBody" class="px-4 pb-4 pt-4 font-mono text-[12.5px] leading-[1.62] text-blood-soft max-[700px]:px-3 max-[700px]:text-[11.5px]">
        <div id="termOut" class="whitespace-pre-wrap break-words" role="log" aria-live="polite" aria-label="Terminal output"></div>
        <form id="termForm" class="mt-2 flex items-center gap-1.5" autocomplete="off">
          <span class="flex-none select-none" aria-hidden="true"><span class="text-blood-ok">${esc(CONFIG.terminal.user)}@${esc(CONFIG.terminal.host)}</span><span class="text-blood-ash">:</span><span class="text-blood">~</span><span class="text-blood-ash">$</span></span>
          <input id="termInput" class="min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-[12.5px] text-blood caret-blood outline-none placeholder:text-blood-ash/70 max-[700px]:text-[16px]" type="text" placeholder="type 'help'" aria-label="Terminal command" spellcheck="false" autocapitalize="off" autocorrect="off">
        </form>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-blood/15 bg-[#0a0103] px-3.5 py-2 text-[10px] tracking-[.08em] text-blood-dim">
        <span class="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>${esc(CONFIG.siteName.toLowerCase())} / all hail t2s</span>
          <span class="h-[3px] w-[3px] rounded-full bg-blood-dim/70"></span>
          <a class="border-b border-blood-dim/40 pb-px transition-colors hover:border-blood hover:text-blood" href="${esc(CONFIG.discordInvite.url)}" target="_blank" rel="noopener noreferrer">${esc(CONFIG.discordInvite.name)}</a>
        </span>
        <span class="select-none">tty1 &middot; 80x24</span>
      </div>
    </div>
  </section>
</div>

<div id="hoverCard" class="invisible fixed z-[25] w-[216px] translate-y-1.5 scale-[.98] overflow-hidden rounded-lg border border-blood/35 bg-[#0a0104] opacity-0 shadow-[0_16px_42px_rgba(0,0,0,.82),0_0_28px_rgba(255,36,56,.14),inset_0_1px_0_rgba(255,60,75,.06)]" aria-hidden="true">
  <div class="hc-banner relative h-[58px] bg-[#1a070a] bg-cover bg-center bg-no-repeat" id="hoverCardBanner"></div>
  <div class="relative z-[1] -mt-[21px] flex items-end gap-2 px-[11px]">
    <div class="hc-av offline relative h-[42px] w-[42px] flex-none rounded-full border-2 border-[#0a0405] shadow-[0_0_16px_rgba(255,36,56,.35)]" id="hoverCardAvatarWrap">
      <img class="a block h-full w-full rounded-full bg-[#1a070a] object-cover transition-opacity duration-300" id="hoverCardAvatar" src="" alt="">
      <span class="s absolute -bottom-px -right-px z-[2] h-3 w-3 rounded-full border-2 border-[#0a0405]"></span>
    </div>
    <div class="min-w-0 pb-px">
      <div class="truncate text-[12.5px] leading-tight tracking-[.02em] text-blood-soft" id="hoverCardName"></div>
      <div class="truncate text-[9.5px] tracking-[.03em] text-blood-dim" id="hoverCardHandle"></div>
    </div>
  </div>
  <div class="px-[11px] pt-[7px]"><span class="st offline" id="hoverCardStatus"><i></i><span>offline</span></span></div>
  <div class="truncate px-[11px] pb-2.5 pt-1 text-[9.5px] tracking-[.02em] text-blood-dim" id="hoverCardAct"></div>
</div>

<audio id="bgMusicEl" preload="none" loop></audio>
<audio id="profileMusicEl" preload="none" loop></audio>

<div id="profileModal" class="invisible fixed inset-0 z-30 grid place-items-center bg-black/70 p-[18px] opacity-0" aria-hidden="true">
  <div class="tm relative z-[1] flex max-h-[92dvh] w-[min(96vw,780px)] translate-y-4 scale-[.965] flex-col overflow-hidden rounded-[10px] border border-blood/40 bg-[#080103] shadow-[0_34px_90px_rgba(0,0,0,.92),0_0_70px_rgba(255,36,56,.16),inset_0_1px_0_rgba(255,60,75,.07)] max-[700px]:w-full" role="dialog" aria-modal="true" aria-label="Member profile">
    <div class="flex flex-none items-center gap-[11px] border-b border-blood/20 bg-[#100206] px-[13px] py-2.5 text-[11px] tracking-[.06em] text-blood-dim">
      <span class="tm-dots"><i></i><i></i><i></i></span>
      <span class="min-w-0 flex-1 truncate text-blood-soft/80" id="profileModalPath">t2s@shell: ~/profiles</span>
      <button class="grid h-[22px] w-[22px] flex-none place-items-center rounded-[3px] border-0 bg-transparent text-[13px] leading-none text-blood-dim transition-colors hover:bg-blood/20 hover:text-blood" type="button" id="profileModalClose" aria-label="Close profile">&#10005;</button>
    </div>
    <div class="tm-body relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-6 pt-5 font-mono text-[14.5px] leading-[1.66] text-blood-soft [-webkit-overflow-scrolling:touch] max-[700px]:px-4 max-[700px]:pb-[18px] max-[700px]:pt-4 max-[700px]:text-[13.5px]" id="profileModalBody">
      <div class="tm-line mb-1 truncate whitespace-nowrap text-blood-ok">
        <span class="text-blood-dim pm-user">t2s@shell</span><span class="text-[#6b4046]">:</span><span class="text-blood [text-shadow:0_0_8px_rgba(255,36,56,.35)]">~</span><span class="text-[#6b4046]">$</span> <span class="ml-1.5 text-blood" id="profileModalCmd"></span>
      </div>
      <div class="tm-run mt-[7px] flex items-center gap-2 text-[12.5px] tracking-[.01em] text-blood-dim opacity-0" id="profileModalRun" hidden>
        <span class="tm-spin h-2.5 w-2.5 flex-none animate-[spin_.7s_linear_infinite] rounded-full border-[1.5px] border-blood/30 border-t-blood"></span><span id="profileModalRunText"></span>
      </div>
      <div class="tm-out my-3.5 ml-0 pl-px">
        <div class="mb-3.5 text-xs tracking-[.02em] text-blood-dim">fetching profile from discord <span class="text-blood [text-shadow:0_0_8px_rgba(255,36,56,.35)]">[ ok ]</span></div>
        <div class="mb-3.5 flex items-center gap-3.5">
          <div class="tm-av offline relative h-20 w-20 flex-none max-[700px]:h-16 max-[700px]:w-16 max-[360px]:h-14 max-[360px]:w-14" id="profileModalAvatarWrap">
            <img class="a block h-full w-full rounded-full bg-[#1a070a] object-cover shadow-[0_0_26px_rgba(255,36,56,.36)] transition-opacity duration-300" id="profileModalAvatar" src="" alt="">
            <span class="s absolute -bottom-px -right-px z-[2] h-[18px] w-[18px] rounded-full border-[3px] border-[#0a0405]"></span>
          </div>
          <div class="min-w-0">
            <div class="truncate text-[22px] leading-tight tracking-[.03em] text-[#ff7b87] max-[700px]:text-[19px] max-[360px]:text-[17px]" id="profileModalName"></div>
            <div class="mt-1 text-[13px] tracking-[.03em] text-blood-dim" id="profileModalHandle"></div>
          </div>
          <pre class="pm-art" id="profileModalArt" aria-hidden="true"></pre>
        </div>
        <div class="grid grid-cols-[96px_1fr] gap-2.5 text-[13.5px] leading-[1.82] max-[700px]:grid-cols-[82px_1fr] max-[700px]:text-[12.5px]"><span class="k text-[#b06a72] after:float-right after:text-[#5e3a3f] after:content-[':']">status</span><span class="min-w-0 break-words text-blood-soft"><span class="st offline" id="profileModalStatus"><i></i><span>offline</span></span></span></div>
        <div class="grid grid-cols-[96px_1fr] gap-2.5 text-[13.5px] leading-[1.82] max-[700px]:grid-cols-[82px_1fr] max-[700px]:text-[12.5px]"><span class="k text-[#b06a72] after:float-right after:text-[#5e3a3f] after:content-[':']">activity</span><span class="min-w-0 break-words text-blood-soft" id="profileModalStatusText"></span></div>
        <div class="grid grid-cols-[96px_1fr] gap-2.5 text-[13.5px] leading-[1.82] max-[700px]:grid-cols-[82px_1fr] max-[700px]:text-[12.5px]"><span class="k text-[#b06a72] after:float-right after:text-[#5e3a3f] after:content-[':']">views</span><span class="min-w-0 break-words text-blood-soft" id="profileModalViewsCount">&middot;&middot;&middot;</span></div>
      </div>
      <div class="tm-line tm-end mb-1 mt-0.5 truncate whitespace-nowrap text-blood-ok"><span class="text-blood-dim pm-user">t2s@shell</span><span class="text-[#6b4046]">:</span><span class="text-blood [text-shadow:0_0_8px_rgba(255,36,56,.35)]">~</span><span class="text-[#6b4046]">$</span> <span class="tm-caret ml-[7px] inline-block h-4 w-2 -translate-y-[3px] animate-[bl_1s_steps(1)_infinite] bg-blood"></span></div>
    </div>
  </div>
</div>
`;

const BG_LAYOUT = [
  { top: '-10%', left: '62%',  size: 13, o: .16, r: 8,   dx: 18,  dy: -16 },
  { top: '44%',  left: '-7%',  size: 11, o: .13, r: 5,   dx: -14, dy: 20  },
  { top: '58%',  left: '47%',  size: 14, o: .12, r: -4,  dx: 12,  dy: -22 },
  { top: '18%',  left: '80%',  size: 8,  o: .14, r: -12, dx: -16, dy: 14  },
  { top: '-6%',  left: '-3%',  size: 9,  o: .09, r: -7,  dx: 14,  dy: 18  },
  { top: '66%',  left: '74%',  size: 9,  o: .13, r: 10,  dx: -18, dy: -12 },
  { top: '20%',  left: '26%',  size: 7,  o: .08, r: -10, dx: 16,  dy: -18 },
  { top: '76%',  left: '28%',  size: 8,  o: .09, r: 6,   dx: -12, dy: 16  },
];
(function buildBackground(){
  const bgEl = document.getElementById('bg');
  for(const cfg of BG_LAYOUT){
    const art = document.createElement('pre');
    art.className = 'bgart';
    art.setAttribute('aria-hidden', 'true');
    art.textContent = CONFIG.bgAscii;
    art.style.top = cfg.top;
    art.style.left = cfg.left;
    art.style.fontSize = cfg.size + 'px';
    art.style.setProperty('--o', cfg.o);
    art.style.setProperty('--r', cfg.r + 'deg');
    art.style.setProperty('--dx', cfg.dx + 'px');
    art.style.setProperty('--dy', cfg.dy + 'px');
    bgEl.appendChild(art);
  }
})();

const CDN = 'https://cdn.discordapp.com/';
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  el.style.backgroundColor = v;
  return false;
}
function backgroundValue(val){
  const probe = document.createElement('div');
  const ok = applyBackground(probe, val);
  return { image: probe.style.backgroundImage, ok };
}
function profileBanner(member){
  return (member && (member.banner || member.background)) || CONFIG.profileDefaults.banner;
}

const validOnly = arr => (arr || []).filter(m => m && m.name && m.name.trim());
const ALL_POOLS = () => [CONFIG.mainThreats, CONFIG.heirs, CONFIG.bigThreats, CONFIG.godmothers, CONFIG.members];
const BYID = {};
ALL_POOLS().forEach(pool => validOnly(pool).forEach(m => { if(!BYID[m.discordId]) BYID[m.discordId] = m; }));
const ALL = Object.keys(BYID);

function findMemberBySlug(slug){
  for(const pool of ALL_POOLS()){
    const found = (pool || []).find(m => m && m.name && slugify(m.name) === slug);
    if(found) return found;
  }
  return null;
}
const pathSlug = location.pathname.replace(/^\/+|\/+$/g, '');
const deepLinkedProfile = pathSlug ? findMemberBySlug(pathSlug) : null;

const HEIR_SLOTS = 2;
const GODMOTHER_SLOTS = 3;
const GROUPS = [
  ['HOF', CONFIG.copy.hofSubtitle, CONFIG.mainThreats, 0],
  ['Heirs', '', CONFIG.heirs, HEIR_SLOTS],
  ['Founding Members', CONFIG.copy.bigThreatsSubtitle, CONFIG.bigThreats, 0],
  ['Godmothers', CONFIG.copy.godmothersSubtitle, CONFIG.godmothers, GODMOTHER_SLOTS],
  ['Goodkids', CONFIG.copy.membersSubtitle, CONFIG.members, 0],
];

const CARD_CLS = 'm group/card flex w-[84px] max-[700px]:w-[72px] max-[360px]:w-16 cursor-pointer appearance-none flex-col items-center border-0 bg-transparent p-0 text-center font-[inherit] text-inherit [-webkit-tap-highlight-color:transparent]';
const AV_CLS = 'av offline relative my-[9px] mb-2.5 h-16 w-16 flex-none max-[700px]:h-14 max-[700px]:w-14 max-[360px]:h-[50px] max-[360px]:w-[50px]';
const AV_IMG_CLS = 'a block h-full w-full rounded-full bg-[#1a070a] object-cover shadow-[0_0_14px_rgba(255,36,56,.24)] transition-[box-shadow,transform,opacity] duration-[350ms] group-hover/card:scale-105 group-hover/card:shadow-[0_0_24px_rgba(255,36,56,.55)]';
const DOT_CLS = 's absolute -bottom-px -right-px z-[2] h-4 w-4 rounded-full border-[3px] border-black';
const NM_CLS = 'nm max-w-full truncate text-[11.5px] text-blood-ok [text-shadow:0_0_4px_#000,0_0_8px_rgba(255,36,56,.4)] transition-colors duration-300 group-hover/card:text-blood';

function cardHTML(m){
  const id = m.discordId;
  return '<button class="' + CARD_CLS + '" type="button" data-id="' + esc(id) + '" aria-label="' + esc(m.name) + ' profile">'
    + '<span class="' + AV_CLS + '"><img class="' + AV_IMG_CLS + '" src="' + def(id) + '" alt="" loading="lazy" referrerpolicy="no-referrer"><span class="' + DOT_CLS + '"></span></span>'
    + '<span class="' + NM_CLS + '">' + esc(m.name) + '</span></button>';
}

function placeholderHTML(){
  return '<div class="m m-empty pointer-events-none flex w-[84px] max-[700px]:w-[72px] max-[360px]:w-16 flex-col items-center" aria-hidden="true">'
    + '<span class="av relative my-[9px] mb-2.5 grid h-16 w-16 flex-none place-items-center rounded-full border border-dashed border-blood/30 bg-blood/[.03] max-[700px]:h-14 max-[700px]:w-14 max-[360px]:h-[50px] max-[360px]:w-[50px]"><span class="q text-xl text-blood-dim [text-shadow:0_0_8px_rgba(255,36,56,.3)]">?</span></span>'
    + '<span class="nm max-w-full truncate text-[11.5px] italic text-blood-dim">empty</span></div>';
}

function cardsHTML(list, slots){
  const items = [], blanks = [];
  (list || []).forEach(m => {
    if(m && m.name && String(m.name).trim()) items.push(m);
    else blanks.push(m);
  });
  const empty = Math.max(0, (slots || 0) - items.length, blanks.length);
  return items.map(cardHTML).concat(Array.from({ length: empty }, placeholderHTML))
    .map((html, i) => html.replace(/^<([a-z][\w-]*)/i, '<$1 style="--i:' + i + '"'))
    .join('');
}

function sectionHTML(id, title, list, slots){
  return '<section class="reveal w-full" id="' + id + '">'
    + '<div class="sec-title">' + esc(title) + '</div>'
    + '<div class="row flex flex-wrap items-start justify-center gap-x-[22px] gap-y-[26px] max-[700px]:gap-x-3 max-[700px]:gap-y-5">'
    + cardsHTML(list, slots) + '</div></section>';
}

const groupAnchor = gi => 'gang-' + GROUPS[gi][0].toLowerCase().replace(/[^a-z0-9]+/g, '-');

const rosterEl = document.getElementById('roster');
rosterEl.innerHTML = GROUPS
  .map(([title, , list, slots], gi) => sectionHTML(groupAnchor(gi), title, list, slots))
  .join('');

const GANGNEM_CARD_W = 300;
const GANGNEM_GAP = 14;

const inviteCode = srv => {
  const raw = String((srv && (srv.invite || srv.code || srv.url)) || '').trim();
  if(!raw) return '';
  return raw
    .replace(/^https?:\/\/(?:www\.)?(?:discord\.gg|discord(?:app)?\.com\/invite)\//i, '')
    .replace(/[?#].*$/, '')
    .replace(/\/+$/, '');
};

const serverCount = n => typeof n === 'number' && isFinite(n) && n >= 0 ? n.toLocaleString('en-US') : '\u00b7\u00b7\u00b7';

function serverCard(srv, i){
  const name = srv.name || 'server';
  const code = inviteCode(srv);
  const href = srv.url || (code ? 'https://discord.gg/' + code : '');
  const icon = srv.icon
    ? '<img src="' + esc(srv.icon) + '" alt="" loading="lazy" referrerpolicy="no-referrer">'
    : '<span class="g-ico-mark" aria-hidden="true">' + esc(name.replace(/[^a-z0-9]/gi, '').slice(0, 3).toLowerCase()) + '</span>';
  const inner = '<span class="g-ico">' + icon + '</span>'
    + '<span class="g-body"><span class="g-name">' + esc(name) + '</span>'
    + '<span class="g-meta"><i class="g-live' + (srv.online ? '' : ' off') + '" aria-hidden="true"></i>'
    + '<span class="g-count"><b class="g-online">' + serverCount(srv.online) + '</b> online &middot; <b class="g-total">' + serverCount(srv.members) + '</b> members</span></span></span>'
    + '<span class="g-go" aria-hidden="true">&#8594;</span>';
  return href
    ? '<a class="gcard" data-srv="' + i + '" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(name) + ' on Discord">' + inner + '</a>'
    : '<span class="gcard" data-srv="' + i + '">' + inner + '</span>';
}

function buildGangnem(){
  const servers = (CONFIG.gangnem || []).filter(Boolean);
  const cards = servers.map(serverCard);
  const per = Math.max(1, Math.ceil(1120 / Math.max(1, cards.length * (GANGNEM_CARD_W + GANGNEM_GAP))));
  const set = cards.join('').repeat(per);
  const row = document.getElementById('gangnemRow');
  row.style.setProperty('--dur', Math.max(24, Math.round((cards.length * per * (GANGNEM_CARD_W + GANGNEM_GAP)) / 46)) + 's');
  row.innerHTML = '<div class="marquee-inner"><div class="m-set">' + set + '</div><div class="m-set" aria-hidden="true">' + set + '</div></div>';
}

function paintGangnem(){
  const servers = CONFIG.gangnem || [];
  document.querySelectorAll('#gangnemRow [data-srv]').forEach(el => {
    const srv = servers[Number(el.dataset.srv)];
    if(!srv) return;
    const name = srv.name || 'server';
    const nameEl = el.querySelector('.g-name');
    const online = el.querySelector('.g-online');
    const total = el.querySelector('.g-total');
    const live = el.querySelector('.g-live');
    if(nameEl) nameEl.textContent = name;
    if(online) online.textContent = serverCount(srv.online);
    if(total) total.textContent = serverCount(srv.members);
    if(live) live.classList.toggle('off', !srv.online);
    const ico = el.querySelector('.g-ico');
    if(ico){
      const img = ico.querySelector('img');
      if(srv.icon){
        if(!img) ico.innerHTML = '<img src="' + esc(srv.icon) + '" alt="" loading="lazy" referrerpolicy="no-referrer">';
        else if(img.getAttribute('src') !== srv.icon) img.src = srv.icon;
      }else if(!img){
        const mark = ico.querySelector('.g-ico-mark');
        if(mark) mark.textContent = name.replace(/[^a-z0-9]/gi, '').slice(0, 3).toLowerCase();
      }
    }
    if(el.tagName === 'A'){
      if(srv.url && el.getAttribute('href') !== srv.url) el.setAttribute('href', srv.url);
      el.setAttribute('aria-label', name + ' on Discord');
    }
  });
}

const serverIcon = g => g && g.id && g.icon
  ? 'https://cdn.discordapp.com/icons/' + g.id + '/' + g.icon + (/^a_/.test(g.icon) ? '.gif' : '.png') + '?size=128'
  : '';

async function syncServer(srv){
  const code = inviteCode(srv);
  if(!code) return;
  try{
    const res = await fetch('https://discord.com/api/v10/invites/' + encodeURIComponent(code) + '?with_counts=true', { cache: 'no-store' });
    if(!res.ok) return;
    const j = await res.json();
    if(typeof j.approximate_presence_count === 'number') srv.online = j.approximate_presence_count;
    if(typeof j.approximate_member_count === 'number') srv.members = j.approximate_member_count;
    const g = j.guild || {};
    if(g.name) srv.name = g.name;
    const icon = serverIcon(g);
    if(icon) srv.icon = icon;
    if(!srv.url && j.code) srv.url = 'https://discord.gg/' + j.code;
  }catch(e){}
}

async function refreshGangnem(){
  await Promise.all((CONFIG.gangnem || []).filter(s => s && inviteCode(s)).map(syncServer));
  paintGangnem();
}

buildGangnem();
paintGangnem();
refreshGangnem();
setInterval(() => { if(document.visibilityState === 'visible') refreshGangnem(); }, 60000);

const revealRoot = document.getElementById('shell');
const revealTargets = Array.from(revealRoot.querySelectorAll('.reveal'));

function initScrollReveal(){
  if(reduceMotion || !('IntersectionObserver' in window)){
    revealTargets.forEach(el => el.classList.add('in'));
    return;
  }
  function syncSides(){
    const rootTop = revealRoot.getBoundingClientRect().top;
    for(const el of revealTargets){
      if(el.classList.contains('in')) continue;
      el.dataset.side = el.getBoundingClientRect().top < rootTop ? 'top' : 'bottom';
    }
  }
  let sideFrame = 0;
  revealRoot.addEventListener('scroll', () => {
    if(sideFrame) return;
    sideFrame = requestAnimationFrame(() => { sideFrame = 0; syncSides(); });
  }, { passive: true });

  const io = new IntersectionObserver(entries => {
    for(const entry of entries){
      const el = entry.target;
      const shown = entry.isIntersecting;
      el.inert = !shown;
      el.classList.toggle('in', shown);
    }
    syncSides();
  }, { root: revealRoot, rootMargin: '0px 0px -7% 0px', threshold: 0 });
  revealTargets.forEach(el => io.observe(el));
  syncSides();
}

const TERM = CONFIG.terminal;
const termSection = document.getElementById('term');
const termOut = document.getElementById('termOut');
const termForm = document.getElementById('termForm');
const termInput = document.getElementById('termInput');
const TERM_HISTORY = [];
let termHistIndex = 0;

const FETCH_ART = `     s                      .x+=:.
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
           ""    "**"\``;

// Server clock: read the host's own Date header so the terminal shows the server's time (UTC).
// Falls back to the visitor's clock if the request fails (e.g. opened from a local file).
const SERVER_BOOT = Date.parse('2026-11-01T00:00:00Z'); // when the "box" came up; edit to taste
let serverOffset = 0;
const serverNow = () => Date.now() + serverOffset;
(function syncServerClock(){
  try{
    const t0 = Date.now();
    fetch(location.href, { method: 'HEAD', cache: 'no-store' }).then(res => {
      const h = res.headers.get('date');
      const srv = h ? Date.parse(h) : NaN;
      if(isFinite(srv)) serverOffset = srv - (t0 + Date.now()) / 2;
    }).catch(() => {});
  }catch(e){}
})();
const upSecs = () => Math.max(0, Math.floor((serverNow() - SERVER_BOOT) / 1000));
const plural = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');
function uptimeLong(){
  const t = upSecs();
  return plural(Math.floor(t / 86400), 'day') + ', ' + plural(Math.floor(t % 86400 / 3600), 'hour') + ', ' + plural(Math.floor(t % 3600 / 60), 'min');
}
function uptimeShort(){
  const t = upSecs(), d = Math.floor(t / 86400), h = Math.floor(t % 86400 / 3600), m = Math.floor(t % 3600 / 60);
  return (d ? plural(d, 'day') + ',  ' : '') + h + ':' + String(m).padStart(2, '0');
}

const FETCH_SPECS = [
  ['OS', 'Kali GNU/Linux Rolling x86_64'],
  ['Host', 'ASUS ROG Zephyrus G14 (GA402RJ)'],
  ['Board', 'ASUSTeK COMPUTER INC. GA402RJ'],
  ['BIOS', 'American Megatrends GA402RJ.325'],
  ['Kernel', '6.9.7-amd64'],
  ['Uptime', () => uptimeLong()],
  ['Packages', '2894 (dpkg), 12 (snap)'],
  ['Shell', 'zsh 5.9'],
  ['Resolution', '2560x1600 @ 120Hz'],
  ['DE', 'Xfce 4.18'],
  ['WM', 'Xfwm4'],
  ['WM Theme', 'Kali-Dark'],
  ['Theme', 'Kali-Dark [GTK3]'],
  ['Icons', 'Flat-Remix-Red-Dark [GTK3]'],
  ['Terminal', 'qterminal'],
  ['CPU', 'AMD Ryzen 9 6900HS (16) @ 4.906GHz'],
  ['GPU', 'AMD Radeon RX 6700S'],
  ['Memory', '6349MiB / 15361MiB'],
  ['Disk', '187G / 468G (43%) NVMe'],
  ['Battery', '82% [Discharging]'],
];
const FETCH_SWATCH = ['#ff2438', '#ff6b78', '#b33a46', '#f4f4f4', '#6b4046', '#4a1a20', '#2b0509'];


function termBox(){
  const box = document.createElement('div');
  box.className = 'term-run';
  termOut.appendChild(box);
  return box;
}

function termPrompt(parent){
  const line = document.createElement('div');
  line.className = 'flex flex-wrap items-baseline gap-x-1.5' + (parent.childElementCount ? ' mt-3' : '');
  const shell = document.createElement('span');
  shell.className = 'select-none';
  const user = document.createElement('span');
  user.className = 'text-blood-ok';
  user.textContent = TERM.user + '@' + TERM.host;
  const colon = document.createElement('span');
  colon.className = 'text-blood-ash';
  colon.textContent = ':';
  const tilde = document.createElement('span');
  tilde.className = 'text-blood';
  tilde.textContent = '~';
  const dollar = document.createElement('span');
  dollar.className = 'text-blood-ash';
  dollar.textContent = '$';
  shell.append(user, colon, tilde, dollar);
  const text = document.createElement('span');
  text.className = 'text-blood-soft';
  line.append(shell, text);
  parent.appendChild(line);
  return text;
}

function termWrite(parent, lines){
  for(const line of lines || []){
    const row = document.createElement('div');
    row.className = 'text-blood-soft';
    const mark = document.createElement('span');
    mark.className = 'text-blood-dim';
    mark.textContent = '> ';
    const text = document.createElement('span');
    text.textContent = line;
    row.append(mark, text);
    parent.appendChild(row);
  }
}

function termPrint(parent, lines){
  for(const line of lines || []){
    const row = document.createElement('div');
    row.className = 'text-blood-soft';
    row.textContent = line === '' ? '\u00a0' : line;
    parent.appendChild(row);
  }
}

function termBlock(parent, el){
  el.classList.add('term-in');
  parent.appendChild(el);
}

function termFetch(){
  const wrap = document.createElement('div');
  wrap.className = 'mt-2 flex items-start gap-5 max-[560px]:gap-0';
  const art = document.createElement('pre');
  art.className = 'm-0 hidden flex-none select-none whitespace-pre text-[12px] leading-[1.16] text-blood min-[720px]:block';
  art.setAttribute('aria-hidden', 'true');
  art.textContent = FETCH_ART;
  const info = document.createElement('div');
  info.className = 'min-w-0 text-[12px] leading-[1.55] max-[700px]:text-[11.5px]';
  const title = document.createElement('div');
  title.className = 'text-blood';
  title.textContent = TERM.user + '@' + TERM.host;
  const rule = document.createElement('div');
  rule.className = 'text-blood-dim';
  rule.textContent = '-'.repeat((TERM.user + '@' + TERM.host).length);
  info.append(title, rule);
  for(const [key, value] of FETCH_SPECS){
    const row = document.createElement('div');
    row.className = 'break-words';
    const k = document.createElement('span');
    k.className = 'text-blood';
    k.textContent = key + ': ';
    const v = document.createElement('span');
    v.className = 'text-blood-soft';
    v.textContent = typeof value === 'function' ? value() : value;
    row.append(k, v);
    info.appendChild(row);
  }
  const swatch = document.createElement('div');
  swatch.className = 'mt-2 flex gap-1';
  swatch.setAttribute('aria-hidden', 'true');
  for(const color of FETCH_SWATCH){
    const chip = document.createElement('i');
    chip.className = 'h-3 w-4 rounded-[1px]';
    chip.style.background = color;
    swatch.appendChild(chip);
  }
  info.appendChild(swatch);
  wrap.append(art, info);
  return wrap;
}

const OS_RELEASE = [
  'PRETTY_NAME="Kali GNU/Linux Rolling"',
  'NAME="Kali GNU/Linux"',
  'VERSION_ID="2026.1"',
  'VERSION="2026.1 (kali-rolling)"',
  'VERSION_CODENAME=kali-rolling',
  'ID=kali',
  'ID_LIKE=debian',
  'ANSI_COLOR="1;31"',
  'HOME_URL="https://www.kali.org/"',
  'SUPPORT_URL="https://forums.kali.org/"',
  'BUG_REPORT_URL="https://bugs.kali.org/"',
];

const LS_SHORT = ['.bashrc  .zshrc  about.txt  reason.txt  roster.txt  status.txt  tools/'];

const LS_LONG = [
  'total 48',
  'drwxr-xr-x  8 t2s t2s 4096 Nov 16 09:41 .',
  'drwxr-xr-x 12 t2s t2s 4096 Nov 16 08:04 ..',
  '-rw-r--r--  1 t2s t2s  108 Nov 14 22:07 about.txt',
  '-rw-r--r--  1 t2s t2s  204 Nov 15 03:18 reason.txt',
  '-rw-r--r--  1 t2s t2s  186 Nov 15 03:18 roster.txt',
  '-rw-r--r--  1 t2s t2s   71 Nov 15 03:18 status.txt',
  'drwxr-xr-x  6 t2s t2s 4096 Nov 16 09:12 tools',
];

const IP_ADDR = [
  '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000',
  '    inet 127.0.0.1/8 scope host lo',
  '       valid_lft forever preferred_lft forever',
  '2: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000',
  '    link/ether 4c:ed:fb:2a:71:0d brd ff:ff:ff:ff:ff:ff',
  '    inet 192.168.1.42/24 brd 192.168.1.255 scope global dynamic wlan0',
  '       valid_lft 84113sec preferred_lft 84113sec',
];

const IP_ROUTE = [
  'default via 192.168.1.1 dev wlan0 proto dhcp src 192.168.1.42 metric 600',
  '192.168.1.0/24 dev wlan0 proto kernel scope link src 192.168.1.42 metric 600',
];

const IFCONFIG = [
  'wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
  '        inet 192.168.1.42  netmask 255.255.255.0  broadcast 192.168.1.255',
  '        ether 4c:ed:fb:2a:71:0d  txqueuelen 1000  (Ethernet)',
  '        RX packets 184223  bytes 214913882 (204.9 MiB)',
  '        TX packets 91240  bytes 12883104 (12.2 MiB)',
];

const PS_AUX = [
  'USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND',
  'root           1  0.0  0.1 168712 12904 ?        Ss   08:12   0:04 /sbin/init',
  'root         612  0.0  0.2 224512 17640 ?        Ssl  08:12   0:00 /usr/sbin/NetworkManager',
  'root         818  0.0  0.1  12840  8320 ?        Ss   08:12   0:00 /usr/sbin/sshd',
  't2s         1187  0.1  0.4 812344 38120 tty1     Sl+  08:14   0:07 -zsh',
  't2s         2244  0.0  0.0  12108  4104 tty1     R+   09:41   0:00 ps aux',
];

const SS_TULNP = [
  'Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process',
  'udp   UNCONN 0      0          0.0.0.0:68         0.0.0.0:*',
  'tcp   LISTEN 0      128        0.0.0.0:22         0.0.0.0:*',
  'tcp   LISTEN 0      4096     127.0.0.1:631        0.0.0.0:*',
  'tcp   LISTEN 0      128        0.0.0.0:8080       0.0.0.0:*',
];

const DF_H = [
  'Filesystem      Size  Used Avail Use% Mounted on',
  'udev            7.4G     0  7.4G   0% /dev',
  '/dev/nvme0n1p2  468G  187G  257G  43% /',
  '/dev/nvme0n1p1  511M   62M  450M  13% /boot/efi',
  'tmpfs           1.5G  2.1M  1.5G   1% /run/user/1000',
];

const FREE_H = [
  '               total        used        free      shared  buff/cache   available',
  'Mem:            15Gi       6.2Gi       3.1Gi       412Mi       6.1Gi       8.9Gi',
  'Swap:          7.4Gi       512Mi       6.9Gi',
];

const APT_USAGE = [
  'apt 2.9.8 (amd64)',
  'Usage: apt [options] command',
  'install \u00b7 update \u00b7 upgrade \u00b7 search \u00b7 show',
];

const APT_UPDATE = [
  'Hit:1 http://kali.download/kali kali-rolling InRelease',
  'Get:2 http://kali.download/kali kali-rolling/main amd64 Packages [19.4 MB]',
  'Get:3 http://kali.download/kali kali-rolling/non-free amd64 Packages [201 kB]',
  'Fetched 19.6 MB in 3s (6,412 kB/s)',
  'Reading package lists... Done',
];

const aptInstall = pkg => [
  'Reading package lists... Done',
  'Building dependency tree... Done',
  'Reading state information... Done',
  pkg + ' is already the newest version (2026.1).',
  '0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.',
];

const HYDRA_USAGE = [
  'Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak',
  'Hydra is a parallelized login cracker with support for 50+ protocols.',
  'Syntax: hydra [[-l LOGIN|-L FILE] [-p PASS|-P FILE]] service://server[:PORT][/OPT]',
  'Example: hydra -l root -P /usr/share/wordlists/rockyou.txt ssh://10.10.14.7',
];

const MSF_BANNER = [
  '       =[ metasploit v6.4.12-dev ]',
  '+ -- --=[ 2476 exploits - 1274 auxiliary - 421 post ]',
  '+ -- --=[ 1467 payloads - 47 encoders - 11 nops ]',
  '+ -- --=[ 9 evasion ]',
  '',
  '[!] console unavailable in this shell \u2014 run it on the box.',
];

const searchsploit = term => [
  '---------------------------------------------- ---------------------------------',
  ' Exploit Title                                |  Path',
  '---------------------------------------------- ---------------------------------',
  'Apache 2.4.49 - Path Traversal                | linux/remote/50383.py',
  'Linux Kernel 6.9 - nf_tables UAF              | linux/local/50999.c',
  'OpenSSH 8.9p1 - Pre-Auth Enumeration          | linux/remote/45233.py',
  '---------------------------------------------- ---------------------------------',
  'Shellcodes: No Results' + (term ? '  (search: ' + term + ')' : ''),
];

const nmap = host => [
  'Starting Nmap 7.94SVN ( https://nmap.org ) at ' + new Date(serverNow()).toLocaleString('en-GB', { timeZone: 'UTC' }) + ' UTC',
  'Nmap scan report for ' + host,
  'Host is up (0.018s latency).',
  'Not shown: 996 closed tcp ports (reset)',
  'PORT     STATE SERVICE VERSION',
  '22/tcp   open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.6 (Ubuntu Linux; protocol 2.0)',
  '80/tcp   open  http    nginx 1.18.0',
  '443/tcp  open  ssl/http nginx 1.18.0',
  '8080/tcp open  http-proxy Squid 5.7',
  'Nmap done: 1 IP address (1 host up) scanned in 7.21 seconds',
];

const ping = host => [
  'PING ' + host + ' (' + host + ') 56(84) bytes of data.',
  '64 bytes from ' + host + ': icmp_seq=1 ttl=57 time=11.4 ms',
  '64 bytes from ' + host + ': icmp_seq=2 ttl=57 time=10.9 ms',
  '64 bytes from ' + host + ': icmp_seq=3 ttl=57 time=11.7 ms',
  '64 bytes from ' + host + ': icmp_seq=4 ttl=57 time=11.2 ms',
  '',
  '--- ' + host + ' ping statistics ---',
  '4 packets transmitted, 4 received, 0% packet loss, time 3004ms',
  'rtt min/avg/max/mdev = 10.902/11.302/11.741/0.318 ms',
];

const TERM_FILES = {
  'status.txt': () => [TERM.status],
  'about.txt': () => TERM.about,
  'roster.txt': () => TERM.roster,
  'reason.txt': () => TERM.roster,
  '/etc/os-release': () => OS_RELEASE,
  '/etc/hostname': () => [TERM.host],
};

function termRun(raw){
  const cmd = String(raw == null ? '' : raw).trim();
  const box = termBox();
  termPrompt(box).textContent = cmd;
  if(!cmd) return;

  TERM_HISTORY.push(cmd);
  termHistIndex = TERM_HISTORY.length;

  const parts = cmd.split(/\s+/);
  const name = parts[0].toLowerCase();
  const arg = (parts[1] || '').toLowerCase();
  const rest = parts.slice(1).join(' ');
  const targets = parts.slice(1).filter(p => p.charAt(0) !== '-');
  const target = targets.length ? targets[targets.length - 1] : '';

  switch(name){
    case 'help':
      termWrite(box, [
        'available commands',
        '  roster:  about \u00b7 reason \u00b7 status',
        '  kali:    nmap <host> \u00b7 ping <host> \u00b7 hydra \u00b7 msfconsole \u00b7 searchsploit \u00b7 apt',
        '  system:  neofetch \u00b7 whoami \u00b7 id \u00b7 uname -a \u00b7 hostname \u00b7 pwd \u00b7 date \u00b7 uptime',
        '  network: ip a \u00b7 ifconfig \u00b7 ss -tulnp \u00b7 netstat',
        '  box:     ps aux \u00b7 df -h \u00b7 free -h \u00b7 ls -la \u00b7 history \u00b7 echo',
        '  files:   cat <file> \u2014 status.txt \u00b7 about.txt \u00b7 roster.txt',
        '                        /etc/os-release \u00b7 /etc/hostname',
        '  clear    wipe the screen',
      ]);
      break;
    case 'neofetch':
      termBlock(box, termFetch());
      break;
    case 'about':
      termWrite(box, TERM.about);
      break;
    case 'roster':
    case 'reason':
      termWrite(box, TERM.roster);
      break;
    case 'status':
      termWrite(box, [TERM.status]);
      break;
    case 'clear':
      termOut.textContent = '';
      break;
    case 'sudo':
      termPrint(box, ['sudo: ' + TERM.user + ' is not in the sudoers file.  This incident will be reported.']);
      break;
    case 'su':
      termPrint(box, ['Password:', 'su: Authentication failure']);
      break;

    case 'whoami':
      termPrint(box, [TERM.user]);
      break;
    case 'id':
      termPrint(box, ['uid=1000(' + TERM.user + ') gid=1000(' + TERM.user + ') groups=1000(' + TERM.user + '),27(sudo),100(users)']);
      break;
    case 'pwd':
      termPrint(box, ['/home/' + TERM.user]);
      break;
    case 'hostname':
      termPrint(box, [TERM.host]);
      break;
    case 'date': {
      const d = new Date(serverNow());
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      termPrint(box, [days[d.getUTCDay()] + ' ' + mons[d.getUTCMonth()] + ' ' + d.getUTCDate() + ' ' + d.toISOString().slice(11, 19) + ' UTC ' + d.getUTCFullYear()]);
      break;
    }
    case 'uptime':
      termPrint(box, [' ' + new Date(serverNow()).toISOString().slice(11, 19) + ' up ' + uptimeShort() + ',  1 user,  load average: 0.42, 0.31, 0.27']);
      break;
    case 'uname':
      if(arg === '-a' || arg === '--all'){
        termPrint(box, ['Linux caliber 6.9.7-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.9.7-1kali1 (2024-06-25) x86_64 GNU/Linux']);
      }else if(arg === '-r' || arg === '--kernel-release'){
        termPrint(box, ['6.9.7-amd64']);
      }else{
        termPrint(box, ['Linux']);
      }
      break;
    case 'ls':
    case 'dir':
      if(arg === '-l' || arg === '-la' || arg === '-al' || arg === '-lh') termPrint(box, LS_LONG);
      else termPrint(box, LS_SHORT);
      break;
    case 'cat': {
      const file = TERM_FILES[arg];
      if(file) termPrint(box, file());
      else termPrint(box, ['cat: ' + (arg || '') + ': No such file or directory']);
      break;
    }
    case 'history':
      termPrint(box, TERM_HISTORY.map((c, i) => String(i + 1).padStart(4) + '  ' + c));
      break;
    case 'echo':
      termPrint(box, [rest]);
      break;
    case 'exit':
    case 'logout':
      termPrint(box, ['logout', 'Connection to ' + TERM.host + ' closed.']);
      break;

    case 'nmap':
      termPrint(box, nmap(target || '10.10.14.7'));
      break;
    case 'ping':
      termPrint(box, ping(target || '1.1.1.1'));
      break;
    case 'hydra':
      termPrint(box, HYDRA_USAGE);
      break;
    case 'msfconsole':
    case 'msf':
      termPrint(box, MSF_BANNER);
      break;
    case 'searchsploit':
      termPrint(box, searchsploit(rest));
      break;
    case 'apt':
    case 'apt-get': {
      const sub = (parts[1] || '').toLowerCase();
      if(sub === 'update') termPrint(box, APT_UPDATE);
      else if(sub === 'install' || sub === 'upgrade' || sub === 'full-upgrade' || sub === 'reinstall')
        termPrint(box, aptInstall(parts[2] || 'kali-linux-core'));
      else if(sub === 'search')
        termPrint(box, ['nmap - Network exploration tool and security scanner', 'hydra - Very fast network logon cracker']);
      else if(!sub) termPrint(box, APT_USAGE);
      else termPrint(box, ['E: Invalid operation ' + sub]);
      break;
    }
    case 'ip':
      if(arg === 'r' || arg === 'ro' || arg === 'route') termPrint(box, IP_ROUTE);
      else if(!arg || arg === 'a' || arg === 'addr' || arg === 'address' || arg === 'show') termPrint(box, IP_ADDR);
      else termPrint(box, ['Object "' + arg + '" is unknown, try "ip help".']);
      break;
    case 'ifconfig':
      termPrint(box, IFCONFIG);
      break;
    case 'ps':
      termPrint(box, PS_AUX);
      break;
    case 'ss':
    case 'netstat':
      termPrint(box, SS_TULNP);
      break;
    case 'df':
      termPrint(box, DF_H);
      break;
    case 'free':
      termPrint(box, FREE_H);
      break;
    default:
      termPrint(box, ['bash: ' + name + ': command not found']);
  }
  termScroll(true);
}

function termScroll(smooth){
  const root = revealRoot.getBoundingClientRect();
  const box = termSection.getBoundingClientRect();
  if(box.bottom < root.top || box.top > root.bottom) return;
  termInput.scrollIntoView({ block: 'nearest', behavior: smooth && !reduceMotion ? 'smooth' : 'auto' });
}

termForm.addEventListener('submit', e => {
  e.preventDefault();
  const raw = termInput.value;
  termInput.value = '';
  termRun(raw);
  termScroll();
});

termInput.addEventListener('keydown', e => {
  if(e.key === 'ArrowUp'){
    if(!TERM_HISTORY.length) return;
    e.preventDefault();
    termHistIndex = Math.max(0, termHistIndex - 1);
    termInput.value = TERM_HISTORY[termHistIndex] || '';
  }else if(e.key === 'ArrowDown'){
    if(!TERM_HISTORY.length) return;
    e.preventDefault();
    termHistIndex = Math.min(TERM_HISTORY.length, termHistIndex + 1);
    termInput.value = TERM_HISTORY[termHistIndex] || '';
  }
});

document.getElementById('termBody').addEventListener('click', e => {
  if(e.target.closest('a, button')) return;
  if(String(getSelection())) return;
  termInput.focus({ preventScroll: true });
});

(function termInitial(){
  const box = termBox();
  termPrompt(box).textContent = 'neofetch';
  box.appendChild(termFetch());
  termPrompt(box).textContent = 'cat status.txt';
  const row = document.createElement('div');
  row.className = 'text-blood-soft';
  const mark = document.createElement('span');
  mark.className = 'text-blood-dim';
  mark.textContent = '> ';
  const text = document.createElement('span');
  text.textContent = TERM.status;
  row.append(mark, text);
  box.appendChild(row);
})();

const enterArt = document.getElementById('enterArt');
const bannerEl = document.getElementById('banner');
const trimArt = text => text.replace(/\r/g, '').split('\n').map(line => line.replace(/\s+$/, '')).join('\n');
const artSource = () => trimArt(innerWidth < 760 ? CONFIG.loadingAscii : CONFIG.asciiArt);

function fitArt(el, text, maxFont, widthRatio, heightRatio){
  const lines = text.split('\n');
  const cols = Math.max(...lines.map(line => line.length), 1);
  const size = Math.min(maxFont, (innerWidth * widthRatio) / (cols * .62), (innerHeight * heightRatio) / lines.length);
  el.style.fontSize = Math.max(1.5, size).toFixed(2) + 'px';
}

const ART_GLYPHS = '.:-=+*#%@';
const ART_ORDER = {
  byRow: (row, col, rows) => row / rows,
  print: (row, col, rows, cols) => (row / rows) * .8 + (col / cols) * .2,
  bottomUpDiagonal: (row, col, rows, cols) => (col / cols) * .8 + .2 * (1 - row / rows),
  fromCentre: (row, col, rows, cols) => {
    const x = (col - cols / 2) / (cols / 2);
    const y = (row - rows / 2) / (rows / 2);
    return Math.min(1, Math.sqrt(x * x * .5 + y * y * .5) / .9);
  },
};
const artEngines = new WeakMap();

function createArtEngine(el, text, opts){
  const cfg = {
    glyphs: ART_GLYPHS,
    sweep: 1.1,
    jitter: .45,
    order: ART_ORDER.byRow,
    glitchMin: 2000,
    glitchVar: 0,
    glitchRows: 4,
    glitchTime: 140,
    glitchDelay: 1100,
    corrupt: .12,
    scanDuration: 2600,
    scanPeriod: 6000,
    scanPeriodVar: 3000,
    scanWidth: 2,
    scanUp: false,
    scan: true,
    scanDelay: 1200,
    throttle: 28,
    ...opts,
  };
  text = text.replace(/\r/g, '');
  const lines = text.split('\n');
  const rows = lines.length;
  const cols = Math.max(1, ...lines.map(line => line.length));
  const grid = lines.map(line => Array.from(line));
  const times = grid.map((chars, r) => chars.map((ch, c) =>
    (ch === ' ' || ch === '\u2800') ? -1 : cfg.order(r, c, rows, cols) * cfg.sweep + Math.random() * cfg.jitter
  ));
  const rowMax = times.map(row => row.reduce((a, t) => (t > a ? t : a), 0));
  const doneRows = new Array(rows).fill(false);
  const hotRows = new Array(rows).fill(false);
  const lineText = new Array(rows).fill('');
  const rand = () => cfg.glyphs[(Math.random() * cfg.glyphs.length) | 0];

  el.innerHTML = '';
  const lineEls = grid.map(chars => {
    const div = document.createElement('div');
    div.textContent = ' '.repeat(chars.length);
    el.appendChild(div);
    return div;
  });

  let raf = 0, startedAt = 0, lastFrame = 0, started = false, revealDone = false;
  let glitchUntil = 0, glitching = false, glitchRowList = [];
  let nextGlitch = 0, scanActive = false, scanStartedAt = 0, nextScan = 0;

  function setLine(r, value){
    if(lineText[r] === value) return;
    lineText[r] = value;
    lineEls[r].textContent = value;
  }
  function corruptLine(value){
    let out = '';
    for(let i = 0; i < value.length; i++){
      const ch = value.charAt(i);
      out += (ch === ' ' || Math.random() > cfg.corrupt) ? ch : rand();
    }
    return out;
  }
  function restoreRow(r){
    lineEls[r].style.transform = '';
    setLine(r, grid[r].join(''));
  }
  function clearHot(){
    for(let r = 0; r < rows; r++){
      if(!hotRows[r]) continue;
      hotRows[r] = false;
      lineEls[r].classList.remove('hot');
    }
  }
  function revealAll(){
    for(let r = 0; r < rows; r++){
      doneRows[r] = true;
      if(glitching && glitchRowList.indexOf(r) >= 0) lineEls[r].style.transform = '';
      setLine(r, grid[r].join(''));
      lineEls[r].classList.remove('hot');
      hotRows[r] = false;
    }
    glitching = false;
    glitchRowList = [];
    revealDone = true;
    nextGlitch = performance.now() + cfg.glitchDelay;
  }
  function revealStep(now){
    const t = (now - startedAt) / 1000;
    let all = true;
    for(let r = 0; r < rows; r++){
      if(doneRows[r]) continue;
      if(t > rowMax[r] + .35){
        setLine(r, grid[r].join(''));
        doneRows[r] = true;
        continue;
      }
      all = false;
      const chars = grid[r], charTimes = times[r];
      let out = '';
      for(let c = 0; c < chars.length; c++){
        const at = charTimes[c];
        if(at < 0) out += chars[c];
        else if(t < at) out += ' ';
        else if(t < at + .3) out += rand();
        else out += chars[c];
      }
      setLine(r, out);
    }
    if(all) revealAll();
  }
  function glitchStep(now){
    if(now > nextGlitch){
      glitchUntil = now + cfg.glitchTime;
      nextGlitch = now + cfg.glitchMin + Math.random() * cfg.glitchVar;
      glitchRowList = [];
      const used = {};
      const count = Math.min(cfg.glitchRows, rows);
      while(glitchRowList.length < count){
        const r = (Math.random() * rows) | 0;
        if(used[r]) continue;
        used[r] = 1;
        glitchRowList.push(r);
      }
    }
    if(now < glitchUntil){
      glitching = true;
      for(const r of glitchRowList){
        lineEls[r].style.transform = 'translateX(' + ((Math.random() * 1.6) - .8).toFixed(2) + 'em)';
        setLine(r, corruptLine(grid[r].join('')));
      }
    }else if(glitching){
      glitching = false;
      for(const r of glitchRowList) restoreRow(r);
    }
  }
  function scanStep(now){
    if(!cfg.scan) return;
    if(!scanActive){
      if(now > nextScan){
        scanActive = true;
        scanStartedAt = now;
      }
      return;
    }
    const p = (now - scanStartedAt) / cfg.scanDuration;
    if(p > 1){
      scanActive = false;
      nextScan = now + cfg.scanPeriod + Math.random() * cfg.scanPeriodVar;
      clearHot();
      return;
    }
    const cur = (cfg.scanUp ? 1 - p : p) * (rows + 2 * cfg.scanWidth) - cfg.scanWidth;
    for(let r = 0; r < rows; r++){
      const on = Math.abs(r - cur) <= cfg.scanWidth;
      if(on === hotRows[r]) continue;
      hotRows[r] = on;
      lineEls[r].classList.toggle('hot', on);
    }
  }
  function loop(now){
    raf = requestAnimationFrame(loop);
    if(!started) return;
    if(now - lastFrame < cfg.throttle) return;
    lastFrame = now;
    if(!revealDone){
      revealStep(now);
      return;
    }
    glitchStep(now);
    scanStep(now);
  }
  function start(now){
    startedAt = now == null ? performance.now() : now;
    lastFrame = 0;
    started = true;
    revealDone = false;
    glitching = false;
    glitchRowList = [];
    glitchUntil = 0;
    doneRows.fill(false);
    hotRows.fill(false);
    for(let r = 0; r < rows; r++){
      lineText[r] = '';
      lineEls[r].textContent = ' '.repeat(grid[r].length);
      lineEls[r].style.transform = '';
      lineEls[r].classList.remove('hot');
    }
    nextScan = startedAt + 1000 * (cfg.sweep + cfg.jitter) + cfg.scanDelay;
    nextGlitch = startedAt + 1000 * (cfg.sweep + cfg.jitter) + 2500;
    if(!raf) raf = requestAnimationFrame(loop);
  }
  function destroy(){
    if(raf) cancelAnimationFrame(raf);
    raf = 0;
    started = false;
    el.innerHTML = '';
  }

  return {
    text,
    start,
    destroy,
    revealAll,
    get started(){ return started; },
    get done(){ return revealDone; },
    get startedAt(){ return startedAt; },
    get lineCount(){ return rows; },
    get hotCount(){ return hotRows.filter(Boolean).length; },
    get glitchRows(){ return glitchRowList.slice(); },
    get glitching(){ return glitching; },
    get cols(){ return cols; },
  };
}

function setArt(el, text, opts){
  const prev = artEngines.get(el);
  if(prev && prev.text === text) return prev;
  const wasStarted = prev && prev.started;
  if(prev) prev.destroy();
  if(reduceMotion){
    el.textContent = text;
    const stub = { text, start(){}, destroy(){ el.textContent = ''; }, started: true, done: true };
    artEngines.set(el, stub);
    return stub;
  }
  const engine = createArtEngine(el, text, opts);
  artEngines.set(el, engine);
  if(wasStarted) engine.start();
  return engine;
}
function startArtEngine(el){
  const engine = artEngines.get(el);
  if(engine && typeof engine.start === 'function') engine.start();
}

function layoutArt(){
  const text = artSource();
  fitArt(enterArt, text, 40, .88, .62);
  fitArt(bannerEl, text, 18, .9, .42);
  setArt(enterArt, text, {
    order: ART_ORDER.print, sweep: 1.35, jitter: .1,
    glitchMin: 4000, glitchVar: 2400, glitchRows: 2, glitchTime: 120,
    scan: false,
  });
  setArt(bannerEl, text, {
    order: ART_ORDER.bottomUpDiagonal, sweep: 1.05, jitter: .4,
    glitchMin: 2000, glitchVar: 0, glitchRows: 3, glitchDelay: 700,
    scanPeriod: 9000, scanPeriodVar: 3500, scanWidth: 2,
  });
}
layoutArt();
addEventListener('resize', layoutArt);

let bgArtStarted = false;
function startBackgroundArt(){
  if(bgArtStarted || reduceMotion) return;
  bgArtStarted = true;
  const arts = [...document.querySelectorAll('.bgart')].slice(0, 4);
  arts.forEach((el, i) => {
    const engine = createArtEngine(el, CONFIG.bgAscii, {
      order: i % 2 ? ART_ORDER.bottomUpDiagonal : ART_ORDER.fromCentre,
      sweep: 1.8 + Math.random() * .7, jitter: .8,
      glitchMin: 4200 + Math.random() * 2600, glitchVar: 4800, glitchRows: 2,
      scanDuration: 3000, scanPeriod: 9000 + Math.random() * 5000, scanWidth: 2,
      scan: false,
      throttle: 50,
    });
    engine.start();
  });
}

const S = {};
let hoverId = null;
const statusLabels = { online:'online', idle:'idle', dnd:'do not disturb', offline:'offline' };
const activityLabels = ['playing ', 'streaming ', 'listening to ', 'watching ', '', 'competing in '];

function describeActivity(data, status){
  if(!data) return statusLabels[status] || status;
  const custom = (data.activities || []).find(a => a.type === 4);
  if(custom && custom.state) return custom.state;
  const spotify = a => /spotify/i.test(a.name || '') || /^spotify:/i.test(a.id || '');
  const act = (data.activities || []).find(a => a.type !== 4 && !spotify(a));
  if(act) return (activityLabels[act.type] || '') + act.name;
  return statusLabels[status] || status;
}

const ST = ['online', 'idle', 'dnd', 'offline'];
function setSt(el, st){ ST.forEach(s => el.classList.toggle(s, s === st)); }
function setDeco(box, ds){
  let d = box.querySelector('.d');
  if(ds){
    if(!d){
      d = document.createElement('img');
      d.className = 'd';
      d.alt = '';
      box.insertBefore(d, box.querySelector('.s'));
    }
    if(d.getAttribute('src') !== ds) d.src = ds;
  }else if(d) d.remove();
}

function render(id){
  const p = S[id], u = p && p.discord_user, st = p ? (p.discord_status || 'offline') : 'offline';
  const av = avatarUrl(u, id), ds = decoUrl(u), nm = u ? (u.display_name || u.global_name || u.username) : '';
  document.querySelectorAll('.m[data-id="' + id + '"]').forEach(el => {
    const box = el.querySelector('.av'), a = box.querySelector('.a');
    setSt(box, st);
    if(a.getAttribute('src') !== av) a.src = av;
    setDeco(box, ds);
    if(nm) el.querySelector('.nm').textContent = nm.toLowerCase();
  });
  if(hoverId === id && BYID[id]) fillHover(BYID[id]);
  if(openMember && openMember.discordId === id) fillProfile(openMember);
}

function startPresence(){
  Promise.all(ALL.map(id =>
    fetch('https://api.lanyard.rest/v1/users/' + id)
      .then(r => r.json())
      .then(j => { if(j.success){ S[id] = j.data; render(id); } })
      .catch(() => {})
  )).then(socket);

  function socket(){
    let w, hb;
    try{ w = new WebSocket('wss://api.lanyard.rest/socket'); }catch(e){ return; }
    w.onmessage = m => {
      const j = JSON.parse(m.data);
      if(j.op === 1){
        w.send(JSON.stringify({ op: 2, d: { subscribe_to_ids: ALL } }));
        hb = setInterval(() => { if(w.readyState === 1) w.send('{"op":3}'); }, j.d.heartbeat_interval);
      }else if(j.op === 0 && j.t === 'INIT_STATE'){
        for(const key in j.d) if(j.d[key] && j.d[key].discord_user){ S[key] = j.d[key]; render(key); }
      }else if(j.op === 0 && j.t === 'PRESENCE_UPDATE' && j.d && j.d.discord_user){
        S[j.d.discord_user.id] = j.d;
        render(j.d.discord_user.id);
      }
    };
    w.onclose = () => { clearInterval(hb); setTimeout(socket, 5000); };
  }
}

const hoverCard = document.getElementById('hoverCard');
const hoverCardBanner = document.getElementById('hoverCardBanner');
let hoverBtn = null;

function fillHover(member){
  const id = member.discordId, p = S[id], u = p && p.discord_user, st = p ? (p.discord_status || 'offline') : 'offline';
  const av = avatarUrl(u, id);
  const avEl = document.getElementById('hoverCardAvatar');
  if(avEl.getAttribute('src') !== av) avEl.src = av;
  const box = document.getElementById('hoverCardAvatarWrap');
  setSt(box, st);
  setDeco(box, decoUrl(u));
  document.getElementById('hoverCardName').textContent = u ? (u.display_name || u.global_name || u.username) : member.name;
  document.getElementById('hoverCardHandle').textContent = u ? '@' + u.username : '@' + member.name;
  const sEl = document.getElementById('hoverCardStatus');
  setSt(sEl, st);
  sEl.querySelector('span').textContent = statusLabels[st] || st;
  const actText = p ? describeActivity(p, st) : (statusLabels[st] || st);
  document.getElementById('hoverCardAct').textContent = actText === (statusLabels[st] || st) ? '\u2014' : actText;

  hoverCardBanner.style.backgroundImage = '';
  hoverCardBanner.style.backgroundColor = '';
  const ok = applyBackground(hoverCardBanner, profileBanner(member));
  if(!ok && !hoverCardBanner.style.backgroundImage){
    hoverCardBanner.style.background = 'linear-gradient(135deg,#2a0a10,#0a0405)';
  }
}

function positionHover(btn){
  const r = btn.getBoundingClientRect();
  const cw = hoverCard.offsetWidth || 216;
  const ch = hoverCard.offsetHeight || 160;
  let x = r.left + r.width / 2 - cw / 2;
  let y = r.bottom + 12;
  if(y + ch > innerHeight - 12) y = r.top - ch - 12;
  if(y < 12) y = 12;
  x = Math.max(12, Math.min(innerWidth - cw - 12, x));
  hoverCard.style.left = Math.round(x) + 'px';
  hoverCard.style.top = Math.round(y) + 'px';
}

function showHover(btn){
  const member = BYID[btn.dataset.id];
  if(!member) return;
  hoverBtn = btn;
  hoverId = member.discordId;
  fillHover(member);
  hoverCard.classList.add('on');
  hoverCard.setAttribute('aria-hidden', 'false');
  positionHover(btn);
}
function hideHover(){
  hoverBtn = null;
  hoverId = null;
  hoverCard.classList.remove('on');
  hoverCard.setAttribute('aria-hidden', 'true');
}

rosterEl.addEventListener('pointerover', e => {
  if(e.pointerType === 'touch') return;
  const btn = e.target.closest('.m');
  if(!btn || btn.classList.contains('m-empty') || btn === hoverBtn) return;
  showHover(btn);
});
rosterEl.addEventListener('pointerout', e => {
  const btn = e.target.closest('.m');
  if(!btn || btn !== hoverBtn) return;
  if(btn.contains(e.relatedTarget)) return;
  hideHover();
});
rosterEl.addEventListener('focusin', e => {
  const btn = e.target.closest('.m');
  if(btn && !btn.classList.contains('m-empty')) showHover(btn);
});
rosterEl.addEventListener('focusout', e => {
  if(e.target.closest('.m')) hideHover();
});
document.getElementById('shell').addEventListener('scroll', () => {
  if(hoverId) hideHover();
}, { passive: true });
addEventListener('resize', () => {
  if(hoverId) hideHover();
});

let audioStarted = false;
function startAmbientAudio(){
  if(audioStarted) return;
  audioStarted = true;
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
  if(bg && bg.dataset.wasPlaying === '1'){ bg.play().catch(() => {}); delete bg.dataset.wasPlaying; }
}

const profileModal = document.getElementById('profileModal');
const profileBody = document.getElementById('profileModalBody');
const viewsCountEl = document.getElementById('profileModalViewsCount');
document.getElementById('profileModalArt').textContent = FETCH_ART;
let openMember = null;
let cmdTimer = 0;
let runTimer = 0;

const VIEW_API = 'https://abacus.jasoncameron.dev';
const VIEW_COUNTER_NAMESPACE = 'threat2society-site';
const VIEW_CACHE_KEY = 't2sProfileViewsCache';
const VIEW_SEEN_KEY = 't2sProfileViewsSeen';

function readStore(key){
  try{ return JSON.parse(localStorage.getItem(key) || '{}') || {}; }catch(e){ return {}; }
}
function writeStore(key, obj){
  try{ localStorage.setItem(key, JSON.stringify(obj)); }catch(e){}
}
async function viewCounter(op, slug){
  const res = await fetch(VIEW_API + '/' + op + '/' + VIEW_COUNTER_NAMESPACE + '/profile-' + encodeURIComponent(slug), { cache: 'no-store' });
  if(res.status === 404 && op === 'get') return 0;
  if(!res.ok) throw new Error('view counter responded ' + res.status);
  const n = Number((await res.json()).value);
  if(!isFinite(n)) throw new Error('view counter returned no value');
  return n;
}
// One view per browser per profile: the first open adds 1 to the shared total, later opens only read it.
async function bumpProfileViewCount(slug){
  const seen = readStore(VIEW_SEEN_KEY);
  const first = !seen[slug];
  try{
    const n = await viewCounter(first ? 'hit' : 'get', slug);
    if(first){ seen[slug] = 1; writeStore(VIEW_SEEN_KEY, seen); }
    const cache = readStore(VIEW_CACHE_KEY);
    cache[slug] = n;
    writeStore(VIEW_CACHE_KEY, cache);
    return n;
  }catch(err){
    const cached = readStore(VIEW_CACHE_KEY)[slug];
    return typeof cached === 'number' ? cached : null;
  }
}

function fillProfile(member){
  const id = member.discordId, p = S[id], u = p && p.discord_user, st = p ? (p.discord_status || 'offline') : 'offline';
  const box = document.getElementById('profileModalAvatarWrap');
  const a = document.getElementById('profileModalAvatar');
  const av = avatarUrl(u, id);
  setSt(box, st);
  if(a.getAttribute('src') !== av) a.src = av;
  setDeco(box, decoUrl(u));
  document.getElementById('profileModalName').textContent = u ? (u.display_name || u.global_name || u.username) : member.name;
  document.getElementById('profileModalHandle').textContent = u ? '@' + u.username : '@' + member.name;
  const sEl = document.getElementById('profileModalStatus');
  setSt(sEl, st);
  sEl.querySelector('span').textContent = statusLabels[st] || st;
  const act = p ? describeActivity(p, st) : (statusLabels[st] || st);
  document.getElementById('profileModalStatusText').textContent = act === (statusLabels[st] || st) ? '\u2014' : act;
}

function setRunLine(text, done){
  const run = document.getElementById('profileModalRun');
  document.getElementById('profileModalRunText').textContent = text;
  if(run.hidden){ run.hidden = false; requestAnimationFrame(() => run.classList.add('on')); }
  run.classList.toggle('done', !!done);
}

function typeProfileCommand(member){
  const cmdEl = document.getElementById('profileModalCmd');
  const run = document.getElementById('profileModalRun');
  const text = 'get-profile --name "' + member.name + '"';
  clearTimeout(cmdTimer);
  clearTimeout(runTimer);
  profileModal.classList.add('typing');
  run.hidden = true;
  run.classList.remove('on', 'done');
  cmdEl.textContent = '';
  if(reduceMotion){
    cmdEl.textContent = text;
    setRunLine('[ ok ] profile loaded', true);
    profileModal.classList.remove('typing');
    return;
  }
  let i = 0;
  (function step(){
    cmdEl.textContent += text.charAt(i++);
    if(i < text.length){
      const pause = Math.random() < .07 ? 150 + Math.random() * 160 : 0;
      cmdTimer = setTimeout(step, 58 + Math.random() * 44 + pause);
    }else{
      cmdTimer = setTimeout(() => {
        setRunLine('executing ' + text, false);
        runTimer = setTimeout(() => {
          setRunLine('[ ok ] profile loaded', true);
          runTimer = setTimeout(() => profileModal.classList.remove('typing'), 300);
        }, 720);
      }, 240);
    }
  })();
}

function openProfile(member){
  if(!member) return;
  hideHover();
  const slug = slugify(member.name);
  const handle = 't2s@' + String(member.name).toLowerCase();
  openMember = member;
  fillProfile(member);

  profileModal.querySelectorAll('.pm-user').forEach(el => { el.textContent = handle; });
  document.getElementById('profileModalPath').textContent = handle + ': ~/profiles/' + slug;
  profileModal.classList.add('typing');
  document.getElementById('profileModalCmd').textContent = '';

  const bg = backgroundValue(profileBanner(member));
  profileModal.style.setProperty('--pm-bg', bg.image || 'none');

  profileModal.classList.add('visible');
  profileModal.setAttribute('aria-hidden', 'false');
  profileBody.scrollTop = 0;
  typeProfileCommand(member);

  try{ history.pushState({ profile: slug }, '', '/' + slug); }catch(err){}

  const pm = document.getElementById('profileMusicEl');
  const musicVal = member.music || '';
  if(musicVal){
    duckSiteAudio();
    pm.src = musicVal;
    pm.volume = .5;
    pm.play().catch(() => {});
  }else{
    pm.pause();
    pm.removeAttribute('src');
  }

  viewsCountEl.textContent = '\u00b7\u00b7\u00b7';
  bumpProfileViewCount(slug).then(count => {
    if(openMember !== member) return;
    viewsCountEl.textContent = typeof count === 'number' ? count.toLocaleString() : '\u2014';
  });
}

function closeProfile(){
  if(!profileModal.classList.contains('visible')) return;
  clearTimeout(cmdTimer);
  clearTimeout(runTimer);
  const run = document.getElementById('profileModalRun');
  run.hidden = true;
  run.classList.remove('on', 'done');
  profileModal.classList.remove('typing');
  profileModal.classList.remove('visible');
  profileModal.setAttribute('aria-hidden', 'true');

  const pm = document.getElementById('profileMusicEl');
  if(!pm.paused) pm.pause();
  if(audioStarted) unduckSiteAudio();
  else startAmbientAudio();

  if(location.pathname !== '/'){
    try{ history.pushState(null, '', '/'); }catch(err){}
  }
  openMember = null;
}

document.getElementById('profileModalClose').addEventListener('click', closeProfile);
profileModal.addEventListener('click', e => { if(e.target === profileModal) closeProfile(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeProfile(); });
addEventListener('popstate', closeProfile);

const matrixCanvas = document.getElementById('matrix');
const mctx = matrixCanvas.getContext('2d');
const smokeCanvas = document.getElementById('smoke');
const sctx = smokeCanvas.getContext('2d');
const RAIN_GLYPHS = '01<>/\\|+=*:.#%';
const RAIN_COL = 22, RAIN_ROW = 14;
let mCols = [], matrixOn = false, mLast = 0;
let sParts = [], sRaf = 0, sLast = 0, sSprite = null;
let fxStarted = false;

const rainGlyph = () => RAIN_GLYPHS[(Math.random() * RAIN_GLYPHS.length) | 0];

function sizeFxCanvas(cv, ctx){
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = Math.max(1, Math.round(innerWidth * dpr));
  cv.height = Math.max(1, Math.round(innerHeight * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function initMatrix(){
  const count = Math.ceil(innerWidth / RAIN_COL) + 1;
  mCols = Array.from({ length: count }, () => ({
    y: Math.random() * innerHeight,
    speed: 1 + Math.random() * 2.4,
    chars: Array.from({ length: 6 + ((Math.random() * 9) | 0) }, rainGlyph),
  }));
}
function drawMatrix(now){
  if(!matrixOn) return;
  requestAnimationFrame(drawMatrix);
  if(now - mLast < 33) return;
  mLast = now;
  const w = innerWidth, h = innerHeight;
  mctx.clearRect(0, 0, w, h);
  mctx.font = '12px "Cascadia Code",Consolas,"Lucida Console",monospace';
  mctx.textBaseline = 'top';
  mctx.fillStyle = '#ff4d5c';
  for(let i = 0; i < mCols.length; i++){
    const col = mCols[i], x = RAIN_COL * i + 4, trail = col.chars.length;
    const headRow = Math.floor(col.y / RAIN_ROW);
    for(let t = 0; t < trail; t++){
      mctx.globalAlpha = t ? .1 * (1 - t / trail) : .24;
      const idx = Math.abs(131 * i + 37 * (headRow - t)) % RAIN_GLYPHS.length;
      mctx.fillText(RAIN_GLYPHS.charAt(idx), x, col.y - RAIN_ROW * t);
    }
    col.y += col.speed;
    if(col.y - RAIN_ROW * trail > h){
      col.y = -200 * Math.random();
      col.speed = 1 + Math.random() * 2.4;
    }
  }
  mctx.globalAlpha = 1;
}
function startMatrix(){
  sizeFxCanvas(matrixCanvas, mctx);
  initMatrix();
  if(reduceMotion) return;
  matrixOn = true;
  mLast = 0;
  requestAnimationFrame(drawMatrix);
}
function makeSmokeSprite(){
  const s = document.createElement('canvas');
  s.width = s.height = 96;
  const c = s.getContext('2d');
  const g = c.createRadialGradient(48, 48, 0, 48, 48, 48);
  g.addColorStop(0, 'rgba(255,130,145,1)');
  g.addColorStop(.35, 'rgba(205,60,78,.55)');
  g.addColorStop(1, 'rgba(120,20,30,0)');
  c.fillStyle = g;
  c.fillRect(0, 0, 96, 96);
  return s;
}
function spawnSmoke(x, y, n){
  for(let i = 0; i < n; i++){
    sParts.push({
      x: x + (Math.random() - .5) * 18,
      y: y + (Math.random() - .5) * 18,
      vx: (Math.random() - .5) * 16,
      vy: -10 - Math.random() * 24,
      r: 9 + Math.random() * 18,
      grow: 16 + Math.random() * 28,
      a: .12 + Math.random() * .13,
      life: 0,
      ttl: .8 + Math.random() * .8,
    });
  }
  if(sParts.length > 90) sParts.splice(0, sParts.length - 90);
  if(!sRaf){ sLast = performance.now(); sRaf = requestAnimationFrame(smokeFrame); }
}
function smokeFrame(now){
  const dt = Math.min(.05, (now - sLast) / 1000 || .016);
  sLast = now;
  sctx.clearRect(0, 0, innerWidth, innerHeight);
  sctx.globalCompositeOperation = 'lighter';
  for(let i = sParts.length - 1; i >= 0; i--){
    const p = sParts[i];
    p.life += dt;
    if(p.life >= p.ttl){ sParts.splice(i, 1); continue; }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= .985;
    p.vy -= 4 * dt;
    const k = p.life / p.ttl;
    const r = p.r + p.grow * k;
    sctx.globalAlpha = Math.max(0, p.a * (1 - k));
    sctx.drawImage(sSprite, p.x - r, p.y - r, r * 2, r * 2);
  }
  sctx.globalAlpha = 1;
  if(sParts.length){
    sRaf = requestAnimationFrame(smokeFrame);
  }else{
    sRaf = 0;
    sctx.clearRect(0, 0, innerWidth, innerHeight);
  }
}
function startFx(){
  if(fxStarted) return;
  fxStarted = true;
  sizeFxCanvas(smokeCanvas, sctx);
  sSprite = makeSmokeSprite();
  startMatrix();

  addEventListener('resize', () => {
    sizeFxCanvas(smokeCanvas, sctx);
    if(matrixOn){
      sizeFxCanvas(matrixCanvas, mctx);
      initMatrix();
    }
  });
  addEventListener('pointerdown', e => {
    if(reduceMotion || e.pointerType === 'touch' || !document.body.classList.contains('in')) return;
    spawnSmoke(e.clientX, e.clientY, 7);
  }, { passive: true });
}

let entered = false;
let gateOpen = false;
let building = false;
const enterEl = document.getElementById('enter');
const splashArt = document.getElementById('splashArt');
const loadFill = document.getElementById('enterLoadFill');
const loadPct = document.getElementById('enterLoadPct');
const SPLASH_MS = 3000;
const BUILD_MS = 1750;

function revealSite(){
  document.body.classList.add('in');
  initScrollReveal();
  startFx();
  startArtEngine(bannerEl);
  startBackgroundArt();
  enterEl.classList.add('gone');
  setTimeout(() => { enterEl.style.display = 'none'; }, 1200);
  if(deepLinkedProfile) setTimeout(() => openProfile(deepLinkedProfile), 1100);
}

function enterSite(){
  if(entered) return;
  entered = true;
  startAmbientAudio();
  revealSite();
}

function showArt(){
  enterEl.classList.add('art');
  setTimeout(() => {
    startArtEngine(enterArt);
    startLoadMeter();
  }, 280);
}

function startLoadMeter(){
  if(reduceMotion || !loadFill || !loadPct) return;
  loadFill.style.transform = 'scaleX(0)';
  loadPct.textContent = '0%';
  enterEl.classList.remove('done');
  const t0 = performance.now();
  const step = now => {
    const p = Math.min(1, (now - t0) / BUILD_MS);
    loadFill.style.transform = 'scaleX(' + p.toFixed(3) + ')';
    loadPct.textContent = Math.round(p * 100) + '%';
    if(p < 1){ requestAnimationFrame(step); return; }
    enterEl.classList.add('done');
  };
  requestAnimationFrame(step);
}

function holdSplash(){
  if(entered || building) return;
  enterEl.classList.add('held');
  setTimeout(() => { if(splashArt) splashArt.style.visibility = 'hidden'; }, 1000);
}

function openGate(){
  if(gateOpen || entered) return;
  gateOpen = true;
  enterEl.classList.add('ready');
  enterEl.setAttribute('aria-label', 'Enter');
}

function skipIntro(){
  enterEl.classList.add('no-video');
  showArt();
  openGate();
}

function beginBuild(){
  if(entered || building || !gateOpen) return;
  building = true;
  enterEl.classList.add('build');
  showArt();
  if(reduceMotion){ enterSite(); return; }
  setTimeout(enterSite, 2600);
}

function startSplash(){
  if(reduceMotion || !splashArt){ skipIntro(); return; }
  let armed = false;
  const arm = () => {
    if(armed) return;
    armed = true;
    setTimeout(holdSplash, SPLASH_MS);
    setTimeout(openGate, SPLASH_MS);
  };
  splashArt.addEventListener('error', skipIntro, { once: true });
  const watch = () => {
    if(armed || gateOpen) return;
    if(splashArt.complete){
      if(splashArt.naturalWidth) arm();
      else skipIntro();
      return;
    }
    setTimeout(watch, 80);
  };
  watch();
  setTimeout(openGate, SPLASH_MS + 2500);
}

enterEl.addEventListener('click', beginBuild);
document.addEventListener('keydown', e => {
  if(!entered && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); beginBuild(); }
});
rosterEl.addEventListener('click', e => {
  const btn = e.target.closest('.m');
  if(btn && document.body.classList.contains('in')) openProfile(BYID[btn.dataset.id]);
});

startSplash();
startPresence();
})();
