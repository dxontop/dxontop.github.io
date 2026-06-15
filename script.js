// ===========================
//  1998 — SCRIPT.JS
// ===========================

/* ---- TAB TITLE ANIMATION ---- */
const tabTitles = [
  "1998",
  "19",
  "198",
  "1998",
  "— 1998 —",
  "1998",
  "[ 1998 ]",
  "1998",
];
let tabIndex = 0;
let tabForward = true;

function animateTabTitle() {
  const title = document.getElementById("tab-title");
  const current = "1998";
  let chars = current.split("");
  let displayed = "";
  let charIdx = 0;
  let erasing = false;
  let pauseCount = 0;

  function typeStep() {
    if (!erasing) {
      if (charIdx < chars.length) {
        displayed += chars[charIdx];
        charIdx++;
        title.textContent = displayed + (charIdx < chars.length ? "|" : "");
        setTimeout(typeStep, 80 + Math.random() * 60);
      } else {
        title.textContent = displayed;
        setTimeout(() => { erasing = true; typeStep(); }, 2800);
      }
    } else {
      if (displayed.length > 0) {
        displayed = displayed.slice(0, -1);
        title.textContent = displayed + "|";
        setTimeout(typeStep, 50);
      } else {
        title.textContent = "|";
        setTimeout(() => {
          erasing = false;
          charIdx = 0;
          displayed = "";
          typeStep();
        }, 500);
      }
    }
  }
  typeStep();
}

animateTabTitle();

/* ---- SPLASH SCREEN ---- */
window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");
  const enterBtn = document.getElementById("splash-enter");
  const main = document.getElementById("main-site");
  const music = document.getElementById("bg-music");

  function enterSite() {
    // Play music on user gesture — guaranteed to work
    if (music) {
      music.volume = 0.35;
      music.play();
    }

    // Slide splash up
    splash.classList.add("slide-up");

    // After slide completes, show main site
    setTimeout(() => {
      splash.style.display = "none";
      main.style.display = "block";
      main.style.opacity = "0";
      requestAnimationFrame(() => {
        main.style.transition = "opacity 0.7s ease";
        main.style.opacity = "1";
      });
      startTerminalAnimation();
      startServersTyping();
    }, 850);
  }

  // Both the button AND clicking anywhere on splash triggers enter
  enterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    enterSite();
  });

  splash.addEventListener("click", enterSite);
});

/* ---- NAVBAR ACTIVE STATE ---- */
const sections = ["hof", "tte", "exclusive", "members", "servers", "terminal"];

function updateNav() {
  const scrollY = window.scrollY + window.innerHeight / 2;
  for (const id of sections) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.offsetTop;
    const bot = top + el.offsetHeight;
    if (scrollY >= top && scrollY < bot) {
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      const link = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (link) link.classList.add("active");
    }
  }
}

window.addEventListener("scroll", updateNav);
updateNav();

/* ---- SERVERS SECTION TYPING ---- */
const serversText = `Welcome to 1998 — where the most skillful, undefeated minds converge. Pure skill, elite execution, unmatched presence. We don't end debates... we end eras. Bring your vision and undeniable talent — everyone's welcome, but only the skillful endure and the undefeated define what's next.`;

function startServersTyping() {
  const el = document.getElementById("servers-desc");
  if (!el) return;
  let i = 0;
  el.textContent = "";

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      function type() {
        if (i < serversText.length) {
          el.textContent = serversText.slice(0, i + 1);
          i++;
          setTimeout(type, 22);
        }
      }
      type();
    }
  }, { threshold: 0.3 });
  observer.observe(el);
}

