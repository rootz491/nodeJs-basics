import "dotenv/config";
import morgan from "morgan";
import express from "express";
import * as paypalOrder from "./paypal-order-api.js";
import * as paypalInvoice from "./paypal-invoice-api.js";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.json());

// render checkout page with client id & unique client token
app.get("/", async (req, res) => {
	const clientId = process.env.CLIENT_ID;
	try {
		const clientToken = await paypalOrder.generateClientToken();
		res.render("checkout", { clientId, clientToken });
	} catch (err) {
		res.status(500).send(err.message);
	}
});

/*
 * -------------- order API
 */

// create order
//* once payment is done, send checkout link to user
// i.e.  https://www.sandbox.paypal.com/checkoutnow?token=2AW154648C498372E
app.post("/api/orders", async (req, res) => {
	try {
		const order = await paypalOrder.createOrder();
		res.json(order);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// get order data by ID
app.get("/api/orders/:orderId", async (req, res) => {
	try {
		const order = await paypalOrder.getOrderDetails(req.params.orderId);
		res.json(order);
	} catch (err) {
		console.log(err);
		res.status(500).send(err.message);
	}
});

// capture payment
app.post("/api/orders/:orderID/capture", async (req, res) => {
	try {
		const { orderID } = req.params;
		const captureData = await paypalOrder.capturePayment(orderID);
		res.json(captureData);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// payment webhook
// https://developer.paypal.com/api/rest/webhooks/
app.post("/api/webhook", async (req, res) => {
	try {
		const response = await paypalOrder.verifyWebhook(req);
		console.log({ response });
		const isVerified =
			response["verification_status"] === "SUCCESS" ? true : false;
		if (isVerified) {
			const webhookEvent = req?.body["event_type"];
			/*
			 * Here comes all the business logic based on event!
			 */
			console.log({ webhookEvent });
			res.status(200).send("ok");
		} else res.status(500).send("ERROR - not able to verify the payment!");
	} catch (err) {
		console.log(err);
		res.status(500).send(err.toString());
	}
});

/*
 * -------------- invoice API
 */

//	TODO re-test this endpoint after creating an invoice
app.get("/api/invoices/", async (req, res) => {
	try {
		const data = await paypalInvoice.listInvoices();
		res.json(data);
	} catch (err) {
		res.status(500).send(err.toString());
	}
});

app.post("/api/invoices/", async (req, res) => {
	try {
		const data = await paypalInvoice.createDraftInvoice();
		res.json(data);
	} catch (err) {
		res.status(500).send(err.toString());
	}
});

app.get("/api/invoices/:invoiceId", async (req, res) => {
	try {
		const data = await paypalInvoice.getInvoice(req.params.invoiceId);
		res.json(data);
	} catch (err) {
		res.status(500).send(err.toString());
	}
});

app.delete("/api/invoices/:invoiceId", async (req, res) => {
	try {
		const data = await paypalInvoice.deleteInvoice(req.params.invoiceId);
		res.json(data);
	} catch (err) {
		res.status(500).send(err.toString());
	}
});

app.post("/api/invoices/:invoiceId/cancel", async (req, res) => {
	try {
		const data = await paypalInvoice.cancelSentInvoice(req.params.invoiceId);
		res.json(data);
	} catch (err) {
		res.status(500).send(err.toString());
	}
});

app.post("/api/invoices/:invoiceId/send", async (req, res) => {
	try {
		const data = await paypalInvoice.sendInvoice(req.params.invoiceId);
		res.json(data);
	} catch (err) {
		res.status(500).send(err.toString());
	}
});

app.post("/api/invoices/:invoiceId/remind", async (req, res) => {
	try {
		const data = await paypalInvoice.sendInvoiceReminder(req.params.invoiceId);
		res.json(data);
	} catch (err) {
		res.status(500).send(err.toString());
	}
});

app.get("/api/invoices/search", async (req, res) => {
	try {
		const lowerAmount = req.query.lowerAmount;
		const upperAmount = req.query.upperAmount;
		const currencyCode = req.query.currencyCode;
		const startDate = req.query.startDate;
		const endDate = req.query.endDate;

		const data = await paypalInvoice.searchInvoice(
			lowerAmount,
			upperAmount,
			currencyCode,
			startDate,
			endDate
		);
		res.json(data);
	} catch (err) {
		res.status(500).send(err.toString());
	}
});

//* ---------------

app.get("/cancel", (req, res) => {
	res.send("payment cancelled!");
});

app.get("/return", (req, res) => {
	res.send("payment successful!");
});

app.listen(8888);
