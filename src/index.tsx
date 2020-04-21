import * as React from "react";
import * as ReactDOM from "react-dom";
import {rootReducer} from './store/reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { stopDrag } from "./store/actions";
import UndoButtonContainer from "./components/UndoButtonContainer";
import PuzzleBoardContainer from "./components/PuzzleBoardContainer";
import ClearButtonContainer from "./components/ClearButtonContainer";
import CreatePuzzleContainer from "./components/CreatePuzzleContainer";

const store = createStore(
  rootReducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
      <Router>
        <Route exact path="/" component={App} />
        <Route path="/create" component={CreatePuzzleContainer} />
      </Router>
    </Provider>,
    document.getElementById("root")
);
