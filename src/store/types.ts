// Game square states
export const EMPTY = 'e';
export const BLOCKED = 'b';
export const FILLED = 'f';

// Action types
export const SET_SQUARE_STATE = 'SET_SQUARE_STATE';
export interface SetSquareStateAction extends Action {
    row: number,
    col: number,
    state: string
}

export const START_DRAG = 'START_DRAG';
export interface StartDragAction extends Action {
    row: number,
    col: number,
    state: string
}

export const STOP_DRAG = 'STOP_DRAG';
export interface StopDragAction extends Action {
}

export const CONTINUE_DRAG = 'CONTINUE_DRAG';
export interface ContinueDragAction extends Action {
    row: number,
    col: number
}

export const UNDO = 'UNDO';
export interface UndoAction extends Action {

}

export const CLEAR = 'CLEAR';
export interface ClearAction extends Action {

}

export const SET_CREATE_ROWS = 'SET_CREATE_ROWS';
export interface SetCreateRows extends Action {
    rows: number
}

export const SET_CREATE_COLUMNS = "SET_CREATE_COLUMNS";
export interface SetCreateColumns extends Action {
  columns: number;
}


export interface Puzzle {
    rows: number[][],
    columns: number[][],
    rowRanges: number[][][],
    colRanges: number[][][]
}


export interface State {
    boardHistory: string[][][],
    mouse: {
        isDragging: boolean,
        dragStartRow: number,
        dragStartCol: number,
        dragState: string,
        dragBoard: string[][]
    },
    puzzle: Puzzle,
    create: {
        rows: number,
        columns: number
    }
}

export interface Action{
    type: string
}

export type ActionSet = Action | SetSquareStateAction | StartDragAction | StopDragAction | ContinueDragAction;