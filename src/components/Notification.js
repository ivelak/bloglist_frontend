import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  if (type == "posi"){
  return (
    <div className="posi">
      {message}
    </div>
  )
}
  if (type == "nega"){
    return (
        <div className="nega">
          {message}
        </div>
      )  
  }
}

export default Notification