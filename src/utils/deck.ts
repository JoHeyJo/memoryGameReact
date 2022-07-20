"use strict"
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

export { getDeckId, getCards }