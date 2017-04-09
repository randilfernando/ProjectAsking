var socketRouter = function (server) {
  var io = require('socket.io')(server);
  io.on('connect', function(socket) {
    console.log('Client connected...');

    socket.on('add-customer', function(customer) {
      io.emit('notification', {
        message: 'new customer',
        customer: customer
      });
    });
  });

}
