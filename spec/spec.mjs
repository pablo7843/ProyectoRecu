import { buildDeck, shuffleDeck, startGame, hit, stay, getValue, determinarGanador } from "../src/js/blackjack.js";

describe(' Tests', () => {
it("should create a deck of 52 cards with unique values and types", () => {
  buildDeck();
  expect(deck.length).toBe(52);
  const uniqueCards = new Set(deck);
  expect(uniqueCards.size).toBe(52);
});

// The function shuffles the deck array in a random order.
it("should shuffle the deck array in a random order", () => {
  const initialDeck = [...deck];
  shuffleDeck();
  expect(deck).not.toEqual(initialDeck);
});

it("should initialize dealerSum, yourSum, dealerAceCount, yourAceCount, hidden, and deck", () => {
  // Arrange
  let dealerSum = 0;
  let yourSum = 0;
  let dealerAceCount = 0;
  let yourAceCount = 0;
  let hidden;
  let deck;

  // Act
  startGame();

  // Assert
  expect(dealerSum).toBe(0);
  expect(yourSum).toBe(0);
  expect(dealerAceCount).toBe(0);
  expect(yourAceCount).toBe(0);
  expect(hidden).toBeDefined();
  expect(deck).toBeDefined();
});

// When 'hit' is called, a new card image is created and appended to the player's cards.
it("should create and append a new card image to the player´s cards", () => {
  const cardImg = document.createElement("img");
  const card = "4-C";
  cardImg.src = "/src/imagenes/cartas/" + card + ".png";
  const appendSpy = jest.spyOn(document.getElementById("your-cards"), "append");

  hit();

  expect(appendSpy).toHaveBeenCalledWith(cardImg);
});

// The function reduces the ace count for both the dealer and player sums.
it("should reduce the ace count for both the dealer and player sums when stay is called", () => {
  stay();
  expect(dealerAceCount).toBe(0);
  expect(yourAceCount).toBe(0);
});

// Returns NaN if the input is not a string.
it("should return NaN when the input is not a string", () => {
  expect(getValue(4)).toBeNaN();
  expect(getValue(true)).toBeNaN();
  expect(getValue(null)).toBeNaN();
});

it('should return null when both playerSumReduced and dealerSumReduced are less than 21', () => {
    // Arrange
    yourSum = 15;
    dealerSum = 18;
    yourAceCount = 0;
    dealerAceCount = 0;

    // Act
    const result = determinarGanador();

    // Assert
    expect(result).toBe(null);
});

})