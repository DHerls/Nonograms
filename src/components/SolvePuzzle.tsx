import * as React from 'react';
import PuzzleBoardContainer from "./PuzzleBoardContainer";
import ClearButtonContainer from "./ClearButtonContainer";
import UndoButtonContainer from "./UndoButtonContainer";
import InvalidBoardContainer from './InvalidBoardContainer';
import { GameKeyCopyButton } from './GameKeyCopyButton';

interface SolvePuzzleProps {
    onMount: () => void;
    isValid: boolean,
    shareURL: string
}

export class SolvePuzzle extends React.Component<SolvePuzzleProps> {

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        if (!this.props.isValid){
            return <InvalidBoardContainer />;
        }
        return (
          <div>
            <PuzzleBoardContainer />
            <GameKeyCopyButton shareURL={this.props.shareURL} />
            <UndoButtonContainer />
            <ClearButtonContainer />
          </div>
        );
    }   
}
