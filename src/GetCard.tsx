import react, { useState } from "react";
import axios from 'axios';
import { getDeckId } from './utils/deck';
import Card from "./Card";
import { getCards } from "./utils/deck"
import './GetCard.css'
import { CardInterface } from "./interfaces"

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
}

function GetCard({ cards }: ICards) {

  return (

    <>
      {cards.map((card: CardInterface) =>
        <>
          <section className="memory-card">
            <Card key={card.code} card={card} />
          </section>
          <section className="memory-card">
            <Card key={card.code} card={card} />
          </section>
        </>
      )}
    </>
  )
}

export default GetCard;