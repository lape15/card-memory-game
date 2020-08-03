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
  const [seconds, setSeconds] = useState(120)
  const [isActive, setIsActive] = useState(false)
  const [easy, setEasy] = useState(false)
  const [medium, setMedium] = useState(false)
  const [hard, setHard] = useState(false)
  const [mediumSeconds, setMediumSeconds] = useState(60)
  const [hardSeconds, setHardSeconds] = useState(30)

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
      } else if (easy) {
        setTimeout(resetCards, 2000)
      } else if (medium) {
        setTimeout(resetCards, 1000)
      } else if (hard) {
        setTimeout(resetCards, 500)
      }
    }
  }

  const handleMedium = () => {
    setIsActive(!isActive)
    setMedium(true)
  }
  const handleEasy = () => {
    setIsActive(!isActive)
    setEasy(true)
  }

  const handleHard = () => {
    setIsActive(!isActive)
    setHard(true)
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

  useEffect(() => {
    let interval = null
    let mediumInterval = null
    let hardInterval = null

    if (isActive && easy) {
      interval = setTimeout(() => {
        setSeconds((seconds) => seconds - 1)
      }, 1000)
    }
    if (isActive && medium) {
      mediumInterval = setTimeout(() => {
        setMediumSeconds((mediumSeconds) => mediumSeconds - 1)
      }, 1000)
    }
    if (isActive && hard) {
      hardInterval = setTimeout(() => {
        setHardSeconds((hardSeconds) => hardSeconds - 1)
      }, 1000)
    }

    if (seconds === 0 || mediumSeconds === 0 || hardSeconds === 0) {
      clearInterval(interval)
      clearInterval(mediumInterval)
      clearInterval(hardInterval)
    }
    return () => {
      clearInterval(interval)
      clearInterval(mediumInterval)
      clearInterval(hard)
    }
  }, [isActive, seconds, medium, easy, mediumSeconds, hard, hardSeconds])

  return (
    <div className="wrapper">
      {mediumSeconds === 0 || seconds === 0 || hardSeconds === 0 ? (
        <div className="over">GameOver. Refresh to start over</div>
      ) : null}
      {baner ? <div className="over">You win. Refresh to startover</div> : null}
      <div className="timer-box">
        {easy ? <div className="timer">{seconds}s </div> : null}
        {medium ? <div className="timer">{mediumSeconds}s </div> : null}
        {hard ? <div className="timer">{hardSeconds}s </div> : null}
        <div className="btn-box">
          <button onClick={handleEasy}>Easy</button>
          <button onClick={handleMedium}>Medium</button>
          <button onClick={handleHard}>Difficult</button>
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
