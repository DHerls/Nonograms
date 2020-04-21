import * as React from 'react';

interface RowHintsProps {
    hints: number[][]
    solveState: boolean[][]
}

export class RowHints extends React.Component<RowHintsProps, {}> {
    render() {
        const maxLength = this.props.hints.reduce((a, b) => Math.max(a, b.length), 0);
        return (
            <div className="hint-rows">
            {this.props.hints.map((row, i1) => (
                <div className="hint-row" key={`rowhint_${i1}`}>
                {Array(maxLength - row.length).fill(0).map((_, j) => (<div className='hint-square filler' key={`row_filler_${i1}_${j}`}></div>))}
                {row.map((num, i2) => (
                    <div className={`hint-square${this.props.solveState[i1][i2] ? ' solved' : ''}`} key={`rowhintsqare_${i1}_${i2}`}>
                    {num}
                    </div>
                ))}
                </div>
            ))}
            </div>
        )
    }
}