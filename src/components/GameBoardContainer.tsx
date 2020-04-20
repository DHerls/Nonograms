import { State, EMPTY, FILLED, BLOCKED } from "../store/types"
import { connect } from "react-redux"
import { GameBoard } from "./GameBoard"
import { Dispatch } from "redux"
import { setSquareState, startDrag, continueDrag, stopDrag } from "../store/actions"

const mapStateToProps = (state: State) => {
    return {
        board: state.boardHistory[0]
    }
}

const nextSquareState = (currentState: string) => {
    switch(currentState){
        case EMPTY:
            return FILLED;
        case FILLED:
            return BLOCKED;
        case BLOCKED:
            return EMPTY;
        default:
            return EMPTY;
    }
}

const previousSquareState = (currentState: string) => {
  switch (currentState) {
    case EMPTY:
      return BLOCKED;
    case BLOCKED:
      return FILLED;
    case FILLED:
      return EMPTY;
    default:
      return EMPTY;
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSquareClick: (row : number, col : number, state : string) => {dispatch(setSquareState(row, col, nextSquareState(state)))},
        onSquareRightClick: (row : number, col : number, state : string) => {dispatch(setSquareState(row, col, previousSquareState(state)))},
        onSquareMouseDown: (row: number, col: number, state: string) => {dispatch(startDrag(row, col, state))},
        onSquareMouseUp: () => {dispatch(stopDrag())},
        onSquareMouseEnter: (row: number, col: number) => {dispatch(continueDrag(row, col))},
        onMouseUp: () => {dispatch(stopDrag())},
    }
}

const GameBoardContainer = connect(mapStateToProps, mapDispatchToProps)(GameBoard);

export default GameBoardContainer;