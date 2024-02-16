import { createData, getData, } from './http.js';
  
  export { saveGameState, loadGameState, getAllSavedGames, SUPABASE_KEY };
  
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0and5b2N2bm5ueGJ4d3R3enNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjYzMzAsImV4cCI6MjAxNDg0MjMzMH0.WlMeYCDWudOonvOLKxr-v0R9Ah3xaWN12eJCGwSjU08';
  
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
  
