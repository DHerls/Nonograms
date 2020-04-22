import * as React from 'react';
import PuzzleBoardContainer from "./PuzzleBoardContainer";
import ClearButtonContainer from "./ClearButtonContainer";
import UndoButtonContainer from "./UndoButtonContainer";
import InvalidBoardContainer from './InvalidBoardContainer';

interface SolvePuzzleProps {
    onMount: () => void;
    isValid: boolean
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
            <UndoButtonContainer />
            <ClearButtonContainer />
            </div>
        );
    }   
}
