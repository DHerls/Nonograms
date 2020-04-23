import * as React from 'react';
import { Link } from 'react-router-dom';
import { GameKeyNavForm } from './GameKeyNavForm';

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
            <GameKeyNavForm />
          </li>
        </ul>
      </nav>
    );
}