import * as React from "react";
import * as ReactDOM from "react-dom";
import {rootReducer} from './store/reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { stopDrag } from "./store/actions";
import CreatePuzzleContainer from "./components/CreatePuzzleContainer";
import SolvePuzzleContainer from "./components/SolvePuzzleContainer";
import { Home } from "./components/Home";

import 'styles/style.scss'
import { NavBar } from "./components/NavBar";
import InvalidBoardContainer from "./components/InvalidBoardContainer";

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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/solve/:key">
          <NavBar />
          <SolvePuzzleContainer />
        </Route>
        <Route path="/create">
          <NavBar />
          <CreatePuzzleContainer />
        </Route>
        <Route>
          <NavBar />
          <InvalidBoardContainer type="404" />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
