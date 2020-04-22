import { State, EMPTY, FILLED } from "../store/types"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { InvalidBoard } from "./InvalidBoard"
import { setBoardHistory } from "../store/actions"

const mapStateToProps = (state: State) => {
}

const INVALID_BOARD : string[][] = [
    [EMPTY, EMPTY, EMPTY, FILLED, FILLED, FILLED, FILLED, FILLED, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, FILLED, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, FILLED, EMPTY, EMPTY],
    [EMPTY, FILLED, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, FILLED, EMPTY],
    [FILLED, EMPTY, EMPTY, FILLED, EMPTY, EMPTY, EMPTY, FILLED, EMPTY, EMPTY, FILLED],
    [FILLED, EMPTY, EMPTY, FILLED, EMPTY, EMPTY, EMPTY, FILLED, EMPTY, EMPTY, FILLED],
    [FILLED, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, FILLED],
    [FILLED, EMPTY, EMPTY, EMPTY, FILLED, FILLED, FILLED, EMPTY, EMPTY, EMPTY, FILLED],
    [FILLED, EMPTY, EMPTY, FILLED, EMPTY, EMPTY, EMPTY, FILLED, EMPTY, EMPTY, FILLED],
    [EMPTY, FILLED, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, FILLED, EMPTY],
    [EMPTY, EMPTY, FILLED, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, FILLED, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, FILLED, FILLED, FILLED, FILLED, FILLED, EMPTY, EMPTY, EMPTY],
]


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onMount: () => {dispatch(setBoardHistory([INVALID_BOARD]))}
    }
}

const InvalidBoardContainer = connect(mapStateToProps, mapDispatchToProps)(InvalidBoard);
export default InvalidBoardContainer;