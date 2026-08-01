(function () {
    "use strict";

    const FAVICON_URL = 'https://file.garden/amQoMeBMSROPxoxS/icon1.jpg';

    const SOCIAL_ICONS = {
        roblox:  { icon: 'https://file.garden/amQoMeBMSROPxoxS/roblox-removebg-preview.png', fallback: 'RBLX' },
        spotify: { icon: 'https://file.garden/amQoMeBMSROPxoxS/spoti-removebg-preview.png',  fallback: 'SPT' },
    };

    const FOUNDERS = [
        {
            id: '1521890728094208122',
            tag: 'daz',
            roblox: '',
            spotify: '',
        },
        {
            id: '1512675755459612835',
            tag: 'dx',
            roblox: 'https://www.roblox.com/users/3651943969/profile',
            spotify: 'https://open.spotify.com/user/31ctaiop3p6jv6wgtq7oijgvsiku?si=4ca6285a382549e0',
        },
    ];

    const SERVER_SECTIONS = {
        main: [
            { href: 'https://discord.gg/86C4SQQgQ7', icon: 'https://file.garden/amQoMeBMSROPxoxS/t2s-removebg-preview.png' },
            { href: 'https://discord.gg/DjM8B4ZaZM', icon: 'https://file.garden/amQoMeBMSROPxoxS/snl-removebg-preview.png' },
        ],
        liveLaughLove: [
            { href: 'https://discord.gg/86C4SQQgQ7',  icon: 'https://file.garden/amQoMeBMSROPxoxS/t2s-removebg-preview.png' },
            { href: 'https://discord.gg/3XTEtgEmS3',  icon: 'https://file.garden/amQoMeBMSROPxoxS/brt-removebg-preview.png' },
            { href: 'https://discord.gg/jPUJZV8uE',   icon: 'https://file.garden/amQoMeBMSROPxoxS/chicas.png' },
            { href: 'https://discord.gg/hNuGgSGw5U',  icon: 'https://file.garden/amQoMeBMSROPxoxS/feiren' },
            { href: 'https://discord.gg/pyd52jhCvm',  icon: 'https://file.garden/amQoMeBMSROPxoxS/exodus-removebg-preview.png' },
        ],
    };

    const NORMAL_SONG   = 'https://file.garden/amQoMeBMSROPxoxS/sadbai';
    const RED_MODE_SONG = 'https://file.garden/amQoMeBMSROPxoxS/fuck%20you';

    const STATUS_COLORS = {
        online:  '#43b581',
        idle:    '#faa61a',
        dnd:     '#f04747',
        offline: '#747f8d',
    };

    const RETRY_DELAYS = [1000, 2000, 4000];

    const ABOUT_TEXT = "We\u2019re just two idiots who decided to team up and chase something bigger than ourselves, quietly working to become one of the faces of this generation while staying humble every step of the way. Every move we make is calculated we run things silently, let our results speak louder than our names, and build a presence that commands respect without ever asking for it.";

    const HEART_ICON_SVG = '<path d="M12 20.5C12 20.5 3.8 15.2 3.8 9.2 3.8 5.9 6.2 3.5 9.4 3.5c1.7 0 3.2.9 3.9 2.3.7-1.4 2.2-2.3 3.9-2.3 3.2 0 5.6 2.4 5.6 5.7 0 6-8.2 11.3-8.2 11.3z" fill="currentColor"/>';
    const SKULL_ICON_SVG = '<path d="M12 2C7.8 2 4.3 5.6 4.3 10c0 2.5 1.2 4.7 3.1 6.1h9.2c1.9-1.4 3.1-3.6 3.1-6.1C19.7 5.6 16.2 2 12 2z" fill="currentColor"/>' +
        '<rect x="7.4" y="15.6" width="9.2" height="1.3" fill="currentColor"/>' +
        '<path d="M7.4,16.9 L9.24,16.9 L8.32,19.9 Z M9.24,16.9 L11.08,16.9 L10.16,19.9 Z M11.08,16.9 L12.92,16.9 L12,19.9 Z M12.92,16.9 L14.76,16.9 L13.84,19.9 Z M14.76,16.9 L16.6,16.9 L15.68,19.9 Z" fill="currentColor"/>' +
        '<ellipse cx="8.7" cy="9.3" rx="2.05" ry="2.55" fill="var(--bg)"/>' +
        '<ellipse cx="15.3" cy="9.3" rx="2.05" ry="2.55" fill="var(--bg)"/>' +
        '<path d="M12 10.9l-1.35 2.5h2.7z" fill="var(--bg)"/>';

    function setFavicon() {
        const link = document.getElementById('favicon');
        if (link) link.href = FAVICON_URL;
    }

    function createFounderCard(founder) {
        const card = document.createElement('div');
        card.className = 'founder-card';
        card.id = 'founder-' + founder.id;

        const avatarWrap = document.createElement('div');
        avatarWrap.className = 'founder-avatar-wrap';

        const avatarImg = document.createElement('img');
        avatarImg.className = 'founder-avatar';
        avatarImg.alt = founder.tag + "'s avatar";
        avatarWrap.appendChild(avatarImg);

        const decorationImg = document.createElement('img');
        decorationImg.className = 'founder-decoration hidden';
        decorationImg.alt = '';
        decorationImg.setAttribute('aria-hidden', 'true');
        avatarWrap.appendChild(decorationImg);

        const statusDot = document.createElement('span');
        statusDot.className = 'founder-status-dot';
        statusDot.setAttribute('aria-hidden', 'true');
        avatarWrap.appendChild(statusDot);

        card.appendChild(avatarWrap);

        const nameEl = document.createElement('div');
        nameEl.className = 'founder-name';
        nameEl.textContent = 'loading';
        card.appendChild(nameEl);

        const tagEl = document.createElement('div');
        tagEl.className = 'founder-tag';
        tagEl.textContent = founder.tag;
        card.appendChild(tagEl);

        const linksEl = document.createElement('div');
        linksEl.className = 'founder-links';

        [
            { href: founder.roblox,  icon: SOCIAL_ICONS.roblox.icon,  fallback: SOCIAL_ICONS.roblox.fallback },
            { href: founder.spotify, icon: SOCIAL_ICONS.spotify.icon, fallback: SOCIAL_ICONS.spotify.fallback },
        ].forEach(function (link) {
            const a = document.createElement('a');
            a.className = 'founder-link';
            a.href = link.href || '';
            a.target = '_blank';
            a.rel = 'noopener';
            a.setAttribute('aria-hidden', 'true');

            const img = document.createElement('img');
            img.src = link.icon;
            img.alt = '';
            img.addEventListener('error', function () {
                img.replaceWith(document.createTextNode(link.fallback));
            });

            a.appendChild(img);
            linksEl.appendChild(a);
        });

        card.appendChild(linksEl);
        return card;
    }

    function renderFounders() {
        const grid = document.getElementById('founders-grid');
        if (!grid) return;
        grid.innerHTML = '';
        FOUNDERS.forEach(function (founder) {
            grid.appendChild(createFounderCard(founder));
        });
    }

    function createServerCard(server, isDuplicate) {
        const a = document.createElement('a');
        a.className = 'server-card';
        a.href = server.href;

        if (isDuplicate) {
            a.tabIndex = -1;
            a.setAttribute('aria-hidden', 'true');
        } else {
            a.target = '_blank';
            a.rel = 'noopener';
            a.setAttribute('aria-label', 'Join server');
        }

        const iconWrap = document.createElement('div');
        iconWrap.className = 'server-icon';

        const img = document.createElement('img');
        img.src = server.icon;
        img.alt = '';
        img.addEventListener('error', function () {
            img.style.display = 'none';
        });

        iconWrap.appendChild(img);
        a.appendChild(iconWrap);
        return a;
    }

    function renderServerSection(key, loop) {
        const wrapper = document.querySelector('.servers-wrapper[data-servers="' + key + '"]');
        if (!wrapper) return;
        const track = wrapper.querySelector('.carousel-track');
        if (!track) return;

        const servers = SERVER_SECTIONS[key] || [];
        track.innerHTML = '';
        // visible set
        servers.forEach(function (s) { track.appendChild(createServerCard(s, false)); });
        // duplicate set, only needed for the seamless auto-scrolling loop
        if (loop) {
            servers.forEach(function (s) { track.appendChild(createServerCard(s, true)); });
        }
    }

    function setInitialAudioSrc() {
        const audio = document.getElementById('bg-audio');
        if (audio) audio.src = NORMAL_SONG;
    }

    let aboutTyped = false;
    function initAboutTyping() {
        if (aboutTyped) return;
        aboutTyped = true;

        const textEl = document.getElementById('about-description-text');
        const cursorEl = document.getElementById('about-cursor');
        if (!textEl) return;

        let i = 0;
        function type() {
            if (i <= ABOUT_TEXT.length) {
                textEl.textContent = ABOUT_TEXT.slice(0, i);
                i++;
                setTimeout(type, 28);
            } else if (cursorEl) {
                setTimeout(() => { cursorEl.style.display = 'none'; }, 1400);
            }
        }
        type();
    }

    function initScrollReveal() {
        const revealEls = document.querySelectorAll('.reveal');
        if (!revealEls.length) return;

        if (!('IntersectionObserver' in window)) {
            revealEls.forEach(el => el.classList.add('visible'));
            const card = document.querySelector('.about-card');
            if (card) card.classList.add('revealed');
            initAboutTyping();
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');

                if (entry.target.classList.contains('about-wrapper')) {
                    const card = entry.target.querySelector('.about-card');
                    if (card) card.classList.add('revealed');
                    setTimeout(initAboutTyping, 550);
                }

                observer.unobserve(entry.target);
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

        revealEls.forEach(el => observer.observe(el));
    }

    function initIntro() {
        const intro = document.getElementById('intro');
        const mainContent = document.getElementById('main-content');
        if (!intro || !mainContent) return;

        function showMain() {
            intro.classList.add('hidden');
            mainContent.classList.add('visible');
            document.getElementById('audio-toggle').style.display = 'flex';
            var themeBtn = document.getElementById('theme-toggle');
            if (themeBtn) themeBtn.style.display = 'flex';
            playAudio();
        }

        intro.addEventListener('click', showMain);
        intro.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showMain();
            }
        });
    }


    (function initStars() {
        const canvas = document.getElementById('stars');
        if (!canvas) return;
        const ctx    = canvas.getContext('2d');
        let stars    = [];
        let w, h;

        function resize() {
            w = canvas.width  = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        function genStars(n) {
            stars = [];
            for (let i = 0; i < n; i++) {
                stars.push({
                    x:  Math.random() * w,
                    y:  Math.random() * h,
                    r:  Math.random() * 1.1 + 0.2,
                    o:  Math.random() * 0.5 + 0.1,
                    s:  (Math.random() - 0.5) * 0.003,
                    vx: (Math.random() - 0.5) * 0.16,
                    vy: 0.1 + Math.random() * 0.16,
                    flicker: 0,
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);
            var isRed = document.body.classList.contains('red-mode');
            var rgb = isRed ? '224,60,50' : '255,255,255';
            stars.forEach(s => {
                s.o += s.s;
                if (s.o <= 0.05 || s.o >= 0.65) s.s *= -1;

                s.x += s.vx;
                s.y += s.vy;

                if (s.x < 0) s.x = w;
                if (s.x > w) s.x = 0;
                if (s.y < 0) s.y = h;
                if (s.y > h) s.y = 0;

                if (s.flicker > 0) s.flicker -= 0.045;

                var brightness = Math.min(1, s.o + s.flicker);

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb},${brightness})`;
                ctx.fill();
            });
            requestAnimationFrame(draw);
        }

        function flickerBurst() {
            for (let i = 0; i < 20; i++) {
                var idx = Math.floor(Math.random() * stars.length);
                if (stars[idx]) stars[idx].flicker = 1;
            }
        }

        resize();
        genStars(180);
        draw();
        (function scheduleFlicker() {
            var isRed = document.body.classList.contains('red-mode');
            setTimeout(function() {
                flickerBurst();
                scheduleFlicker();
            }, isRed ? 600 : 7000);
        })();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => { resize(); }, 150);
        });
    })();


    function avatarUrl(user, size) {
        size = size || 128;
        if (!user || !user.avatar) {
            return defaultAvatarUrl(user);
        }
        const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
        return 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.' + ext + '?size=' + size;
    }

    function defaultAvatarUrl(user) {
        if (!user) return 'https://cdn.discordapp.com/embed/avatars/0.png';
        if (!user.discriminator || user.discriminator === '0') {
            var idx = 0;
            try { idx = Number((BigInt(user.id) >> BigInt(22)) % BigInt(6)); } catch (e) { idx = 0; }
            return 'https://cdn.discordapp.com/embed/avatars/' + idx + '.png';
        }
        return 'https://cdn.discordapp.com/embed/avatars/' + (user.discriminator % 5) + '.png';
    }

    function setAvatarWithFallback(imgEl, user, size) {
        if (!imgEl || !user) return;
        size = size || 128;
        var isAnimated = !!(user.avatar && user.avatar.startsWith('a_'));
        var triedWebp = false;
        imgEl.src = avatarUrl(user, size);
        imgEl.onerror = function() {
            if (isAnimated && !triedWebp) {
                triedWebp = true;
                imgEl.src = 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.webp?size=' + size + '&animated=true';
                return;
            }
            imgEl.onerror = null;
            imgEl.src = defaultAvatarUrl(user);
        };
    }

    function applyStatus(dotEl, status) {
        if (!dotEl) return;
        dotEl.style.background = STATUS_COLORS[status] || STATUS_COLORS.offline;
        dotEl.setAttribute('data-status', status || 'offline');
    }

    async function fetchUser(id, attempt) {
        attempt = attempt || 0;
        try {
            var res  = await fetch('https://api.lanyard.rest/v1/users/' + id);
            if (!res.ok) throw new Error('HTTP ' + res.status);
            var json = await res.json();
            if (!json.success) throw new Error('API error');
            return json.data;
        } catch (err) {
            if (attempt < RETRY_DELAYS.length) {
                await new Promise(function(r) { setTimeout(r, RETRY_DELAYS[attempt]); });
                return fetchUser(id, attempt + 1);
            }
            console.warn('Failed to fetch user ' + id + ':', err.message);
            return null;
        }
    }

    async function updateFounder(id) {
        var data = await fetchUser(id);
        var card = document.getElementById('founder-' + id);
        if (!card) return;

        var nameEl = card.querySelector('.founder-name');

        if (!data || !data.discord_user) {
            if (nameEl) nameEl.textContent = 'unavailable';
            return;
        }

        var discord_user = data.discord_user;
        var discord_status = data.discord_status;

        var founderAvatar = card.querySelector('.founder-avatar');
        setAvatarWithFallback(founderAvatar, discord_user, 128);

        if (nameEl) nameEl.textContent = discord_user.global_name || discord_user.username;
        applyStatus(card.querySelector('.founder-status-dot'), discord_status);

        var decEl = card.querySelector('.founder-decoration');
        if (decEl && discord_user.avatar_decoration_data && discord_user.avatar_decoration_data.asset) {
            decEl.src = 'https://cdn.discordapp.com/avatar-decoration-presets/' + discord_user.avatar_decoration_data.asset + '.png?size=128&passthrough=true';
            decEl.classList.remove('hidden');
            decEl.onerror = function() { decEl.classList.add('hidden'); };
        } else if (decEl) {
            decEl.classList.add('hidden');
        }
    }

    function initFounderToggle() {
        const toggle = document.getElementById('founders-toggle');
        const grid = document.getElementById('founders-grid');
        if (!toggle || !grid) return;

        toggle.addEventListener('click', function() {
            grid.classList.toggle('collapsed');
            const isExpanded = !grid.classList.contains('collapsed');
            toggle.setAttribute('aria-expanded', isExpanded);
        });

        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            }
        });
    }

    function initFounderSpread() {
        const cards = document.querySelectorAll('.founder-card');
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.closest('.founder-link')) return;
                card.classList.toggle('spread');
            });

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.classList.toggle('spread');
                }
            });

            document.addEventListener('click', (e) => {
                if (!card.contains(e.target)) {
                    card.classList.remove('spread');
                }
            });
        });
    }

    function initAudio() {
        const audio = document.getElementById('bg-audio');
        const toggle = document.getElementById('audio-toggle');
        if (!audio || !toggle) return;

        toggle.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                toggle.innerHTML = '<span class="audio-icon">\u2759\u2759</span>';
                toggle.setAttribute('aria-label', 'Pause background music');
            } else {
                audio.pause();
                toggle.innerHTML = '<span class="audio-icon">\u25B6</span>';
                toggle.setAttribute('aria-label', 'Play background music');
            }
        });
    }

    function playAudio() {
        const audio = document.getElementById('bg-audio');
        if (!audio) return;
        var playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(function(error) {
                console.log('Audio autoplay prevented:', error);
            });
        }
    }

    function disableDevTools() {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });

        document.addEventListener('keydown', function(e) {
            var blocked =
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) ||
                (e.ctrlKey && (e.key === 'U' || e.key === 'u'));

            if (blocked) {
                e.preventDefault();
            }
        });
    }

    function initThemeToggle() {
        const btn = document.getElementById('theme-toggle');
        const audio = document.getElementById('bg-audio');
        const icon = btn ? btn.querySelector('.theme-icon') : null;
        if (!btn) return;

        if (icon) {
            icon.addEventListener('animationend', function(e) {
                if (e.animationName === 'icon-spin') icon.classList.remove('spinning');
            });
        }

        btn.addEventListener('click', function() {
            var redMode = document.body.classList.toggle('red-mode');
            btn.setAttribute('aria-label', redMode ? 'Disable red mode' : 'Enable red mode');

            if (icon) {
                icon.classList.remove('spinning');
                void icon.offsetWidth;
                icon.innerHTML = redMode ? SKULL_ICON_SVG : HEART_ICON_SVG;
                icon.classList.add('spinning');
            }

            if (audio) {
                var wasPlaying = !audio.paused;
                var nextSrc = redMode ? RED_MODE_SONG : NORMAL_SONG;
                if (nextSrc) {
                    audio.src = nextSrc;
                    if (wasPlaying) audio.play().catch(function() {});
                }
            }
        });
    }

    setFavicon();
    setInitialAudioSrc();
    renderFounders();
    renderServerSection('main', false);
    renderServerSection('liveLaughLove', true);

    FOUNDERS.forEach(founder => {
        updateFounder(founder.id);
    });

    initIntro();
    initScrollReveal();
    initFounderToggle();
    initFounderSpread();
    initAudio();
    disableDevTools();
    initThemeToggle();
})();
