import { State } from "../store/types";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { CreatePuzzle } from "./CreatePuzzle";
import * as React from 'react';
import { setCreateRows, setCreateColumns, setBoardHistory } from "../store/actions";
import { encodeBoardToKey, createEmptyBoard } from "../utils";


const mapStateToProps = (state: State) => {
    return {
      rows: state.boardHistory[0].length,
      columns: state.boardHistory[0][0].length,
      shareURL: encodeBoardToKey(state.boardHistory[0])
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onRowsChange: (e: React.ChangeEvent<HTMLInputElement>) => {dispatch(setCreateRows(parseInt(e.target.value)))},
        onColumnsChange: (e: React.ChangeEvent<HTMLInputElement>) => {dispatch(setCreateColumns(parseInt(e.target.value)))},
        onMount: () => {dispatch(setBoardHistory([createEmptyBoard(10, 10)]))}
    }
}

const CreatePuzzleContainer = connect(mapStateToProps, mapDispatchToProps)(CreatePuzzle);

export default CreatePuzzleContainer;