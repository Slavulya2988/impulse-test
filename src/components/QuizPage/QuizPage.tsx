import React, { ReactElement, useState } from 'react';
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

  const dispatch: Dispatch<GameAction> = useDispatch();

  const handleAnswerClick = (option:string) => {
    setChosenOption(option);
    const isCorrect = option === questions[currentQuestionId].answer;
    setIsCorrectOption(isCorrect);
    setTimeout(() => {
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

  return (
    <>
      <Burger moneyStepsData={moneyStepsData} currentQuestionId={currentQuestionId} />

      <div className="page">
        <div className="main">
          <div className="question">
            <h3>{questions[currentQuestionId].question}</h3>
          </div>
          <div className="answers">
            {questions[currentQuestionId].options.map((option:string, id) => (
              <button key={option} onClick={() => handleAnswerClick(option)} disabled={!!chosenOption} type="button" className={`answer ${chosenOption && isCorrectOption && option === chosenOption && 'correct'} ${chosenOption && !isCorrectOption && option === chosenOption && 'wrong'}`}>
                <h5 className="answerText">
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
