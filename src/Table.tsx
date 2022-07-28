import React, { SyntheticEvent, useEffect, useState } from 'react';
import Card from './Card'
import { CardInterface } from './interfaces';
import { getDeckId, getCards, dupCards, shuffle } from './utils/deck';
import './Table.css'
import { v4 as uuidv4 } from 'uuid';


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


  /** adds flip class to target event to 'flip' card, updates state with code of 
   * the flipped card
   */
  function flipCard(e: SyntheticEvent): void {
    e.currentTarget.classList.toggle('flip');
    const targetEvent = e.currentTarget;
    setFlippedCards(flippedCards => [...flippedCards, targetEvent]);
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
      setIsDisabled(true);
      if (!isAMatch(flippedCards[0], flippedCards[1])) {
        setTimeout(function () {
          flippedCards[0].classList.remove('flip')
          flippedCards[1].classList.remove('flip')
          setFlippedCards([]);
          setIsDisabled(false);
        }, 2000)
      } else {
        flippedCards[0].classList.add('disable-pointer')
        flippedCards[1].classList.add('disable-pointer')
        setIsDisabled(false);
        setFlippedCards([]);
      }
    }
  }, [flippedCards])


  /** toggle disabled */
  function toggleDisable(): void {
    setIsDisabled(!isDisabled);
  }

  return (
    <>
      <p>Table</p>
      <button onClick={fetchDeckId}>Click me to set table</button>
      <section className={isDisabled ? 'memory-game disable-pointer' : 'memory-game'}>
        {cards.map((card: CardInterface) =>
          <section id={card.code} className='memory-card' onClick={(e:any)=>flipCard(e)}>
            <Card key={uuidv4()} card={card} />
          </section>
        )}
      </section>
    </>
  )
}

export default Table; 