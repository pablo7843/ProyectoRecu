export { recopilarDatosJuego, obtenerCartaValor, 
    obtenerNumeroAses, startNewGame, buildDeck, shuffleDeck, 
    startGame, hit, stay, getValue, determinarGanador};

let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0; 
let hidden;
let deck;
let canHit = true;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
    // console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    // console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    while (dealerSum < 17) {
        //<img src="./cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "/src/imagenes/cartas/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "/src/imagenes/cartas/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}
function startNewGame() {
    startGame();
}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "/src/imagenes/cartas/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { //A, J, 8 -> 1 + 10 + 8
        canHit = false;
    }

}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "/src/imagenes/cartas/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "HAS PERDIDO!";
    }
    else if (dealerSum > 21) {
        message = "HAS GANADO!";
    }
    //both you and dealer <= 21
    else if (yourSum == dealerSum) {
        message = "EMPATE";
    }
    else if (yourSum > dealerSum) {
        message = "HAS GANADO!";
    }
    else if (yourSum < dealerSum) {
        message = "HAS PERDIDO!";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}

function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();

    // Agregar event listener al botón "repeat" después de que el DOM haya cargado completamente
    document.getElementById("repeat").addEventListener("click", function() {
        // Restablecer variables y elementos necesarios para iniciar una nueva partida
        dealerSum = 0;
        yourSum = 0;
        dealerAceCount = 0;
        yourAceCount = 0;
        hidden = null;
        canHit = true;

        // Limpiar las cartas mostradas en el juego anterior
        document.getElementById("dealer-cards").innerHTML = '<img id="hidden" src="/src/imagenes/cartas/BACK.png">';
        document.getElementById("your-cards").innerHTML = '';

        // Limpiar resultados de la partida anterior
        document.getElementById("your-sum").innerText = '';
        document.getElementById("dealer-sum").innerText = '';
        document.getElementById("results").innerText = '';

        // Iniciar una nueva partida
        startGame();
    });
}

// Función para recopilar los datos del juego
function recopilarDatosJuego() {
    return {
        deck: deck.slice(), // Copia del mazo actual
        dealerCards: [], // Cartas en la mano del crupier
        playerCards: [], // Cartas en la mano del jugador
        dealerSum: dealerSum, // Suma de las cartas del crupier
        playerSum: yourSum, // Suma de las cartas del jugador
        dealerAceCount: dealerAceCount, // Número de ases en la mano del crupier
        playerAceCount: yourAceCount, // Número de ases en la mano del jugador
        gameEnded: !canHit, // Indica si el juego ha terminado
        winner: (canHit ? null : determinarGanador()) // El ganador del juego
    };
}


// Función para obtener el valor de una carta
function obtenerCartaValor(card) {
    let value = parseInt(card);
    if (isNaN(value)) { // Si no es un número, entonces es A, J, Q o K
        if (card === 'A') {
            return 11; // El As puede valer 1 u 11, pero inicialmente lo consideramos como 11
        } else {
            return 10; // J, Q, K valen 10
        }
    }
    return value;
}

// Función para contar el número de Ases en la mano de un jugador
function obtenerNumeroAses(cards) {
    let aceCount = 0;
    for (let card of cards) {
        if (card[0] === 'A') {
            aceCount++;
        }
    }
    return aceCount;
}

// Función para determinar el ganador del juego
function determinarGanador() {
    let playerSumReduced = reduceAce(yourSum, yourAceCount);
    let dealerSumReduced = reduceAce(dealerSum, dealerAceCount);

    if (playerSumReduced > 21) {
        return 'dealer';
    } else if (dealerSumReduced > 21) {
        return 'player';
    } else if (playerSumReduced === dealerSumReduced) {
        return null; // Empate
    } else if (playerSumReduced > dealerSumReduced) {
        return 'player';
    } else {
        return 'dealer';
    }
}

// Función para recopilar las cartas del crupier
function recopilarCartasCrupier() {
    return dealerCards.slice(); // Devuelve una copia de las cartas del crupier
}

// Función para recopilar las cartas del jugador
function recopilarCartasJugador() {
    return playerCards.slice(); // Devuelve una copia de las cartas del jugador
}

// Función para obtener la suma de las cartas del crupier
function obtenerSumaCartasCrupier() {
    return dealerSum; // Devuelve la suma de las cartas del crupier
}

// Función para obtener la suma de las cartas del jugador
function obtenerSumaCartasJugador() {
    return yourSum; // Devuelve la suma de las cartas del jugador
}

// Función para obtener el número de Ases en la mano del crupier
function obtenerNumeroAsesCrupier() {
    return dealerAceCount; // Devuelve el número de Ases en la mano del crupier
}

// Función para obtener el número de Ases en la mano del jugador
function obtenerNumeroAsesJugador() {
    return yourAceCount; // Devuelve el número de Ases en la mano del jugador
}

// Función para determinar si el juego ha terminado
function juegoTerminado() {
    return !canHit; // Devuelve true si el juego ha terminado, de lo contrario false
}

// Función para obtener el ganador del juego
function obtenerGanador() {
    return (canHit ? null : determinarGanador()); // Devuelve el ganador del juego, null si el juego no ha terminado
}






  