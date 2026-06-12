/* ==================== CONFIGURATION ==================== */
// Edit this section to customize your profile

const config = {
    // SPLASH SCREEN
    splash: {
        logo: "https://ui-avatars.com/api/?name=LOGO&background=0D8ABC&color=fff&size=128",
        title: "DxOnTop"
    },

    // PROFILE INFO
    profile: {
        username: "Dx",
        bio: "Fear No One",
        avatar: "",
        footerName: "Dx",
        discord: {
            userId: "745985998479163443",
            profileUrl: "https://discord.com/users/745985998479163443"
        }
    },

    // DISCORD SERVER (For Real-time Status)
    discordServer: {
        serverId: "1375075125216677929",
        inviteCode: "yZ9GFWXpzr",
        username: "0fearz_"
    },

    // BACKGROUND
    background: {
        color: "#0f0f0f",
        dots: true,
        dotColor: "#1a1a1a",
        customImage: ""
    },

    // LINKS
    links: [
        { name: "Dx", url: "https://discord.com/users/745985998479163443" },
        { name: "Join us", url: "https://discord.gg/yZ9GFWXpzr"}
    ],

    // MUSIC
    music: {
        src: "https://raw.githubusercontent.com/dxontop/dxontop.github.io/main/2.%20%20SINALOA%20-%20BUDDAHBEADS%2C%20LEXUS%2C%20EJAC%20(YELLOWTAPES%20VOL.1).mp3"
    },

    // TITLE ANIMATION
    titleAnimation: {
        enabled: true,
        texts: ["dxontop"],
        speed: 300
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

    // Set avatar
    const avatar = document.getElementById('profile-avatar');
    avatar.src = config.profile.discord.userId 
        ? `https://cdn.discordapp.com/avatars/${config.profile.discord.userId}/default.png?size=512`
        : config.profile.avatar || "https://ui-avatars.com/api/?name=Dx&background=0D8ABC&color=fff&size=512";
    
    // Fallback callback
    avatar.onerror = function() {
        this.src = "https://ui-avatars.com/api/?name=Dx&background=0D8ABC&color=fff&size=512";
    };

    document.getElementById('profile-username').textContent = config.profile.username;
    document.getElementById('profile-bio').textContent = config.profile.bio;
    document.getElementById('footer-name').textContent = config.profile.footerName;
    document.getElementById('footer-name').style.color = '#00ff88';

    // Links
    const linksContainer = document.getElementById('links-container');
    config.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.className = 'link-btn';
        a.textContent = link.name;
        linksContainer.appendChild(a);
    });

    // Click avatar to open Discord
    if (config.profile.discord && config.profile.discord.profileUrl) {
        const avatarWrapper = avatar.parentElement;
        avatarWrapper.style.cursor = 'pointer';
        avatarWrapper.onclick = () => {
            window.open(config.profile.discord.profileUrl, '_blank');
        };
    }

    // Load Discord Status
    loadDiscordStatus();
}

// 2. LOAD DISCORD STATUS (Real-time)
async function loadDiscordStatus() {
    const statusElement = document.getElementById('profile-bio');
    const avatar = document.getElementById('profile-avatar');

    try {
        const response = await fetch(`https://discord.com/api/guilds/${config.discordServer.serverId}/widget.json`);
        const data = await response.json();

        // Debug: log the data to console
        console.log("Discord Widget Data:", data);

        if (!data.enabled) {
            console.log("Widget not enabled on server");
            return;
        }

        // Log who's online
        console.log("Online members:", data.presence);

        // Find user
        const member = data.presence.find(m => 
            (m.username && m.username.toLowerCase() === config.discordServer.username.toLowerCase()) ||
            (m.nick && m.nick.toLowerCase() === config.discordServer.username.toLowerCase())
        );

        if (member) {
            console.log("Found member:", member);
            
            switch (member.status) {
                case "online":
                    statusElement.innerHTML = `<span style="color:#00ff00">●</span> Online`;
                    avatar.style.boxShadow = "0 0 20px #00ff0080";
                    break;
                case "idle":
                    statusElement.innerHTML = `<span style="color:#ffa500">●</span> Idle`;
                    avatar.style.boxShadow = "0 0 20px #ffa50080";
                    break;
                case "dnd":
                    statusElement.innerHTML = `<span style="color:#ff0000">●</span> DND`;
                    avatar.style.boxShadow = "0 0 20px #ff000080";
                    break;
                default:
                    statusElement.innerHTML = `<span style="color:#808080">●</span> Offline`;
                    avatar.style.boxShadow = "0 0 15px #80808080";
            }
        } else {
            console.log("User not found in server");
            statusElement.innerHTML = `<span style="color:#808080">●</span> Offline`;
            avatar.style.boxShadow = "0 0 15px #80808080";
        }
    } catch (err) {
        console.log("Error loading status:", err);
    }
}

// 3. SPLASH SCREEN (TAP TO ENTER)
function initSplash() {
    const splashScreen = document.getElementById('splash-screen');
    const splashLogo = document.getElementById('splash-logo');
    const splashTitle = document.getElementById('splash-title');

    splashLogo.src = config.splash.logo;
    splashTitle.textContent = config.splash.title;

    splashScreen.addEventListener('click', enterSite);
    splashScreen.addEventListener('touchstart', enterSite);

    function enterSite() {
        splashScreen.classList.add('hidden');
        document.querySelector('.container').classList.add('visible');

        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800);

        if (config.music.src) {
            const audio = new Audio(config.music.src);
            audio.loop = true;
            audio.volume = 0.5;
            audio.play().catch(() => {});
        }
    }
}

// 4. TITLE ANIMATION
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
