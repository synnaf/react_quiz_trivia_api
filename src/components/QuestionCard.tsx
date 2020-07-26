import React from 'react'; 
import './QuestionCard.scss';
//types 
import { AnswerObject } from '../App'; 
//the props for the component
type Props = {
    question: string; 
    answer: string[]; //an array of strings
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void; 
    userAnswer: AnswerObject | undefined; 
    questionNr: number; 
    totalQuestions: number; 
}

//implicit return, så slipper vi använda return statement
//funktionell kompopnent med props tillgängligt 
const QuestionCard: React.FC<Props> = ({ question, answer, callback, userAnswer, questionNr, totalQuestions}) => (
    //en wrapper-div 
    (<div className="card">
        <p className="number">
           Question: {questionNr} / {totalQuestions} 
        </p>

        {/* response from api, dangerous set html xxx  */}
        <p dangerouslySetInnerHTML={{ __html: question }} className="question"/>
        {/* wrapper div */}
        <div className="cardWrapper">
            {answer.map((answer) => (
                // utan värde på key-property fick vi ett fel i konsolen
                <div key={answer}> 
                    {/* disabled if userAnswer is false */}
                    {/* dubbel !! gör den till boolean, eller ternary som nu */}
                    <button disabled={userAnswer ? true : false } value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer}} />
                    </button>
                </div>
            ))}
        </div>

    </div>)

); 

export default QuestionCard; 