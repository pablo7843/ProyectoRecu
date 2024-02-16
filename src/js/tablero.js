import { saveGameState } from '../services/blackjackhttp.js';
import { createButton } from '../services/saveGame.js';
export function mostrarTableroBlackjack() {
  // Código HTML del tablero
  var codigoHTML = `
    <h2>Dealer: <span id="dealer-sum"></span></h2>
    <div id="dealer-cards">
        <img id="hidden" src="/src/imagenes/cartas/BACK.png">
    </div>

    <h2>You: <span id="your-sum"></span></h2>
    <div id="your-cards"></div>

    <br>
    <button id="hit"> + Carta</button>
    <button id="stay">Plantarse</button>
    <br>
    <button id="repeat">Nueva partida</button>

    <button id="guardar">Guardar Partida</button>
    <p id="results"></p>

    `;

    
    //      <div id="menuGame"> 
    // <button id="jugar">New_Game</button>
    // <button id="cargar">Load_Game</button>
    // </div>
  // Crear un div y establecer el contenido HTML
  var tableroElement = document.createElement("div");
  tableroElement.classList.add('tablero-blackjack');
  tableroElement.innerHTML = codigoHTML;

  createButton();

  return tableroElement; // Devolver el elemento HTML del tablero
}


