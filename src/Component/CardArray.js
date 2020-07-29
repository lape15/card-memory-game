function shuffleCards(shuffleArr) {
  const shuffledArray = shuffleArr.slice(0)
  for (let i = 0; i < shuffleArr.length - 1; i++) {
    let randomIndex = Math.floor(Math.random() * (i + 1))
    let newCards = shuffledArray[i]
    shuffledArray[i] = shuffledArray[randomIndex]
    shuffledArray[randomIndex] = newCards
  }
  return shuffledArray
}

const initalCards = () => {
  let id = 0
  const cardArray = ['♥', '♤', '◇', '♣', '🂭', '🂫', '□', '△'].reduce(
    (acc, type) => {
      acc.push({
        id: id++,
        type,
      })
      acc.push({
        id: id++,
        type,
      })
      return acc
    },
    []
  )

  return shuffleCards(cardArray)
}

export { initalCards }