/* ---- ASCII ART ---- */
const asciiArt = `
        ..            ..          ...              ...               ...
   :**8888H:  \`. .xH""    :~"8888x :"888x     xH88"\`~ .x8X        .x888888hx    :
   X   \`8888k XX888    8    8888Xf  8888>   :8888.   .f"8888Hf   d88888888888hxx
  '8hx  48888 ?8888   d8b   ?8888< X8888    :8888>  .f  \`8888Xf  8" ... \`"*8888\`
   888x  8888 \`8888  ,888    \`8888  8888X     \`8888L.\`888  X8888  !   ..    8888
  '88888888888  8888 :88888   8888  X8888h     8888\`  8888  X8888   . \` \` . .xnxx.
    "888X:8888  8888  "88888  8888  \`8888>    .8888   8888  X8888  X  .HH8888888%:
     \`8 '8888   8888   "8888  \`888  :8888>   .8888X:xnHH(\`\` 88888  !88888.  X X
        '8888   8888    8888    888   \`8888    \`8888l 26~  8888X  X8888  %88888  X 'hn8888888*"   >
        .X*"   \`888     \`88     88     8888L   \`888  ?888  X888   ~\`     X888>  X8888  \`8888  .8\`
       .888    X8888     88      8     \`8888    \`888  8888L X888   -.*""  /    \`8888888888888f
      .H8888h.\`\`8888.>  888      8      8888>   \`888  8888~ X888   -.*"""      :"        \`\$8888888888*"
         \`~\`      ##    \`\`       \`       \`\`\`*\`     ^^_____^^      \`"\`\`\`\`~\`           \`\`\`\`*\`\`\`\`\`\`\`
`.trim();

document.getElementById("ascii-art").textContent = asciiArt;

/* ---- TERMINAL OUTPUT ANIMATION ---- */
const terminalLines = [
  { text: "[$] Target IP resolved: 192.168.x.x (Cloudflare CDN)", cls: "" },
  { text: "[$] Geolocation: San Francisco, CA — United States", cls: "" },
  { text: "[$] ISP: Cloudflare Inc. | ASN: AS13335", cls: "" },
  { text: "", cls: "" },
  { text: "[>] Running port scan... (0-65535)", cls: "bold" },
  { text: "22/tcp   open  ssh", cls: "port dim" },
  { text: "80/tcp   open  http", cls: "port dim" },
  { text: "443/tcp  open  https", cls: "port dim" },
  { text: "8443/tcp open  alt-https", cls: "port dim" },
  { text: "", cls: "" },
  { text: "[$] Scan complete — 4 open ports detected", cls: "green" },
  { text: "", cls: "" },
  { text: "[>] Checking vulnerabilities...", cls: "bold" },
  { text: "[$] CVE-2024-0001 — CRITICAL — RCE via header injection", cls: "red-text" },
  { text: "[$] CVE-2023-9812 — HIGH — Auth bypass (port 8443)", cls: "yellow" },
  { text: "", cls: "" },
  { text: "root@1998 : ~/1998 $", cls: "bold" },
];

function startTerminalAnimation() {
  const output = document.getElementById("terminal-output");
  if (!output) return;
  output.innerHTML = "";
  let i = 0;

  function addLine() {
    if (i >= terminalLines.length) {
      // Add blinking cursor at end
      const cursor = document.createElement("span");
      cursor.className = "terminal-cursor";
      output.appendChild(cursor);
      return;
    }
    const { text, cls } = terminalLines[i];
    const line = document.createElement("span");
    line.className = "t-line " + cls;
    line.textContent = text;
    output.appendChild(line);
    i++;
    const delay = text === "" ? 80 : 120 + Math.random() * 120;
    setTimeout(addLine, delay);
  }

  // Delay until in view
  const terminalSection = document.getElementById("terminal");
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      setTimeout(addLine, 400);
    }
  }, { threshold: 0.2 });
  observer.observe(terminalSection);
}

/* ---- SMOOTH SCROLL FOR NAV LINKS ---- */
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("data-section");
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ---- HOF CARDS PARALLAX SUBTLE ---- */
window.addEventListener("scroll", () => {
  const hofCards = document.querySelectorAll(".hof-card");
  const scrolled = window.scrollY;
  hofCards.forEach((card, i) => {
    const offset = (i % 2 === 0 ? 1 : -1) * scrolled * 0.02;
    card.style.transform = `translateY(${offset}px)`;
  });
});

/* ---- MEMBERS ROW AUTO-SCROLL ---- */
function setupMembersScroll() {
  const rows = document.querySelectorAll(".members-row");
  rows.forEach((row, idx) => {
    let direction = idx % 2 === 0 ? 1 : -1;
    let speed = 0.4;
    let scrollPos = idx % 2 === 0 ? 0 : row.scrollWidth;

    setInterval(() => {
      scrollPos += speed * direction;
      if (scrollPos >= row.scrollWidth - row.clientWidth) direction = -1;
      if (scrollPos <= 0) direction = 1;
      row.scrollLeft = scrollPos;
    }, 16);
  });
}

setupMembersScroll();
