import Fighter from "../Fighter";

export default interface Attack {
  resolve(target: Fighter): void
}