import React from 'react'
import Stats from './Stats'
// import Settings from './Settings'
import '../Style/InfoSettings.css'

export default function InfoSettings(props) {
  function getButtonColor() {
    if (props.timeLeft <= 0)
      return "highlight"
  }
  return (
    <div className="InfoSettings">
      <Stats
        timeLeft={props.timeLeft}
        elapsed={props.initialTime - props.timeLeft}
        countCorrect={props.countCorrect}
        charsPerMin={props.charsPerMin}
        wordsEntered={props.wordsEntered}
      />
      <button
        onClick={props.handleReset}
        className={getButtonColor()}>
        Reset
      </button>
      {/* <Settings
        handleReset={props.handleReset}
        highlightInput={props.highlightInput}
        startCounter={props.startCounter}
        handleReady={props.handleReady}
        readyToCount={props.readyToCount}
        counting={props.counting}
      /> */}
    </div>
  )
}
