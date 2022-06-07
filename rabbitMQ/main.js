const express = require('express');
const amqp = require('amqplib');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const connection = await amqp.connect('amqp://localhost')
  
    const channel = await connection.createChannel();
  
    const queue = 'hello';
    const payload = {
      message: req.query.message,
      sender: 'main'
    };
  
    //  Create a queue inside channel
    //  * Queue is idempotent.
    channel.assertQueue(queue, {
      durable: false
    });
  
    //  Send a message to the queue
    //  * Message is byte array.
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
    console.log(" [x] RabbitMQ -> Sent %s", payload);
    res.send('message sent');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
})


app.listen(3000, async () => {
  console.log('Listening on port 3000');
})