import { State } from "../store/types";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { CreatePuzzle } from "./CreatePuzzle";
import * as React from 'react';
import { setCreateRows, setCreateColumns } from "../store/actions";
import { encodeBoardToKey } from "../utils";


const mapStateToProps = (state: State) => {
    return {
      rows: state.create.rows,
      columns: state.create.columns,
      shareURL: encodeBoardToKey(state.boardHistory[0])
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onRowsChange: (e: React.ChangeEvent<HTMLInputElement>) => {dispatch(setCreateRows(parseInt(e.target.value)))},
        onColumnsChange: (e: React.ChangeEvent<HTMLInputElement>) => {dispatch(setCreateColumns(parseInt(e.target.value)))}
    }
}

const CreatePuzzleContainer = connect(mapStateToProps, mapDispatchToProps)(CreatePuzzle);

export default CreatePuzzleContainer;