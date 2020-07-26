import React, { useState } from 'react';
import './App.scss';
import { fetchQuiz } from './API';
//components 
import QuestionCard from './components/QuestionCard'; 
//types  
import { Difficulty, QuestionState } from './API';

// vi har ett type-objekt här, eftersom vi bara använder det här 
// om vi vill kan vi extande det här 
export type AnswerObject = {
    question: string; 
    answer: string; 
    correct: boolean; 
    correctAnswer: string; 
}; 

//total number of questions 
const TOTAL_QUESTIONS = 10; 

function App() {
  const [loading, setLoading] = useState(false); 
  const [questions, setQuestions] = useState<QuestionState[]>([]); //den ska ha datatypen Questionstate[], om vi bara har en tom array vet typescript ej vad den ska göra 
  const [currentQuestion, setCurrentQuestion]= useState(0); 
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]); 
  const [score, setScore] = useState(0); 
  const [gameOver, setGameOver] = useState(true); 

  console.log(questions)

  const startTrivia = async () => {
    setLoading(true); 
    setGameOver(false); 

    const newQuestions = await fetchQuiz(
      TOTAL_QUESTIONS, 
      Difficulty.EASY
    ); 
    setQuestions(newQuestions); 
    setScore(0); 
    setUserAnswers([]); 
    setCurrentQuestion(0); 
    setLoading(false); 
  }; 

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //user answer
      const answer = e.currentTarget.value; 
      //check asnwer against values 
      const correct = questions[currentQuestion].correct_answer === answer; 
      //if correct add score 
      // vad gör prev??? 
      if (correct) setScore(prev => prev + 1)
        //save in userAnswer array
        const answerObject = {
          question: questions[currentQuestion].question, 
          answer, 
          correct, 
          correctAnswer: questions[currentQuestion].correct_answer
        }; 
        setUserAnswers((prev) => [...prev, answerObject]); 
    }
  }; 

  const nextQuestion = () => {
    // check if we are on the laft question
    const nextQuestion = currentQuestion + 1; 
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true); 
    } else {
      setCurrentQuestion(nextQuestion); 
    }

  }; 

  return (
    <div className="App">
      <h1>Lil Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>Start</button>
      ) : null }
      <div className="wrapper">
        {!gameOver ? <p className="score">Score: {score} </p> : null }  
        {loading && <p className="loading">Loading questions...</p> }

      {!loading && !gameOver && (
        <QuestionCard 
        questionNr={currentQuestion +1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[currentQuestion].question}
        answer={questions[currentQuestion].answers}
        userAnswer={userAnswers ? userAnswers[currentQuestion] : undefined }
        callback={checkAnswer}>
        </QuestionCard>
      )}
    
      {!gameOver && !loading && userAnswers.length === currentQuestion +1 && currentQuestion !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>Next</button>
      ): null }
      </div>

    </div>
  );
}

export default App;
