document.addEventListener('DOMContentLoaded', () => {
    AdminPage.init();
  });
  
  let AdminPage = (() => {
    let socket;
  
    let init = () => {
      socket = io();

      socket.on('allQuestions', function(msg) {
        console.log('test')
        document.getElementById('output').innerHTML  += '\n' + msg;
      });
  
      socket.on('newQuestion', function(msg) {
        console.log('test')
        document.getElementById('output').innerHTML  += '\n' + msg;
      });
      
      document.getElementById('byrjaleik').onclick = () => {
        console.log('admin new game');
        
        event.preventDefault();
        $.ajax({
          type: "POST",
          url: "/admin/newgame",
          success: function (dt, status, request) {
            window.location.reload();
          }
        });
      };
  
      document.getElementById('naestaspurning').onclick = () => {
        console.log('admin naesta spurning');

        event.preventDefault();
        $.ajax({
          type: "POST",
          url: "/admin/nextquestion",
          success: function (dt, status, request) {
            window.location.reload();
          }
        });
      };
    }
  
    return {
      init,
    };
  })();
  