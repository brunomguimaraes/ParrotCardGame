function initGame() {
    const initialMessage = 'Com quantas cartas deseja jogar? Você deve escolher um número par entre 4 e 14.'
    let howManyCards = getNumberOfCards(initialMessage)

    const mainContent = document.querySelector('.wrapper-main-content')

    for (let i = 0; i < howManyCards; i++) {
        cardOuterHTML = createCard()
        mainContent.innerHTML += cardOuterHTML
    }
}

function createCard() {
    const cardOuterHTML = `<div class="card">
            <img src="./assets/front.png">
        </div>`
    
    return cardOuterHTML
}

function getNumberOfCards(message) {

    let howManyCards = prompt(`${message}`)

    let response = handleInput(howManyCards)

    if (response === true) {
        return howManyCards
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
    'Deve ser um número par entre 4 e 14.'

    let num = Number(stringNumber)

    let isEven = num % 2 === 0
    let isBetweenFourAndFourteen = 4 <= num && num <= 14

    return isEven && isBetweenFourAndFourteen
}

function pickRandomItemFromList(list) {
    const randomIndex = Math.floor(Math.random() * list.length)

    return list[randomIndex]
}

window.onload = initGame