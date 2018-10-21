
import camelcase from 'camelcase'

const message = 'this is a simulating something that takes a long time to compute!'

const simulatedHeavyComputation = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const msg = camelcase(message)
      resolve(msg)
    }, 500)
  })
}

const heavyComputation = simulatedHeavyComputation()

export { heavyComputation }
