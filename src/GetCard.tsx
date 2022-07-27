import react, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import axios from 'axios';
import { getDeckId } from './utils/deck';
import Card from "./Card";
import { getCards } from "./utils/deck"
import './GetCard.css'
import { CardInterface } from "./interfaces"
import { v4 as uuidv4 } from 'uuid';
import { symlink } from "fs";
/** Gets cards
 * 
 * Table -> Card
 * 
 * prop:
 * -cards: [ {code, image, images, value, suit},{}...]
 * 
 */

interface ICards {
  cards: CardInterface[]
  addFlippedCard: any 
}


function GetCard({ cards, addFlippedCard }: ICards) {


  /** adds flip class to target event to 'flip' card, updates state with code of 
   * the flipped card
   */
  function flipCard(e: SyntheticEvent): void {
    // console.log('current target', e.currentTarget)
    e.currentTarget.classList.toggle('flip');
    const targetEvent = e.currentTarget;//rename variable
    addFlippedCard(targetEvent);
  }



// console.log(flippedCards.length)




  return (

    <>
      {cards.map((card: CardInterface) =>
        <section id={card.code} className='memory-card flip' onClick={flipCard}>
          <Card key={uuidv4()} card={card} />
        </section>
      )}
    </>
  )
}

export default GetCard;