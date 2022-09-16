require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const fetch = require("node-fetch");

const baseUrl = "https://api.trello.com";
const app = express();
app.use(morgan("dev"));
app.use(express.json());

//  fetch board by ID
//  http://localhost:3000/board?id=62ee61bd688af0008b663a93
app.get("/board", async (req, res) => {
	try {
		const id = req.query.id;
		const response = await fetch(
			`${baseUrl}/1/boards/${id}?key=${process.env.TRELLO_PERSONAL_KEY}&token=${process.env.TRELLO_TOKEN}`,
			{
				headers: {
					Accept: "application/json",
				},
			}
		);
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.log(error);
		res.status(500).send(error.toString());
	}
});

//  create a board
app.post("/board", async (req, res) => {
	try {
		const name = req.query.name;
		const response = await fetch(
			`${baseUrl}/1/boards/?name=${name}&key=${process.env.TRELLO_PERSONAL_KEY}&token=${process.env.TRELLO_TOKEN}`,
			{
				headers: {
					Accept: "application/json",
				},
			}
		);
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.log(error);
		res.status(500).send(error.toString());
	}
});

//  REGISTER WEBHOOK FOR Board (id = 62ee61bd688af0008b663a93)
app.get("/create-wehoook", async (req, res) => {
	try {
		const id = "62ee61bd688af0008b663a93"; //  id of board to monitor
		const callback = "https://6668-103-225-204-58.ngrok.io/webhook";

		const response = await fetch(
			`${baseUrl}/1/webhooks/?callbackURL=${callback}&idModel=${id}&key=${process.env.TRELLO_PERSONAL_KEY}&token=${process.env.TRELLO_TOKEN}`,
			{
				method: "POST",
				headers: {
					Accept: "application/json",
				},
			}
		);
		if (response.ok) {
			const data = await response.json();
			res.json(data);
		} else {
			const err = await response.text();
			throw err;
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error.toString());
	}
});

app.post("/webhook", (req, res) => {
	try {
		console.log({
			board: req.body.model.name,
			data: {
				action: req.body.action.display.translationKey,
				card: req.body.action?.display?.entities?.card ?? {},
				list: req.body.action?.display?.entities?.list ?? {},
				member: req.body.action.memberCreator,
			},
		});
		res.send("ok");
	} catch (error) {
		console.log(error);
		res.status(500).send(error.toString());
	}
});

app.listen(3000, () => {
	console.log("app is running on port 3000");
});
