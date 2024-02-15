import Fighter from '../Fighter.js'
import Throw, {ThrowResult} from '../Throw.js'
import Weapon from '../Weapon/Weapon.js'
import { AssaultResult } from './AssaultResult.js'
import Attack from './Attack.js'

export default class Melee implements Attack {
  private chance: number
  private weapon: Weapon
  constructor(chance: number, weapon) {
    this.chance = chance
    this.weapon = weapon
  }

  resolve(target: Fighter): AssaultResult{
    const attackResult = Throw.dice(this.chance)
    
    return target.defend(this, attackResult)
  }

  applyDamage(target): void {
    const damage = this.weapon.getDamage()
    target.injure(damage)
  }

  canBeCountered(): boolean {
    return true
  }
}

