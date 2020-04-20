import * as React from 'react';

interface UndoButtonProps {
    isDisabled: boolean;
    onClick: () => void;
}

export class UndoButton extends React.Component<UndoButtonProps, {}> {
    render() {
        return <button onClick={this.props.onClick} disabled={this.props.isDisabled} className="btn btn-primary">Undo</button>
    }
}