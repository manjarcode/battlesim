import { AssaultResult } from './Attack/AssaultResult.js'
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

  attackOneOf(group) {
    const fighters = group.getFighters()
    const target = fighters[Math.floor(Math.random() * fighters.length)]
    this.attackTo(target)
  }

  attackTo(target) {
    console.log(`${this.name} attacked to ${target.getName()}`)
    const assaultResult = this.attack.resolve(target)

    if(assaultResult === AssaultResult.DEFENDED) {
      console.log(`${target.getName()} defended the attack`)
    }

    if (assaultResult === AssaultResult.ATTACKED) {
      console.log(`${target.getName()} was attacked`)
      this.attack.applyDamage(target)
    }

    if (assaultResult === AssaultResult.COUNTERED) {
      console.log(`${target.getName()} counter attacked`)
      target.applyDamage(this)
    }
  }

  defend(attackResult: ThrowResult): AssaultResult {
    return this.defense.resolve(attackResult)
  }

  applyDamage(target): void {
    const damage = this.attack.applyDamage(target)
    target.injure(damage)
  }

  injure(damage) {
    this.health -= damage
    console.log(` => ${this.name} was injured with ${damage}, current health: ${this.health}`)
  }

  canCounterAttack() : boolean {
    return this.defense.canCounterAttack()
  }

  isAlive() : boolean {
    return this.health > 0
  }
  
  getName() : string {
    return this.name
  }

  getInitiative() : number {
    return this.initiative
  }

  compareTo(fighter) : number {
    return this.initiative - fighter.getInitiative()
  }
} 
