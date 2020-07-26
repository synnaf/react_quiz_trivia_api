import { shuffleArray } from './utils'; 

export type Question = {
    category: string;
    correct_answer: string; 
    difficulty: string; 
    incorrect_answers: string[];
    question: string; 
    type: string; 
}

// vi vill lägga till en egenskap utöver det vi får tillbaka, så¨vi gör en extra type
export type QuestionState = Question & { answers: string[]}; 

export enum Difficulty {
    EASY = 'easy', 
    MEDIUM = 'medium', 
    HARD = 'hard'
}
export const fetchQuiz = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`; 
    const data = await (await fetch(endpoint)).json(); 
    //await fetch, and then await json conversion
    
    // i vår return gör vi en ny array genom spread-operatior opch map
    // vi använder vår utils.ts för att blanda svaren, så att rätt svarar inte alltid ligger på samma position!
    return data.results.map((question: Question) => (
        {
            ...question, 
            answers: shuffleArray([
                ...question.incorrect_answers, 
                question.correct_answer
            ]), 
        }
    ))
}

