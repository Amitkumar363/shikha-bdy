const envelope = document.getElementById("envelope");
const envelopeScene = document.getElementById("envelopeScene");
const cardContainer = document.getElementById("cardContainer");
const card = document.getElementById("card");
const cakeFront = document.getElementById("cakeFront");
const candles = document.querySelectorAll(".candle");
const celebration = document.getElementById("celebration");
const replayBtn = document.getElementById("replayBtn");
const pandaContainer = document.getElementById("pandaContainer");
const birthdayAudio = document.getElementById("birthdayAudio");

// ENVELOPE CLICK
envelope.addEventListener("click", () => {
    pandaContainer.classList.remove("hidden");
    setTimeout(() => pandaContainer.classList.add("show"), 100);

    setTimeout(() => envelope.classList.add("open"), 2000);

    setTimeout(() => {
        envelopeScene.classList.add("hidden");
        pandaContainer.classList.add("hidden");
        cardContainer.classList.remove("hidden");
        card.style.animation = "bounceIn 0.8s ease forwards";
    }, 3500);
});

// CAKE CLICK
cakeFront.addEventListener("click", () => {
    candles.forEach(c => c.classList.add("blow"));
    setTimeout(() => {
        card.classList.add("open");
        cardContainer.classList.add("hidden");
        celebration.classList.add("show");
        startAudio();
        startConfetti();
        document.body.style.overflow = "hidden";
    }, 800);
});

// REPLAY
replayBtn.addEventListener("click", () => location.reload());

// PLAY AUDIO
function startAudio() {
    birthdayAudio.volume = 0.8;
    birthdayAudio.play().catch(err => console.log("Audio autoplay blocked:", err));
}

/* CONFETTI */
function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = Array.from({ length: 150 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: 5 + Math.random() * 5,
        d: Math.random() * 10 + 10,
        color: ["#ff77a9", "#ffd166", "#fff", "#f2b5d4"][Math.floor(Math.random() * 4)]
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        update();
        requestAnimationFrame(draw);
    }

    function update() {
        confetti.forEach(p => {
            p.y += Math.cos(p.d) + 1;
            p.x += Math.sin(p.d) * 0.5;
            if (p.y > canvas.height) {
                p.y = 0 - p.r;
                p.x = Math.random() * canvas.width;
            }
        });
    }

    draw();
}
