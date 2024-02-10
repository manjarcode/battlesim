import Throw from './Throw.js'

export default class Dogde {
  #chance 
  constructor({chance}) {
      this.#chance = chance
  }

  resolve(attackResult) {
    const passiveResult = Throw.dice(this.#chance)
    const canDefence = passiveResult >= attackResult
    return canDefence
  }
}