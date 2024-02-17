import { AssaultResult } from "../Attack/AssaultResult.js"
import Attack from "../Attack/Attack.js"
import Throw, { ThrowResult } from "../Throw.js"
import Defense from "./Defense.js"

export default class CounterOrDodgeDefense implements Defense {
    private skill: number;

    constructor(skill) {
        this.skill = skill;
    }

    canCounterAttack(): boolean {
        return true;
    }

    resolve(attack: Attack, attackResult: number): AssaultResult {
      //smells bad
      if (!attack.canBeDefended()) {
        return attackResult > ThrowResult.FAIL ? AssaultResult.ATTACKED : AssaultResult.DEFENDED
      }
      const canBeCountered = attack.canBeCountered()
      return canBeCountered ? this.resolveCounter(attackResult) : this.resolveDodge(attackResult)
    }

    private resolveCounter(attackResult: number): AssaultResult {
      const passiveResult = Throw.dice(this.skill)
      const canCounter = passiveResult > attackResult
  
      return canCounter ? AssaultResult.COUNTERED : AssaultResult.ATTACKED
    }

    private resolveDodge(attackResult: number): AssaultResult {
      const passiveResult = Throw.dice(this.skill)
      const canDefence = passiveResult >= attackResult
      
      return canDefence ? AssaultResult.DEFENDED : AssaultResult.ATTACKED
    }
}