import React, { useState } from 'react'

const CardItem = ({ card, handleFlipped, flipped, disabled, solved }) => {
  return (
    <div
      className={`card ${flipped || solved ? 'front' : 'back'}`}
      onClick={() => (disabled ? null : handleFlipped(card.id))}
    >
      <span>{card.type}</span>
    </div>
  )
}

export default CardItem
