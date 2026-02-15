// ==========================================
// 1. SILENT PRELOADER (Runs in background)
// ==========================================
const stickers = [
    'lipstick.png', 'star.png', 'stemp.png', 'spiddy.png', 'redbow.png', 
    'pinkbow.png', 'pinkstamp.png', 'orchite.png', 'flower.png', 'lotus.png', 
    'purbow.png', 'purflow.png', 'purstamp.png', 'mulflow.png', 'yellow.png', 
    'coco.png', 'shell.png', 'heart.png', 'moon.png', 'tusnami.png', 
    'bluebarry.png', 'headset.png', 'bear.png', 'headcat.png', 'standcat.png', 
    'fullmoon.png', 'whatever.png', 'turtle.png', 'clove.png', 'cat.png'
];

function preloadStickers() {
    stickers.forEach(fileName => {
        const img = new Image();
        img.src = fileName; 
    });
}
preloadStickers(); // Start downloading stickers immediately

// ==========================================
// 2. STATE PERSISTENCE & ORIGINAL LOADING
// ==========================================
window.addEventListener('load', () => {
    const loadingPage = document.getElementById('loading-page');
    const choiceScreen = document.getElementById('choice-screen');
    const mainContent = document.getElementById('main-content');
    const song = document.getElementById('bday-song');

    if (song) { song.loop = false; }

    // Check if she already started the surprise
    if (sessionStorage.getItem('mainStarted') === 'true') {
        if (loadingPage) loadingPage.style.display = 'none';
        if (choiceScreen) choiceScreen.style.display = 'none';
        if (mainContent) {
            mainContent.style.display = "flex"; 
            mainContent.classList.add('show-layout');
        }
    } else {
        // ORIGINAL LOGIC: Wait 2 seconds then show choice screen
        setTimeout(() => {
            if (loadingPage) loadingPage.style.display = 'none';
            if (choiceScreen) choiceScreen.style.display = 'flex';
        }, 2000);
    }
});

// ==========================================
// 3. NAVIGATION FUNCTIONS
// ==========================================

window.goToMain = function () {
    sessionStorage.setItem('mainStarted', 'true');
    const choiceScreen = document.getElementById('choice-screen');
    const mainContent = document.getElementById('main-content');
    if (choiceScreen) choiceScreen.style.display = 'none';
    if (mainContent) {
        mainContent.style.display = "flex";
        mainContent.classList.add('show-layout');
    }
};

window.showAngryCat = function () {
    document.getElementById('choice-screen').style.display = 'none';
    document.getElementById('angry-cat-screen').style.display = 'flex';
};

window.backToChoice = function () {
    document.getElementById('angry-cat-screen').style.display = 'none';
    document.getElementById('choice-screen').style.display = 'flex';
};

window.openGiftModal = function () {
    if (sessionStorage.getItem('giftPassed') === 'true') {
        window.location.href = 'details.html';
    } else {
        const modal = document.getElementById('gift-modal');
        if (modal) modal.style.display = 'flex';
    }
};

window.showAngryGiftCat = function () {
    document.getElementById('gift-modal').style.display = 'none';
    document.getElementById('angry-gift-screen').style.display = 'flex';
};

window.backToGiftChoice = function () {
    document.getElementById('angry-gift-screen').style.display = 'none';
    document.getElementById('gift-modal').style.display = 'flex';
};

window.goToGift = function () {
    sessionStorage.setItem('giftPassed', 'true');
    window.location.href = 'details.html';
};

// ==========================================
// 4. INTERACTIVE ELEMENTS (CANDLE / CONFETTI / SPARKLES)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const candle = document.getElementById('candle-click-target');
    const flame = document.getElementById('flame');
    let isLit = false;

    if (candle && flame) {
        candle.addEventListener('click', () => {
            if (!isLit) {
                flame.classList.add('lit');
                launchConfetti();
                isLit = true;
            } else {
                flame.classList.remove('lit');
                isLit = false;
            }
        });
    }
});

function launchConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    const colors = ['#9872ff', '#d495ff', '#927eeb', '#c7b3ff', '#c78aff'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(confetti);
        setTimeout(() => { confetti.remove(); }, 5000);
    }
}

document.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '💗';
    sparkle.style.cssText = `position:fixed; left:${e.clientX}px; top:${e.clientY}px; pointer-events:none; z-index:10000; color:#ff7293; font-size:20px;`;
    document.body.appendChild(sparkle);
    sparkle.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(20px)' }], { duration: 900 });
    setTimeout(() => sparkle.remove(), 800);
});

// ==========================================
// 5. LETTER & TYPEWRITER
// ==========================================
const bdayMessage = "Saba, \n\nHappy Birthday! I wanted to make you something special because you deserve the world. \n\nI hope today is as wonderful as your smile. \n\nyour bestie, \nhehe ♥";
let typeIndex = 0;
let isLetterOpened = false;

window.openLetter = function() {
    if (isLetterOpened) return;
    const envelope = document.getElementById('envelope');
    isLetterOpened = true;
    if (envelope) envelope.classList.add('open');
    setTimeout(startTyping, 1000);
};

function startTyping() {
    const textElement = document.getElementById("typewriter");
    if (textElement && typeIndex < bdayMessage.length) {
        textElement.innerHTML += bdayMessage.charAt(typeIndex);
        typeIndex++;
        setTimeout(startTyping, 50);
    }
}

// ==========================================
// 6. LYRICS SYNC DATA
// ==========================================
const lyricsData = [
    [0.0, ""],
    [39.10, "I remember when I first noticed that you liked me back"],
    [50.0, "We were sitting down in a restaurant, waiting for the check"],
    [60.0, "We had made love earlier that day with no strings attached"],
    [70.0, "But I could tell that something had changed, how you looked at me then"],
    [80.0, "Kristen, come right back"],
    [90.0, "I've been waiting for you to slip back in bed"],
    [100.0, "When you light the candle"],
    [120.0, "& on the Lower East Side you're dancing with me now"],
    [135.0, "& I'm taking pictures of you with flowers on the wall"],
    [145.0, "Think I like you best when you're dressed in black from head to toe"],
    [155.0, "Think I like you best when you're just with me and no one else"],
    [165.0, "Kristen, come right back"],
    [170.0, "I've been waiting for you to slip back in bed"],
    [180.0, "When you light the candle"],
    [205.0, "And I'm kissing you, lying in my room"],
    [220.0, "Holding you until you fall asleep"],
    [231.0, "And it's just as good as I knew it would be"], 
    [236.0, "Stay with me, I don't want you to leave"],
    [263.0, "Kristen, come right back"],
    [267.0, "I've been waiting for you to slip back in bed"],
    [275.0, "When you light the candle"],
    [280.0, "Happy Birthday, my soulmate!"]
];

window.revealSite = function() {
    const overlay = document.getElementById('intro-overlay');
    const mainContent = document.getElementById('main-content');
    const song = document.getElementById('bday-song');
    
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => { 
            overlay.style.display = 'none'; 
            if (mainContent) mainContent.style.display = 'flex'; 
        }, 800);
    }
    if (song) {
        song.loop = false;
        song.play();
    }
};

function syncLyrics() {
    const song = document.getElementById('bday-song');
    const lyricElement = document.getElementById('current-lyric');
    if (!song || !lyricElement) return;

    let currentLine = "";
    for (let i = 0; i < lyricsData.length; i++) {
        if (song.currentTime >= lyricsData[i][0]) {
            currentLine = lyricsData[i][1];
        } else break;
    }
    
    if (lyricElement.textContent !== currentLine) {
        lyricElement.style.opacity = '0';
        setTimeout(() => {
            lyricElement.textContent = currentLine;
            lyricElement.style.opacity = '1';
        }, 200);
    }
}

const audioNode = document.getElementById('bday-song');
if (audioNode) { audioNode.addEventListener('timeupdate', syncLyrics); }

