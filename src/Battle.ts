import type Fighter from './Fighter'
import type Group from './Group'

const roundLimit = 100

export default class Battle {
  private round: number
  private winner: Group

  constructor() {
    this.round = 0
  }

  simulate(firstGroup: Group, secondGroup: Group): void {
    const groups = [firstGroup, secondGroup]
    const sorted = this.sort(groups)

    this.round = 1
    while (this.allAlive(firstGroup, secondGroup) && this.round < roundLimit) {
      console.log(`Round ${this.round}`)
      sorted.forEach(fighter => {
        if (fighter.isAlive()) {
          const rivalGroup = this.pickRivalGroup(groups, fighter)
          fighter.attackOneOf(rivalGroup)
        }
      })
      console.log('\n')
      this.round++
    }

    this.findWinner(groups)

    console.log('End of the battle')
  }

  getWinner(): Group {
    return this.winner
  }

  private allAlive(firstGroup: Group, secondGroup: Group): boolean {
    return firstGroup.isAlive() && secondGroup.isAlive()
  }

  private sort(groups: Group[]): Fighter[] {
    const figthers = groups.reduce<Fighter[]>((acc, group) => acc.concat(group.getFighters()), [])
    return figthers.sort((a, b) => a.compareTo(b))
  }

  private pickRivalGroup(groups: Group[], current: Fighter): Group {
    const rival = groups.find(g => g.getFighters().some(f => f !== current))

    if (rival == null) {
      throw new Error('Rival group not found')
    }

    return rival
  }

  private findWinner(groups: Group[]): void {
    const winner = groups.find(f => f.isAlive())
    if (winner != null) {
      console.log(`Winner is ${winner.getName()}`)
      this.winner = winner
    }

    if (this.round === roundLimit) {
      console.log('Tied game!')
    }
  }
}
