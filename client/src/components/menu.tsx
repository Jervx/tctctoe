import { gameStateType, playerType } from "./game";

type Props = {
    me: playerType | null;
    gameState: gameStateType;
};

const winStatus = (player : playerType, winner : playerType | null,) => {
    return <p className="text-lg text-slate-400">{player?.id === winner?.id ? "Victory 🎊" : "Defeat"}</p>
}

const Menu = ({ me, gameState }: Props) => {
    return (
        <div className="w-1/3 flex flex-col gap-y-5 h-full">
            <div className="bg-slate-950 relative flex-1 flex-col flex items-center justify-center gap-y-8 p-4 rounded-xl min-h-1/2">
                { gameState.winner && winStatus(gameState.players[0], gameState.winner)}
                <p className="text-4xl"> {gameState.players[0].name}</p>
                {gameState.players[0].id === null ? "-" : <p className="text-lg">{gameState.players[0].id === me?.id ? "You" : "Enemy"} - {gameState.players[0].mark}</p>}
            </div>
            <div className="bg-slate-950 flex-1 flex-col flex items-center justify-center gap-y-8 p-4 rounded-xl min-h-1/2">
                { gameState.winner && winStatus(gameState.players[1], gameState.winner)}
                <p  className="text-4xl">{gameState.players[1].name}</p>
                {gameState.players[1].id === null ? "-" : <p className="text-lg">{gameState.players[1].id === me?.id ? "You" : "Enemy"} - {gameState.players[1].mark}</p>}
            </div>
        </div>
    );
};

export default Menu;
