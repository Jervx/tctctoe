In this exercise you will take a local version of tic-tac-toe game implemented in React and make it a true multiplayer game with a backend in express.js Start with the code and assets in this tutorial: 
https://react.dev/learn/tutorial-tic-tac-toe

- You need to separate game logic and display. Game logic needs to be on the server only. If the client can claim a win condition simply by notifying the server, that's a fail condition for your interview 😃
- You will use websockets to communicate with the server.

- You have creative freedom over the websocket protocol, however, your code will be tested if it is able to prevent illegal moves (eg, player 0 pressing three buttons in a row).

- You need to demonstrate security thinking. If a client can cheat the game in any way, including injecting calls from dev console, that will be counted as a fail.

- You don't need to implement any kind of lobby or matching system. The first client to connect should be player 0, the second client should be player 1, and any other clients should be rejected until the game is reset.

- Game reset is optional, if you run out of time a solution that only runs one game will be accepted.

- After the game has ended you should display a victory and defeat message to the right players. 
Mambo says:Note from the dev: Just in case they can't grok what they are supposed to do, the tutorial there has the game playing on one browser. They need to take it and make it into a proper game between two browsers. 