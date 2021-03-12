import psleep from 'psleep'
import { Matrix } from 'ml-matrix'

const g = 9.82
const m1 = 1500 // car mass
const b = 2400 // damper
const k = 34125 // spring
const Lv = 2.5 // left length from center of mass
const Lh = 2.5 // right length from center of mass
const Jcm = 4000 // moment of inertia

// State space
// x = Ax + Bu
// y = Cx + Du

const A = new Matrix([
  [0, -k * Lv, -k, 0],
  [Lv / Jcm, ((-Lv ^ 2 - Lh ^ 2) * b) / Jcm, (-(Lv - Lh) * b) / Jcm, -Lh / Jcm],
  [1 / m1, (-b * Lv + b * Lh) / m1, -2 * b / m1, 1 / m1],
  [0, k * Lh, -k, 0]
])

const B = new Matrix([
  [k, 0, 0],
  [(Lv * b) / Jcm, (Lh * b) / Jcm, 0],
  [b / m1, b / m1, 1 / m1],
  [0, k, 0]
])

const U = new Matrix([
  [0],
  [0],
  [m1 * g]
])

// Initial conditions and setup
const h = 0.01 // step size

const fullModel = async (lastX, dampening) => {
  if (!lastX) {
    lastX = new Matrix([
      [0],
      [0],
      [0],
      [0]
    ])
  }

  // xdot = A * lastX + B * U
  const xdot = A.mmul(lastX.add(B.mmul(U)))

  // Free fall (only if in the air)
  xdot.set(1, 0, 0)
  xdot.set(2, 0, U.get(2, 0) / m1)

  // x = lastX + xdot * h
  const x = lastX.add(Matrix.mul(xdot, h))

  // OLD INCORRECT THINGS?
  // U_(1) = g*h+U_(1);
  //   U.set(0, 0, -g * 0.1 * h + U.get(0, 0))

  // U_(2) = g*h+U_(2);
  //   U.set(1, 0, -g * 0.1 * h + U.get(1, 0))

  await psleep(1)
  return x
}

let storedX = new Matrix([[0], [0], [0], [0]])

const getNextY = async (y, dampening, model = 'simple') => {
  storedX = await fullModel(storedX)

  console.log(storedX.get(3, 0) / k)
  return storedX.get(3, 0) / k
}

export {
  getNextY
}
