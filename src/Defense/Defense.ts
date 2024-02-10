import Throw, { ThrowResult } from '../Throw.js'

export default interface Defense {
  resolve(attackResult: ThrowResult): boolean
}