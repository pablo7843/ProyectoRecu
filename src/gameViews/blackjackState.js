export { state };

let state = {
    deck: [], // La baraja actual del juego
    dealerCards: [], // Cartas en la mano del crupier
    playerCards: [], // Cartas en la mano del jugador
    dealerSum: 0, // Suma de las cartas del crupier
    playerSum: 0, // Suma de las cartas del jugador
    dealerAceCount: 0, // Número de ases en la mano del crupier
    playerAceCount: 0, // Número de ases en la mano del jugador
    gameEnded: false, // Indica si el juego ha terminado
    winner: null // El ganador del juego ('player', 'dealer' o null si el juego aún no ha terminado)
  };
  