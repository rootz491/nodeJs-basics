/*
 * this is implementation of Paypal invoice API (REST)
 */
const axios = require("axios");

const base = "https://api-m.sandbox.paypal.com";

//* https://developer.paypal.com/docs/multiparty/get-started/#link-exchangeyourapicredentialsforanaccesstoken
const generateAccessToken = async () => {
	try {
		const token = `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`;
		const encoded = Buffer.from(token).toString("base64");
		const res = await axios({
			method: "post",
			url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
			headers: {
				Accept: "application/json",
				"Accept-Language": "en_US",
				Authorization: `Basic ${encoded}`,
			},
			data: new URLSearchParams("grant_type=client_credentials"),
		});
		return res.data.access_token;
	} catch (error) {
		console.log(error);
		return false;
	}
};

// call this function to create your client token
const generateClientToken = async () => {
	const accessToken = await generateAccessToken();
	const response = await axios({
		url: `${base}/v1/identity/generate-token`,
		method: "post",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Accept-Language": "en_US",
			"Content-Type": "application/json",
		},
	});
	return response.data;
};

// create an order
const createOrder = async () => {
	try {
		const purchaseAmount = "100.00"; // TODO: pull amount from a database or session
		const accessToken = await generateAccessToken();
		if (!accessToken) throw "failed while generating access token";
		const url = `${base}/v2/checkout/orders`;
		const response = await axios({
			url,
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			data: JSON.stringify({
				intent: "CAPTURE",
				purchase_units: [
					{
						amount: {
							currency_code: "USD",
							value: purchaseAmount,
						},
					},
				],
				payment_method: {
					payee_preferred: "UNRESTRICTED",
				},
			}),
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return false;
	}
};

// capture payment for an order
const capturePayment = async (orderId) => {
	try {
		const accessToken = await generateAccessToken();
		const url = `${base}/v2/checkout/orders/${orderId}/capture`;
		const response = await axios({
			url,
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return false;
	}
};

//  create invoiec draft
const createInvoiceDraft = async () => {
	try {
		const body = JSON.parse(`{
        "detail": {
          "invoice_number": "123",
          "reference": "deal-ref",
          "invoice_date": "2022-07-09",
          "currency_code": "USD",
          "note": "Thank you for your business.",
          "term": "No refunds after 30 days.",
          "memo": "This is a long contract",
          "payment_term": {
            "term_type": "NET_10",
            "due_date": "2022-07-22"
          }
        },
        "invoicer": {
          "name": {
            "given_name": "karan",
            "surname": "sharma"
          },
          "address": {
            "address_line_1": "1234 First Street",
            "address_line_2": "337673 Hillside Court",
            "admin_area_2": "Anytown",
            "admin_area_1": "CA",
            "postal_code": "98765",
            "country_code": "US"
          },
          "email_address": 'sb-uvnta17428690@business.example.com',
          "phones": [
            {
              "country_code": "001",
              "national_number": "4085551234",
              "phone_type": "MOBILE"
            }
          ],
          "website": "https://example.com",
          "tax_id": "XX-XXXXXXX",
          "logo_url": "https://example.com/logo.PNG",
          "additional_notes": "example note"
        },
        "primary_recipients": [
          {
            "billing_info": {
              "name": {
                "given_name": "Stephanie",
                "surname": "Meyers"
              },
              "address": {
                "address_line_1": "1234 Main Street",
                "admin_area_2": "Anytown",
                "admin_area_1": "CA",
                "postal_code": "98765",
                "country_code": "US"
              },
              "email_address": "<bill-me@example.com>",
              "phones": [
                {
                  "country_code": "001",
                  "national_number": "4884551234",
                  "phone_type": "HOME"
                }
              ],
              "additional_info_value": "add-info"
            },
            "shipping_info": {
              "name": {
                "given_name": "Stephanie",
                "surname": "Meyers"
              },
              "address": {
                "address_line_1": "1234 Main Street",
                "admin_area_2": "Anytown",
                "admin_area_1": "CA",
                "postal_code": "98765",
                "country_code": "US"
              }
            }
          }
        ],
        "items": [
          {
            "name": "Yoga Mat",
            "description": "Elastic mat to practice yoga.",
            "quantity": "1",
            "unit_amount": {
              "currency_code": "USD",
              "value": "50.00"
            },
            "tax": {
              "name": "Sales Tax",
              "percent": "7.25"
            },
            "discount": {
              "percent": "5"
            },
            "unit_of_measure": "QUANTITY"
          },
          {
            "name": "Yoga t-shirt",
            "quantity": "1",
            "unit_amount": {
              "currency_code": "USD",
              "value": "10.00"
            },
            "tax": {
              "name": "Sales Tax",
              "percent": "7.25"
            },
            "discount": {
              "amount": {
                "currency_code": "USD",
                "value": "5.00"
              }
            },
            "unit_of_measure": "QUANTITY"
          }
        ],
        "configuration": {
          "partial_payment": {
            "allow_partial_payment": true,
            "minimum_amount_due": {
              "currency_code": "USD",
              "value": "20.00"
            }
          },
          "allow_tip": true,
          "tax_calculated_after_discount": true,
          "tax_inclusive": false,
          "template_id": ""
        },
        "amount": {
          "breakdown": {
            "custom": {
              "label": "Packing Charges",
              "amount": {
                "currency_code": "USD",
                "value": "10.00"
              }
            },
            "shipping": {
              "amount": {
                "currency_code": "USD",
                "value": "10.00"
              },
              "tax": {
                "name": "Sales Tax",
                "percent": "7.25"
              }
            },
            "discount": {
              "invoice_discount": {
                "percent": "5"
              }
            }
          }
        }
    }`);
		const accessToken = await generateAccessToken();
		const res = await axios({
			method: "post",
			url: "https://api-m.sandbox.paypal.com/v2/invoicing/invoices",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			data: JSON.stringify(body),
		});
		console.log(res.data);
		return res.data;
	} catch (error) {
		console.log(error);
		return false;
	}
};

module.exports = {
	createOrder,
	capturePayment,
	createInvoiceDraft,
	generateClientToken,
};
