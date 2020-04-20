import { State } from "../store/types"
import { Dispatch } from "redux"
import { undo } from "../store/actions"
import { connect } from "react-redux"
import { UndoButton } from "./UndoButton"

const mapStateToProps = (state: State) => {
    return {
        isDisabled: state.boardHistory.length <= 1
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onClick: () => {dispatch(undo())}
    }
}

const UndoButtonContainer = connect(mapStateToProps, mapDispatchToProps)(UndoButton);

export default UndoButtonContainer;