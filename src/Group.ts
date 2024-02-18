import type Fighter from './Fighter.js';

export default class Group {
	constructor(private readonly name: string, private readonly fighters: Fighter[]) {}

	getFighters() {
		return this.fighters;
	}

	getName() {
		return this.name;
	}

	isAlive() {
		return this.fighters.some(fighter => fighter.isAlive());
	}
}
