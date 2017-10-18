document.addEventListener('DOMContentLoaded', () => {
  Page.init();
});

let Page = (() => {
  let socket;

  let init = () => {
    socket = io();

    socket.on('status', function(msg) {
      console.log(msg);
    });

    socket.on('newQuestion', function(msg) {
      console.log('test')
      document.getElementById('output').innerHTML  += '\n' + msg;
    });

  }

  return {
    init,
  };
})();
