const { createClient } = require('redis');

(async () => {
  try {

    const client = createClient({
      url: 'redis://localhost:6379'
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
      if (client.connected) {
        const key4 = await client.get('key4');
        console.log('key4', key4);
      } else {
        console.info('can\'t perform this operation!');
      }
    }, 4000);


    
    const key1 = await client.get('key1');
    const key2 = await client.get('key2');
    const key3 = await client.get('key3');
  
    console.log({key1, key2, key3});
  
  
    // ! deleting all keys
    await client.flushAll();
  
    // ! closing the connection
    await client.quit();

  } catch (error) {
    console.log(error);
  }
})();
