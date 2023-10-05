import React from 'react'
import './PopMessage.css'
const PopMessage = (props) => {
    const { message, handleClose } = props; // Access the message and handleClose props
  return (
    <div className='Pop-Body'>
        <h1>{message}</h1>
        <br />
        <button onClick={handleClose}>Close</button>
    </div>
  )
}

export default PopMessage