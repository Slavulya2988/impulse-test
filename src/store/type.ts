export enum STEP {
  Start,
  InProcess,
  End,
}

export type Prize = string | null;

export type GameState = {
  currentStep: STEP,
  prize: Prize,
};

export type GameAction = {
  type: string,
  payload: any,
};

export type DispatchType = (args: GameAction) => GameAction;
