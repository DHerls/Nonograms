import * as React from 'react';

interface ColumnHintsProps {
    hints: number[][]
    solveState: boolean[][]
}

export class ColumnHints extends React.Component<ColumnHintsProps, {}> {
    render() {
        return (
            <div className="hint-columns">
            {this.props.hints.map((row, i1) => (
                <div className="hint-column" key={`colhint_${i1}`}>
                {row.map((num, i2) => (
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