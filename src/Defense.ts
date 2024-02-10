import Throw, { ThrowResult } from './Throw.js'

export default class Dodge {
  private chance : number
  constructor(chance) {
      this.chance = chance
  }

  resolve(attackResult: ThrowResult): boolean {
    const passiveResult = Throw.dice(this.chance)
    const canDefence = passiveResult >= attackResult
    return canDefence
  }
}