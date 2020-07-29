import React, { useState, useEffect } from 'react'
import { initalCards } from './CardArray.js'
import CardItem from './CardItem'

const Cards = () => {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [solved, setSolved] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [baner, setBanner] = useState(false)

  useEffect(() => {
    setCards(initalCards())
  }, [])

  const handleFlipped = (id) => {
    setDisabled(true)
    if (flipped.length === 0) {
      setFlipped([id])
      setDisabled(false)
    } else {
      if (similarCardClicked(id)) return
      setFlipped([flipped[0], id])
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id])
        resetCards()
        setBanner(true)
      } else {
        setTimeout(resetCards, 2000)
      }
    }
  }

  const similarCardClicked = (id) => flipped.includes(id)

  const isMatch = (id) => {
    const clickedCard = cards.find((card) => id === card.id)
    const flippedCard = cards.find((card) => flipped[0] === card.id)

    return flippedCard.type === clickedCard.type
  }

  const resetCards = () => {
    setFlipped([])
    setDisabled(false)
  }

  return (
    <div className="wrapper">
      {baner ? console.log('You won') : console.log('bleh')}
      {cards.length > 0
        ? cards.map((card) => {
            return (
              <CardItem
                card={card}
                key={card.id}
                handleFlipped={handleFlipped}
                flipped={flipped.includes(card.id)}
                type={card.type}
                disabled={disabled || solved.includes(card.id)}
                solved={solved.includes(card.id)}
              />
            )
          })
        : null}
    </div>
  )
}

export default Cards
