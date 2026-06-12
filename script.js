/* ==================== CONFIGURATION ==================== */
// Edit this section to customize your profile

const config = {
    // SPLASH SCREEN
    splash: {
        logo: "https://ui-avatars.com/api/?name=LOGO&background=0D8ABC&color=fff&size=128", // REPLACE WITH YOUR LOGO URL
        title: "ENTERING THE GRID" // Text shown on splash
    },

    // PROFILE INFO
    profile: {
        username: "@0fearz", // YOUR USERNAME
        bio: "Clan Member | Halo & CoD", // YOUR BIO
        avatar: "https://ui-avatars.com/api/?name=0fearz&background=0D8ABC&color=fff&size=128", // REPLACE WITH YOUR AVATAR URL
        footerName: "0fearz"
    },

    // BACKGROUND
    background: {
        color: "#0f0f0f", // Change to any hex color
        dots: true, // true = show dots, false = hide dots
        dotColor: "#1a1a1a", // Dot color
        customImage: "" // REPLACE WITH YOUR BACKGROUND IMAGE URL
    },

    // LINKS
    links: [
        { name: "Twitch", url: "#" },
        { name: "Discord Server", url: "#" },
        { name: "YouTube", url: "#" },
        { name: "Join the Clan", url: "#" }
    ],

    // MUSIC
    music: {
        src: "https://cdn.pixabay.com/audio/2026/06/12/audio_ce3aa6bf19.mp3", // YOUR MUSIC URL
        autoPlay: true, // Set to true - but browser may block it
        showButton: true // Show play button for user to click manually
    },

    // TITLE ANIMATION
    titleAnimation: {
        enabled: true,
        texts: ["0fearz", "Clan Member", "Online"],
        speed: 500
    }
};

/* ==================== MAIN CODE ==================== */

document.addEventListener('DOMContentLoaded', () => {
    initProfile();
    initSplash();
    initMusic();
    initTitleAnimation();
});

// 1. PROFILE INITIALIZATION
function initProfile() {
    // Set background
    if (config.background.customImage) {
        document.body.style.background = `url('${config.background.customImage}') no-repeat center center fixed`;
        document.body.style.backgroundSize = 'cover';
    } else if (config.background.dots) {
        document.body.style.backgroundImage = `radial-gradient(${config.background.dotColor} 1px, transparent 1px)`;
        document.body.style.backgroundSize = '20px 20px';
    }
    document.body.style.backgroundColor = config.background.color;

    // Set profile info
    document.getElementById('profile-avatar').src = config.profile.avatar;
    document.getElementById('profile-username').textContent = config.profile.username;
    document.getElementById('profile-bio').textContent = config.profile.bio;
    document.getElementById('footer-name').textContent = config.profile.footerName;
    document.getElementById('footer-name').style.color = '#00ff88';

    // Generate links
    const linksContainer = document.getElementById('links-container');
    config.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.className = 'link-btn';
        a.textContent = link.name;
        linksContainer.appendChild(a);
    });
}

// 2. SPLASH SCREEN (TAP TO ENTER)
function initSplash() {
    const splashScreen = document.getElementById('splash-screen');
    const splashLogo = document.getElementById('splash-logo');
    const splashTitle = document.getElementById('splash-title');

    // Set splash content
    splashLogo.src = config.splash.logo;
    splashTitle.textContent = config.splash.title;

    // Add tap/click event to enter
    splashScreen.addEventListener('click', enterSite);
    splashScreen.addEventListener('touchstart', enterSite);

    function enterSite() {
        // Hide splash
        splashScreen.classList.add('hidden');
        document.querySelector('.container').classList.add('visible');

        // Remove splash from DOM after animation
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800);
    }
}

// 3. MUSIC (WITH CONTROL BUTTON)
function initMusic() {
    if (!config.music.src) return;

    // Create audio element
    const audio = document.createElement('audio');
    audio.src = config.music.src;
    audio.loop = true;
    audio.id = 'bg-music';
    document.body.appendChild(audio);

    // Create control button
    const btn = document.createElement('button');
    btn.id = 'music-btn';
    btn.textContent = 'Play Music';
    btn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: transparent;
        border: 1px solid #333;
        color: #555;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
        font-family: inherit;
        transition: all 0.3s ease;
        z-index: 100;
    `;
    
    // Hover effect
    btn.onmouseenter = () => {
        btn.style.borderColor = '#00ff88';
        btn.style.color = '#00ff88';
    };
    btn.onmouseleave = () => {
        btn.style.borderColor = '#333';
        btn.style.color = '#555';
    };
    
    document.body.appendChild(btn);

    let isPlaying = false;

    // Try auto-play (may be blocked)
    if (config.music.autoPlay) {
        audio.play().then(() => {
            isPlaying = true;
            btn.textContent = 'Pause Music';
        }).catch(() => {
            console.log('Auto-play blocked');
        });
    }

    // Button click to play/pause
    btn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            btn.textContent = 'Play Music';
        } else {
            audio.play();
            btn.textContent = 'Pause Music';
        }
        isPlaying = !isPlaying;
    });

    // Hide button if disabled
    if (!config.music.showButton) {
        btn.style.display = 'none';
    }
}

// 4. TITLE ANIMATION (BROWSER TAB)
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function initTitleAnimation() {
    if (!config.titleAnimation.enabled) return;

    const texts = config.titleAnimation.texts;
    const speed = config.titleAnimation.speed;

    function typeEffect() {
        const currentText = texts[titleIndex];
        
        if (isDeleting) {
            document.title = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            document.title = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = speed;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
}