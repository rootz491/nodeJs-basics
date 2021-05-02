const bodyParser = require('body-parser');

let data = [{item: "termwork"}, {item: "seminar"}, {item: "colg lectures"}, {item: "project"}];
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();

module.exports = app => {

    app.get('/todo', (req, res) => {
        res.render('todo', {tasks: data});
    });

    app.post('/todo', urlEncodedParser, (req, res) => {
        data.push(req.body);
        console.log(req.body);
        // res.render('todo', {tasks: data});
        res.json(data);
    });
    
    // app.delete('/todo', (req, res) => {

    // });

}