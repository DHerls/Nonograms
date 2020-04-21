import * as React from 'react';

interface ColumnHintsProps {
    hints: number[][]
    solveState: boolean[][]
}

export class ColumnHints extends React.Component<ColumnHintsProps, {}> {
    render() {
        const maxLength = this.props.hints.reduce((a, b) => Math.max(a, b.length), 0);
        return (
            <div className="hint-columns">
            {this.props.hints.map((col, i1) => (
                <div className="hint-column" key={`colhint_${i1}`}>
                {Array(maxLength - col.length).fill(0).map((_, j) => (<div className='hint-square filler' key={`col_filler_${i1}_${j}`}></div>))}
                {col.map((num, i2) => (
                    <div className={`hint-square${this.props.solveState[i1][i2] ? ' solved' : ''}`} key={`colhintsquare_${i1}_${i2}`}>
                    {num}
                    </div>
                ))}
                </div>
            ))}
            </div>
        )
    }
}