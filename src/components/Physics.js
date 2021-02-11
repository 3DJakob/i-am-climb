const m2 = 3
const g = 9.82
const m1 = 50
// const b = 1 // replaced by dampening
const k = 10

const h = 0.1 // step size
const uPrim = g * m1

let yBis = 0
let yPrim = 0

const getNextY = (y, dampening) => {
  yBis = (1 / m1) * (-0.1 * uPrim - dampening * yPrim - y)
  yPrim = yPrim + h * yBis
  y = y + h * yPrim
  return y
}

export {
  getNextY
}
