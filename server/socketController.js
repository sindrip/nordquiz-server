let connection = (io) => {
    io.on('connection', function(socket){
        console.log('client connected');
        socket.emit('status', 'test');

        socket.on('disconnect', () => {
            console.log('client disconnected');
        });
        // socket.emit('AllQuestions', game.getPlayedQuestions());   
    });
}



module.exports = {connection};