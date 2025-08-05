import React from 'react'

const cart = ({css , text}) => {
  return (
    <div className={`h-[20vh] w-[20vw] ${css} flex items-center justify-center`}> {text}
    </div>
  )
}

export default cart
