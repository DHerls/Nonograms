import { State } from "../store/types"
import { Dispatch } from "redux"
import { clear } from "../store/actions"
import { connect } from "react-redux"
import { ClearButton } from "./ClearButton"

const mapStateToProps = (state: State) => {
    return {
        isDisabled: state.boardHistory.length <= 1
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onClick: () => {dispatch(clear())}
    }
}

const ClearButtonContainer = connect(mapStateToProps, mapDispatchToProps)(ClearButton);

export default ClearButtonContainer;