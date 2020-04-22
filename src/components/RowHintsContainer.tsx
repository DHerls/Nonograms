import { State } from "../store/types";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { getSingleLineSoveState } from "../utils";
import { LineHints } from "./LineHints";

const getSolveState = (hints: number[][], ranges: number[][][], board: string[][]): boolean[][] => {
  return hints.map((row, index) =>
    getSingleLineSoveState(row, ranges[index], board[index])
  );
};

const mapStateToProps = (state: State) => {
  return {
    hints: state.puzzle.rows,
    solveState: getSolveState(state.puzzle.rows, state.puzzle.rowRanges, state.boardHistory[0]),
    prefix: 'row'
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

const RowHintsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LineHints);
export default RowHintsContainer;
