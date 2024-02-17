import Fighter from "../Fighter.js"
import Throw from "../Throw.js"
import {AssaultResult} from "./AssaultResult.js"
import Attack from "./Attack.js"

export default class Firearm implements Attack {
  private skill: number
  private weapon: any

  constructor(skill: number, weapon: any) {
    this.skill = skill
    this.weapon = weapon
  }
  canBeDefended(): boolean {
    return false
  }

  canBeCountered(): boolean {
    return false
  }

  resolve(target: Fighter): AssaultResult {
    const attackResult = Throw.dice(this.skill)
    return target.defend(this, attackResult)
  }

  //Smells bad, does weapon really need to be passed to this interface?
  applyDamage(target: any): void {    
    const damage = this.weapon.getDamage()
    target.injure(damage)
  }


}