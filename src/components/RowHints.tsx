import * as React from 'react';

interface RowHintsProps {
    hints: number[][]
    solveState: boolean[][]
}

export class RowHints extends React.Component<RowHintsProps, {}> {
    render() {
        return (
            <div className="hint-rows">
            {this.props.hints.map((row, i1) => (
                <div className="hint-row" key={`rowhint_${i1}`}>
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