import { useEffect, useState } from "react";
import Board from "./board";
import Menu from "./menu";
import { socket } from "../socket";

type boardState = (string | null)[];
export type playerType = { id: null | string; name: string; mark: string };

export type gameStateType = {
    currentBoard : boardState;
    players: playerType[];

    prevMove: playerType | null;
    winner: playerType | null;
};

const Game = () => {
    const [gameState, setGameState] = useState<gameStateType>({
        currentBoard : Array(9).fill(null),
        players: [
            { id: null, name: "player 0", mark: "x" },
            { id: null, name: "player 1", mark: "x" },
        ],
        prevMove: null,
        winner: null,
    })
    const [me, setMe] = useState<playerType | null>(null)
    const currentBoardState = gameState.currentBoard;

    const onAssign = (me : playerType) => setMe(me)
    const onGameStateUpdate = (gameState : gameStateType) => setGameState(gameState)
    const onSquareClick = ( pos : number) => socket.emit("move", pos, me)

    useEffect(() => {
        socket.on('connect', ()=>{ console.log('connected') });
        socket.on("assign", onAssign)
        socket.on("gameStateUpdate", onGameStateUpdate)

        socket.on('disconnect', ()=>{ console.log('disc')});
      }, []);

    return (
        <div className="w-full flex justify-between items-center gap-4 max-w-7xl h-[60vh] bg-slate-900 p-8 rounded-xl">
            <Board squares={currentBoardState} handleClick={onSquareClick}/>
            <Menu me={me} gameState={gameState}/>
        </div>
    );
};

export default Game;
