import React from 'react'

const terrainDataToSVG = (terrainData, gameHeight) => {
  const firstCord = 'M 0 ' + gameHeight + ' '
  const lastCord = ' ' + terrainData[terrainData.length - 1].x + ' ' + gameHeight

  const pathString = firstCord + terrainData.map(cord => cord.x + ' ' + cord.y).join() + lastCord

  return pathString
}

function Terrain ({ terrainData, gameHeight = 600 }) {
  const pathString = terrainDataToSVG(terrainData, gameHeight)

  return (
    <path fill='#287653' d={pathString} />
  )
}
export default Terrain
