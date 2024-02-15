import { AssaultResult } from '../Attack/AssaultResult.js'
import Attack from '../Attack/Attack.js'
import Throw, { ThrowResult } from '../Throw.js'

export default interface Defense {
  resolve(attack: Attack, attackResult: ThrowResult): AssaultResult

  canCounterAttack(): boolean
}