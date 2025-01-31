import psleep from 'psleep'
const m2 = 3
const g = 9.82
const m1 = 50
// const b = 1 // replaced by dampening
const k = 10

const eulerStep = 0.1 // step size
const uPrim = g * m1

let yBis = 0
let yPrim = 0

const getMs = () => {
  return (new Date()).getTime()
}

let lastTimeStamp = getMs()

const simpleModel = async (y, dampening) => {
  await psleep(1)
  const h = (getMs() - lastTimeStamp) * eulerStep
  lastTimeStamp = getMs()
  yBis = (1 / m1) * (-0.1 * uPrim - dampening * yPrim - y)
  yPrim = yPrim + h * yBis
  y = y + h * yPrim
  return y
}

const basicModel = async (y, dampening) => {
  await psleep(1)
  return y
}

const fullModel = async (y, dampening) => {
  await psleep(1)
  return y
}

const getNextY = async (y, dampening, model = 'simple') => {
  if (model === 'simple') {
    return await simpleModel(y, dampening)
  } else if (model === 'basic') {
    return await basicModel(y, dampening)
  } else if (model === 'full') {
    return await fullModel(y, dampening)
  }
}

export {
  getNextY
}
