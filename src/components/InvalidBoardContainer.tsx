import { State, EMPTY, FILLED } from "../store/types"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { InvalidBoard } from "./InvalidBoard"
import { setBoardHistory } from "../store/actions"

interface InvalidBoardContainerProps {
    type: string
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


const BOARD_404 = [
  [EMPTY, EMPTY, FILLED, FILLED, EMPTY, EMPTY],
  [EMPTY, FILLED, EMPTY, EMPTY, FILLED, EMPTY],
  [EMPTY, FILLED, EMPTY, EMPTY, FILLED, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, FILLED, EMPTY],
  [EMPTY, EMPTY, EMPTY, FILLED, EMPTY, EMPTY],
  [EMPTY, EMPTY, FILLED, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, FILLED, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, FILLED, EMPTY, EMPTY, EMPTY],
];

const type_board_map : {[key: string]: string[][]} = {
    "404": BOARD_404,
    "key": INVALID_BOARD
}

const type_message_map: { [key: string]: string } = {
  "404": "The URL you requested does not exist.",
  "key": "The game key provided is invalid.",
};

const mapStateToProps = (
  state: State,
  ownProps: InvalidBoardContainerProps
) => {
    return {message: type_message_map[ownProps.type]}
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: InvalidBoardContainerProps) => {
    return {
        onMount: () => {dispatch(setBoardHistory([type_board_map[ownProps.type]]))}
    }
}

const InvalidBoardContainer = connect(mapStateToProps, mapDispatchToProps)(InvalidBoard);
export default InvalidBoardContainer;