'use strict';

// Elementtien valitseminen
const player1Name = document.getElementById('name--0');
const player2Name = document.getElementById('name--1');
const editIcon = document.querySelector('.edit-icon');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// muuttujien ilmoittaminen scoping-virheiden välttämiseksi
let scores, currentScore, activePlayer, playing;
let newNamePlayer1 = 'Pelaaja1'; // Oletusnimet
let newNamePlayer2 = 'Pelaaja2';

// Pelin alustaminen
const gameInit = function () {
    scores = [0, 0]; // array, joka sisältää pelaajat 1 ja 2 Kokonaispisteet
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    player1Name.innerHTML = `Pelaaja1 <i class="edit-icon" onclick="renamePlayer(0)">✏️</i>`;
    player2Name.innerHTML = `Pelaaja2 <i class="edit-icon" onclick="renamePlayer(1)">✏️</i>`;

    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    player0.classList.remove('player--winner'); // luokan poistaminen 
    player1.classList.remove('player--winner'); //luokan lisääminen
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    dice.classList.add('hidden');
}

// Peli lähtökohta
gameInit();

// Toiminto Playernamein vaihtamiseksi
function renamePlayer(playerId) {
    const playerNameElement = document.getElementById(`name--${playerId}`);
    let newName = prompt(`Nimeä pelaaja uudelleen ${playerId + 1} (enintään 8 kirjainta):`);

    if (newName !== null) {
        // Lyhennä nimi enintään 8 kirjaimeen.
        newName = newName.substring(0, 8);

        // Päivitä vastaava pelaajan nimimuuttuja
        if (playerId === 0) {
            newNamePlayer1 = newName;
        } else if (playerId === 1) {
            newNamePlayer2 = newName;
        }

        // Päivitä pelaajan nimi HTML:ssä
        playerNameElement.innerHTML = `${newName} <i class="edit-icon" onclick="renamePlayer(${playerId})">✏️</i>`;
    }
}

// Pelaajan vaihtaminen
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active'); // toggle attribut to reverse
    player1.classList.toggle('player--active');
    currentScore = 0;
}

// HEITÄ NOPPAA -painikkeen toiminnallisuus
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Satunnaisen nopparullan luominen
        const diceRoll = Math.trunc(Math.random() * 6) + 1;
        // 2. Näytä noppaa
        dice.classList.remove('hidden');
        dice.src = `dice-${diceRoll}.png`;
        // 3. Tarkista, onko rullattu ei ole 1: jos false vaihda pelaaja
        if (diceRoll !== 1) {
            currentScore += diceRoll;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // vaihda pelaaja
            switchPlayer();
        }
    }
})

// PIDÄ Painikkeiden toiminnot
btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Lisää currentScore pelaajan pistemäärään
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

        // 2. Tarkista, onko pelaajan pistemäärä >= 100: Jos True Pelaaja voittaa ja lopettaa pelin.
        if (scores[activePlayer] >= 100) {
            playing = false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

            // Voittajan nimeäminen
            const winningPlayer = document.getElementById(`name--${activePlayer}`);
            const winnerName = activePlayer === 0 ? newNamePlayer1 : newNamePlayer2;
            winningPlayer.innerHTML = `${winnerName}<br>Voitti!!🥇`;
        } else {
            // 3. Muuten vaihda soitin ja aseta arvot arvoon 0.
            switchPlayer();
        }
    }
})

// UUSI PELI Painikkeen toiminnallisuus
btnNew.addEventListener('click', gameInit);