import * as React from 'react';
import { FILLED, BLOCKED } from '../store/types';

interface GameSquareProps {
    status: string
    onClick: () => void
    onMouseDown: () => void
    onContextMenu: (e: React.MouseEvent) => void
    onMouseEnter: () => void
    onMouseUp: () => void
}

export class GameSquare extends React.Component<GameSquareProps, {}> {
    cssClass = () : string => {
        if (this.props.status === FILLED){
            return 'filled';
        } else if (this.props.status === BLOCKED) {
            return 'blocked';
        }
        return 'empty';
    }
    render = () => {
        return (
          <div
            className={`game-square ${this.cssClass()}`}
            onClick={this.props.onClick}
            onContextMenu={this.props.onContextMenu}
            onMouseDown={this.props.onMouseDown}
            onMouseUp={this.props.onMouseUp}
            onMouseEnter={this.props.onMouseEnter}
            onDrag={(e) => {e.preventDefault()}}
            draggable={false}
          ></div>
        ); 
    };
}