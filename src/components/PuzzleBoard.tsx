import * as React from 'react'
import { Puzzle } from '../store/types'
import GameBoardContainer from './GameBoardContainer'
import ColumnHintsContainer from './ColumnHintsContainer';
import RowHintsContainer from './RowHintsContainer';

interface PuzzleBoardProps {
    puzzle: Puzzle
}

export class PuzzleBoard extends React.Component<PuzzleBoardProps, {}> {
    render() {
        return (
          <div className="puzzle-board">
            <div className="hint-area">
                <ColumnHintsContainer />
                <RowHintsContainer />
                <GameBoardContainer />
            </div>
          </div>
        );
    }
}