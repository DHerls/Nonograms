import {EMPTY, State, Action, SET_SQUARE_STATE, ActionSet, SetSquareStateAction, START_DRAG, StartDragAction, CONTINUE_DRAG, ContinueDragAction, STOP_DRAG, UNDO, Puzzle, CLEAR} from './types'
import { findSolutionRanges } from '../utils';


const rowHints = [
    [4],
    [3],
    [5],
    [7, 1],
    [1, 7],
    [2, 1, 5],
    [4, 5],
    [2, 4, 1],
    [4, 1],
    [4]
]

const colHints = [
    [2],
    [5],
    [2, 3],
    [5, 1],
    [4, 3],
    [10],
    [8, 1],
    [1, 5, 1],
    [1, 3],
    [6]
]

const NUM_ROWS = rowHints.length;
const NUM_COLS = colHints.length;

const puzzle : Puzzle = {
    rows: rowHints,
    columns: colHints,
    rowRanges: rowHints.map((hints) => findSolutionRanges(hints, NUM_COLS)),
    colRanges: colHints.map((hints) => findSolutionRanges(hints, NUM_ROWS)),
}


const createEmptyBoard = (rows: number, columns: number) : string[][] =>{
    let board: string[][] = [];
    let row: string[] = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        row = Array(NUM_COLS);
        row.fill(EMPTY);
        board.push(row);
    }
    return board;
}


const initialState : State = {
    boardHistory: [createEmptyBoard(NUM_ROWS, NUM_COLS)],
    mouse: {
        isDragging: false,
        dragStartRow: 0,
        dragStartCol: 0,
        dragState: EMPTY,
        dragBoard: createEmptyBoard(NUM_ROWS, NUM_COLS)
    },
    puzzle: puzzle
}

// Compares two boards of equal size
const boardsEqual = (board1: string[][], board2: string[][]) : boolean =>{
    for (let r = 0; r < board1.length; r++){
        for (let c = 0; c < board1[0].length; c++){
            if (board1[r][c] != board2[r][c]){
                return false;
            }
        }
    }
    return true;
}

const continueDragReducer = (state: State, action: ContinueDragAction) : State => {
    if (!state.mouse.isDragging) {
        return state;
    }
    let dragTargetRow = 0;
    let dragTargetCol = 0;
    if (Math.abs(state.mouse.dragStartRow - action.row) >= Math.abs(state.mouse.dragStartCol - action.col)){
        dragTargetRow = action.row;
        dragTargetCol = state.mouse.dragStartCol;
    } else {
        dragTargetRow = state.mouse.dragStartRow;
        dragTargetCol = action.col;
    }

    const newBoard = state.mouse.dragBoard.map((row) => [...row]);
    // People can drag backwards too so we need to start at the lower value and increase every time
    const rStart = Math.min(state.mouse.dragStartRow, dragTargetRow);
    const rEnd = Math.max(state.mouse.dragStartRow, dragTargetRow);
    const cStart = Math.min(state.mouse.dragStartCol, dragTargetCol);
    const cEnd = Math.max(state.mouse.dragStartCol, dragTargetCol);
    for(let r = rStart; r <= rEnd; r++){
        for (let c = cStart; c <= cEnd; c++){
            newBoard[r][c] = state.mouse.dragState;
        }
    }
    // We do not want to create history states when there are no changes
    if (boardsEqual(newBoard, state.boardHistory[0])){
        return state;
    }
    const boardHistory = [...state.boardHistory]
    // This compresses all of the drag into one change in the history so the undo button can undo an entire drag at once
    if (rEnd - rStart > 1 || cEnd - cStart > 1){
        boardHistory.shift();
    }
    return {
        ...state,
        boardHistory: [newBoard, ...boardHistory]
    }
}

export const rootReducer = (state: State = initialState, action: ActionSet) : State => {
    switch(action.type){
        case SET_SQUARE_STATE:
            const setAction = action as SetSquareStateAction;
            const newBoard = state.boardHistory[0].map((row, index) => {
                if (index === setAction.row){
                    const newRow = [...row];
                    newRow[setAction.col] = setAction.state;
                    return newRow;
                }
                return [...row];
            })
            return {
                ...state,
                boardHistory: [newBoard, ...state.boardHistory]
            }
        case START_DRAG:
            const startAction = action as StartDragAction;
            return {
                ...state,
                mouse: {
                    isDragging: true,
                    dragStartRow: startAction.row,
                    dragStartCol: startAction.col,
                    dragState: startAction.state,
                    dragBoard: state.boardHistory[0].map((row) => ([...row]))
                }
            }
        case CONTINUE_DRAG:
            return continueDragReducer(state, action as ContinueDragAction);
        case STOP_DRAG:
            return {
                ...state,
                mouse: {
                    ...state.mouse,
                    isDragging: false
                }
            }
        case UNDO:
            const undoArray = [...state.boardHistory]
            undoArray.shift();
            return {
                ...state,
                boardHistory: undoArray
            }
        case CLEAR:
            return {
                ...state,
                boardHistory: [createEmptyBoard(NUM_ROWS, NUM_COLS)]
            }
        default:
            return state
    }
}
