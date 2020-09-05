import React from 'react';
import '../Style/Completed.css'

export default function Completed(props) {

  let amountToShow = 3;

  function getCompleted() {
    if (props.currentIndex < amountToShow) {
      return props.wordsEntered.slice(0, props.currentIndex)
    } else {
      return props.wordsEntered.slice(props.currentIndex - amountToShow, props.currentIndex)
    }
  }

  function getColor(index) {
    let checkedIndex;
    if (props.currentIndex < amountToShow) {
      checkedIndex = index
    } else {
      checkedIndex = checkedIndex = index + props.currentIndex - amountToShow
    }
    console.log("checkedIndex", checkedIndex);
    let correctWord = props.words[checkedIndex]
    let enteredWord = props.wordsEntered[checkedIndex]
    console.log("correct word:", correctWord);
    return correctWord === enteredWord ? "correct" : "wrong";
  }

  //key is combination of expected word and user input (to avoid duplicate keys)
  function getKey(index, word) {
    let checkedIndex;
    if (props.currentIndex < amountToShow) {
      checkedIndex = index
    } else {
      checkedIndex = checkedIndex = index + props.currentIndex - amountToShow
    }

    let correctWord = props.words[checkedIndex]
    return correctWord + word
  }

  return (
    <div className="Completed">
      {getCompleted().map((word, index) => {
        return <span className={getColor(index)} key={getKey(index, word)}>{word + " "}</span>
      })}
    </div>
  )
}
