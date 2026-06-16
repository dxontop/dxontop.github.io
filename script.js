// ════════════════════════════════════════
//  1998 — SCRIPT.JS
// ════════════════════════════════════════

/* ── TAB TITLE TYPING ANIMATION ── */
(function () {
  const el = document.getElementById("tab-title");
  const text = "1998";
  let i = 0, erasing = false, out = "";

  function step() {
    if (!erasing) {
      out = text.slice(0, ++i);
      el.textContent = out + (i < text.length ? "|" : "");
      if (i === text.length) { setTimeout(() => { erasing = true; step(); }, 3000); return; }
    } else {
      out = out.slice(0, -1);
      el.textContent = out + "|";
      if (out.length === 0) { erasing = false; i = 0; setTimeout(step, 500); return; }
    }
    setTimeout(step, erasing ? 50 : 90 + Math.random() * 60);
  }
  step();
})();

/* ── SPLASH ── */
window.addEventListener("load", () => {
  const splash  = document.getElementById("splash");
  const btn     = document.getElementById("enter-btn");
  const site    = document.getElementById("site");
  const music   = document.getElementById("bg-music");
  let entered   = false;

  function enter() {
    if (entered) return;
    entered = true;

    /* Music starts on tap — guaranteed autoplay */
    if (music) { music.volume = 0.3; music.play(); }

    /* Slide splash off the top */
    splash.classList.add("up");

    setTimeout(() => {
      splash.style.display = "none";
      site.classList.add("visible");
      initTerminal();
      initServersTyping();
    }, 900);
  }

  btn.addEventListener("click",    e => { e.stopPropagation(); enter(); });
  splash.addEventListener("click", enter);
});

/* ── NAV ACTIVE ON SCROLL ── */
const NAV_SECTIONS = ["hof","tte","exclusive","servers","terminal"];

function updateNav() {
  const mid = window.scrollY + window.innerHeight * 0.45;
  NAV_SECTIONS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const link = document.querySelector(`#nav a[data-s="${id}"]`);
    if (!link) return;
    if (mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) {
      document.querySelectorAll("#nav a").forEach(a => a.classList.remove("active"));
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

/* ── NAV SMOOTH SCROLL ── */
document.querySelectorAll("#nav a").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    const t = document.getElementById(a.dataset.s);
    if (t) t.scrollIntoView({ behavior: "smooth" });
  });
});

/* ── SERVERS TYPING DESCRIPTION ── */
const SRV_TEXT = `Welcome to 1998 — where the most skillful, undefeated minds converge. Pure skill, elite execution, unmatched presence. We don't end debates... we end eras. Bring your vision and undeniable talent — everyone's welcome, but only the skillful endure and the undefeated define what's next.`;

function initServersTyping() {
  const el = document.getElementById("srv-desc");
  if (!el) return;
  let i = 0;
  el.textContent = "";
  const obs = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    obs.disconnect();
    (function type() {
      if (i < SRV_TEXT.length) { el.textContent = SRV_TEXT.slice(0, ++i); setTimeout(type, 20); }
    })();
  }, { threshold: 0.3 });
  obs.observe(el);
}

/* ── ASCII ART — "1998" in big block letters ── */
const ASCII = `
 ██╗ █████╗  █████╗  █████╗ 
███║██╔══██╗██╔══██╗██╔══██╗
╚██║╚██████║╚██████║╚█████╔╝
 ██║ ╚═══██║ ╚═══██║██╔══██╗
 ██║ █████╔╝ █████╔╝╚█████╔╝
 ╚═╝ ╚════╝  ╚════╝  ╚════╝ 
`.trim();

document.getElementById("ascii-art").textContent = ASCII;

/* ── TERMINAL ANIMATION ── */
const LINES = [
  { t: "[$] Target IP resolved: 192.168.x.x (Cloudflare CDN)", c: "" },
  { t: "[$] Geolocation: San Francisco, CA — United States",   c: "" },
  { t: "[$] ISP: Cloudflare Inc. | ASN: AS13335",              c: "" },
  { t: "",                                                       c: "" },
  { t: "[>] Running port scan... (0-65535)",                    c: "bld" },
  { t: "22/tcp    open  ssh",                                   c: "port dim" },
  { t: "80/tcp    open  http",                                  c: "port dim" },
  { t: "443/tcp   open  https",                                 c: "port dim" },
  { t: "8443/tcp  open  alt-https",                             c: "port dim" },
  { t: "",                                                       c: "" },
  { t: "[$] Scan complete — 4 open ports detected",             c: "grn" },
  { t: "",                                                       c: "" },
  { t: "[>] Checking vulnerabilities...",                        c: "bld" },
  { t: "[$] CVE-2024-0001 — CRITICAL — RCE via header injection", c: "red" },
  { t: "[$] CVE-2023-9812 — HIGH    — Auth bypass (port 8443)", c: "ylw" },
  { t: "",                                                       c: "" },
  { t: "root@1998 : ~/1998 $",                                  c: "bld" },
];

function initTerminal() {
  const out  = document.getElementById("term-out");
  const sect = document.getElementById("terminal");
  if (!out || !sect) return;
  out.innerHTML = "";
  let i = 0;

  function next() {
    if (i >= LINES.length) {
      const cur = document.createElement("span");
      cur.className = "term-cursor";
      out.appendChild(cur);
      return;
    }
    const { t, c } = LINES[i++];
    const ln = document.createElement("span");
    ln.className = "tl " + c;
    ln.textContent = t;
    out.appendChild(ln);
    setTimeout(next, t === "" ? 60 : 110 + Math.random() * 110);
  }

  const obs = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    obs.disconnect();
    setTimeout(next, 300);
  }, { threshold: 0.2 });
  obs.observe(sect);
}
