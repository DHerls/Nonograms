import * as React from 'react'
import GameBoardContainer from './GameBoardContainer'

interface InvalidBoardProps {
    onMount: () => void;
    message: string
}

export class InvalidBoard extends React.Component<InvalidBoardProps, {}> {

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        return (
          <div className="invalid-key">
            <p>{this.props.message}</p>
            <GameBoardContainer />
          </div>
        );
    }
    
}