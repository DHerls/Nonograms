import * as React from "react";
import * as ReactDOM from "react-dom";
import {rootReducer} from './store/reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { stopDrag } from "./store/actions";
import UndoButtonContainer from "./components/UndoButtonContainer";
import PuzzleBoardContainer from "./components/PuzzleBoardContainer";
import ClearButtonContainer from "./components/ClearButtonContainer";

const store = createStore(rootReducer);

// Do our best to stop the dragging action no matter where the mouse is on the screen
window.addEventListener('mouseup', () => {store.dispatch(stopDrag())});

const App = () => {
  return (
    <div>
      <PuzzleBoardContainer />
      <UndoButtonContainer />
      <ClearButtonContainer />
    </div>
  )
}

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
);
