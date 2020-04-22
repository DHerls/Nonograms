import * as React from "react";
import * as ReactDOM from "react-dom";
import {rootReducer} from './store/reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { stopDrag } from "./store/actions";
import CreatePuzzleContainer from "./components/CreatePuzzleContainer";
import SolvePuzzleContainer from "./components/SolvePuzzleContainer";
import { Home } from "./components/Home";

import 'styles/style.scss'

const store = createStore(
  rootReducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Do our best to stop the dragging action no matter where the mouse is on the screen
window.addEventListener('mouseup', () => {store.dispatch(stopDrag())});

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path='/solve/:key' component={SolvePuzzleContainer} />
        <Route path="/create" component={CreatePuzzleContainer} />
      </Router>
    </Provider>,
    document.getElementById("root")
);
