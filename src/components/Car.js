import React, { useState, useEffect } from 'react'
// import { getNextY } from './Physics'
import { getNextY } from './Physics2'

const height = 150
const width = 400
const groundClearance = 100

function Car ({ x, startY, dampening = 1 }) {
  const [y, setY] = useState(0)
  const [startTime, setStartTime] = useState((new Date()).getTime())

  useEffect(() => {
    const fetch = async () => {
      if ((new Date()).getTime() - 2000 < startTime) {
        setY(await getNextY(y, dampening))
      }
    }
    fetch()
  })

  return (
    <svg overflow='visible' x={x} width={width} y={startY - height - groundClearance} height={height + groundClearance}>
      <image x={36} y={height - 80 + groundClearance} width='80' height='80' href='/wheel.svg' />
      <image x={width - 114} y={height - 80 + groundClearance} width='80' height='80' href='/wheel.svg' />
      <image viewBox='0 0 10 10' y={-60 - y} href='/car-body.svg' width={width} />
    </svg>
  )
}

export default Car
