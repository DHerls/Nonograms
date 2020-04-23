import * as React from 'react';
import GameBoardContainer from './GameBoardContainer';
import UndoButtonContainer from './UndoButtonContainer';
import ClearButtonContainer from './ClearButtonContainer';
import { GameKeyCopyButton } from './GameKeyCopyButton';

interface CreatePuzzleProps {
    rows: number,
    columns: number,
    shareURL: string,
    onRowsChange: (e: React.ChangeEvent) => void,
    onColumnsChange: (e: React.ChangeEvent) => void,
    onMount: () => void;
}

export class CreatePuzzle extends React.Component<CreatePuzzleProps, {}> {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div className="create-puzzle">
        <GameKeyCopyButton shareURL={this.props.shareURL} />
        <div className="controls">
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
          <div className="button-holder">
            <UndoButtonContainer />
            <ClearButtonContainer />
          </div>
        </div>
        <GameBoardContainer />
      </div>
    );
  }
}