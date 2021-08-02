let numberOfMoves = 0

function initGame() {
    const initialMessage = 'Com quantas cartas deseja jogar? Você deve escolher um número par entre 4 e 14.'
    const howManyCards = getNumberOfCards(initialMessage)

    const cardsBackFaceGif = [
        'bobrossparrot.gif',
        'explodyparrot.gif',
        'fiestaparrot.gif',
        'metalparrot.gif',
        'revertitparrot.gif',
        'tripletsparrot.gif',
        'unicornparrot.gif'
    ]

    const shuffledCardsBackFaceGif = createShuffledListOfPairsOfImages(cardsBackFaceGif, howManyCards/2)

    const mainContent = document.querySelector('.wrapper-main-content')

    for (let i = 0; i < howManyCards; i++) {
        const sourceBackImage = `./assets/${shuffledCardsBackFaceGif[i]}`
        cardOuterHTML = createCard(sourceBackImage)
        mainContent.innerHTML += cardOuterHTML
    }
}

function createCard(sourceBackImage) {
    const cardOuterHTML = `<div class="card" onclick="handleClickOnCard(this)">
        <div class="face front-face">
            <img src="./assets/front.png">
        </div>
        <div class="face back-face">
            <img src="${sourceBackImage}">
        </div>
    </div>`
    
    return cardOuterHTML
}

function getNumberOfCards(message) {
    const howManyCards = prompt(`${message}`)
    const response = handleInput(howManyCards)

    if (response === true) {
        return Number(howManyCards)
    } else {
        getNumberOfCards(response)
    }
}

function handleInput(stringInput) {

    const readyMessagesForNaN = [
        'Tem que ser um número cara!',
        'N ú m e r o.',
        '1, 2, 3, 4, ...'
    ]

    const readyMessagesForOtherWrongAnswers = [
        'Eu sei que é difícil!',
        'Alguma hora você consegue!',
        'Tem que ser par entre 4 e 14!'
    ]

    if (isAValidNumber(stringInput)) return true

    let message
    if (isNaN(stringInput)) {
        message = pickRandomItemFromList(readyMessagesForNaN)
    } else {
        message = pickRandomItemFromList(readyMessagesForOtherWrongAnswers)
    }

    return message
}

function isAValidNumber(stringNumber) {
    const num = Number(stringNumber)

    const isEven = num % 2 === 0
    const isBetweenFourAndFourteen = 4 <= num && num <= 14

    return isEven && isBetweenFourAndFourteen
}

function pickRandomItemFromList(list) {
    const randomIndex = Math.floor(Math.random() * list.length)

    return list[randomIndex]
}

function handleClickOnCard(card) {
    const isFlipped = card.classList.contains('flipped')

    if (isFlipped) return

    flipCard(card)

    const allSelectedCards = document.querySelectorAll('.wrapper-main-content > .selected')
    const isThereACardSelected = allSelectedCards.length === 1

    if (isThereACardSelected) {
        numberOfMoves++
        const previousSelectedCard = allSelectedCards[0]
        const theCardsAreEqual = checkIfCardsAreEqual(card, previousSelectedCard)

        if (!theCardsAreEqual) {
            setTimeout(_ => unFlipCards([card, previousSelectedCard]), 500)
        } else {
            handleWhenSelectedCardsAreEqual()
        }
        // Movimento encerrado
        previousSelectedCard.classList.remove('selected')
    } else {
        // Movimento iniciado
        card.classList.add('selected')
    }
    
}

function handleWinGame() {
    const animationTime = getAnimationDuration('.wrapper-main-content > .card > .face')

    setTimeout(_ => alert(`Você ganhou em ${numberOfMoves} jogadas!`), animationTime)

    setTimeout(restartGame, 700)
}

function handleWhenSelectedCardsAreEqual() {
    const unflippedCards = document.querySelectorAll('.wrapper-main-content > .card:not(.flipped)')
    const everyCardIsFlipped = unflippedCards.length === 0

    if (everyCardIsFlipped) {
        handleWinGame()
    }
}

function createShuffledListOfPairsOfImages(listOfImages, howManyPairsOfImages) {
    let shuffledListOfImages = listOfImages.sort(randomComparison)

    shuffledListOfImages = shuffledListOfImages.slice(0, howManyPairsOfImages)
    shuffledListOfImages = shuffledListOfImages.concat(shuffledListOfImages)
    shuffledListOfImages = shuffledListOfImages.sort(randomComparison)

    return shuffledListOfImages
}

function flipCard(card) {
    card.classList.add('flipped')
}

function unFlipCards(listOfCards) {
    listOfCards.forEach(card => card.classList.remove('flipped'))
}

function checkIfCardsAreEqual(firstCard, secondCard) {
    const firstCardSource = firstCard.querySelector('.back-face > img').src
    const secondCardSource = secondCard.querySelector('.back-face > img').src
    
    return firstCardSource === secondCardSource
}

function randomComparison() {
    return Math.random() - 0.5
}

function getAnimationDuration(cssSelector) {
    const element = document.querySelector(cssSelector)

    const stringAnimationDuration = getComputedStyle(element).transitionDuration

    let animationTime = Number(stringAnimationDuration.replace('s', ''))

    return 1000 * animationTime
}

function restartGame() {
    const response = prompt('Deseja jogar outra partida?').toLowerCase()

    if (response === 'sim') {
        numberOfMoves = 0
        document.querySelector('.wrapper-main-content').replaceChildren()

        setTimeout(initGame, 700)
    }
}


window.onload = initGame