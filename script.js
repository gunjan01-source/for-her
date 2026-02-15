/**
 * 1. STATE PERSISTENCE & INITIAL LOAD
 * Checks if she has already been here so we can skip the forms.
 */
window.addEventListener('load', () => {
    const loadingPage = document.getElementById('loading-page');
    const choiceScreen = document.getElementById('choice-screen');
    const mainContent = document.getElementById('main-content');
    const song = document.getElementById('bday-song');

    // Ensure the song DOES NOT loop
    if (song) {
        song.loop = false; 
    }

    // Check if she already passed the "Are you ready?" screen in this session
    if (sessionStorage.getItem('mainStarted') === 'true') {
        if (loadingPage) loadingPage.style.display = 'none';
        if (choiceScreen) choiceScreen.style.display = 'none';
        if (mainContent) {
            mainContent.style.display = "flex"; 
            mainContent.classList.add('show-layout');
        }
    } else {
        // First time load: Show choice screen after 2 seconds of loading
        setTimeout(() => {
            if (loadingPage) loadingPage.style.display = 'none';
            if (choiceScreen) choiceScreen.style.display = 'flex';
        }, 2000);
    }
});

/**
 * 2. NAVIGATION & CHOICE SCREEN FUNCTIONS
 * These are global so your HTML buttons can always find them.
 */

// First "Are you ready?" button
window.goToMain = function () {
    sessionStorage.setItem('mainStarted', 'true');
    const choiceScreen = document.getElementById('choice-screen');
    const mainContent = document.getElementById('main-content');
    
    if (choiceScreen) choiceScreen.style.display = 'none';
    if (mainContent) {
        mainContent.style.display = "flex"; // Changed to flex for your layout fix
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

// --- Gift Modal Functions ---

window.openGiftModal = function () {
    // If she already agreed once, go straight to the next page
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

/**
 * 3. INTERACTIVE PAGE ELEMENTS
 * Candle, Confetti, and Cursor Sparkles
 */
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

// Sparkle cursor effect (the pink hearts)
document.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '💗';
    sparkle.style.cssText = `position:fixed; left:${e.clientX}px; top:${e.clientY}px; pointer-events:none; z-index:10000; color:#ff7293; font-size:20px;`;
    document.body.appendChild(sparkle);
    sparkle.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(20px)' }], { duration: 900 });
    setTimeout(() => sparkle.remove(), 800);
});

/**
 * 4. BIRTHDAY LETTER & TYPEWRITER
 */
const bdayMessage = "Saba, \n\nHappy Birthday! I wanted to make you something special because you deserve the world. \n\nI hope i have put smile on your face. \n\nyour bestie, \nhehe ♥";
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

/**
 * 5. SONG REVEAL & LYRICS SYNC
 */
// ==========================================
// 1. REVEAL SITE & SONG LOGIC
// ==========================================
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
        song.play();
        
        // When the song ends, we still show the 'Memories' button 
        // as an extra surprise under the lyrics!
        song.onended = function() {
            const nextStep = document.getElementById('next-step-container');
            if (nextStep) nextStep.style.display = 'block';
        };
    }
};

// ==========================================
// 2. LYRICS DATA
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

// Attach listener to the audio
const audioNode = document.getElementById('bday-song');
if (audioNode) {
    audioNode.addEventListener('timeupdate', syncLyrics);
}
// Attach sync function to audio
const bdaySong = document.getElementById('bday-song');
if (bdaySong) {
    bdaySong.addEventListener('timeupdate', syncLyrics);
}

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