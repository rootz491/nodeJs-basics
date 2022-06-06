var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
      throw error0;
  }
  //  Create a channel
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = 'hello';

    // Create a queue inside channel
    channel.assertQueue(queue, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    //  listen to the queue and process the message
    channel.consume(
      queue, 
      function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
      }, 
      { noAck: true }
    );
  });
});