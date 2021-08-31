const express = require("express");
const mongodbServer = require("./db_server");

const app = express();

app.use(express.json());


//	routes
app.get('/', (req, res) => res.json({"foo": "bar"}));


app.listen(process.env.PORT, err => {
	if (err) console.log(err);
	else {
		mongodbServer();
		console.log("server is running on port " + process.env.PORT);
	}
});