export default class Fighter {
  #name
  #attack
  #defence
  #health
  #initiative
  constructor({name, attack, defence, health, initiative}) {
    this.#name = name
    this.#attack = attack
    this.#defence = defence
    this.#health = health
    this.#initiative = initiative
  }

  attackTo(target) {
    console.log(`${this.#name} attacked to ${target.getName()}`)
    this.#attack.resolve(target)
  }

  defend() {
    return this.#defence.resolve()
  }

  injure(damage) {
    this.#health -= damage
    console.log(`Fighter ${this.#name} was injured with ${damage}, current health: ${this.#health}`)
  }

  isAlive() {
    return this.#health > 0
  }
  
  getName() {
    return this.#name
  }

  getInitiative() {
    return this.#initiative
  }

  compareTo(fighter) {
    return this.#initiative - fighter.getInitiative()
  }
} 
