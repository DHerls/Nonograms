import * as React from 'react'
import { Puzzle } from '../store/types'
import GameBoardContainer from './GameBoardContainer'
import ColumnHintsContainer from './ColumnHintsContainer';
import RowHintsContainer from './RowHintsContainer';

interface PuzzleBoardProps {
    puzzle: Puzzle,
    isSolved: boolean
}

export class PuzzleBoard extends React.Component<PuzzleBoardProps, {}> {
    render() {
        return (
            <div className={`puzzle-board${this.props.isSolved ? ' solved' : ''}`}>
              <div className="hint-area">
                  <ColumnHintsContainer />
                  <RowHintsContainer />
                  <GameBoardContainer />
              </div>
          </div>
        );
    }
}