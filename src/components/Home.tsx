import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';

export const Home = ({}) => {
    const [gameKey, setGameKey] = React.useState<string>("");
    const history = useHistory();

    const onKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGameKey(e.target.value);
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history.push(`/solve/${gameKey}`)
    }

    return (
    <div className="container">
        <div id="index">
        <h1>Nonograms</h1>
        <p>
            Nonograms are logic puzzles that originated in Japan. Players fill in
            squares to match descriptions of each row and column. When the board is
            filled in correctly, a picture is revealed.
        </p>
        <h2>Pre-Made Puzzles</h2>
        <div className="puzzle-list">
            <Link to="/solve/4:3:5:71:17:215:45:241:41:4;2:5:23:51:43:A:81:151:13:6">
            Puzzle 1
            </Link>
        </div>
        <h2>Solve Custom Puzzles</h2>
        <form onSubmit={onFormSubmit} id="game-key-nav">
            <label>
            Game key:
            <input type="text" name="gameKey" value={gameKey} onChange={onKeyChange}/>
            </label>
            <button type="submit" className="btn btn-primary">
            Go
            </button>
        </form>
        <h2>Create Custom Puzzles</h2>
        <Link to="/create" className="btn btn-primary">
            Create
        </Link>
        </div>
    </div>
    );
}