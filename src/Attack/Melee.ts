import type Fighter from '../Fighter.js';
import Throw from '../Throw.js';
import type Weapon from '../Weapon/Weapon.js';
import {type AssaultResult} from './AssaultResult.js';
import type Attack from './Attack.js';

export default class Melee implements Attack {
	constructor(private readonly skill: number, private readonly weapon: Weapon) {
		this.skill = skill;
		this.weapon = weapon;
	}

	canBeDefended(): boolean {
		return true;
	}

	canBeCountered(): boolean {
		return true;
	}

	resolve(target: Fighter): AssaultResult {
		const attackResult = Throw.dice(this.skill);

		return target.defend(this, attackResult);
	}

	applyDamage(target: Fighter): void {
		const damage = this.weapon.getDamage();
		target.injure(damage);
	}
}

