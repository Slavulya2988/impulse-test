import React, { ReactElement } from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';
import hand from './hand.svg';
import {
  STEP, GameAction, GameState, Prize,
} from '../../store/type';
import { setStep } from '../../store/actionCreators';

interface LobbyPageProps {
  currentStep: STEP;
}

function LobbyPage({ currentStep }:LobbyPageProps):ReactElement {
  const isCurrentStepStart = currentStep === STEP.Start;

  const dispatch: Dispatch<GameAction> = useDispatch();

  const handleOnClickStart = () => {
    dispatch(setStep(STEP.InProcess));
  };

  const handleOnClickTryAgain = () => {
    dispatch(setStep(STEP.Start));
  };

  const prize: Prize = useSelector(
    (state: GameState) => state.prize,
  );

  return (
    <div className={`page ${isCurrentStepStart && 'gradient'}`}>
      <div className="content">
        <div className="contentLeftPart">
          <img src={hand} alt="Hand with starts" className="image" />
        </div>
        <div className="contentRightPart">
          {isCurrentStepStart ? <h1 className="mainText">Who wants to be a millionaire?</h1>
            : (
              <>
                <h3 className="subText">Total score:</h3>
                <h1 className="mainText">{`${prize} earned`}</h1>
              </>
            )}
          {isCurrentStepStart && <button className="button" type="button" onClick={handleOnClickStart}><h5 className="buttonText">Start</h5></button>}
          {!isCurrentStepStart && <button className="button" type="button" onClick={handleOnClickTryAgain}><h5 className="buttonText">Try again</h5></button>}
        </div>
      </div>
    </div>
  );
}

export default LobbyPage;
