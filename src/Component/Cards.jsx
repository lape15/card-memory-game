import React, { useState, useEffect } from 'react'
import { initalCards } from './CardArray.js'
import CardItem from './CardItem'

const Cards = () => {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [solved, setSolved] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [baner, setBanner] = useState(false)
  const [score, setScore] = useState(1)
  const [seconds, setSeconds] = useState(60)
  const [isActive, setIsActive] = useState(false)

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
        setScore(score + 1)
        if (score === 8) {
          setBanner(true)
        }

        console.log(score)
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
  function toggle() {
    setIsActive(!isActive)
  }

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setTimeout(() => {
        setSeconds((seconds) => seconds - 1)
      }, 1000)
    }
    if (seconds === 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])

  return (
    <div className="wrapper">
      {seconds === 0 ? (
        <div className="over">GameOver. Refresh to start over</div>
      ) : null}
      {baner ? <div className="over">You win. Refresh to startover</div> : null}
      <div className="timer-box">
        <div className="timer">{seconds}s </div>{' '}
        <div className="btn-box">
          <button onClick={toggle}>Start</button>
        </div>
      </div>

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
