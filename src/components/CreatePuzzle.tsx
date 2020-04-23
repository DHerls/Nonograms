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
    onMount: () => void;
}

interface CreatePuzzleState {
  copyState: number
}

export class CreatePuzzle extends React.Component<CreatePuzzleProps, CreatePuzzleState> {

  constructor(props: CreatePuzzleProps){
    super(props);
    this.state = {
      copyState: 0
    };
    this.onGameKeyClick = this.onGameKeyClick.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    this.props.onMount();
  }

  setCopyState(state: number){
    this.setState({
      copyState: state
    })
  }  
  
  onGameKeyClick(e: React.MouseEvent<HTMLInputElement>) {
    e.currentTarget.select();
    if (document.execCommand('copy')){
      e.currentTarget.parentElement.focus();
      this.setCopyState(1);
    } else {
      this.setCopyState(-1);
    }
  }

  onMouseLeave(e: React.MouseEvent<HTMLInputElement>) {
    this.setCopyState(0);
  }

  render() {
    return (
      <div className="create-puzzle">
        <p>
          Share this puzzle:{" "}
          <span id="game-key-generated" onMouseLeave={this.onMouseLeave} onClick={this.onGameKeyClick}>
            <input
              value={this.props.shareURL}
              onClick={this.onGameKeyClick}
              readOnly={true}
            />
            <span className={`copy-tooltip${this.state.copyState === 1 ? " copied" : ""}`}>
              {this.state.copyState === 0
                ? "Click to copy"
                : this.state.copyState === 1
                ? "Copied"
                : "Ctrl + C to copy"}
            </span>
          </span>
        </p>
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