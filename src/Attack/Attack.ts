import type Fighter from '../Fighter';
import {type AssaultResult} from './AssaultResult';

type Attack = {
	resolve(target: Fighter): AssaultResult;

	applyDamage(target): void;

	canBeCountered(): boolean;

	canBeDefended(): boolean;
};
export default Attack;
