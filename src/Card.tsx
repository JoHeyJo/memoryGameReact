import react, { useState } from "react";
import './Card.css'
import { CardInterface } from "./interfaces"


// TODO: change Image component to react component 

interface ICard {
  card: CardInterface
}

/** Card component */
function Card({ card }: ICard) {
  return (
    <div>
      <section className="memory-card">
        <div className="front-face">
          <Image
            source={{ uri: card.image }}
            body={card.code}
            style={{
              width: 150,
              height: 200,
              resizeMode: 'contain'
            }} />
        </div>
        <div className="back-face">
          <Image
            style={{ width: 150, height: 200 }}
            source={require('./img/card-back.png')}
          />
        </div>
      </section>

    </div>
  )
}

export default Card;