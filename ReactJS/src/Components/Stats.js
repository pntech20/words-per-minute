import React from 'react'
import '../Style/Stats.css'

export default function Stats(props) {

  //use words entered and correct words to find accuracy
  function setAccuracy() {
    if (props.wordsEntered === 0)
      return 0
    else
      return Math.floor(100 * props.countCorrect / props.wordsEntered)
  }

  //since set state is async, timer goes to negative time sometimes
  function setTime() {
    if (props.timeLeft < 0)
      return 0
    return Math.ceil(props.timeLeft)
  }

  function getTimeColor() {
    if (props.timeLeft > 0 && props.timeLeft < 5) {
      return "yellowTime"
    } else if (props.timeLeft > 0) {
      return ""
    } else if (props.timeLeft <= 0)
      return "redTime"
  }

  function getAnimations() {
    let animatedDots = ['....', '...', '..', '.']
    let index = Math.ceil(props.timeLeft * 2) % 4
    if (props.timeLeft < 60)
      return animatedDots[index]
    return "Ready"
  }

  return (
    <div className="Stats">
      <div className="viewGrid">
        <div>Words/min <p>{props.countCorrect}</p></div>
        <div>Char/min <p>{props.charsPerMin}</p></div>
        <div>Accuracy <p>{setAccuracy()}%</p></div>
      </div>
      <div className={"timeLeft " + getTimeColor()}>
        {/* Time left */}
        <p>{setTime()} sec </p>
        <p> {getAnimations()} </p>
      </div>
      {/* <p>Time Elapsed {Math.floor(props.elapsed)} sec</p> */}
    </div>
  )
}
