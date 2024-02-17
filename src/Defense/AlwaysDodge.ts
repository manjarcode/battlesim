import { AssaultResult } from '../Attack/AssaultResult.js'
import Attack from '../Attack/Attack.js'
import Throw, { ThrowResult } from '../Throw.js'
import Defense from './Defense.js'

export default class AlwaysDodge implements Defense {
  private skill : number

  constructor(skill) {
      this.skill = skill
  }

  canCounterAttack(): boolean {
    return false
  }

  resolve(attack: Attack, attackResult: ThrowResult): AssaultResult {
    //smells bad
    if (!attack.canBeDefended()) {
      return attackResult > ThrowResult.FAIL ? AssaultResult.ATTACKED : AssaultResult.DEFENDED
    }

    const passiveResult = Throw.dice(this.skill)
    const canDefence = passiveResult >= attackResult
    
    return canDefence ? 
      AssaultResult.DEFENDED : 
      AssaultResult.ATTACKED
  }
}