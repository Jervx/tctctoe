import React from "react";
import Square from "./square";

type Props = {
    squares: any[];
    handleClick : (index: number) => void;
};

const Board = ({ squares, handleClick }: Props) => {

    return (
        <div className="grid grid-cols-3 h-[50vh] w-2/3 p-8 rounded-2xl gap-x-2 gap-y-2 bg-slate-800">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />

            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />

            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
    );
};

export default Board;
