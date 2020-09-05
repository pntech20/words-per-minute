window.addEventListener('load', () => {
  init()
})

// const allWords = "Untimely problem depicts due to a anyone inevitable shame for lot whereas a religious formula tragic manifestation religious due to a ergo. Depicts doom some lot phenomenal depicts to ergo manifestation. Next formula due to flaws defined depicts given shown prowess personal could because heroic nobody embodies demise portrayal! Given can in certainly could prophecy certainly anyone due to. Thus some could case prowess case portrayal due to untimely to. Hero traits given God ever hence nobody shown personal shame specifically traits depict. Presents in, life, personal to such moreover a such has heroic humanity. Copy portrayal depicts has been unknowingly ergo unknowingly, formula lot good. Personal his ergo copy God faces phenomenal case personal certainly problem. Portrays untimely case prophecy given personal faces manifestation in, our representing fact could shocking shame as anyone. Depicts, point an without, flaws God heroic religious a untimely religious an religious shown untimely shocking good ergo his. Next problem humanity manifestation flaws his for tragic point death due to ergo presents given formula shown presents given next. To a due to yet good yet phenomenal shown can because tragic, demise such doom time far heroic nobody ever tragic, ergo. Tragic depict given ergo to tragic certainly demise vivid.";
// const words = allWords.split(" ");
// words.sort(() => 0.5 - Math.random());
const words = ["when", "first", "look", "which", "himself", "here", "away", "looked", "young", "thought", "where", "well", "your", "head", "down", "never", "many", "might", "being", "life", "long", "poor", "were", "another", "went", "take", "those", "hand", "eyes", "them", "think", "then", "back", "done", "could", "been", "about", "before", "said", "tell", "place", "should", "good", "what", "just", "took", "every", "upon", "only", "more", "over", "from", "know", "great", "seemed", "having", "with", "they", "make", "house", "came", "time", "always", "most", "last", "have", "ever", "come", "than", "mind", "like", "dear", "nothing", "these", "will", "miss", "into", "even", "face", "there", "though", "without", "much", "still", "quite", "this", "their", "shall", "some", "while", "little", "after", "better", "would", "must", "other", "very", "such", "made", "again"]

const amountToShow = 5;

let STATE = {
  correctWords: [],
  wordsEntered: [],
  currentIndex: 0,
  charsPerMin: 0,
  countCorrect: 0,
  timeLeft: 60,
  initialTime: 60,
  counting: false,
  blocked: false,
  inputChars: "",
  lastChar: '',
  charIndex: 0,
  typingWord: "",
  errorCount: 0
}

const init = () => {
  resetInput()
  highlightInput();
  renderCompleted()
  renderCurrent();
  renderNextWords();
  renderStats();
}

//highlight (focus) the main input field
const highlightInput = () => {
  const inputEl = document.querySelector('#word-input');
  inputEl.focus()
}

//reset input
const resetInput = () => {
  const inputEl = document.querySelector('#word-input');
  inputEl.value = ''
}

//ready state, waiting on user to start timer by typing
const handleReady = () => {
  highlightInput()
  resetInput()
}

const resetState = () => {
  STATE = {
    ...STATE,
    inputChars: "",
    lastChar: '',
    charIndex: 0,
    typingWord: "",
    errorCount: 0
  }
}

//set state indicating timer is running
const startCounter = () => {
  let interval = setInterval(this.myTick, 100)
  STATE = {
    ...STATE,
    interval: interval,
    counting: true
  }
}

//every time the interval is reached, decrement time left, or stop if 0
myTick = () => {
  if (STATE.timeLeft <= 0) {
    let interval = STATE.interval
    clearInterval(interval);
    STATE = {
      ...STATE,
      blocked: true,
      timeLeft: 0
    }
    // call so that the next words will be strikethrough if time out
    renderNextWords()
  } else {
    STATE = {
      ...STATE,
      timeLeft: STATE.timeLeft - .1
    }
  }
  renderTime()
}

//reset app to intial state
const handleReset = () => {
  highlightInput();
  clearInterval(STATE.interval)
  STATE = {
    correctWords: [],
    wordsEntered: [],
    currentIndex: 0,
    charsPerMin: 0,
    countCorrect: 0,
    timeLeft: 60,
    initialTime: 60,
    counting: false,
    blocked: false,
    inputChars: "",
    lastChar: '',
    charIndex: 0,
    typingWord: "",
    errorCount: 0
  }
  init()
  renderTime()
}

// NEXT WORDS
const getNextWords = () => {
  // return STATE.words.slice(STATE.currentIndex + 1,STATE.words.length)
  return words.slice(STATE.currentIndex + 1, STATE.currentIndex + 4)
}

const checkBlocked = () => {
  return STATE.blocked === true ? "blocked" : " ";
}

const renderNextWords = () => {
  const nextEl = document.querySelector('.Next');
  nextEl.innerHTML = `
    ${getNextWords().map((word, index) => `<span class=${checkBlocked()} key=${index}>${word + " "}</span>`).join('')}`
}

// IN-PROGRESS WORD
const renderCurrent = () => {
  const el = document.querySelector('.Current');
  const doneTyped = document.querySelector('.done');
  const inprogressWord = document.querySelector('.in-progress');
  doneTyped.innerHTML = STATE.typingWord
  const currentWord = words[STATE.currentIndex]
  inprogressWord.innerHTML = currentWord.slice(STATE.charIndex, currentWord.length) + " "
  if (STATE.errorCount === 0) {
    el.classList.add("correct");
    el.classList.remove("wrong");
  } else {
    el.classList.add("wrong");
    el.classList.remove("correct");
  }
}

