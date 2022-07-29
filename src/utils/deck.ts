import axios from 'axios';
import { IGetCards } from '../interfaces'

const BASE_URL = "https://deckofcardsapi.com/api"

/** pings card api and returns id corresponding to a deck */
async function getDeckId(): Promise<number>{
  const response = await axios.get(`${BASE_URL}/deck/new/shuffle/?deck_count=1`);
    return response.data.deck_id;
  

}

/** pings card api and returns cards from the same deck using a deck id */
async function getCards(deckId: number): Promise<IGetCards>{
  const response = await axios.get(`${BASE_URL}/deck/${deckId}/draw/?count=6`)
  return response.data
}

/** Fisher-Yates "perfect shuffle" algorithm. Shuffles values in an array */
function shuffle(cards: []): []{
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards
}

/** creates duplicate of each card in the original array*/
function dupCards(cards: []): [] {
  return cards.reduce((acc, next) => {
    acc.push(next);
    acc.push(next);
    return acc;
  }, [])
}

export { getDeckId, getCards, shuffle, dupCards }