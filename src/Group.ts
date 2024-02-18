import type Fighter from './Fighter.js'

export default class Group {
  constructor(private readonly name: string, private readonly fighters: Fighter[]) {}

  getFighters(): Fighter[] {
    return this.fighters
  }

  getName(): string {
    return this.name
  }

  isAlive(): boolean {
    return this.fighters.some(fighter => fighter.isAlive())
  }
}
