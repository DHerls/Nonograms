import { SetSquareStateAction, SET_SQUARE_STATE, StartDragAction, START_DRAG, ContinueDragAction, CONTINUE_DRAG, STOP_DRAG, UNDO, UndoAction, ClearAction, CLEAR, SetCreateRows, SET_CREATE_ROWS, SetCreateColumns, SET_CREATE_COLUMNS, SetPuzzle, SET_PUZZLE, Puzzle } from "./types"

export const setSquareState = (row: number, column: number, state: string) : SetSquareStateAction => {
    return {
        type: SET_SQUARE_STATE,
        row: row,
        col: column,
        state: state
    }
}

export const startDrag = (row: number, column: number, state: string) : StartDragAction => {
    return {
        type: START_DRAG,
        row: row,
        col: column,
        state: state
    }
}

export const stopDrag = () => {
    console.log("Stop drag")
    return {
        type: STOP_DRAG
    }
}

export const continueDrag = (row: number, column: number): ContinueDragAction => {
    return {
        type: CONTINUE_DRAG,
        row: row,
        col: column
    }
}

export const undo = (): UndoAction => {
    return {type: UNDO}
}

export const clear = (): ClearAction => {
    return { type: CLEAR }
}

export const setCreateRows = (rows: number): SetCreateRows => {
    return { 
        type: SET_CREATE_ROWS,
        rows: rows
    }
}


export const setCreateColumns = (columns: number): SetCreateColumns => {
    return {
        type: SET_CREATE_COLUMNS,
        columns: columns,
    };
};


export const setPuzzle = (puzzle: Puzzle): SetPuzzle => {
    return {
        type: SET_PUZZLE,
        puzzle: puzzle
    }
}
