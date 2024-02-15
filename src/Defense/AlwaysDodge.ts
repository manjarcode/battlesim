import { AssaultResult } from '../Attack/AssaultResult.js'
import Attack from '../Attack/Attack.js'
import Throw, { ThrowResult } from '../Throw.js'
import Defense from './Defense.js'

export default class AlwaysDodge implements Defense {
  private chance : number

  constructor(chance) {
      this.chance = chance
  }

  canCounterAttack(): boolean {
    return false
  }

  resolve(attack: Attack, attackResult: ThrowResult): AssaultResult {
    const passiveResult = Throw.dice(this.chance)
    const canDefence = passiveResult >= attackResult
    
    return canDefence ? 
      AssaultResult.DEFENDED : 
      AssaultResult.ATTACKED
  }
}