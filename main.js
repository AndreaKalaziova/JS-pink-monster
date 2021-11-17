// toto budeš potřebovat později
/*
if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
    // panacek a mince se prekryvaji
}
*/

/*
úkoly pro 4. lekci:
1) Vydefinuj si všechny potřebné proměnné. Budeme chtít 100% pracovat se souřadnicemi panáčka a mince, s jejich šířkou a výškou. Potřebujeme i odkaz na jejich HTML elementy.
2) Vytvoř funkci, která umístí panáčka na střed obrazovky. Budeme potřebovat znát šířku a výšku okna (využij vlastnosti - window.innerWidth a window.innerHeight)
3) Podobnou funkci vytvoř i pro minci, tu každopádně chceme umístit náhodně po mapě
4) Reaguj na kliknutí šipek a rozpohybuj panáčka - nahoru, dolu, doleva, doprava. Budeš pracovat se souřadnicemi X,Y.
5) Vytvoř "animaci", při stisku šipky nahoru se panáček otočí nahoru (změní se obrázek), podobně u dalších šipek

Nezapomeň vše ošetřit - panáček ti nemůže zajíždět za obrazovku apod.
*/

let panacek = document.querySelector("#panacek")
let mince = document.querySelector("#mince")
let drahokam = document.querySelector("#drahokam")
let score = document.querySelector("#score")
let krok = 10;
let scoreCount = 0;
let body = 1;

let zvukMince = document.querySelector("#zvukmince")
let fanfara = document.querySelector("#zvukfanfara")

let pSirka = panacek.width;
let pVyska = panacek.height;
let mSirka = mince.width;
let mVyska = mince.height;
let dSirka = drahokam.width;
let dVyska = drahokam.height;

//panacek pozice
let px = Math.floor(((window.innerWidth / 2) - (pSirka / 2)));
let py = Math.floor(((window.innerHeight / 2) - (pVyska / 2)));

function akceP() {
    px = Math.floor(((window.innerWidth / 2) - (pSirka / 2)));
    py = Math.floor(((window.innerHeight / 2) - (pVyska / 2)));
    panacek.style.left = px + "px";
    panacek.style.top = py + "px";
}
akceP();

window.addEventListener("keydown", pohybP) //100 odsazeni od okraju
function pohybP(event) {
    switch (event.key) {
        case "a":
        case "ArrowRight":
            if (px <= (window.innerWidth - 100)) {
                px = px + krok
                panacek.style.left = px + 'px'
                panacek.src = "obrazky/panacek-vpravo.png"
            }
            break;
        case "d":
        case "ArrowLeft":
            if (px >= 100) {
                px = px - krok
                panacek.style.left = px + 'px'
                panacek.src = "obrazky/panacek-vlevo.png"
            }
            break;
        case "w":
        case "ArrowUp":
            if (py >= 100) {
                py = py - krok
                panacek.style.top = py + 'px'
                panacek.src = "obrazky/panacek-nahoru.png"
            }
            break;
        case "s":
        case "ArrowDown":
            if (py <= (window.innerHeight - 100)) {
                py = py + krok
                panacek.style.top = py + 'px'
                panacek.src = "obrazky/panacek.png"
            }
            break;
    }
    harvest();
}

//mince, 100 odsazeni od okraju hore a vpravo, 200 = odsazeni od okraju vlevo a dole + posun zprava, zhora
let mx = (100 + (Math.floor(Math.random() * (window.innerWidth - 200))));
let my = (100 + (Math.floor(Math.random() * (window.innerHeight - 200))));

function akceM() { //new coin
    mx = (100 + (Math.floor(Math.random() * (window.innerWidth - 200))));
    my = (100 + (Math.floor(Math.random() * (window.innerHeight - 200))));
    mince.style.left = mx + "px";
    mince.style.top = my + "px";
}
akceM();

// drahokam
let dx = (100 + (Math.floor(Math.random() * (window.innerWidth - 200))));
let dy = (100 + (Math.floor(Math.random() * (window.innerHeight - 200))));

function akceD() { //new diamond
    dx = (100 + (Math.floor(Math.random() * (window.innerWidth - 200))));
    dy = (100 + (Math.floor(Math.random() * (window.innerHeight - 200))));
    drahokam.style.left = dx + "px";
    drahokam.style.top = dy + "px";
}
akceD();

function harvest() {
    sberM();
    sberD();
    konec();
}
function sberM() {
    if (!((px + (pSirka / 2) < mx || mx + mSirka < px || py + (pVyska / 2) < my || my + mVyska < py))) { // panacek a mince se prekryvaji
        countM();
        akceM();
        if (scoreCount > 15) { //aby score neprekrocilo 20
            drahokam.style.display = "none";
        }
        if (scoreCount >= 20) {
            mince.style.display = "none"
        }
    }
}
function sberD() {
    if (!((px + pSirka / 2 < dx || dx + dSirka < px || py + pVyska / 2 < dy || dy + dVyska < py))) { // panacek a drahokam se prekryvaji
        countD();
        akceD();
        if (scoreCount > 15) { //aby score neprekrocilo 20
            drahokam.style.display = "none";
        }
        if (scoreCount >= 20) {
            mince.style.display = "none"
        }
    }
}
function konec() {
    if (scoreCount >= 20) {
        setTimeout(function () {
            fanfara.play();
            alert("GAME OVER. YOUR SCORE IS: " + scoreCount);
            newGame();
        }, 10);
    }
}
function countM() {
    zvukMince.play();
    scoreCount++;
    score.textContent = scoreCount;
}
function countD() {
    zvukMince.play();
    panacek.src = "obrazky/panacek-blue.png"
    scoreCount = scoreCount + 5;
    score.textContent = scoreCount;
}
function newGame() {
    scoreCount = 0;
    score.textContent = scoreCount;
    mince.style.display = "inherit";
    drahokam.style.display = "inherit";
    panacek.src = "obrazky/panacek.png";
    akceM();
    akceD();
    akceP();
    pohybP();

}

