import {type AssaultResult} from '../Attack/AssaultResult.js'
import type Attack from '../Attack/Attack.js'
import {type ThrowResult} from '../Throw.js'

interface Defense {
  resolve: (attack: Attack, attackResult: ThrowResult)=> AssaultResult

  canCounterAttack: ()=> boolean
}
export default Defense
