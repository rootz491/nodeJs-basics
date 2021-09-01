const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//	mongo connection, schema and model
mongoose.connect( process.env.MONGO_URI )
			.then(_ => console.log('connected successfully to mongodb'))
			.catch(err => console.error(err));

const noteSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	desc: {
		type: String,
		required: true		
	},
	timestamp: {
		type: Date,
		default: new Date().getTime()
	}
});

const noteModel = mongoose.model("Notes", noteSchema);

//	middlewares
app.use(cors());
app.use(express.json());

//	routes
app.get('/', (_, res) => res.json({success: true}));

app.post('/note', (req, res) => {
	const newNote = new noteModel(req.body)
	newNote.save()
		.then(note => res.json({success: true, note}))
		.catch(err => res.status(400).json({success: false, err}));
});

app.get('/note/:id', (req, res) => {
	const id = req.params.id;
	noteModel.findById(id)
		.then(data => res.json(data))
		.catch(err => res.json(err));
});

app.get('/notes', (_, res) => {
	noteModel.find()
		.then(data => res.json(data))
		.catch(err => res.json(err));
});

app.delete('/note', (req, res) => {
	noteModel.findByIdAndDelete(req.body.id)
		.then(note => {
			if (note) res.json({success: true})
			else res.status(400).json({success: false});
		})
		.catch(err => res.status(400).json({success: false, err}));
});

//	start the server
app.listen(process.env.PORT, err => {
	if (err) console.log(err);
	else console.log("server is running on port " + process.env.PORT);
});