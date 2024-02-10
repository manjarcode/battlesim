export default class Throw {

  static dice(chance) {
    const easy = chance
    const medium = Math.floor(chance / 2)
    const hard  = Math.floor(chance / 5)

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

export const ThrowResult = {
  HARD: 3,
  MEDIUM: 2,
  EASY: 1,
  FAIL: 0
}

class Dice {
  static roll() {
    return Math.round(Math.random()*100)
  }
}