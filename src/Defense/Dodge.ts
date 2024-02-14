import { AssaultResult } from '../Attack/AssaultResult.js'
import Throw, { ThrowResult } from '../Throw.js'
import Defense from './Defense.js'

export default class Dodge implements Defense {
  private chance : number

  constructor(chance) {
      this.chance = chance
  }

  canCounterAttack(): boolean {
    return false
  }

  resolve(attackResult: ThrowResult): AssaultResult {
    const passiveResult = Throw.dice(this.chance)
    const canDefence = passiveResult >= attackResult
    
    return canDefence ? 
      AssaultResult.DEFENDED : 
      AssaultResult.ATTACKED
  }
}