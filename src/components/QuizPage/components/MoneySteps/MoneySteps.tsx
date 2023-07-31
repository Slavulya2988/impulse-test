import React, { ReactElement } from 'react';
import './style.css';

interface MoneyStepsProps {
  moneyStepsData: string[],
  currentQuestionId: number;
}

function MoneySteps({ moneyStepsData, currentQuestionId }:MoneyStepsProps):ReactElement {
  return (
    <div className="steps">
      {moneyStepsData.map((moneyStep:string, id) => (
        <div className={`step ${id === currentQuestionId && 'active'} ${id < currentQuestionId && 'disabled'}`} key={moneyStep}>
          <h5 className="answerText">
            {moneyStep}
          </h5>
        </div>
      ))}
    </div>
  );
}

export default MoneySteps;
