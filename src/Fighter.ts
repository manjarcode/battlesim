import Attack from './Attack/Attack.js'
import Defense from './Defense/Defense.js'
import { ThrowResult } from './Throw.js'

export default class Fighter {
  private name : string
  private attack: Attack
  private defense: Defense
  private health: number
  private initiative: number

  constructor(name: string, attack: Attack, defence: Defense, health: number, initiative: number) {
    this.name = name
    this.attack = attack
    this.defense = defence
    this.health = health
    this.initiative = initiative
  }

  attackTo(target) {
    console.log(`${this.name} attacked to ${target.getName()}`)
    this.attack.resolve(target)
  }

  defend(attackResult: ThrowResult): boolean {
    return this.defense.resolve(attackResult)
  }

  injure(damage) {
    this.health -= damage
    console.log(`Fighter ${this.name} was injured with ${damage}, current health: ${this.health}`)
  }

  isAlive() {
    return this.health > 0
  }
  
  getName() {
    return this.name
  }

  getInitiative() {
    return this.initiative
  }

  compareTo(fighter) {
    return this.initiative - fighter.getInitiative()
  }
} 
