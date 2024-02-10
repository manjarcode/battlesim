import Attack from './Attack.js'
import Dogde from './Defense.js'
import Fighter from './Fighter.js'
import Weapon from './Weapon.js'


function createFighter ({name, attackChance, dodgeChance, health}) {
  const weapon = new Weapon()
  const attack = new Attack({chance: attackChance, weapon })
  const defence = new Dogde({chance: dodgeChance})
  return new Fighter({name, attack, defence, health })
}


const harlot = createFighter({name: 'The Harlot', attackChance: 50, dodgeChance: 10, health: 50})
const james = createFighter({name: 'James Westmore', attackChance: 60, dodgeChance: 30, health: 14})


function sort(figthers) {
  return figthers.sort((a, b) => a.compareTo(b))
}

function simulate(fighters) {
  const sorted = sort(fighters)

  const allAlive = () => !sorted.find(f => !f.isAlive())

  const ROUNT_LIMIT = 100

  let round = 1
  while (allAlive() && round < ROUNT_LIMIT) {

    console.log(`Round ${round}`)
    sorted.forEach(f => {
      if (f.isAlive()) {
        const target = sorted.find(t => t.isAlive() && t !== f)
        if (target) {
          f.attackTo(target)
        }
      }
    })
    round++
  }

  const winner = sorted.find(f => f.isAlive())
  console.log(`Winner is ${winner.getName()}`)
  console.log('End of the game')
}

simulate([harlot, james])