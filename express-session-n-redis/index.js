require('dotenv').config();
const cors = require('cors');
const redis = require('redis');
const express = require('express');
const session = require('express-session');
const connectRedis = require('connect-redis');
const routes = require('./routes');

const app = express();
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('ready', () => console.log('Connected to Redis'));


app.use(express.json());

app.use(session({
  store: new RedisStore({
    client: redisClient,
  }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  name: 'sessionId',
  cookie: {
    secure: false, // if true: only transmit cookie over https, in prod, always activate this
    httpOnly: true, // if true: prevents client side JS from reading the cookie
    maxAge: 1000 * 60 * 30, // session max age in milliseconds
    // explicitly set cookie to lax
    // to make sure that all cookies accept it
    // you should never use none anyway
    // sameSite: 'lax',
  },
}));

// /*
app.use(cors({
  optionsSuccessStatus: 200,
  // origin: function(origin, callback) {
  //   const whitelist = new Set(["https://karansh.codes", "http://localhost:3000"]);
  //   console.log(origin);
  //   console.log(whitelist.has(origin));
  //   if (whitelist.has(origin)) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin: 'http://localhost:3000',
  credentials: true
}));
// */

app.use(routes);

app.use('*', (_, res) => {
  res.status(404).json({ message: 'Not Found' });
})

app.listen(3000, async () => {
  console.log('Listening on port 3000');
  await redisClient.connect();
});
