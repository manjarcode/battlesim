import Melee from './Attack/Melee.js'
import Fighter from './Fighter.js'
import Weapon  from './Weapon/Weapon.js'
import Sword from './Weapon/Sword.js'
import Claw from './Weapon/Claw.js'
import Defense from './Defense/Defense.js'
import Dodge from './Defense/Dodge.js'
import Group from './Group.js'
import Counter from './Defense/Counter.js'

function createFighter (name: string, attackChance: number, weapon: Weapon, defence: Defense, health: number, initiative: number) {
  const attack = new Melee(attackChance, weapon )
  return new Fighter(name, attack, defence, health, initiative)
}

const beastTeam = new Group('Beast Team', [
  createFighter('The Beast', 50, new Claw(), new Counter(30), 50, 60)
])

const playersTeam = new Group('Players Team', [
  createFighter('Addison', 40, new Sword(), new Dodge(60), 14, 50),
  createFighter('James Westmore', 45, new Sword(), new Dodge(40), 13, 70)
])

function sort(groups: Group[]) {
  const figthers = groups.reduce((acc, group) => acc.concat(group.getFighters()), [] as Fighter[])
  return figthers.sort((a, b) => a.compareTo(b))
}

function pickOtherGroup(groups: Group[], current: Fighter) {
  return groups.find(g => g.getFighters().some(f => f !== current))
}

function simulate(groups: Group[]) {
  const sorted = sort(groups)

  const allAlive = () => groups.every(g => g.isAlive())

  const ROUNT_LIMIT = 100

  let round = 1
  while (allAlive() && round < ROUNT_LIMIT) {
    console.log(`Round ${round}`)
    sorted.forEach(fighter => {
      if (fighter.isAlive()) {
        const rivalGroup = pickOtherGroup(groups, fighter)
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

simulate([beastTeam, playersTeam])