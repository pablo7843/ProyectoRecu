import { recopilarDatosJuego, obtenerCartaValor, obtenerNumeroAses } from "../js/blackjack.js";
export { getAllSavedGames, loadGameState, createButton };

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqc2Rhd2Jkdmt1d25zZmJ3bXhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjYyNTI1OSwiZXhwIjoyMDE4MjAxMjU5fQ.DLiuwba_GYm517qQOs4uP1o4MeoKPvTKCm5zvHHYDUA';

function saveGameState(state) {
  try {
      // Aquí puedes obtener el token de acceso de donde lo necesites, por ejemplo, localStorage
      const token = localStorage.getItem('access_token');

      // Crear el objeto gameState con los datos del juego de Blackjack
      const gameState = {
          deck: state.deck,
          dealerCards: state.dealerCards,
          playerCards: state.playerCards,
          dealerSum: state.dealerSum,
          playerSum: state.playerSum,
          dealerAceCount: state.dealerAceCount,
          playerAceCount: state.playerAceCount,
          gameEnded: state.gameEnded,
          winner: state.winner
      };

      // Llamar a la función createData con el nombre de la tabla, el token y el estado del juego
      createData('nombre_tabla', token, gameState)
          .then(() => {
              console.log('Estado del juego guardado exitosamente.');
          })
          .catch((error) => {
              console.error('Error al guardar el estado del juego:', error);
          });
  } catch (error) {
      console.error('Error en saveGameState:', error);
  }
}

function createButton(){
    const contentBigContainer = document.createElement('div');
    const saveGameBtn = createButton('Guardar Partida', ['save-game-btn'], () => handleSaveGame(cartas));
    contentBigContainer.appendChild(saveGameBtn);
}

function handleSaveGame(cartas) {
  try {
      saveGameState(getState(cartas));
      console.log('Partida guardada exitosamente.');
  } catch (error) {
      console.error('Error en handleSaveGame:', error);
  }
}

function getState() {
  try {
      // Recopilar las cartas del crupier y del jugador utilizando querySelectorAll y las clases de los divs correspondientes
      const dealerCards = document.querySelectorAll('.dealer-cards img');
      const playerCards = document.querySelectorAll('.your-cards img');
      
      // Inicializar arrays para almacenar las cartas del crupier y del jugador
      const dealerCardValues = [];
      const playerCardValues = [];

      // Recorrer las cartas del crupier y del jugador para obtener sus valores y sumarlos
      dealerCards.forEach(card => {
          dealerCardValues.push(obtenerCartaValor(card.src));
      });

      playerCards.forEach(card => {
          playerCardValues.push(obtenerCartaValor(card.src));
      });

      // Obtener la suma de las cartas del crupier y del jugador
      const dealerSum = dealerCardValues.reduce((sum, value) => sum + value, 0);
      const playerSum = playerCardValues.reduce((sum, value) => sum + value, 0);

      // Obtener el número de Ases en la mano del crupier y del jugador
      const dealerAceCount = obtenerNumeroAses(dealerCardValues);
      const playerAceCount = obtenerNumeroAses(playerCardValues);

      // Devolver el estado del juego con los datos recopilados
      return {
          deck: deck.slice(), // Copia del mazo actual
          dealerCards: dealerCardValues, // Cartas en la mano del crupier
          playerCards: playerCardValues, // Cartas en la mano del jugador
          dealerSum: dealerSum, // Suma de las cartas del crupier
          playerSum: playerSum, // Suma de las cartas del jugador
          dealerAceCount: dealerAceCount, // Número de ases en la mano del crupier
          playerAceCount: playerAceCount, // Número de ases en la mano del jugador
          gameEnded: !canHit, // Indica si el juego ha terminado
          winner: (canHit ? null : determinarGanador()) // El ganador del juego
      };
  } catch (error) {
      console.error('Error en getState:', error);
      return null;
  }
}

async function loadGameState(gameId) {
  try {
      const token = localStorage.getItem('access_token');
      console.log(gameId);
      const gameState = await getData(`game_states?id=eq.${gameId}&select=*`, token);
      return gameState[0];
  } catch (error) {
      console.error('Error en loadGameState:', error);
      return null;
  }
}

async function getAllSavedGames() {
  try {
      const token = localStorage.getItem('access_token');
      const savedGames = await getData('game_states', token); 
      return savedGames;
  } catch (error) {
      console.error('Error in getAllSavedGames:', error);
      return [];
  }
}
