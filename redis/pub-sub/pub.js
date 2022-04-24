const redis = require('redis');

(async () => {
  try {
    const pub = redis.createClient();
    await pub.connect();

    pub.on('ready', () => console.log('Redis client is ready'));
    pub.on('error', err => console.log(`Redis error: ${err}`));
    pub.on('end', () => console.log('Redis client is disconnected'));
    
    /*
     * publishing a serialized object to channel 'rootz-broadcast'
     */
    let count = 0;
    setInterval(() => {
      pub.publish('rootz-broadcast', JSON.stringify({foo: 'bar', count: count++}));
    }, 2000);

  } catch (error) {
    console.log(error);  
  }
})();