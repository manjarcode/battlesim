import Fighter from "./Fighter"
import Group from "./Group"

export default class Battle {
  simulate(groups: Group[]) {
    const sorted = this.sort(groups)
  
    const ROUNT_LIMIT = 100
  
    let round = 1
    while (this.allAlive(groups) && round < ROUNT_LIMIT) {
      console.log(`Round ${round}`)
      sorted.forEach(fighter => {
        if (fighter.isAlive()) {
          const rivalGroup = this.pickRivalGroup(groups, fighter)
          fighter.attackOneOf(rivalGroup)
        }
      })
      console.log('\n')
      round++
    }
  
    const winner = groups.find(f => f.isAlive())
  
    if (winner) {
      console.log(`Winner is ${winner.getName()}`)
    }
  
    if (round === ROUNT_LIMIT) {
        console.log('Tied game!')
    }
    console.log('End of the game')
  }

  private allAlive(groups: Group[]) {
    return groups.every(g => g.isAlive())
  }

  private sort(groups: Group[]) {
    const figthers = groups.reduce((acc, group) => acc.concat(group.getFighters()), [] as Fighter[])
    return figthers.sort((a, b) => a.compareTo(b))
  }
  
  private pickRivalGroup(groups: Group[], current: Fighter) {
    return groups.find(g => g.getFighters().some(f => f !== current))
  }
}