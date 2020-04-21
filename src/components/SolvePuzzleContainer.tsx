import { State } from "../store/types"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { SolvePuzzle } from "./SolvePuzzle"
import { decodeKeyToPuzzle } from "../utils"
import { RouteComponentProps } from "react-router-dom"
import { setPuzzle } from "../store/actions"

interface SolvePuzzleContainerProps extends RouteComponentProps<{key: string}>{
}

const mapStateToProps = (state: State, ) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: SolvePuzzleContainerProps) => {
    return {
        onMount: () => dispatch(setPuzzle(decodeKeyToPuzzle(ownProps.match.params.key)))
    }
}

const SolvePuzzleContainer = connect(mapStateToProps, mapDispatchToProps)(SolvePuzzle);

export default SolvePuzzleContainer;