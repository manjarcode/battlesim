export default class Throw {

  static dice(skill: number): ThrowResult {
    const easy = skill
    const medium = Math.floor(skill / 2)
    const hard  = Math.floor(skill / 5)

    const value = Dice.roll()
    
    if (value <= hard) {
      return ThrowResult.HARD
    } else if (value <= medium) {
      return ThrowResult.MEDIUM
    } else if (value <= easy) {
      return ThrowResult.EASY
    }

    return ThrowResult.FAIL
  }  
}

export enum ThrowResult {
  HARD= 3,
  MEDIUM= 2,
  EASY=1,
  FAIL=0
}

export class Dice {
  static roll(): number {
    return Math.round(Math.random()*100)
  }
  
  static customDice(sides: number): number {
    return Math.round(Math.random()*sides)
  }

  static d4(): number {
    return this.customDice(4)
  }

  static d6(): number {
    return this.customDice(6)
  }

  static d8(): number {
    return this.customDice(8)
  }

  static d10(): number {
    return this.customDice(10)
  }

  static d12(): number {
    return this.customDice(12)
  }
}