import Melee from './Attack/Melee.js'
import Fighter from './Fighter.js'
import Weapon  from './Weapon/Weapon.js'
import Sword from './Weapon/Sword.js'
import Claw from './Weapon/Claw.js'
import Defense from './Defense/Defense.js'
import AlwaysDodge from './Defense/AlwaysDodge.js'
import Group from './Group.js'
import CounterOrDodgeDefense from './Defense/CounterOrDodgeDefense.js'
import War from './War.js'

function createFighter (name: string, attackChance: number, weapon: Weapon, defence: Defense, health: number, initiative: number) {
  const attack = new Melee(attackChance, weapon )
  return new Fighter(name, attack, defence, health, initiative)
}

function createBeastTeam () {
  return new Group('Beast Team', [
    createFighter('The Beast', 50, new Claw(), new CounterOrDodgeDefense(30), 50, 60)
  ])
}

function createPlayersTeam () {
  return new Group('Players Team', [
    createFighter('Addison Kleeman', 40, new Sword(), new AlwaysDodge(60), 14, 50),
    createFighter('James Westmore', 45, new Sword(), new AlwaysDodge(40), 13, 70),
    createFighter('Christopher Durban', 45, new Sword(), new AlwaysDodge(30), 12, 30)
  ])
}

const war = new War(createBeastTeam, createPlayersTeam)
war.simulate(1000)