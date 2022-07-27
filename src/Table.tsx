import React, { useEffect, useState } from 'react';
import GetCard from './GetCard'
// import Card from './Card'
import { getDeckId, getCards, dupCards, shuffle } from './utils/deck';
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
  const [deckId, setDeckId] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [flippedCards, setFlippedCards] = useState<any[]>([]);

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
      const pairsOfCards = dupCards(cardsPromise.cards);
      const shuffledCards = shuffle(pairsOfCards);
      setCards(shuffledCards);
    })();
  }, [deckId])



  /** set flipped cards to state */
  function addFlippedCard(event: any): void {
    setFlippedCards(flippedCards => [...flippedCards, event]);
  }


  /** checks if cards match based id(card code) */
  function isAMatch(card1: any, card2: any) {
    return card1.id === card2.id;
  }

  /** currently flipping card w/ dom manipulation
 * TODO: change flip function by add/remove flip property to card object
 */
  useEffect(() => {
    if (flippedCards.length === 2) {
      if (!isAMatch(flippedCards[0], flippedCards[1])) {
        setTimeout(function () {
          flippedCards[0].classList.remove('flip')
          flippedCards[1].classList.remove('flip')
          setFlippedCards([]);
          toggleDisable();
        }, 2000)
      } else {
        toggleDisable();
        setFlippedCards([]);
      }
    }
  }, [flippedCards])

  if (flippedCards.length === 2) toggleDisable();

  /** toggle disabled */
  function toggleDisable(): void {
    setIsDisabled(!isDisabled);
  }
// console.log('cards',cards)
  return (
    <>
      <p>Table</p>
      <button onClick={fetchDeckId}>Click me to set table</button>
      <section className={isDisabled ? 'memory-game disable-pointer' : 'memory-game'}>
        <GetCard cards={cards} addFlippedCard={() => addFlippedCard} />
      </section>
    </>
  )
}

export default Table; 