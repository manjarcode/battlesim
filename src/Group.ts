import Fighter from './Fighter.js'

export default class Group {
  private name: string
  private fighters: Fighter[]

  constructor(name: string, fighters: Fighter[]) {
    this.name = name
    this.fighters = fighters
  }

  getFighters() {
    return this.fighters
  }

  getName() {
    return this.name
  }
  
  isAlive() {
    return this.fighters.some(fighter => fighter.isAlive())
  }
}