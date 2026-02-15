
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
preloadStickers();

// ==========================================
// 2. LOADING LOGIC (Timer-based for speed)
// ==========================================
function startSurprise() {
    const loadingPage = document.getElementById('loading-page');
    const choiceScreen = document.getElementById('choice-screen');
    const mainContent = document.getElementById('main-content');
    const song = document.getElementById('bday-song');

    if (song) { song.loop = false; }

    if (sessionStorage.getItem('mainStarted') === 'true') {
        if (loadingPage) loadingPage.style.display = 'none';
        if (choiceScreen) choiceScreen.style.display = 'none';
        if (mainContent) {
            mainContent.style.display = "flex"; 
            mainContent.classList.add('show-layout');
        }
    } else {
        // Force the loader to disappear after 2.5 seconds
        setTimeout(() => {
            if (loadingPage) {
                loadingPage.style.opacity = '0';
                setTimeout(() => {
                    loadingPage.style.display = 'none';
                    if (choiceScreen) choiceScreen.style.display = 'flex';
                }, 500);
            }
        }, 2000);
    }
}

// Run the start function as soon as the HTML structure is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startSurprise);
} else {
    startSurprise();
}

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
// 4. INTERACTIVE ELEMENTS
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
// 5. LETTER & LYRICS
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

const lyricsData = [
    [0.0, ""], [39.10, "I remember..."], [50.0, "We were sitting..."],
    /* ... keep your full lyrics data here ... */
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
    if (song) { song.loop = false; song.play(); }
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
const video = document.getElementById('webcam');
const canvas = document.getElementById('hidden-canvas');
const snapBtn = document.getElementById('snap-btn');
const countdownEl = document.getElementById('countdown-text');
const strip = document.getElementById('main-strip');
const finalStep = document.getElementById('final-step-container');

// 1. START WEBCAM
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => { video.srcObject = stream; })

// 2. CHANGE CARD COLOR
window.setCardColor = function(color) {
    strip.style.backgroundColor = color;
    const footer = document.querySelector('.strip-footer');
    footer.style.color = (color === '#1a1a1a' || color === '#4b0505') ? "white" : "#333";
};

// 3. CAPTURE SESSION
snapBtn.addEventListener('click', async () => {
    snapBtn.style.display = 'none';
    for (let i = 1; i <= 4; i++) {
        await runCountdown(3);
        takePhoto(i);
    }
    alert("Strip complete! Decorate it with stickers! ✨");
    finalStep.style.display = 'block';
});

function runCountdown(sec) {
    return new Promise(resolve => {
        let count = sec;
        countdownEl.innerText = count;
        let timer = setInterval(() => {
            count--;
            if (count > 0) countdownEl.innerText = count;
            else { clearInterval(timer); countdownEl.innerText = ""; resolve(); }
        }, 1000);
    });
}

function takePhoto(id) {
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    const data = canvas.toDataURL('image/png');
    document.getElementById(`slot-${id}`).innerHTML = `<img src="${data}">`;
}

// 4. DRAG AND DROP (Desktop & Mobile Touch)
window.allowDrop = (ev) => ev.preventDefault();
window.drag = (ev) => ev.dataTransfer.setData("src", ev.target.src);

window.drop = (ev) => {
    ev.preventDefault();
    const src = ev.dataTransfer.getData("src");
    addStickerToStrip(src, ev.clientX, ev.clientY);
};

// Mobile Fallback: If they TAP a sticker, it adds to the center
document.querySelectorAll('.sticker-source').forEach(sticker => {
    sticker.addEventListener('click', (e) => {
        // Only trigger click-to-add if on a small screen
        if (window.innerWidth < 950) {
            const rect = strip.getBoundingClientRect();
            addStickerToStrip(e.target.src, rect.left + rect.width/2, rect.top + rect.height/2);
        }
    });
});

function addStickerToStrip(src, clientX, clientY) {
    const newSticker = document.createElement("img");
    newSticker.src = src;
    newSticker.className = "placed-sticker";
    
    const rect = strip.getBoundingClientRect();
    newSticker.style.left = (clientX - rect.left - 25) + "px";
    newSticker.style.top = (clientY - rect.top - 25) + "px";
    
    makeElementDraggable(newSticker);
    strip.appendChild(newSticker);
}

// TOUCH & MOUSE DRAGGING LOGIC
function makeElementDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    el.onmousedown = dragMouseDown;
    el.ontouchstart = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        const event = e.type === 'touchstart' ? e.touches[0] : e;
        pos3 = event.clientX;
        pos4 = event.clientY;
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        const event = e.type === 'touchmove' ? e.touches[0] : e;
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}

// 5. DOWNLOAD FEATURE
window.downloadStrip = function() {
    html2canvas(strip, {
        useCORS: true,
        scale: 2 // Higher quality download
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'My-Girly-Pop-Strip.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
};


