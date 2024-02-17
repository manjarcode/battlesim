import { Dice } from "../Throw.js";
import Weapon from "./Weapon.js";

export default class Revolver implements Weapon {
  getDamage(): number {
    return Dice.d10()
  }
}