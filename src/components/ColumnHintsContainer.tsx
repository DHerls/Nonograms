import { State } from "../store/types";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { getSingleLineSoveState } from "../utils";
import { LineHints } from "./LineHints";

const getSolveState = (hints: number[][], ranges: number[][][], board: string[][]): boolean[][] => {
    const transposedBoard : string[][] = [];
    for (let i = 0; i < board[0].length; i++){
        transposedBoard.push([]);
        for (let j = 0; j < board.length; j++){
            transposedBoard[i].push(board[j][i]);
        }
    }
    return hints.map((col, index) =>
        getSingleLineSoveState(col, ranges[index], transposedBoard[index])
    );
};

const mapStateToProps = (state: State) => {
  return {
    hints: state.puzzle.columns,
    solveState: getSolveState(state.puzzle.columns, state.puzzle.colRanges, state.boardHistory[0]),
    prefix: 'column'
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

const ColumnHintsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LineHints);
export default ColumnHintsContainer;
