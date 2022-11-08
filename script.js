const wordElement = document.getElementById('word')
const wrongLettersElement = document.getElementById('wrong-letters')
const playAgainButton = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
// play again button is the pop-up
const notification = document.getElementById('notification-container')
// already guessed letter notification at the bottom
const finalMessage = document.getElementById('final-message')

const figureBodyParts = document.querySelectorAll('.figure-body-part')
//body parts added as each letter is guessed incorrectly

const words = ['yes', 'no', 'have', 'not']

// Gives us a random word from the array below
let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = []
const wrongLetters = []


// span tag: The HTML <span> tag is used for grouping and applying styles to inline elements.

// ********There is a difference between the span tag and the div tag.The span tag is used with inline elements  (in a row)  whilst the div tag is used with block - level content (in a column).*************


// The HTML span element is a generic inline container for inline elements and content. It is used to group elements for styling purposes (by using the class or id attributes), A better way to use it when no other semantic element is available.

// The span tag is a paired tag means it has both open(<) and closing(>) tags, and it is mandatory to close the tag.The span tag is used for the grouping of inline elements & this tag does not make any visual change by itself.span is very similar to the div tag, but div is a block - level tag and span is an inline tag.

// Show the hidden word
function showWord() {
  // set innerHTML to the selected word 
  wordElement.innerHTML = `
    ${selectedWord
      // takes the selectedWord and turns this string into an array and split it by letter
      .split('')
      .map(
        // map through it by taking each letter and returning a span with class of letter 
        //  is the current letters we're looping through included in correctLetters
        // if it is included show the letter else show an empty string
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')
    }
`
  // finally join() turns it back into a string from an array



  const innerWord = wordElement.innerText.replace(/\n/g, '')
  // wordElement.innerText writes innerText in a column versus horizontally in innerText
  // replace() sets new line character with an empty string

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won!'
    // finalMessage is the heading
    popup.style.display = 'flex'
    // shows pop up for you won : flex
  }
}

// Keydown letter press
window.addEventListener('keydown', e => {
  // console.log(e.code)
  if (e.code >= 'KeyA' && e.code <= 'KeyZ') {
    const letter = e.key
    // sets letter to key letter stroke

    // find out if key is in the selectedWord using includes method
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        // push letter into correcLetters array if not already there
        correctLetters.push(letter)
        showWord()

      } else {
        showNotification()
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        // push letter into wrongLetters array if not already there
        wrongLetters.push(letter)
        updateWrongLettersElement()

      } else {
        showNotification()
      }
    }
  }
})





// Update the wrong letters
function updateWrongLettersElement() {
  // Display wrong letters

  // first checks if anything is in wrongLetters array if there is then we'll have an paragraph tag that says "Wrong" else empty string


  wrongLettersElement.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
`
  // take wrong letters array and map through it and for each letter we're going to output a span with in each will be a letter



  // Display figures body parts -- using forEach method
  figureBodyParts.forEach((bodyPart, index) => {
    const errors = wrongLetters.length
    // we need to check how many wrong letters there are

    // loop through it using forEach and if this is less than the errors  
    if (index < errors) {
      bodyPart.style.display = 'block' // block makes the body part show
    } else {
      bodyPart.style.display = 'none' // none makes the body part not show up
    }
  })

  // Check if Game is lost
  if (wrongLetters.length === figureBodyParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. '
    popup.style.display = 'flex'

    // shows flex: shows pop up you lost game message
  }
}

// Show notification -- says you've already picked letter
function showNotification() {
  notification.classList.add('show')

  // shows notification real quick 2 seconds 

  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}
// then removes notification
// miliseconds 2000 = 2 seconds



// Restart game and play again
playAgainButton.addEventListener('click', () => {
  //  Empty arrays - splice starting at 0 clears to the end of the end of the array indexes
  correctLetters.splice(0)
  wrongLetters.splice(0)

  selectedWord = words[Math.floor(Math.random() * words.length)]

  showWord()

  updateWrongLettersElement()

  popup.style.display = 'none'
  // hides the pop up again by setting it to none again
})

showWord()
