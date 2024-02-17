import Fighter from "../Fighter";
import { AssaultResult } from "./AssaultResult";

export default interface Attack {
  resolve(target: Fighter): AssaultResult
  
  applyDamage(target): void

  canBeCountered(): boolean

  canBeDefended(): boolean
}