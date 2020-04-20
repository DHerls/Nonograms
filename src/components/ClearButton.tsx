import * as React from 'react';

interface ClearButtonProps {
    isDisabled: boolean;
    onClick: () => void;
}

export class ClearButton extends React.Component<ClearButtonProps, {}> {
    render() {
        return <button onClick={this.props.onClick} disabled={this.props.isDisabled} className="btn btn-danger">Clear</button>
    }
}