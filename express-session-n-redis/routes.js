const authenticate = require('./auth-middleware');
const router = require('express').Router();

const users = [
  {
    email: 'karansh491@gmail.com',
    password: 'helloWorld!',
    id: 1,
    roles: ['admin'],
  },
  {
    email: 'nikhilswain36@gmail.com',
    password: 'oniichan!',
    id: 2,
    roles: ['manager'],
  }
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('all fields are required');
  }
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    req.session.user = user;
    return res.json(user);
  } else {
    res.status(401).json({ message: 'Invalid credential' });
  }
});

router.get('/profile', authenticate, (_, res) => {
  res.json({
    message: 'You are authenticated',
  });
});

module.exports = router;