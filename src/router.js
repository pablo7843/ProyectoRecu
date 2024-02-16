import { loginForm } from './views/login.js';
import { home } from './views/home.js';
import { registerForm } from './views/register.js';
import { mostrarTableroBlackjack } from './js/tablero.js';
import * as blackjack from './js/blackjack.js';
import { logout } from './services/users.js';
import { listGames } from "./views/gamesList.js";
import { mostrarJuegosPorUID } from "./gameViews/generateGames.js";

export { route };

function route(ruta) {
  console.log({ ruta });
  let params = ruta.split('?')[1];
  params = params ? new Map(params.split('&').map((param) => {
    const paramArray = param.split('=');
    return [paramArray[0], paramArray[1]];
  })) : new Map();
  console.log({ params });
  ruta = ruta.split('?')[0];
  const main = document.querySelector('#container');
  let uid = localStorage.getItem("uid");
  console.log("UID del usuario = " + uid);

  switch (ruta) {
    case '#/':
      main.innerHTML = '';
      main.append(home());

      const button = document.getElementById("startGame");
      button.addEventListener("click", function () {
        if (uid === "" || uid === null) {
          console.log("Debes estar logueado")
          alert("Debes estar logueado");
          window.location.hash = "#/home";
        }
      });

      break;
    case '#/login':
      main.innerHTML = '';
      main.append(loginForm());

      break;
      case '#/newgame':
        main.innerHTML = '';
        if (!main.querySelector('.tablero-blackjack')) {
          main.append(mostrarTableroBlackjack());
        }
        break;
      
    case '#/game':
      // main.innerHTML = '';
      if (params.get('id')) {
          // generateGame(params.get('id')).then((divs) => main.append(...divs));
        generateGame(main, params.get('id'));
      } else if (localStorage.getItem('gameId')) {
        window.location.hash = `#/game?id=${localStorage.getItem('gameId')}`;
      } else {
        window.location.hash = '#/';
      }
      break;
    case '#/allgames':

      if (uid === "" || uid === null) {
        alert("Debes estar logueado");
        localStorage.setItem('nameUser',"Usuario");
        window.location.hash = "#/home";
      } else {
        main.innerHTML = "";
        main.append(listGames());
        mostrarJuegosPorUID(uid);
      }
      break;
    case '#/register':
      main.innerHTML = '';
      main.append(registerForm());
      break;
    case '#/logout':
      logout();
      const usernameElement = document.querySelector('#username');
      if (usernameElement) {
        usernameElement.textContent = "Desconocido";
      }

      window.location.hash = '#/';

      break;
    case '':
      window.location.hash = '#/';
      break;
    default:
      window.location.hash = '#/';
  }
}