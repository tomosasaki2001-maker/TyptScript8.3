import { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Home() {
    const [genre, setGenre] = useState<string>("onePiece");
    const [difficulty, setDifficulty] = useState<string>("easy");
    const nav = useNavigate()

    const handleStart = () => {
        nav("/quiz", {
            state: { genre, difficulty }
        })

    }
    return (
        <div className="home">
            <div className="title">Home</div>

            <div className="select">

                <label htmlFor="">
                    ジャンルを選択：
                    <select name="" id="" value={genre} onChange={e => setGenre(e.target.value)}>
                        <option value="onePiece">ワンピース</option>
                    </select>
                </label>
                <label htmlFor="">
                    難易度を選択：
                    <select name="" id="" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                        <option value="easy">Easy</option>
                        <option value="normal">Normal</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
            </div>

            <button className="btn" onClick={handleStart}>スタート</button>



        </div>
    )
}
