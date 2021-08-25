const BASE_URL = 'http://numbersapi.com'
const ul = document.querySelector('ul')
const ol = document.querySelector('ol')
const body = document.querySelector('body')
const favNum = 7

// Single Promise
async function getTrivia(num) {
  try {
    res = await axios.get(`${BASE_URL}/${num}/trivia?json`)

    const li = document.createElement('li')
    li.innerText = res.data.text
    ul.appendChild(li)
  } 
  catch (err) {
    console.log(err)
  }
}

// Batch Promise
async function getBatchTrivia() {
  try {
    res = await axios.get(`${BASE_URL}/1..7/trivia?json`)

    for (const num in res.data) {
      if (Object.hasOwnProperty.call(res.data, num)) {
        const numFacts = res.data[num];

        const li = document.createElement('li')
        li.innerText = numFacts
        ol.appendChild(li)
      }
    }
  } 
  catch (err) {
    console.log(err)
  }
}

// Promise all
async function getFourTriviaWithPromiseAll(num) {
  try {
    let numberArr = await Promise.all([
      axios.get(`${BASE_URL}/${num}/trivia?json`),
      axios.get(`${BASE_URL}/${num}/trivia?json`),
      axios.get(`${BASE_URL}/${num}/trivia?json`),
      axios.get(`${BASE_URL}/${num}/trivia?json`),
    ])

    numberArr.forEach(num => {
      const p = document.createElement('p')
      p.innerText = num.data.text
      body.appendChild(p)
    })
  } 
  catch (error) {
    console.log(err)
  }
}

getTrivia(favNum)
getBatchTrivia()
getFourTriviaWithPromiseAll(favNum)