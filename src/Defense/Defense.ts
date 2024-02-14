import { AssaultResult } from '../Attack/AssaultResult.js'
import Throw, { ThrowResult } from '../Throw.js'

export default interface Defense {
  resolve(attackResult: ThrowResult): AssaultResult

  canCounterAttack(): boolean
}