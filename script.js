/* ==================== CONFIGURATION ==================== */
// Edit this section to customize your profile

const config = {
    // SPLASH SCREEN
    splash: {
        logo: "https://ui-avatars.com/api/?name=LOGO&background=0D8ABC&color=fff&size=128", // REPLACE WITH YOUR LOGO URL
        title: "DxOnTop" // Text shown on splash
    },

    // PROFILE INFO
    profile: {
        username: "Dx", // YOUR USERNAME
        bio: "Fear No One", // YOUR BIO
        avatar: "", // Leave empty - uses Discord avatar
        footerName: "Dx",
        // DISCORD SETTINGS
        discord: {
            userId: "745985998479163443", // Your Discord user ID
            profileUrl: "https://discord.com/users/745985998479163443"
        }
    },

    // DISCORD SERVER (For Real-time Status)
    discordServer: {
        serverId: "1375075125216677929",
        inviteCode: "yZ9GFWXpzr",
        username: "0fearz_" // Your EXACT Discord username in the server
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
        { name: "Dx", url: "https://discord.com/users/745985998479163443" },
        { name: "Join us", url: "https://discord.gg/1998x"}
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
    // Background
    if (config.background.customImage) {
        document.body.style.background = `url('${config.background.customImage}') no-repeat center center fixed`;
        document.body.style.backgroundSize = 'cover';
    } else if (config.background.dots) {
        document.body.style.backgroundImage = `radial-gradient(${config.background.dotColor} 1px, transparent 1px)`;
        document.body.style.backgroundSize = '20px 20px';
    }
    document.body.style.backgroundColor = config.background.color;

    // Discord Avatar
    if (config.profile.discord && config.profile.discord.userId) {
        loadDiscordAvatar(config.profile.discord.userId);
    } else {
        document.getElementById('profile-avatar').src = config.profile.avatar;
    }

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
        const avatar = document.getElementById('profile-avatar');
        avatar.parentElement.style.cursor = 'pointer';
        avatar.parentElement.onclick = () => {
            window.open(config.profile.discord.profileUrl, '_blank');
        };
    }

    // Load Discord Status (Real-time)
    if (config.discordServer && config.discordServer.serverId) {
        loadDiscordStatus();
    }
}

// 2. LOAD DISCORD AVATAR
function loadDiscordAvatar(userId) {
    const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/.png?size=512`;
    document.getElementById('profile-avatar').src = avatarUrl;
    document.getElementById('profile-avatar').onerror = () => {
        document.getElementById('profile-avatar').src = "https://ui-avatars.com/api/?name=Avatar&background=0D8ABC&color=fff&size=128";
    };
}

// 3. LOAD DISCORD STATUS (Real-time)
async function loadDiscordStatus() {
    try {
        const response = await fetch(`https://discord.com/api/guilds/${config.discordServer.serverId}/widget.json`);
        const data = await response.json();
        
        const member = data.presence.find(m => 
            m.username === config.discordServer.username || 
            m.nick === config.discordServer.username
        );
        
        const statusElement = document.getElementById('profile-bio');
        const avatar = document.getElementById('profile-avatar');
        
        if (!data.enabled) {
            statusElement.textContent = config.profile.bio;
            return;
        }
        
        if (member) {
            let statusText = "Online";
            let statusColor = "#00ff00";
            let glowColor = "#00ff0080";
            
            switch (member.status) {
                case "online":
                    statusText = "Online";
                    statusColor = "#00ff00";
                    glowColor = "#00ff0080";
                    break;
                case "idle":
                    statusText = "Idle";
                    statusColor = "#ffa500";
                    glowColor = "#ffa50080";
                    break;
                case "dnd":
                    statusText = "DND";
                    statusColor = "#ff0000";
                    glowColor = "#ff000080";
                    break;
                default:
                    statusText = "Offline";
                    statusColor = "#808080";
                    glowColor = "#80808080";
            }
            
            statusElement.innerHTML = `<span style="color:${statusColor}">●</span> ${statusText}`;
            avatar.style.boxShadow = `0 0 20px ${glowColor}`;
        } else {
            statusElement.innerHTML = `<span style="color:#808080">●</span> Offline`;
            avatar.style.boxShadow = `0 0 15px #80808080`;
        }
    } catch (err) {
        console.log("Discord status not available");
    }
}

// 4. SPLASH SCREEN (TAP TO ENTER)
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

// 5. TITLE ANIMATION
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
