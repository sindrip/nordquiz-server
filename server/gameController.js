// GAMES
let questions = ['q1', 'q2'];
let game;

const {Game} = require('./Game.js');

let newGame = () => {
    game = new Game(questions);
    game.start();
}

let nextQuestion = () => {
    game.nextQuestion();
}