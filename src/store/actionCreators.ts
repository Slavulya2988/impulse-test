import { STEP } from './type';
import { SET_STEP, SET_PRIZE } from './actionTypes';

export function setStep(newStep: STEP) {
  return {
    type: SET_STEP,
    payload: newStep,
  };
}

export function setPrize(prize: string) {
  return {
    type: SET_PRIZE,
    payload: prize,
  };
}
