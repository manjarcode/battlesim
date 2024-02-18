import Battle from './Battle.js'
import type Group from './Group.js'

export default class War {
  private winners: Record<string, number>

  constructor(
    private readonly firstGroupFactory: ()=> Group,
    private readonly secondGroupFactory: ()=> Group) {
    this.winners = {}
  }

  simulate(rounds): Record<string, string> {
    for (let i = 0; i < rounds; i++) {
      const winner = this.assault()
      if (winner != null) {
        this.applyWinner(winner)
      }
    }

    return this.getWinners()
  }

  assault(): Group | undefined {
    const firstGroup = this.firstGroupFactory()
    const secondGroup = this.secondGroupFactory()

    const battle = new Battle()
    battle.simulate(firstGroup, secondGroup)
    return battle.getWinner()
  }

  applyWinner(winner: Group): void {
    const name = winner.getName()
    if (this.winners[name] != null) {
      this.winners[name]++
    } else {
      this.winners[name] = 1
    }
  }

  getWinners(): Record<string, string> {
    const record: Record<string, string> = {}
    const battlesPerTeam = Object.values(this.winners)
    const untiedBattles = battlesPerTeam.reduce((acc: number, val: number) => acc + val, 0)

    for (const team in this.winners) {
      if (Object.hasOwn(this.winners, team)) {
        const value = `${Math.round(this.winners[team] / untiedBattles * 100)}%`
        record[team] = value
      }
    }

    return record
  }
}
