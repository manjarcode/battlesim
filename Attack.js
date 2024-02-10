import Throw, {ThrowResult} from './Throw.js'

export default class Attack {
  #chance
  #weapon
  constructor({chance, weapon}) {
    this.#chance = chance
    this.#weapon = weapon
  }

  resolve(target) {
    //tirar dados
    const attackResult = Throw.dice(this.#chance)

    const isSuccessful = attackResult >= ThrowResult.EASY
   
    const canDefence = target.defend(attackResult)
    console.log(`attack result: ${attackResult} can be defended ${canDefence}`)
    if (isSuccessful && !canDefence) {
      this.#applyDamage(target)
    }
  }

  #applyDamage(target) {
    const damage = this.#weapon.getDamage()
    target.injure(damage)
  }
}