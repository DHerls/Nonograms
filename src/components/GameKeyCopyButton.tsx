import * as React from 'react';


interface GameKeyCopyButtonProps {
    shareURL: string
}


export const GameKeyCopyButton = (props: GameKeyCopyButtonProps) => {

    const [copyState, setCopyState] = React.useState<number>(0);

    const onGameKeyClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.currentTarget.select();
        if (document.execCommand('copy')){
        e.currentTarget.parentElement.focus();
        setCopyState(1);
        } else {
        setCopyState(-1);
        }
    }

    const onMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
        setCopyState(0);
    }

    return (
        <p>
        Share this puzzle:{" "}
        <span
            id="game-key-generated"
            onMouseLeave={onMouseLeave}
            onClick={onGameKeyClick}
        >
            <input
            value={props.shareURL}
            onClick={onGameKeyClick}
            readOnly={true}
            />
            <span
            className={`copy-tooltip${
                copyState === 1 ? " copied" : ""
            }`}
            >
            {copyState === 0
                ? "Click to copy"
                : copyState === 1
                ? "Copied"
                : "Ctrl + C to copy"}
            </span>
        </span>
        </p>
    );
}