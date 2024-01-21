import React from "react";

type Props = {
    value: any;
    onSquareClick: () => void;
};

const Square = ( { value, onSquareClick}: Props) => {
    return (
        <button className="square h-auto text-5xl rounded-3xl bg-gray-900" onClick={() => onSquareClick() }>
            {value}
        </button>
    );
};

export default Square;
