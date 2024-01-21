import express from "express";
import { createServer } from "http";
import cors from "cors";

import { Server } from "socket.io";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

const server = createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

type boardState = (string | null)[];
type playerType = { id: null | string; name: string; mark: string };

type gameStateType = {
    currentBoard: boardState;
    players: playerType[];

    prevMove: playerType | null;
    winner: playerType | null;
};

const gameState: gameStateType = {
    currentBoard: Array(9).fill(null),
    players: [
        { id: null, name: "player 0", mark: "x" },
        { id: null, name: "player 1", mark: "o" },
    ],

    prevMove: null,
    winner: null,
};

const assignPlayer = (game: gameStateType, id: string) => {
    const availablePlayer = game.players.find((player) => player.id === null);

    if (availablePlayer) {
        availablePlayer.id = id;
        return availablePlayer;
    }
    return null;
};

const hasPlayer = (game: gameStateType) => {
    return game.players.filter((player) => player.id !== null).length > 0;
};

const calculateWinner = (squares: boardState, player: playerType) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return player;
        }
    }
    return null;
};

const resetGame = (gameState: gameStateType) => {
    gameState.currentBoard = Array(9).fill(null);
    gameState.prevMove = null;
    gameState.winner = null;
    console.log("🔥 Game : Game Resets / no player");
};

io.on("connection", (socket) => {
    const assigned = assignPlayer(gameState, socket.id);
    if (assigned) {
        console.log(
            `☀️ conected : player assigned to ${assigned?.name} -> ${assigned?.mark}`
        );
    } else {
        console.log(`💢 conected : player not assign game already full`);
    }

    socket.emit("assign", assigned);
    io.emit("gameStateUpdate", gameState);

    socket.on("move", (pos: number, player: playerType) => {
        if (gameState.winner !== null) {
            console.log("💢 move : ignored already have a winner");
            return;
        }
        if (
            !hasPlayer(gameState) ||
            !player ||
            gameState.prevMove?.id === player.id
        ) {
            console.log("💢 move : ignored from");
            return;
        }
        if (gameState.currentBoard[pos] !== null) {
            console.log("💢 move : ignored already selected by other player");
            return;
        }
        gameState.currentBoard[pos] = player.mark;
        gameState.prevMove = player;

        let currentBoard = gameState.currentBoard;
        const winner = calculateWinner(currentBoard, player);

        if (winner !== null) {
            gameState.winner = winner;
        }

        io.emit("gameStateUpdate", gameState);
    });

    socket.on("disconnect", () => {
        if (assigned) assigned.id = null;

        if (!hasPlayer(gameState)) {
            resetGame(gameState);
        }

        console.log("🔥 Dc : Someone disconnected");
        io.emit("gameStateUpdate", gameState);
    });
});

server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
