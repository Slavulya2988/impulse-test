import React, { ReactElement } from 'react';
import './style.css';
import MoneySteps from '../MoneySteps/MoneySteps';

interface BurgerProps {
  moneyStepsData: string[],
  currentQuestionId: number;
}

function Burger({ moneyStepsData, currentQuestionId }:BurgerProps):ReactElement {
  const [isChecked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!isChecked);
  };

  return (
    <>
      <input className="checkbox" type="checkbox" name="" id="" checked={isChecked} onChange={handleChange} />
      <div className="hamburgerLines">
        <span className="line line1" />
        <span className="line line2" />
        <span className="line line3" />
      </div>
      {isChecked
      && (
      <div className="menu">
        <div className="menuContent">

          <MoneySteps moneyStepsData={moneyStepsData} currentQuestionId={currentQuestionId} />
        </div>

      </div>
      )}

    </>

  );
}

export default Burger;
