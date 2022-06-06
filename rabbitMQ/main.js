var amqp = require('amqplib/callback_api');

//  connect to the RabbitMQ server
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  //  Create a channel
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    const queue = 'secret';
    let message = 'Hello World!';

    //  Create a queue inside channel
    //  * Queue is idempotent.
    channel.assertQueue(queue, {
      durable: false
    });

    //  Send a message to the queue
    //  * Message is byte array.
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(" [x] Sent %s", message);

  });
  
  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});
