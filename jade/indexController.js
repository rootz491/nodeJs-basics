const collection = require('./mongodb-service');


module.exports = app => {
  
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Welcome' });
  });

  app.get('/info', (req, res) => {
    res.render('info', { title: 'info' });
  });

  app.get('/contact', (req, res) => {
    res.render('contact', { title: 'contact', agents: ['sudi', 'nik', 'karan'] });
  });

  app.post('/contact', (req, res) => {
    console.log(req.body);
    const { name, email, agent, message } = req.body;
    collection.insertMany([ req.body ]);
    res.render('contact', { title: 'message recieved', agents: [name, email, `To ${agent}`, message] });
  })

  app.get('/gallery', (_, res) => {
    res.render('gallery', { title: 'Gallery' });
  });
}