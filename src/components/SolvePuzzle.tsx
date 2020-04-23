import * as React from 'react';
import PuzzleBoardContainer from "./PuzzleBoardContainer";
import ClearButtonContainer from "./ClearButtonContainer";
import UndoButtonContainer from "./UndoButtonContainer";
import InvalidBoardContainer from './InvalidBoardContainer';
import { GameKeyCopyButton } from './GameKeyCopyButton';

interface SolvePuzzleProps {
    onMount: () => void;
    isValid: boolean,
    shareURL: string,
    dimensions: {
        rows: number,
        columns: number
    }
}

export class SolvePuzzle extends React.Component<SolvePuzzleProps> {

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        if (!this.props.isValid){
            return <InvalidBoardContainer type="key" />;
        }
        return (
          <div>
              <div className="info-panel">
                  <p className="puzzle-dimensions">{this.props.dimensions.rows} x {this.props.dimensions.columns}</p>
                  <div className="button-holder">
                    <UndoButtonContainer />
                    <ClearButtonContainer />
                  </div>
              </div>
            <PuzzleBoardContainer />
            <div className="copy-key-holder">
                <GameKeyCopyButton shareURL={this.props.shareURL} />
            </div>
          </div>
        );
    }   
}
