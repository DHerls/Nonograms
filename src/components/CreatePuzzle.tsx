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

export const CreatePuzzle = (props: CreatePuzzleProps) => {

  // 0 = waiting, 1 = success, -1 = error
  const [copyState, setCopyState] = React.useState<number>(0);
  
  const onGameKeyClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
    if (document.execCommand('copy')){
      e.currentTarget.parentElement.focus();
      setCopyState(1);
    } else {
      setCopyState(-1);
    }
  }

  const onMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
    setCopyState(0);
  }

  return (
    <div className="create-puzzle">
      <p>
        Share this puzzle:{" "}
        <span id="game-key-generated" onMouseLeave={onMouseLeave} onClick={onGameKeyClick}>
          <input
            value={props.shareURL}
            onClick={onGameKeyClick}
            readOnly={true}
          />
          <span className={`copy-tooltip${copyState === 1 ? " copied" : ""}`}>
            {copyState === 0
              ? "Click to copy"
              : copyState === 1
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
              value={props.rows}
              onChange={props.onRowsChange}
            />
          </label>
          <label>
            Number of columns:
            <input
              name="col"
              type="number"
              value={props.columns}
              onChange={props.onColumnsChange}
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