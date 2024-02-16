export function home() {
  let mainWindowRow = document.createElement("div");
  mainWindowRow.innerHTML = `
    <div class="container mt-5">
      <div class="jumbotron text-center">
        <h1 class="display-4">BLACKJACK</h1>
        <hr>
        <br>
        <a class="btn btn-primary btn-lg" href="#/newgame" role="button" id="nuevo">Nueva Partida</a>
        <a class="btn btn-primary btn-lg" href="#/allgames" role="button" id="cargar-partida">Cargar Partidas</a>
      </div>
    </div>
  `;
  
  return mainWindowRow;
}
