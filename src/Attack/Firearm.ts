import type Fighter from '../Fighter.js';
import Throw from '../Throw.js';
import type Weapon from '../Weapon/Weapon.js';
import {type AssaultResult} from './AssaultResult.js';
import type Attack from './Attack.js';

export default class Firearm implements Attack {
	constructor(private readonly skill: number, private readonly weapon: Weapon) {}

	canBeDefended(): boolean {
		return false;
	}

	canBeCountered(): boolean {
		return false;
	}

	resolve(target: Fighter): AssaultResult {
		const attackResult = Throw.dice(this.skill);
		return target.defend(this, attackResult);
	}

	// Smells bad, does weapon really need to be passed to this interface?
	applyDamage(target: Fighter): void {
		const damage = this.weapon.getDamage();
		target.injure(damage);
	}
}
