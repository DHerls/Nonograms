import * as React from 'react';
import { GameSquare } from './GameSquare';

interface GameBoardProps {
    board: string[][],
    onSquareClick: (row: number, column: number, state: string) => void,
    onSquareRightClick: (row: number, column: number, state: string) => void,
    onSquareMouseDown: (row: number, column: number, state: string) => void,
    onSquareMouseUp: (row: number, column: number) => void,
    onSquareMouseEnter: (row: number, column: number) => void,
    onMouseUp: () => void,
}

export class GameBoard extends React.Component<GameBoardProps, {}> {

    renderRow(row: string[], index: number){
        return (
          <div className="game-row" key={`row_${index}`}>
            {row.map((state, i2) => (
              <GameSquare
                key={`square_${index}_${i2}`}
                status={state}
                onClick={() => {
                  this.props.onSquareClick(index, i2, state);
                }}
                onContextMenu={(e: React.MouseEvent) => {
                    e.preventDefault();
                }}
                onMouseDown={(e: React.MouseEvent) => {
                  if (e.button === 0){
                    this.props.onSquareClick(index, i2, state);
                  } else {
                    e.preventDefault();
                    this.props.onSquareRightClick(index, i2, state);
                  }
                  this.props.onSquareMouseDown(index, i2, state);
                }}
                onMouseUp={() => {
                  this.props.onSquareMouseUp(index, i2);
                }}
                onMouseEnter={() => {
                  this.props.onSquareMouseEnter(index, i2);
                }}
              />
            ))}
          </div>
        );
    }

    renderRows() {
        return (
            <div className="game-rows">
                {this.props.board.map((row, index) => (
                    this.renderRow(row, index)
                ))}
            </div>
                
        );
    }

    render() {
        return (
          <div className="game-board" onMouseUp={this.props.onMouseUp}>
            {this.renderRows()}
          </div>
        );
    }
}