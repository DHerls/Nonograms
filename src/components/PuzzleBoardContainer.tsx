import { Dispatch } from "redux"
import { State } from "../store/types"
import { connect } from "react-redux"
import { PuzzleBoard } from "./PuzzleBoard"

const mapStateToProps = (state: State) => {
    return {
        puzzle: state.puzzle
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {}
}

const PuzzleBoardContainer = connect(mapStateToProps, mapDispatchToProps)(PuzzleBoard);
export default PuzzleBoardContainer;