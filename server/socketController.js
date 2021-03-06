const pgPool = require('./pgPool');
const {Game} = require('./game.js');

let populateQuestions = async () => {
    let dbrows = [];
    try {
      dbrows = await pgPool.query('SELECT * FROM questions ORDER BY id');
      dbrows = dbrows.rows;
    } catch (e) {
      console.log(e)
    } finally {
      return dbrows;
    }
};

// let questions = ['q1', 'q2'];
// questions er promise thegar thad fer inn i game
let questions;
let game;

let socketio;

let connection = async (io) => {
    socketio = io;
    if (!questions) {
      questions = await populateQuestions();
      newGame();
    }

    io.on('connection', function(socket){
        console.log('client connected');
        socket.emit('status', 'test');

        socket.on('disconnect', () => {
            console.log('client disconnected');
        });

        socket.emit('allQuestions', game.getPlayedQuestions());
    });
}

let emit = (string, data) => {
    if (!socketio) return;
    socketio.emit(string, data); 
};

let newGame = () => {
    console.log('newgame')
    game = new Game(questions);
    game.start();
    socketio.emit('allQuestions', game.getPlayedQuestions());
}

let nextQuestion = () => {
    console.log('nextquestion');
    if (!game) return;
    console.log(game)

    let question = game.nextQuestion();

    if (question.data) {
        socketio.emit('newQuestion', question.data);
    }
}

let getQuestions = () => {
    console.log('getquestions')
    if (!game) return;
    
    let questions = game.getPlayedQuestions();

    if (questions.data) {      
        socketio.emit('allQuestions', questions.data);
    }
}

module.exports = {connection, emit, newGame, nextQuestion, getQuestions};