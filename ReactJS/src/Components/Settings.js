import React from 'react'
import '../Style/Settings.css'

export default function Settings(props) {
  return (
    <div className="Settings">
      {/* <p>Time</p> */}
      {/* <p>Difficulty</p> */}
      {/* <button onClick={props.handleReady}>Start</button> */}
      {/* {props.readyToCount &&   <p>Start typing when you are ready to count</p>} */}
      <button onClick={props.handleReset} > Reset </button>
    </div>
  )
}
