import React from 'react'
import Current from './CurrentInput.js'
import Completed from './Completed.js'
import Next from './Next.js'
import '../Style/InputWrapper.css'

export default function InputBarWrapper(props) {
  return (
    <div className="input-wrapper">
      {/* <div className="left-wrap"> */}
      <Completed
        words={props.words}
        currentIndex={props.currentIndex}
        wordsEntered={props.wordsEntered}
      />
      <Current
        words={props.words}
        wordSubmit={props.wordSubmit}
        highlightInput={props.highlightInput}
        refToInput={props.refToInput}
        currentIndex={props.currentIndex}
        counting={props.counting}
        blocked={props.blocked}
        startCounter={props.startCounter}
      />
      {/* </div> */}
      <Next
        words={props.words}
        currentIndex={props.currentIndex}
        blocked={props.blocked}
      />
    </div>
  )
}
