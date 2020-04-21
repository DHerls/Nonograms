import * as React from "react";
import * as ReactDOM from "react-dom";
import {rootReducer} from './store/reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { stopDrag } from "./store/actions";
import UndoButtonContainer from "./components/UndoButtonContainer";
import PuzzleBoardContainer from "./components/PuzzleBoardContainer";
import ClearButtonContainer from "./components/ClearButtonContainer";
import CreatePuzzleContainer from "./components/CreatePuzzleContainer";
import SolvePuzzleContainer from "./components/SolvePuzzleContainer";

const store = createStore(
  rootReducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Do our best to stop the dragging action no matter where the mouse is on the screen
window.addEventListener('mouseup', () => {store.dispatch(stopDrag())});

const Index = () => {
  return (
    <div>
      <Link to="/create">Create</Link>
      <Link to="/solve/4:3:5:71:17:215:45:241:41:4;2:5:23:51:43:A:81:151:13:6">
        Puzzle 1
      </Link>
    </div>
  );
}

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Index} />
        <Route path='/solve/:key' component={SolvePuzzleContainer} />
        <Route path="/create" component={CreatePuzzleContainer} />
      </Router>
    </Provider>,
    document.getElementById("root")
);
