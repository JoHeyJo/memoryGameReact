import react, { useState } from "react";
import './Card.css'
import { CardInterface } from "./interfaces"


interface ICard {
  card: CardInterface
}

/** Card component */
function Card({ card }: ICard) {
  return (
    <>
      <img
        className="front-face"
        src={card.image} />
      <img
        className="back-face"
        src={require('./img/card-back.png')} />
    </>
  )
}

export default Card;