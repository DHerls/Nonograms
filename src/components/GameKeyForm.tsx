import * as React from 'react';
import { useHistory } from 'react-router-dom';

export const GameKeyForm = () => {
    const [gameKey, setGameKey] = React.useState<string>("");
    const history = useHistory();

    const onKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGameKey(e.target.value);
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history.push(`/solve/${gameKey}`);
    };

    return (
      <form onSubmit={onFormSubmit} id="game-key-nav">
        <label>
          Game key:
          <input
            type="text"
            name="gameKey"
            value={gameKey}
            onChange={onKeyChange}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Go
        </button>
      </form>
    );
}