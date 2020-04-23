import { State } from "../store/types"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { SolvePuzzle } from "./SolvePuzzle"
import { decodeKeyToPuzzle } from "../utils"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { setPuzzle } from "../store/actions"

interface SolvePuzzleContainerProps extends RouteComponentProps<{key: string}>{
}

const mapStateToProps = (state: State, ownProps: SolvePuzzleContainerProps) => {
  return {
    isValid: state.puzzle.rows.length > 0,
    shareURL: ownProps.match.params.key,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: SolvePuzzleContainerProps) => {
    return {
        onMount: () => dispatch(setPuzzle(decodeKeyToPuzzle(ownProps.match.params.key)))
    }
}

const SolvePuzzleContainer = withRouter(connect(mapStateToProps,mapDispatchToProps)(SolvePuzzle));

export default SolvePuzzleContainer;