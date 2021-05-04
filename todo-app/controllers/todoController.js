const bodyParser = require('body-parser');
const mongoose = require('mongoose')

//  connect to database
mongoose.connect('mongodb+srv://test:test@todo.37zp7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

//  schema
const todoSchema = new mongoose.Schema({
    item: String
});

//  collection
const todoModel = mongoose.model('Todo', todoSchema);

//  push item
// const itemOne = todoModel({item: "1337"}).save(err => {
//     if(err) throw err;
//     console.log('item saved');
// });

const urlEncodedParser = bodyParser.urlencoded({extended: false});

module.exports = app => {
    

    app.get('/todo', (req, res) => {
        //  get all data from mongoDB
        todoModel.find({}, (err, data) => {
            if (err) throw err;
            res.render('todo', {tasks: data});
        });
    });

    app.post('/todo', urlEncodedParser, (req, res) => {
        //  push data to mongoDB
        todoModel(req.body).save((err, data) => {
            if (err) throw err;
            console.log("data pushed: ", data);
            res.json(data);
        });
    });
    
    app.delete('/todo/:item', (req, res) => {
        //  get id of item, find it & delete it!
        todoModel.findById(req.params.item).deleteOne((err, data) => {
            if (err) throw err;
            res.json(data);
            console.log("data deleted: ", req.params.item);
        })
    });

}