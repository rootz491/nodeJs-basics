const { createClient } = require('redis');

(async () => {
  const sub = createClient({
    url: 'redis://localhost:6379'
  });

  // ? redis events
  sub.on('connect', () => console.log('Redis Client connection initialized'));
  sub.on('ready', () => console.log('Redis Client connection ready'));
  sub.on('end', () => console.log('Redis Client Ended, Bye!'));
  sub.on('error', (err) => console.log('Redis Client Error', err));

  await sub.connect();

  sub.subscribe('rootz-broadcast', (message) => {;
    const msg = JSON.parse(message);
    console.log('message:', msg.foo, msg.count);
  });
})();
