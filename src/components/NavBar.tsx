import * as React from 'react';
import { Link } from 'react-router-dom';
import { GameKeyForm } from './GameKeyForm';

export const NavBar = () => {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
          <li>
            <GameKeyForm />
          </li>
        </ul>
      </nav>
    );
}