//when a word is typed and submitted, move on to the next word
const wordSubmit = (correctOrFalse, inputWord) => {
  STATE = {
    ...STATE,
    currentIndex: STATE.currentIndex + 1,
    correctWords: STATE.correctWords.concat(correctOrFalse),
    wordsEntered: STATE.wordsEntered.concat(inputWord),
    countCorrect: STATE.countCorrect + correctOrFalse,
    charsPerMin: STATE.charsPerMin + (inputWord.length * correctOrFalse)
  }
}

const handleKeyDown = (e) => {
  if (STATE.blocked) return
  let currentWord = words[STATE.currentIndex];
  if (e.key === ' ') {
    if (STATE.inputChars) {//non empty input
      if (STATE.typingWord === currentWord) {
        wordSubmit(1, STATE.typingWord)
      } else {
        wordSubmit(0, STATE.typingWord)
      }
      resetState()
    }
  } else if (e.key === 'Backspace') {
    if (STATE.errorCount > 0) {
      STATE = {
        ...STATE,
        typingWord: STATE.typingWord.slice(0, STATE.typingWord.length - 1),
        errorCount: STATE.errorCount - 1
      }
    } else if (STATE.typingWord.length > 0) {
      STATE = {
        ...STATE,
        typingWord: STATE.typingWord.slice(0, STATE.typingWord.length - 1),
        charIndex: STATE.charIndex - 1
      }
    }
  }

  init()
}

const handleChange = (e) => {
  if (STATE.blocked) return;
  let lastChar = e.target.value[e.target.value.length - 1] || '';
  let typingWord = STATE.typingWord + lastChar;
  let currentWord = words[STATE.currentIndex]

  STATE = {
    ...STATE,
    typingWord: typingWord,
    inputChars: e.target.value,
    lastChar: lastChar
  }

  //not currently in error state
  if (STATE.errorCount === 0) {
    //no timers running
    if (STATE.counting === false) {
      startCounter()
    }
    //char entered was correct
    if (lastChar === currentWord.charAt(STATE.charIndex)) {
      STATE = {
        ...STATE,
        charIndex: STATE.charIndex + 1
      }
      //char entered was a space, set up for next word
    } else if (e.target.value === "" || lastChar === " " || lastChar === "") {//reset
      STATE = {
        ...STATE,
        inputChars: "",
        lastChar: '',
        charIndex: 0,
        typingWord: "",
        errorCount: 0
      }
    } else {
      STATE = {
        ...STATE,
        errorCount: STATE.errorCount + 1
      }
    }

  }

  else { //already in error state, stay in error state
    STATE = {
      ...STATE,
      errorCount: STATE.errorCount + 1
    }
  }

  init()
}


// COMPLETED WORDS

const getCompletedColor = (index) => {
  let checkedIndex;
  if (STATE.currentIndex < amountToShow) {
    checkedIndex = index
  } else {
    checkedIndex = checkedIndex = index + STATE.currentIndex - amountToShow
  }
  let correctWord = words[checkedIndex]
  let enteredWord = STATE.wordsEntered[checkedIndex]
  return correctWord === enteredWord ? "correct" : "wrong";
}

//key is combination of expected word and user input (to avoid duplicate keys)
// const getKey = (index, word) => {
//   let checkedIndex;
//   if (STATE.currentIndex < amountToShow) {
//     checkedIndex = index
//   } else {
//     checkedIndex = checkedIndex = index + STATE.currentIndex - amountToShow
//   }

//   let correctWord = words[checkedIndex]
//   return correctWord + word
// }

const renderCompleted = () => {
  const completedEl = document.querySelector('.Completed')
  if (STATE.currentIndex < amountToShow) {
    completedEl.innerHTML = `
    ${STATE.wordsEntered.slice(0, STATE.currentIndex).map((word, index) => `<span class=${getCompletedColor(index)} key=${index}>${word + " "}</span>`).join('')}
  `
  } else {
    completedEl.innerHTML = `
    ${STATE.wordsEntered.slice(STATE.currentIndex - amountToShow, STATE.currentIndex).map((word, index) => `<span class=${getCompletedColor(index)} key=${index}>${word + " "}</span>`).join('')}`
  }
}

// STATS
//use words entered and correct words to find accuracy
const setAccuracy = () => {
  if (STATE.wordsEntered.length === 0)
    return 0
  else
    return `${Math.floor(100 * STATE.countCorrect / STATE.wordsEntered.length)} % `
}

//since set state is async, timer goes to negative time sometimes
const setTime = () => {
  if (STATE.timeLeft < 0)
    return 0
  return `${Math.ceil(STATE.timeLeft)} s`
}

const getTimeColor = () => {
  if (STATE.timeLeft > 0 && STATE.timeLeft < 15) {
    return "yellowTime"
  } else if (STATE.timeLeft > 0) {
    return "black"
  } else if (STATE.timeLeft <= 0)
    return "redTime"
}

const getAnimations = () => {
  let animatedDots = ['....', '...', '..', '.']
  let index = Math.ceil(STATE.timeLeft * 2) % 4
  if (STATE.timeLeft < 60)
    return animatedDots[index]
  return "Ready"
}

const renderStats = () => {
  const countCorrect = document.querySelector('.countCorrect')
  const charsPerMin = document.querySelector('.charsPerMin')
  const accuracy = document.querySelector('.accuracy')

  countCorrect.innerHTML = STATE.countCorrect
  charsPerMin.innerHTML = STATE.charsPerMin
  accuracy.innerHTML = setAccuracy()
}

const renderTime = () => {
  const timeLeft = document.querySelector('.timeLeft')
  const secondsLeft = document.querySelector('.secondsLeft')
  const animation = document.querySelector('.animation')

  timeLeft.classList.add(getTimeColor())
  secondsLeft.innerHTML = setTime()
  animation.innerHTML = getAnimations()
}
