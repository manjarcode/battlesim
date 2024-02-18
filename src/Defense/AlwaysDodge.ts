import {AssaultResult} from '../Attack/AssaultResult.js';
import type Attack from '../Attack/Attack.js';
import Throw, {ThrowResult} from '../Throw.js';
import type Defense from './Defense.js';

export default class AlwaysDodge implements Defense {
	constructor(private readonly skill: number) {}

	canCounterAttack(): boolean {
		return false;
	}

	resolve(attack: Attack, attackResult: ThrowResult): AssaultResult {
		// Smells bad
		if (!attack.canBeDefended()) {
			return attackResult > ThrowResult.FAIL ? AssaultResult.ATTACKED : AssaultResult.DEFENDED;
		}

		const passiveResult = Throw.dice(this.skill);
		const canDefence = passiveResult >= attackResult;

		return canDefence
			? AssaultResult.DEFENDED
			: AssaultResult.ATTACKED;
	}
}
