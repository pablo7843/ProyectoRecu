import { route } from '../router.js';
import { getAllSavedGames, loadGameState } from '../services/saveGame.js';

export { showLoadGameView, handleLoadGame };

async function showLoadGameView(container) {
    console.log('Showing load game view...');

    try {
        const savedGames = await getAllSavedGames();

        if (Array.isArray(savedGames)) {
            const loadGameContent = buildLoadGameContent(savedGames);

            if (container) {
                container.innerHTML = loadGameContent;
                 // Obtener el botón de cargar partida
                const loadGameBtn = document.getElementById('load-game-btn');

                // Agregar un evento de clic al botón de cargar partida
                loadGameBtn.addEventListener('click', handleLoadGame);
            } else {
                console.error('Error: Container is null or undefined.');
            }
        } else {
            console.error('Error: Saved games data is not an array.');
        }
    } catch (error) {
        console.error('Error in showLoadGameView:', error);
    }
}

function buildLoadGameContent(savedGames) {
    let content = '<h2>Cargar Paartida</h2>';
    content += '<select id="saved-games-list">';
    console.log(savedGames);
    savedGames.forEach((game) => {
        content += `<option value="${game.id}">Id Partida: ${game.id} partida</option>`; 
    });

    content += '</select>';
    content += '<button id="load-game-btn">Cargar Partida</button>';
    return content;
}

async function handleLoadGame() {
    console.log('Handling load game...');

    try {
        // Obtener el elemento select que contiene la lista de partidas guardadas
        const savedGamesList = document.getElementById('saved-games-list');

        // Obtener el identificador de la partida seleccionada (en lugar del índice)
        const selectedGameId = savedGamesList.value; // Obtener el valor del option seleccionado

        // Cargar los datos de la partida seleccionada desde el servidor
        const selectedGameState = await loadGameState(selectedGameId);
        console.log("HandleLoadGame " + selectedGameId);
        // Verificar si se pudieron cargar los datos de la partida correctamente
        if (selectedGameState) {
            // Redirigir a la vista del juego con los datos de la partida cargada
            history.pushState({ route: 'game', gameState: selectedGameState }, 'Game', '#/game');
            route('game', selectedGameState);
        } else {
            // Mostrar un mensaje de error o redirigir a la vista principal si no se pudo cargar la partida
            console.error('Error: No se pudo cargar la partida seleccionada.');
            route('home');
        }
    } catch (error) {
        console.error('Error in handleLoadGame:', error);
        // Lógica de manejo de errores, como mostrar un mensaje al usuario
    }
}
