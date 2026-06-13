// ======================
//  LOAD
// ======================

let punkte = Number(localStorage.getItem("punkte")) || 0;
let power = Number(localStorage.getItem("power")) || 1;
let autoActive = localStorage.getItem("auto") === "true";

// ======================
//  STATS
// ======================

let up1 = 0;
let up2 = 0;
let up5 = 0;
let autoCount = 0;

// ======================
//  HTML ELEMENTE
// ======================

let score = document.getElementById("score");
let click = document.getElementById("click");

let plus1 = document.getElementById("plus1");
let plus2 = document.getElementById("plus2");
let plus5 = document.getElementById("plus5");

let buyAuto = document.getElementById("buyAuto");
let reset = document.getElementById("reset");

let u1 = document.getElementById("u1");
let u2 = document.getElementById("u2");
let u5 = document.getElementById("u5");
let ua = document.getElementById("ua");

// ======================
//  SAVE SYSTEM
// ======================

function saveGame() {
    localStorage.setItem("punkte", punkte);
    localStorage.setItem("power", power);
    localStorage.setItem("auto", autoActive);
}

// ======================
//  AUTOCLICKER
// ======================

let autoRunning = false;

function startAuto() {
    if (autoRunning) return;
    autoRunning = true;

    setInterval(function () {
        punkte += power;
        score.textContent = punkte;
        saveGame();
    }, 1000);
}

// Auto beim Laden wieder aktivieren
if (autoActive) {
    autoCount = 1;
    startAuto();
}

// ======================
//  CLICK SYSTEM
// ======================

click.addEventListener("click", function () {
    punkte += power;
    score.textContent = punkte;
    saveGame();
});

// ======================
//  UPGRADES
// ======================

plus1.addEventListener("click", function () {
    if (punkte >= 150) {
        punkte -= 150;
        power += 1;

        up1++;
        u1.textContent = up1;

        score.textContent = punkte;
        saveGame();
    }
});

plus2.addEventListener("click", function () {
    if (punkte >= 500) {
        punkte -= 500;
        power += 2;

        up2++;
        u2.textContent = up2;

        score.textContent = punkte;
        saveGame();
    }
});

plus5.addEventListener("click", function () {
    if (punkte >= 2500) {
        punkte -= 2500;
        power += 5;

        up5++;
        u5.textContent = up5;

        score.textContent = punkte;
        saveGame();
    }
});

// ======================
//  AUTOCLICKER KAUF
// ======================

buyAuto.addEventListener("click", function () {
    if (punkte >= 10000 && !autoRunning) {
        punkte -= 10000;

        autoActive = true;
        autoCount++;

        ua.textContent = autoCount;

        startAuto();
        saveGame();
    }
});

// ======================
//  RESET GAME
// ======================

reset.addEventListener("click", function () {

    if (!confirm("Willst du wirklich alles zurücksetzen?")) return;

    // Speicher löschen
    localStorage.removeItem("punkte");
    localStorage.removeItem("power");
    localStorage.removeItem("auto");

    // Variablen reset
    punkte = 0;
    power = 1;

    up1 = 0;
    up2 = 0;
    up5 = 0;
    autoCount = 0;

    autoActive = false;
    autoRunning = false;

    // UI reset
    score.textContent = 0;
    u1.textContent = 0;
    u2.textContent = 0;
    u5.textContent = 0;
    ua.textContent = 0;

    location.reload();
});

// ======================
//  UI INIT
// ======================

score.textContent = punkte;
u1.textContent = up1;
u2.textContent = up2;
u5.textContent = up5;
ua.textContent = autoCount;