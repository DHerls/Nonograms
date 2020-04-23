import * as React from 'react';
import { Link } from 'react-router-dom';
import { GameKeyForm } from './GameKeyForm';

export const Home = ({}) => {
    const puzzleKeys = [
      "4:3:5:71:17:215:45:241:41:4;2:5:23:51:43:A:81:151:13:6",
      "233:227:221:116:5222:13111323:33131212:311111212:33131212:13111323:5222:116:231:326:223;22:11:5:1111:152:2111:272:33:7:33:271:2112:152:1221:9:11:D:191:1111:191:1221:1222:231:111:1",
    ];

    return (
      <div className="container">
        <div id="index">
          <h1>Nonograms</h1>
          <p>
            Nonograms are logic puzzles that originated in Japan. Players fill
            in squares to match descriptions of each row and column. When the
            board is filled in correctly, a picture is revealed.
          </p>
          <h2>Pre-Made Puzzles</h2>
          <div className="puzzle-list">
            <ul>
              {puzzleKeys.map((key, index) => (
                <li key={`puzzle_${index}`}>
                  <Link to={`/solve/${key}`}>Puzzle {index + 1}</Link>
                </li>
              ))}
            </ul>
          </div>
          <h2>Solve Custom Puzzles</h2>
          <GameKeyForm />
          <h2>Create Custom Puzzles</h2>
          <Link to="/create" className="btn btn-primary">
            Create
          </Link>
        </div>
      </div>
    );
}