import {AssaultResult} from '../Attack/AssaultResult.js'
import type Attack from '../Attack/Attack.js'
import Throw, {ThrowResult} from '../Throw.js'
import type Defense from './Defense.js'

export default class CounterOrDodgeDefense implements Defense {
  constructor(private readonly skill: number) {}

  canCounterAttack(): boolean {
    return true
  }

  resolve(attack: Attack, attackResult: ThrowResult): AssaultResult {
    // Smells bad
    if (!attack.canBeDefended()) {
      return attackResult > ThrowResult.FAIL ? AssaultResult.ATTACKED : AssaultResult.DEFENDED
    }

    const canBeCountered = attack.canBeCountered()
    return canBeCountered ? this.resolveCounter(attackResult) : this.resolveDodge(attackResult)
  }

  private resolveCounter(attackResult: ThrowResult): AssaultResult {
    const passiveResult = Throw.dice(this.skill)
    const canCounter = passiveResult > attackResult

    return canCounter ? AssaultResult.COUNTERED : AssaultResult.ATTACKED
  }

  private resolveDodge(attackResult: ThrowResult): AssaultResult {
    const passiveResult = Throw.dice(this.skill)
    const canDefence = passiveResult >= attackResult

    return canDefence ? AssaultResult.DEFENDED : AssaultResult.ATTACKED
  }
}
