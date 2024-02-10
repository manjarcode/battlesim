import Fighter from '../Fighter.js'
import Throw, {ThrowResult} from '../Throw.js'
import Weapon from '../Weapon/Weapon.js'
import Attack from './Attack.js'

export default class Melee implements Attack {
  private chance: number
  private weapon: Weapon
  constructor(chance: number, weapon) {
    this.chance = chance
    this.weapon = weapon
  }

  resolve(target: Fighter): void{
    //tirar dados
    const attackResult = Throw.dice(this.chance)

    const isSuccessful = attackResult >= ThrowResult.EASY
   
    const canDefence = target.defend(attackResult)
    console.log(`attack result: ${attackResult} can be defended? ${canDefence}`)
    if (isSuccessful && !canDefence) {
      this.applyDamage(target)
    }
  }

  private applyDamage(target): void {
    const damage = this.weapon.getDamage()
    target.injure(damage)
  }
}

