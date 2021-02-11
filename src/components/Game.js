import React from 'react'
import Car from './Car'

function Game () {
  return (
    <svg width='1400px' height='1000px'>
      <rect width='100%' height='100%' fill='#00BEFF' />
      <rect y='800px' width='100%' height='30%' fill='#287653' />
      <Car x={200} startY={800} dampening={2} />
      {/* <Car x={200} startY={800} dampening={0.1} /> */}
    </svg>
  )
}
export default Game
