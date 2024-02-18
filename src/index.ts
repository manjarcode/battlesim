import Melee from './Attack/Melee.js';
import Fighter from './Fighter.js';
import Sword from './Weapon/Sword.js';
import Claw from './Weapon/Claw.js';
import type Defense from './Defense/Defense.js';
import AlwaysDodge from './Defense/AlwaysDodge.js';
import Group from './Group.js';
import CounterOrDodgeDefense from './Defense/CounterOrDodgeDefense.js';
import War from './War.js';
import Firearm from './Attack/Firearm.js';
import Revolver from './Weapon/Revolver.js';
import type Attack from './Attack/Attack.js';

function createRevolver(skill: number): Attack {
	return new Firearm(skill,
		new Revolver(),
	);
}

function createSword(skill: number): Attack {
	return new Melee(skill,
		new Sword(),
	);
}

function createClaw(skill: number): Attack {
	return new Melee(skill,
		new Claw(),
	);
}

// eslint-disable-next-line max-params
function createFighter(name: string, attack: Attack, defence: Defense, health: number, initiative: number) {
	return new Fighter(name, attack, defence, health, initiative);
}

function createBeastTeam() {
	return new Group('Beast Team', [
		createFighter('The Beast', createClaw(50), new CounterOrDodgeDefense(30), 200, 60),
	]);
}

function createPlayersTeam() {
	return new Group('Players Team', [
		createFighter('Addison Kleeman', createSword(40), new AlwaysDodge(60), 14, 50),
		createFighter('James Westmore', createSword(45), new AlwaysDodge(40), 13, 70),
		createFighter('Christopher Durban', createSword(45), new AlwaysDodge(30), 12, 30),
	]);
}

function createFirearmedPlayersTeam() {
	return new Group('Players Team', [
		createFighter('Addison Kleeman', createRevolver(60), new AlwaysDodge(60), 14, 50),
		createFighter('James Westmore', createRevolver(45), new AlwaysDodge(40), 13, 70),
		createFighter('Christopher Durban', createRevolver(30), new AlwaysDodge(30), 12, 30),
	]);
}

const war = new War(createBeastTeam, createFirearmedPlayersTeam);
const result = war.simulate(100);
console.log(result);
