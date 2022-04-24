const eventEmitter = require('events');

class MyEmitter extends eventEmitter {}

const myEmitter = new MyEmitter();



//  Register a listener for event that trigger only once
myEmitter.once('started', () => {
  console.log('node app is started!');

  myEmitter.addListener('boom', (a, b) => {
    console.log('event payload', a, b);

    //  throw an error event conditionally
    if (b.count % 3 === 0) {
      myEmitter.emit('error', new Error('boom crashed!'));
    }

    //  remove the listener
    if (b.count === 7) {
      myEmitter.removeAllListeners('boom');
    }

  })

  myEmitter.on('error', (err) => {
    console.log('error event fired!', err);
  })

})


let count = 0;
const thisInterval = setInterval(() => {
  //  Register a one-time listener
  myEmitter.emit('started');
  //  Register a listener that removes itself
  myEmitter.emit('boom', 'hi mom!', {count: ++count});
  const boomListenerCount = myEmitter.listenerCount('boom');
  console.log('boom listeners: ', boomListenerCount);
  if (boomListenerCount === 0) {
    clearInterval(thisInterval);
    process.exit(0);
  }
}, 1000);
