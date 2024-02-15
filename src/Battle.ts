import Fighter from "./Fighter"
import Group from "./Group"

const ROUNT_LIMIT = 100

export default class Battle {
  private round: number
  private winner: Group | null

  constructor() {
    this.round = 0
    this.winner = null
  }

  simulate(firstGroup: Group, secondGroup: Group) {
    const groups = [firstGroup, secondGroup]
    const sorted = this.sort(groups)
  
  
    this.round = 1
    while (this.allAlive(firstGroup, secondGroup) && this.round < ROUNT_LIMIT) {
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

  getWinner() {
    return this.winner
  }
  
  private allAlive(firstGroup: Group, secondGroup: Group) {
    return firstGroup.isAlive() && secondGroup.isAlive()
  }

  private sort(groups: Group[]) {
    const figthers = groups.reduce((acc, group) => acc.concat(group.getFighters()), [] as Fighter[])
    return figthers.sort((a, b) => a.compareTo(b))
  }
  
  private pickRivalGroup(groups: Group[], current: Fighter) {
    return groups.find(g => g.getFighters().some(f => f !== current))
  }

  private findWinner(groups: Group[]) {
    const winner = groups.find(f => f.isAlive())
    if (winner) {
      console.log(`Winner is ${winner.getName()}`)
      this.winner = winner
    }

    if (this.round === ROUNT_LIMIT) {
      console.log('Tied game!')
    }
  }
}