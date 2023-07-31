import React, {
  ReactElement, useState, useRef, useEffect,
} from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import Burger from './components/Burger/Burger';
import MoneySteps from './components/MoneySteps/MoneySteps';
import { Question } from '../../types';
import { STEP, GameAction } from '../../store/type';
import { setPrize, setStep } from '../../store/actionCreators';

import './style.css';

// todo: improve current implementation
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

interface QuizPageProps {
  questions: Question[];
  moneyStepsData: string[];
}

function QuizPage({ questions, moneyStepsData }:QuizPageProps):ReactElement {
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [chosenOption, setChosenOption] = useState<string | null>(null);
  const [isCorrectOption, setIsCorrectOption] = useState(false);

  const timerRef = useRef<any>(null);

  const dispatch: Dispatch<GameAction> = useDispatch();

  const handleOptionClick = (option:string) => {
    setChosenOption(option);
    const isCorrect = questions[currentQuestionId].answers.includes(option);
    setIsCorrectOption(isCorrect);

    timerRef.current = setTimeout(() => {
      if (currentQuestionId < questions.length - 1 && isCorrect) {
        setCurrentQuestionId(currentQuestionId + 1);
        setChosenOption(null);
      } else {
        if (isCorrect) {
          dispatch(setPrize(questions[currentQuestionId].sum));
        } else {
          const prize = currentQuestionId === 0 ? '$0' : questions[currentQuestionId - 1].sum;
          dispatch(setPrize(prize));
        }

        dispatch(setStep(STEP.End));
      }
    }, 2000);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <>
      <Burger moneyStepsData={moneyStepsData} currentQuestionId={currentQuestionId} />

      <div className="page">
        <div className="main">
          <div className="question">
            <h3>{questions[currentQuestionId].question}</h3>
          </div>
          <div className="options">
            {questions[currentQuestionId].options.map((option:string, id) => (
              <button key={option} onClick={() => handleOptionClick(option)} disabled={!!chosenOption} type="button" className={`option ${chosenOption && isCorrectOption && option === chosenOption && 'correct'} ${chosenOption && !isCorrectOption && option === chosenOption && 'wrong'}`}>
                <h5 className="optionText">
                  <span className="optionLetter">{letters[id]}</span>
                  {option}
                </h5>
              </button>
            ))}
          </div>

        </div>
        <div className="aside">
          <div className="asideContent">
            <MoneySteps moneyStepsData={moneyStepsData} currentQuestionId={currentQuestionId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizPage;
