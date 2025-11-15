import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"


interface Quiz{
    question:string,
    select:string[],
    answer:string,
}

export default function Quiz() {
    const [current, setCurrent] = useState<number>(0);
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [quizData, setQuizData] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();
    const {genre} = location.state || {genre:"onePiece"}; 
    const {difficulty} = location.state || {diffocultu:"easy"}; 
    console.log(genre);
    console.log(difficulty);

    const shuffle = (array:string[])=>{
        const result = [...array];
        for(let i = result.length-1; i>0; i--){
            const j = Math.floor(Math.random()*(i+1));
            [result[i],result[j]] = [result[j],result[i]];
        }
        return(result);
    }

    const nav = useNavigate();
    useEffect(()=>{
        const fetchQuiz = async()=>{
            try{
                setLoading(true);
                
            }

        }

    },[genre,difficulty])
  return (
    <div className="quiz">
        <h2 className="title">Quiz</h2>
    </div>
  )
}
