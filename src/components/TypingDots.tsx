import React from 'react'

type Props = {}

const TypingDots = (props: Props) => {
  return (
    <div className="flex space-between w-full gap-x-1">
      <div className="dot dot-bounce dot1"></div>
      <div className="dot dot-bounce dot2"></div>
      <div className="dot dot-bounce dot3"></div>
    </div>
  )
}

export default TypingDots