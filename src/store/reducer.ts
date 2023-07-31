import { GameState, STEP, GameAction } from './type';
import { SET_STEP, SET_PRIZE } from './actionTypes';

const initialState: GameState = {
  currentStep: STEP.Start,
  prize: null,
};

const reducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: GameState = initialState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    case SET_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };
    case SET_PRIZE:
      return {
        ...state,
        prize: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
