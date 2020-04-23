import {EMPTY, State, Action, SET_SQUARE_STATE, ActionSet, SetSquareStateAction, START_DRAG, StartDragAction, CONTINUE_DRAG, ContinueDragAction, STOP_DRAG, UNDO, Puzzle, CLEAR, SET_CREATE_ROWS, SetCreateRows, SET_CREATE_COLUMNS, SetCreateColumns, SET_PUZZLE, SetPuzzle, SET_BOARD_HISTORY, SetBoardHistory} from './types'
import { findSolutionRanges, createEmptyBoard } from '../utils';


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


const changeRowNumber = (board: string[][], numRows: number): string[][] => {
  const diff = numRows - board.length;
  let newBoard = [];
  let newRow = [];
  if (diff > 0) {
    newBoard = board.map((row) => [...row]);
    for (let i = 0; i < diff; i++){
      newRow = Array(board[0].length);
      newRow.fill(EMPTY);
      newBoard.push(newRow);
    }
  } else {
    newBoard = board.filter((row, index) => index < numRows).map((row) => [...row]);
  }
  return newBoard;
}


const changeColNumber = (board: string[][], numCols: number): string[][] => {
  const diff = numCols - board[0].length;
  let newBoard = [];
  let ext :string[] = [];
  if (diff > 0) {
    ext = Array(diff);
    ext.fill(EMPTY)
    newBoard = board.map(row => row.concat(ext));
  } else {
    // Diff is negative
    newBoard = board.map(row => row.slice(0, row.length + diff));
  }
  return newBoard
}


const setSquareState = (board:string[][], rowNum: number, columnNum: number, state: string): string[][] => {
  const newBoard = board.map((row, index) => {
    if (index === rowNum) {
      const newRow = [...row];
      newRow[columnNum] = state;
      return newRow;
    }
    return [...row];
  });
  return newBoard;
};



export const rootReducer = (state: State = initialState, action: ActionSet) : State => {
    let newBoard :string[][] = []
    switch (action.type) {
      case SET_SQUARE_STATE:
        const setAction = action as SetSquareStateAction;
        return {
          ...state,
          boardHistory: [setSquareState(state.boardHistory[0], setAction.row, setAction.col, setAction.state), ...state.boardHistory],
        };
      case START_DRAG:
        const startAction = action as StartDragAction;
        return {
          ...state,
          mouse: {
            isDragging: true,
            dragStartRow: startAction.row,
            dragStartCol: startAction.col,
            dragState: state.boardHistory[0][startAction.row][startAction.col],
            dragBoard: state.boardHistory[0].map((row) => [...row]),
          },
        };
      case CONTINUE_DRAG:
        return continueDragReducer(state, action as ContinueDragAction);
      case STOP_DRAG:
        return {
          ...state,
          mouse: {
            ...state.mouse,
            isDragging: false,
          },
        };
      case UNDO:
        const undoArray = [...state.boardHistory];
        undoArray.shift();
        return {
          ...state,
          boardHistory: undoArray,
        };
      case CLEAR:
        return {
          ...state,
          boardHistory: [createEmptyBoard(state.boardHistory[0].length, state.boardHistory[0][0].length)],
        };
      case SET_CREATE_ROWS:
        const scrAction = action as SetCreateRows;
        if (isNaN(scrAction.rows) || scrAction.rows > 30 || scrAction.rows < 1){
            return state;
        }
        return {
          ...state,
          boardHistory: [changeRowNumber(state.boardHistory[0], scrAction.rows), ...state.boardHistory],
        };
      case SET_CREATE_COLUMNS:
        const sccAction = action as SetCreateColumns;
        if (isNaN(sccAction.columns) || sccAction.columns > 30 || sccAction.columns < 1) {
          return state;
        }
        return {
          ...state,
          boardHistory: [
            changeColNumber(state.boardHistory[0], sccAction.columns), ...state.boardHistory
          ],
        };
    
      case SET_PUZZLE:
          const spAction = action as SetPuzzle;
          return {
            ...state,
            puzzle: spAction.puzzle,
            boardHistory: [
              createEmptyBoard(
                spAction.puzzle.rows.length,
                spAction.puzzle.columns.length
              ),
            ],
          };
      case SET_BOARD_HISTORY:
        const sbhAction = action as SetBoardHistory;
        return {
          ...state,
          boardHistory: sbhAction.boardHistory
        }
      default:
        return state;
    }
}
