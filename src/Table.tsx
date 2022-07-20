import React, { useEffect, useState } from 'react';
import GetCard from './GetCard'
// import Card from './Card'
import { getDeckId, getCards } from './utils/deck';
import './Table.css'


/** Table component renders n sets of cards (default 7 sets)
 * 
 * state: 
 * -cards: [ {code, image, images, value, suit},{}...]
 * -deckId: string
 * 
 */


function Table() {
  const [cards, setCards] = useState([]);
  const [deckId, setDeckId] = useState<number>(0)

  /** return deck id by calling on getDeckId() */
  async function fetchDeckId(): Promise<void> {
    const deckId = await getDeckId();
    setDeckId(deckId)
  }

  /** returns array of cards by calling getCards() 
   * render when deckId state is changed
  */
  useEffect(() => {
    (async function fetchCard(): Promise<void> {
      setCards([]);
      const cardsPromise = await getCards(deckId);
      setCards(cardsPromise.cards);
    })();
  }, [deckId])

  return (
    <>
      <p>Table</p>
      <button onClick={fetchDeckId}>Click me to set table</button>
      <section id='memory-game'>
          <GetCard cards={cards} />
      </section>
    </>
  )
}

export default Table; 