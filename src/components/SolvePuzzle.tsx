import * as React from 'react';
import PuzzleBoardContainer from "./PuzzleBoardContainer";
import ClearButtonContainer from "./ClearButtonContainer";
import UndoButtonContainer from "./UndoButtonContainer";

interface SolvePuzzleProps {
    onMount: () => void;
}

export class SolvePuzzle extends React.Component<SolvePuzzleProps> {

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        return (
            <div>
            <PuzzleBoardContainer />
            <UndoButtonContainer />
            <ClearButtonContainer />
            </div>
        );
    }   
}
