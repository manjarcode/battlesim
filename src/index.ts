import Melee from './Attack/Melee.js'
import Fighter from './Fighter.js'
import Weapon  from './Weapon/Weapon.js'
import Sword from './Weapon/Sword.js'
import Claw from './Weapon/Claw.js'
import Defense from './Defense/Defense.js'
import Dodge from './Defense/Dodge.js'
import Group from './Group.js'
import Counter from './Defense/Counter.js'
import Battle from './Battle.js'

function createFighter (name: string, attackChance: number, weapon: Weapon, defence: Defense, health: number, initiative: number) {
  const attack = new Melee(attackChance, weapon )
  return new Fighter(name, attack, defence, health, initiative)
}

function createBeastTeam () {
  return new Group('Beast Team', [
    createFighter('The Beast', 50, new Claw(), new Counter(30), 50, 60)
  ])
}

function createPlayersTeam () {
  return new Group('Players Team', [
    createFighter('Addison', 40, new Sword(), new Dodge(60), 14, 50),
    createFighter('James Westmore', 45, new Sword(), new Dodge(40), 13, 70)
  ])
}

const battle = new Battle()
battle.simulate([createBeastTeam(), createPlayersTeam()])