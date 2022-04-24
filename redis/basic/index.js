const { createClient } = require('redis');
require('dotenv').config();

(async () => {
  try {

    const client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      password: process.env.REDIS_PWD || ''
    });
  
    /*
      * redis automatically creates a new connection to localhost:6379 without explicitly passing it's host and port just like here:
      ? const client = createClient();
    */
  

    // ? redis events
    client.on('error', (err) => console.log('Redis Client Error', err));
    client.on('connect', () => console.log('Redis Client connection initialized'));
    client.on('ready', () => console.log('Redis Client connection ready'));
    client.on('end', () => console.log('Redis Client Ended, Bye!'));
  
    await client.connect();
  
    // ?  if key already exists, it will be overwritten
    await client.set('key1', 'hi mum!');
  
    // ? only set the key if it does not exist
    await client.set('key2', 'Hi Mom!', {
      NX: true,
    });
  
    // ? only set the key if it already exists
    await client.set('key1', 'bye mum!', {
      XX: true
    })
  
    // ? expire the key after 3 seconds
    await client.set('key4', 'hey mum!', {
      EX: 3
    })
  
    // * it won't set here because key3 doesn't exist
    await client.set('key3', 'hi dad!', {
      XX: true,
    });
  
    // * it won't set here because key2 already exist
    await client.set('key2', 'hi dad!', {
      NX: true,
    });
  
    // * fetching after expiration will return null
    setTimeout(async () => {
      try {
        if (client) {
          const key4 = await client.get('key4');
          console.log('key4', key4);
        } else {
          console.info('can\'t perform this operation!');
        }
      } catch (error) {
        console.log(error);
      }
    }, 4000);


    //  ? fetch all keys
    const keys = await client.keys('*');
    console.log('all keys', keys);
    
    for (const key of keys) {
      console.log({key, value: await client.get(key)});
    }

  
    /*
    // ! deleting all keys
    await client.flushAll();
  
    // ! closing the connection
    await client.quit();
    */

  } catch (error) {
    console.log(error);
  }
})();
