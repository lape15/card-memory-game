import React, { useState, useEffect } from 'react';
import { cardArray } from './CardArray.js';
import CardItem from './CardItem';

const Cards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(cardArray);
  }, []);
  return (
    <div>
      {cards.length > 0
        ? cards.map((card, index) => {
            return <CardItem card={card} key={index} />;
          })
        : null}
    </div>
  );
};

export default Cards;
