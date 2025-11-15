import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"


interface Quiz {
    question: string,
    select: string[],
    answer: string,
}

export default function Quiz() {
    const [current, setCurrent] = useState<number>(0);
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [quizData, setQuizData] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();
    const { genre } = location.state || { genre: "onePiece" };
    const { difficulty } = location.state || { diffocultu: "easy" };
    console.log(genre);
    console.log(difficulty);

    const shuffle = (array: string[]) => {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return (result);
    }

    const nav = useNavigate();
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                setLoading(true);
                const url: string = `https://raw.githubusercontent.com/tomosasaki2001-maker/TyptScript8.3/refs/heads/main/public/${genre}/${difficulty}.json`;
                const res = await fetch(url);
                const data = await res.json();

                const formatted: Quiz[] = data.map((q: any) => ({
                    question: q.question,
                    select: shuffle(q.select),
                    answer: q.answer,
                }));
                setQuizData(formatted);
                setLoading(false);
            } catch (error) {
                console.error("クイズを取得エラー", error);
                setLoading(false);
            }
        }
        fetchQuiz();
    }, [genre, difficulty]);

    const handleNext = (s: string) => {
        if (!quizData[current]) return;
        const isCorrect: boolean = s === quizData[current].answer;
        const newAnswers = [...answers,isCorrect];
        setAnswers(newAnswers);

        if (current + 1 < quizData.length) {
            setCurrent((prev) => prev + 1);
        } else {
            const correctNum = newAnswers.filter(Boolean).length;
            nav("/resultPage", {
                state: {
                    correctNum: correctNum,
                    maxQuizLen: quizData.length,
                    difficulty: difficulty,
                    genre: genre,
                }
            })
        }
    }

    const handleReset = () => {
        setCurrent(0);
            setAnswers([]);
        
    }
    return (
        <div className="quiz">
            <h2 className="title">Quiz</h2>
            {quizData.length && (
                <div className="Q">
                    <h3>Q{current + 1}. {quizData[current].question}</h3>
                    <ul>
                        {quizData[current].select.map((s, i) => (
                            <li key={i} onClick={() => handleNext(s)}>{s}</li>

                        ))}
                    </ul>

                </div>
            )}
            <div className="router">
                <button onClick={handleReset}>最初から</button>
                <Link to="/"><button>Home</button></Link>
            </div>


        </div>
    )
}
