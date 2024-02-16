export { getBoardTemplate };

const getBoardTemplate = () => {
  const template = `
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
  <p id="results"></p>

  <div id="menuGame"> 
    <button id="jugar">New_Game</button>
    <button id="cargar">Load_Game</button>
  </div>
`;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;
  return wrapper.childNodes.values();
};

