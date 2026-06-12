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
        src: "https://raw.githubusercontent.com/dxontop/dxontop.github.io/main/2.%20%20SINALOA%20-%20BUDDAHBEADS%2C%20LEXUS%2C%20EJAC%20(YELLOWTAPES%20VOL.1).mp3"
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
    initTitleAnimation();
});

// 1. PROFILE INITIALIZATION
function initProfile() {
    if (config.background.customImage) {
        document.body.style.background = `url('${config.background.customImage}') no-repeat center center fixed`;
        document.body.style.backgroundSize = 'cover';
    } else if (config.background.dots) {
        document.body.style.backgroundImage = `radial-gradient(${config.background.dotColor} 1px, transparent 1px)`;
        document.body.style.backgroundSize = '20px 20px';
    }
    document.body.style.backgroundColor = config.background.color;

    document.getElementById('profile-avatar').src = config.profile.avatar;
    document.getElementById('profile-username').textContent = config.profile.username;
    document.getElementById('profile-bio').textContent = config.profile.bio;
    document.getElementById('footer-name').textContent = config.profile.footerName;
    document.getElementById('footer-name').style.color = '#00ff88';

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

    splashLogo.src = config.splash.logo;
    splashTitle.textContent = config.splash.title;

    splashScreen.addEventListener('click', enterSite);
    splashScreen.addEventListener('touchstart', enterSite);

    function enterSite() {
        // Hide splash
        splashScreen.classList.add('hidden');
        document.querySelector('.container').classList.add('visible');

        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800);

        // PLAY MUSIC AFTER TAP - NO BUTTON
        if (config.music.src) {
            const audio = new Audio(config.music.src);
            audio.loop = true;
            audio.volume = 0.5;
            audio.play().catch(() => {});
        }
    }
}

// 3. TITLE ANIMATION
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
