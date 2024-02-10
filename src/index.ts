import Attack from './Attack.js'
import Fighter from './Fighter.js'
import Weapon  from './Weapon/Weapon.js'
import Sword from './Weapon/Sword.js'
import Claw from './Weapon/Claw.js'
import Defense from './Defense/Defense.js'
import Dodge from './Defense/Dodge.js'

function createFighter (name: string, attackChance: number, weapon: Weapon, defence: Defense, health: number, initiative: number) {
  const attack = new Attack(attackChance, weapon )
  return new Fighter(name, attack, defence, health, initiative)
}


const harlot = createFighter('The Harlot', 50, new Sword(), new Dodge(10), 50, 60)
const james = createFighter('James Westmore', 60, new Claw(), new Dodge(60), 14, 70)


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