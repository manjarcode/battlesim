import {AssaultResult} from './Attack/AssaultResult.js'
import type Attack from './Attack/Attack.js'
import type Defense from './Defense/Defense.js'
import type Group from './Group.js'
import {type ThrowResult} from './Throw.js'

export default class Fighter {
  // eslint-disable-next-line max-params
  constructor(
    private readonly name: string,
    private readonly attack: Attack,
    private readonly defense: Defense,
    private health: number,
    private readonly initiative: number) {}

  attackOneOf(group: Group): void {
    const fighters = group.getFighters()
    const target = fighters[Math.floor(Math.random() * fighters.length)]
    this.attackTo(target)
  }

  attackTo(target: Fighter): void {
    console.log(`${this.name} attacked to ${target.getName()}`)
    const assaultResult = this.attack.resolve(target)

    if (assaultResult === AssaultResult.DEFENDED) {
      console.log(`  ${target.getName()} blocked the attack`)
    }

    if (assaultResult === AssaultResult.ATTACKED) {
      console.log(`  ${target.getName()} was attacked`)
      this.applyDamage(target)
    }

    if (assaultResult === AssaultResult.COUNTERED) {
      console.log(`  ${target.getName()} counter attacked`)
      target.applyDamage(this)
    }
  }

  defend(attack: Attack, attackResult: ThrowResult): AssaultResult {
    return this.defense.resolve(attack, attackResult)
  }

  applyDamage(target: Fighter): void {
    this.attack.applyDamage(target)
  }

  injure(damage: number): void {
    this.health -= damage
    console.log(`    ${this.name} was injured with ${damage}, current health: ${this.health}`)
  }

  canCounterAttack(): boolean {
    return this.defense.canCounterAttack()
  }

  isAlive(): boolean {
    return this.health > 0
  }

  getName(): string {
    return this.name
  }

  getInitiative(): number {
    return this.initiative
  }

  compareTo(fighter: Fighter): number {
    return this.initiative - fighter.getInitiative()
  }
}
