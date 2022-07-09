import fetch from "node-fetch";

// set some important variables
const { CLIENT_ID, APP_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

// call the create order method
export async function createOrder() {
	const purchaseAmount = "100.00"; // TODO: pull prices from a database
	const accessToken = await generateAccessToken();
	const url = `${base}/v2/checkout/orders`;
	const response = await fetch(url, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			intent: "CAPTURE",
			purchase_units: [
				{
					amount: {
						currency_code: "USD",
						value: purchaseAmount,
					},
				},
			],
			redirect_urls: {
				cancel_url: "https://52c1-103-225-204-57.ngrok.io/cancel",
				return_url: "https://52c1-103-225-204-57.ngrok.io/return",
			},
			payer: {
				payment_method: "paypal",
			},
		}),
	});

	return handleResponse(response);
}

export async function getOrderDetails(orderID) {
	const accessToken = await generateAccessToken();
	const url = "https://api.sandbox.paypal.com/v2/checkout/orders/" + orderID;
	const response = await fetch(url, {
		method: "get",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return handleResponse(response);
}

// capture payment for an order
export async function capturePayment(orderId) {
	const accessToken = await generateAccessToken();
	const url = `${base}/v2/checkout/orders/${orderId}/capture`;
	const response = await fetch(url, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return handleResponse(response);
}

// verify webhook
// https://developer.paypal.com/docs/api/webhooks/v1/#verify-webhook-signature_post
export async function verifyWebhook(req) {
	const accessToken = await generateAccessToken();
	const authAlgo = req.headers["paypal-auth-algo"];
	const certUrl = req.headers["paypal-cert-url"];
	const transmissionId = req.headers["paypal-transmission-id"];
	const transmissionSig = req.headers["paypal-transmission-sig"];
	const transmissionTime = req.headers["paypal-transmission-time"];

	const verificationBody = {
		auth_algo: authAlgo,
		cert_url: certUrl,
		transmission_id: transmissionId,
		transmission_sig: transmissionSig,
		transmission_time: transmissionTime,
		webhook_id: process.env.WEBHOOK_ID,
		webhook_event: req.body,
	};

	const response = await fetch(
		"https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature",
		{
			method: "post",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(verificationBody),
		}
	);

	return handleResponse(response);
}

// generate access token
export async function generateAccessToken() {
	const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
	const response = await fetch(`${base}/v1/oauth2/token`, {
		method: "post",
		body: "grant_type=client_credentials",
		headers: {
			Authorization: `Basic ${auth}`,
		},
	});
	const jsonData = await handleResponse(response);
	return jsonData.access_token;
}

// generate client token
export async function generateClientToken() {
	const accessToken = await generateAccessToken();
	const response = await fetch(`${base}/v1/identity/generate-token`, {
		method: "post",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Accept-Language": "en_US",
			"Content-Type": "application/json",
		},
	});
	const jsonData = await handleResponse(response);
	return jsonData.client_token;
}

async function handleResponse(response) {
	if (response.status === 200 || response.status === 201) {
		return response.json();
	}

	const errorMessage = await response.text();
	throw new Error(errorMessage);
}
