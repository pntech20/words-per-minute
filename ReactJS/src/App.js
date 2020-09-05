import React, { Component } from 'react';
import './App.css';
import InputBarWrapper from './Components/InputBarWrapper'
import InfoSettings from './Components/InfoSettings'
var wordList = require('english-word-list')

// TODO: style reset button
// TODO: cant click reset if it is ready (also style),
//reset clickable while running,
//reset clikable afterwards

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      words: [],
      correctWords: [],
      wordsEntered: [],
      currentWord: 0,
      charsPerMin: 0,
      countCorrect: 0,
      timeLeft: 60,
      initialTime: 60,
      counting: false,
      blocked: false
    }
  }

  //when the app loads, get a list of words
  componentDidMount() {
    // console.log(wordList.amount(5));
    this.setState(
      {
        words: wordList.amount(100).sort((a, b) => { return 0.5 - Math.random() })
      });
    this.highlightInput()
  }

  //when a word is typed and submitted, move on to the next word
  wordSubmitted = (correctOrFalse, inputWord) => {
    this.setState({
      currentWord: this.state.currentWord + 1,
      correctWords: this.state.correctWords.concat(correctOrFalse),
      wordsEntered: this.state.wordsEntered.concat(inputWord),
      countCorrect: this.state.countCorrect + correctOrFalse,
      charsPerMin: this.state.charsPerMin + (inputWord.length * correctOrFalse)
    })
  }

  //ready state, waiting on user to start timer by typing
  handleReady = () => {
    console.log("ready to start");
    this.highlightInput()
    this.setState({
      // readyToCount: true
    })
  }

  //set state indicating timer is running
  startCounter = () => {
    let interval = setInterval(this.myTick, 100)
    this.setState({
      interval: interval,
      counting: true
    })
  }

  //stop and reset the counter (by clearing interval)
  resetCounter = () => {
    console.log("resetting");
    let interval = this.state.interval
    clearInterval(interval);
    this.setState({
      timeLeft: this.state.initialTime,
      counting: false,
      currentWord: 0,
      charsPerMin: 0,
      countCorrect: 0
    })
  }

  //every time the interval is reached, decrement time left, or stop if 0
  myTick = () => {
    if (this.state.timeLeft <= 0) {
      let interval = this.state.interval
      clearInterval(interval);
      this.setState({
        blocked: true,
        timeLeft: 0
      })
    } else {
      this.setState({
        timeLeft: this.state.timeLeft - .1
      })
    }
  }

  //get reference to main input field
  getInput = (inputItem) => {
    this.input = inputItem
    console.log("got reference to input");
  }

  //highlight (focus) the main input field
  highlightInput = () => {
    this.input.focus()
  }

  //reset app to intial state
  handleReset = () => {
    console.log("clearing the state");
    this.highlightInput();
    clearInterval(this.state.interval)
    this.setState({
      correctWords: [],
      wordsEntered: [],
      currentWord: 0,
      timeLeft: 60,
      initialTime: 60,
      // readyToCount:false,
      counting: false,
      blocked: false,
      charsPerMin: 0,
      countCorrect: 0,
      words: wordList.amount(100).sort((a, b) => { return 0.5 - Math.random() })
    })
  }

  render() {
    return (
      <div className="App">
        <InfoSettings
          //methods passed as props
          highlightInput={this.highlightInput}
          startCounter={this.startCounter}
          handleReset={this.handleReset}
          handleReady={this.handleReady}
          //state passed as props
          timeLeft={this.state.timeLeft}
          initialTime={this.state.initialTime}
          counting={this.state.counting}
          countCorrect={this.state.countCorrect}
          charsPerMin={this.state.charsPerMin}
          wordsEntered={this.state.wordsEntered.length}
        // accuracy={100 * this.state.countCorrect / this.state.wordsEntered.length}
        />
        <InputBarWrapper
          //methods passed as props
          refToInput={this.getInput}
          highlightInput={this.highlightInput}
          wordSubmit={this.wordSubmitted}
          startCounter={this.startCounter}
          //state passed as props
          blocked={this.state.blocked}
          counting={this.state.counting}
          wordsEntered={this.state.wordsEntered}
          correctWords={this.state.words}
          words={this.state.words}
          currentIndex={this.state.currentWord}
        />
        <footer className="App-footer">
          <h1 className="App-title">Typing speed test. Powered by React</h1>
          Check out this project on <a
            href="https://github.com/pntech20/words-per-minute"
            target="_blank"
            rel="noopener noreferrer"
          >Github</a>
        </footer>
      </div>
    );
  }
}

export default App;
