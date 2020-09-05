import React, { Component } from 'react';
import '../Style/Current.css'


// TODO: clean up logic for entering text
export default class Current extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputChars: "",
      lastChar: '',
      charIndex: 0,
      typingWord: '',
      errorCount: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.blocked === true || nextProps.counting === false) {
      this.setState({
        inputChars: "",
        lastChar: '',
        charIndex: 0,
        typingWord: '',
        errorCount: 0
      })
    }
  }

  handleChange(e) {
    if (this.props.blocked) return;
    console.log("e.target.value ", e.target.value);
    let lastChar = e.target.value[e.target.value.length - 1] || '';
    let typingWord = this.state.typingWord + lastChar;
    let currentWord = this.props.words[this.props.currentIndex]

    console.log("typingWord", typingWord);
    console.log("lastChar", lastChar);

    this.setState({
      typingWord: typingWord,
      inputChars: e.target.value,
      lastChar: lastChar
    })

    //if the char entered matches the expected char of the word
    // if(lastChar === currentWord.charAt(this.state.charIndex)){
    //   if(this.state.errorCount === 0){
    //     this.setState({
    //       charIndex: this.state.charIndex +1
    //     })
    //   } else{
    //     this.setState({
    //       errorCount: this.state.errorCount +1
    //     })
    //   }
    // }
    //not currently in error state
    if (this.state.errorCount === 0) {
      //no timers running
      if (this.props.counting === false) {
        this.props.startCounter()
      }
      //char entered was correct
      if (lastChar === currentWord.charAt(this.state.charIndex)) {
        this.setState({
          charIndex: this.state.charIndex + 1
        })
        //char entered was a space, set up for next word
      } else if (e.target.value === "" || lastChar === " " || lastChar === "") {//reset
        console.log("there was a space entered");
        console.log(`'${lastChar}'`);
        this.setState({
          inputChars: "",
          lastChar: '',
          charIndex: 0,
          typingWord: "",
          errorCount: 0
        })
      } else {
        this.setState({
          errorCount: this.state.errorCount + 1
        })
      }
    }
    // else if(e.target.value === "" || lastChar ===" " || lastChar ===""){//reset
    //   console.log("there was a space entered");
    //   console.log(`'${lastChar}'`);
    //   this.setState({
    //     inputChars : "",
    //     lastChar: '',
    //     charIndex:0,
    //     typingWord:"",
    //     errorCount:0
    //   })
    // }
    else { //already in error state, stay in error state
      this.setState({ errorCount: this.state.errorCount + 1 })
    }
  }

  resetState() {
    this.setState({
      inputChars: "",
      lastChar: '',
      charIndex: 0,
      typingWord: "",
      errorCount: 0
    })
  }

  handleKeyDown(e) {
    if (this.props.blocked) return
    let currentWord = this.props.words[this.props.currentIndex];
    if (e.key === ' ') {
      if (this.state.inputChars) {//non empty input
        if (this.state.typingWord === currentWord) {
          this.props.wordSubmit(1, this.state.typingWord)
        } else {
          this.props.wordSubmit(0, this.state.typingWord)
        }
        this.resetState()
      }
      console.log("enter was pressed");
    } else if (e.key === 'Backspace') {
      if (this.state.errorCount > 0) {
        this.setState({
          typingWord: this.state.typingWord.slice(0, this.state.typingWord.length - 1),
          errorCount: this.state.errorCount - 1
        })
      } else if (this.state.typingWord.length > 0) {
        this.setState({
          typingWord: this.state.typingWord.slice(0, this.state.typingWord.length - 1),
          charIndex: this.state.charIndex - 1
        })
      }
    }
  }

  handleClick = () => {
    this.nameInput.focus()
  }

  getColor() {
    return (this.state.errorCount === 0) ? "correct" : "wrong"
  }

  render() {
    let currentWord = this.props.words[this.props.currentIndex] || ""
    return (
      <div
        className={"Current " + this.getColor()}
        onClick={this.props.highlightInput}
      >
        {/* <p onClick={this.handleClick} >Click me to start</p> */}
        <span className="done">{this.state.typingWord}</span>
        <input
          // placeholder={this.props.words[this.props.currentIndex]}
          // ref={(input) => { this.nameInput = input }}
          ref={(input) => this.props.refToInput(input)}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          value=""
        />
        <span className="in-progress">
          {currentWord.slice(this.state.charIndex, currentWord.length) + " "}
        </span>
      </div>
    )
  }
}
