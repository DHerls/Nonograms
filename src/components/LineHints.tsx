import * as React from 'react';

interface LineHintsProps {
    hints: number[][]
    solveState: boolean[][],
    prefix: string
}

export class LineHints extends React.Component<LineHintsProps, {}> {
    render() {
        const maxLength = this.props.hints.reduce((a, b) => Math.max(a, b.length), 0);
        return (
            <div className={`hint-${this.props.prefix}s`}>
            {this.props.hints.map((col, i1) => (
                <div className={`hint-${this.props.prefix}`} key={`${this.props.prefix}_hint_${i1}`}>
                {Array(maxLength - col.length).fill(0).map((_, j) => (<div className='hint-square filler' key={`${this.props.prefix}_filler_${i1}_${j}`}></div>))}
                {col.map((num, i2) => (
                    <div className={`hint-square${this.props.solveState[i1][i2] ? ' solved' : ''}`} key={`${this.props.prefix}_hintsquare_${i1}_${i2}`}>
                    {num}
                    </div>
                ))}
                </div>
            ))}
            </div>
        )
    }
}