const {Game} = require('./Game.js');

let questions = ['q1', 'q2'];
let game = new Game(questions);

let socketio;

let connection = (io) => {
    socketio = io;

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