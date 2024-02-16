import { loadGameState, SUPABASE_KEY, } from "../services/blackjackhttp.js";

export { mostrarJuegosPorUID, mostrarTabla };

async function mostrarJuegosPorUID(uid) {
  try {
    const apiUrl = `https://ftjwyocvnnnxbxwtwzsf.supabase.co/rest/v1/game_states?uid=eq.${uid}&select=id,state`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const datos = await response.json();
    console.log(datos);
    mostrarTabla(datos);
  } catch (error) {
    console.error("Error al realizar la consulta:", error.message);
  }
}

// Función para mostrar los juegos en una tabla
function mostrarTabla(juegos) {
  // Obtén el elemento de la tabla en tu HTML (debes tener un elemento con id="tablaJuegos")
  const tabla = document.getElementById("tablaJuegos");

  // Limpia la tabla existente
  // tabla.innerHTML = '';

  // Crea filas y celdas para cada juego
  juegos.forEach((juego) => {
    const fila = tabla.insertRow();
    const idCelda = fila.insertCell(0);
    const botongame = fila.insertCell(1);
    const deleteCelda = fila.insertCell(2);

    // Llena las celdas con datos del juego
    const startGame = document.createElement("button");
    startGame.textContent = "PLAY";
    startGame.classList.add("btn", "btn-success");
    startGame.addEventListener("click", () => {
      
      localStorage.setItem("ID_update",juego.id);
      window.location.hash="#/game";
    });
    botongame.appendChild(startGame);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", async () =>{
      
      await eliminarJuego(juego.id);
      window.location.hash="#/refresh";
      
    });
    deleteCelda.appendChild(deleteButton);

    idCelda.textContent = juego.id;
  });
  const fila = tabla.insertRow();
  const idCelda = fila.insertCell(0);

  const newGame = document.createElement("button");
  newGame.textContent = "New Game";
  newGame.classList.add("btn", "btn-success");
  newGame.addEventListener("click", () => {
        window.location.hash="#/game"
  });
  idCelda.appendChild(newGame);
}
