import Battle from "./Battle.js"
import Group from "./Group.js"

export default class War {

  private firstGroupFactory: Function
  private secondGroupFactory: Function
  private winners: any

  constructor(firstGroupFactory: Function , secondGroupFactory: Function) {
    this.firstGroupFactory = firstGroupFactory
    this.secondGroupFactory = secondGroupFactory
    this.winners = {}
  }

  assault(): Group | null {
    const firstGroup = this.firstGroupFactory()
    const secondGroup = this.secondGroupFactory()

    const battle = new Battle()
    battle.simulate(firstGroup, secondGroup)
    return battle.getWinner()
  }

  simulate(rounds): void{
    for (let i = 0; i < rounds; i++)
    {
      const winner = this.assault()
      if (winner)
      {
        this.applyWinner(winner)
      }
    }

    console.log(this.winners)
  }

  applyWinner(winner: Group): void {
    const name = winner.getName()
    if (this.winners[name])
    {
      this.winners[name]++
    }
    else
    {
      this.winners[name] = 1
    }
  }
}