
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
        const infoAboutCard = {
            id: i,
            sourceBackImage: `./assets/${shuffledCardsBackFaceGif[i]}`
        }
        cardOuterHTML = createCard(infoAboutCard)
        mainContent.innerHTML += cardOuterHTML
    }
}

function createCard(infoAboutCard) {

    const {id, sourceBackImage} = infoAboutCard

    const cardOuterHTML = `<div id="${id}" class="card" onclick="handleClickOnCard(this)">
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

    let howManyCards = prompt(`${message}`)

    let response = handleInput(howManyCards)

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
        'Alguma hora você consegue!'
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
        const previousSelectedCard = allSelectedCards[0]

        const theCardsAreEqual = checkIfCardsAreEqual(card, previousSelectedCard)

        if (!theCardsAreEqual) {
            setTimeout(_ => unFlipCards([card, previousSelectedCard]), 500)
        }
        // Movimento encerrado
        previousSelectedCard.classList.remove('selected')
    } else {
        // Movimento iniciado
        card.classList.add('selected')
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

window.onload = initGame