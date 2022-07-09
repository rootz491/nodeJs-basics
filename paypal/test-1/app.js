require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const {
	createInvoiceDraft,
	createOrder,
	capturePayment,
} = require("./paypal.api");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.post("/order", async (_, res) => {
	try {
		const order = await createOrder();
		if (!order) throw "Failed creating order. Please try again!";
		res.json(order);
	} catch (error) {
		console.log(error);
		res.send(error.toString() ?? "internal error");
	}
});

app.post("/order/:orderId/capture", async (req, res) => {
	try {
		const order = await capturePayment(req.params.orderId);
		if (!order) throw "Failed capturing order payment. Please try again!";
		res.json(order);
	} catch (error) {
		console.log(error);
		res.send(error.toString() ?? "internal error");
	}
});

app.post("/invoice", async (_, res) => {
	try {
		const draft = await createInvoiceDraft();
		if (draft) res.json(draft);
		else throw "paypal error";
	} catch (error) {
		res.status(500).send(error?.toString() ?? "intenral error");
	}
});

app.listen(3000, () => {
	console.log("server is running at http://localhost:3000");
});
