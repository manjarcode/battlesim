import { Dice } from "../Throw.js";
import Weapon  from "./Weapon.js";

export default class Claw implements Weapon {
  getDamage(): number {
    return Dice.d6()
  }
}