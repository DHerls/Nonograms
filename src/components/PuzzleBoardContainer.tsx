import { Dispatch } from "redux"
import { State, Puzzle } from "../store/types"
import { connect } from "react-redux"
import { PuzzleBoard } from "./PuzzleBoard"
import { arraysEqual, boardToChunks } from "../utils"


const isSolved = (board: string[][], puzzle: Puzzle) : boolean => {
    for (let i = 0; i < board.length; i++){
        if (!arraysEqual(boardToChunks(board[i]), puzzle.rows[i])){
            return false;
        }
    }

    for (let i = 0; i < board[0].length; i++){
        let column = board.map((row) => row[i]);
        if (!arraysEqual(boardToChunks(column), puzzle.columns[i])) {
          return false;
        }
    }
    return true
}


const mapStateToProps = (state: State) => {
    return {
        puzzle: state.puzzle,
        isSolved: isSolved(state.boardHistory[0], state.puzzle)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {}
}

const PuzzleBoardContainer = connect(mapStateToProps, mapDispatchToProps)(PuzzleBoard);
export default PuzzleBoardContainer;