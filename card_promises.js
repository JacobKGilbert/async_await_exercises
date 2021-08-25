const BASE_URL = 'http://deckofcardsapi.com/api/deck'

// #1
async function drawOneCard(){
  try {
    res = await axios.get(`${BASE_URL}/new/draw?count=1`)

    value = res.data.cards[0].value
    suit = res.data.cards[0].suit
    console.log(`${value} of ${suit}`)
  }
  catch (err) {
    console.log(err)
  }
}

// #2
async function drawTwoCards() {
  try {
    // First Draw
    card_1_res = await axios.get(`${BASE_URL}/new/draw?count=1`)
    value_1 = card_1_res.data.cards[0].value
    suit_1 = card_1_res.data.cards[0].suit
    deck_id = card_1_res.data.deck_id
    console.log('First request', `${value_1} of ${suit_1}`)

    // Second Draw
    card_2_res = await axios.get(`${BASE_URL}/${deck_id}/draw?count=1`)
    value_2 = card_2_res.data.cards[0].value
    suit_2 = card_2_res.data.cards[0].suit
    console.log('Second request', `${value_2} of ${suit_2}`)

  } catch (err) {
    console.log(err)
  }
}

// #3
const btn = document.querySelector('button')
const body = document.querySelector('body')
let deck_id
let z = 1

// Grab a new deck
async function initDeck(){
  try {
    res = await axios.get(`${BASE_URL}/new/shuffle?deck_count=1`)

    deck_id = res.data.deck_id
  }
  catch (err) {
    console.log(err)
  }
}

/** Event Handler for drawing a card from the deck. */
async function drawCard() {
  try {
    res = await axios.get(`${BASE_URL}/${deck_id}/draw/?count=1`)

    remaining = res.data['remaining']

    if (remaining === 0) {
      btn.removeEventListener('click', drawCard)
    }

    // Separate response values
    value = res.data.cards[0]['value']
    suit = res.data.cards[0]['suit']
    image = res.data.cards[0]['image']

    // Create and add img to DOM
    img = document.createElement('img')
    img.setAttribute('src', image)
    img.style['z-index'] = z

    // Add rotation
    let angle = Math.random() * 90 - 45
    let randomX = Math.random() * 40 - 20
    let randomY = Math.random() * 40 - 20

    img.style[
      'transform'
    ] = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`

    // Add card to DOM
    body.appendChild(img)

    z += 1
  } 
  catch (error) {
    console.log(err)
  }
}

btn.addEventListener('click', drawCard)

initDeck()