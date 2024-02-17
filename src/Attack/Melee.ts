import Fighter from '../Fighter.js'
import Throw, {ThrowResult} from '../Throw.js'
import Weapon from '../Weapon/Weapon.js'
import { AssaultResult } from './AssaultResult.js'
import Attack from './Attack.js'

export default class Melee implements Attack {
  private skill: number
  private weapon: Weapon
  constructor(skill: number, weapon) {
    this.skill = skill
    this.weapon = weapon
  }
  canBeDefended(): boolean {
    return true
  }

  canBeCountered(): boolean {
    return true
  }

  resolve(target: Fighter): AssaultResult{
    const attackResult = Throw.dice(this.skill)
    
    return target.defend(this, attackResult)
  }

  applyDamage(target): void {
    const damage = this.weapon.getDamage()
    target.injure(damage)
  }


}

