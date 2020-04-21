import * as React from 'react';
import GameBoardContainer from './GameBoardContainer';
import UndoButtonContainer from './UndoButtonContainer';
import ClearButtonContainer from './ClearButtonContainer';

interface CreatePuzzleProps {
    rows: number,
    columns: number,
    shareURL: string,
    onRowsChange: (e: React.ChangeEvent) => void,
    onColumnsChange: (e: React.ChangeEvent) => void,
}

export class CreatePuzzle extends React.Component<CreatePuzzleProps, {}> {
    render() {
        return (
          <div className="create-puzzle">
            <form>
              <label>
                Number of rows:
                <input
                  name="row"
                  type="number"
                  value={this.props.rows}
                  onChange={this.props.onRowsChange}
                />
              </label>
              <label>
                Number of columns:
                <input
                  name="col"
                  type="number"
                  value={this.props.columns}
                  onChange={this.props.onColumnsChange}
                />
              </label>
            </form>
            <GameBoardContainer />
            <div className="button-holder">
                <UndoButtonContainer />
                <ClearButtonContainer />
            </div>
            <p>Share this puzzle: {this.props.shareURL}</p>
          </div>
        );
    }
}