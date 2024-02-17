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

  simulate(rounds): void{
    for (let i = 0; i < rounds; i++)
    {
      const winner = this.assault()
      if (winner)
      {
        this.applyWinner(winner)
      }
    }

    return this.getWinners()
  }

  assault(): Group | null {
    const firstGroup = this.firstGroupFactory()
    const secondGroup = this.secondGroupFactory()

    const battle = new Battle()
    battle.simulate(firstGroup, secondGroup)
    return battle.getWinner()
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

  getWinners(): any {
    const copy = Object.assign({}, this.winners)
    const battlesPerTeam = Object.values(copy) as number[]
    const untiedBattles = battlesPerTeam.reduce((acc: number, val:number) => acc + val, 0)

    for (let team in copy)
    {
      copy[team] = `${Math.round(copy[team] / untiedBattles * 100)}%`
    }

    return copy
  }
}