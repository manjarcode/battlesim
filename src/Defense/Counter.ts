import { AssaultResult } from '../Attack/AssaultResult.js'
import Throw, { ThrowResult } from '../Throw.js'
import Defense from './Defense.js'

export default class Counter implements Defense {
  private chance : number
  
  constructor(chance) {
      this.chance = chance
  }

  canCounterAttack(): boolean {
    return true
  }

  resolve(attackResult: ThrowResult): AssaultResult {
    const passiveResult = Throw.dice(this.chance)
    const canCounter = passiveResult > attackResult

    return canCounter ? AssaultResult.COUNTERED : AssaultResult.ATTACKED
  }
}