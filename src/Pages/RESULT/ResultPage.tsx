import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link, useLocation } from "react-router-dom";
import Confetti from 'react-confetti'


export default function ResultPage() {
    const [active, setActive] = useState<boolean>(false);
    const location = useLocation();
    const correctNum = location.state.correctNum;
    const maxQuizLen = location.state.maxQuizLen;
    const genre = location.state.genre;
    const difficulty = location.state.difficulty;

    useEffect(() => {
        setTimeout(() => {
            setActive(true);
        }, 2000);
    }, []);


    return (
        <div className="result">
            <Confetti/>
            <Loading active={active}/>

            <h2 className="title">Result</h2>

            <div className="R">
                あなたの正解数は...
                <span>{correctNum}/{maxQuizLen}問</span>
                でした！
            </div>
            <div className="router">
                <Link to="/quiz" state={{ genre, difficulty }}><button>もう一度挑戦</button></Link>
                <Link to="/"><button>Home</button></Link>
            </div>

            

             

        </div>
    )
}
