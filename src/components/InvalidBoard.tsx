import * as React from 'react'
import GameBoardContainer from './GameBoardContainer'

interface InvalidBoardProps {
    onMount: () => void;
}

export class InvalidBoard extends React.Component<InvalidBoardProps, {}> {

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        return (
          <div className="invalid-key">
            <p>The game key provided is invalid.</p>
            <GameBoardContainer />
          </div>
        );
    }
    
}