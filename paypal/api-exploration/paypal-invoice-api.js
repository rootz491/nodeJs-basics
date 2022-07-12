import fetch from "node-fetch";
import { handleResponse, generateAccessToken } from "./paypal-order-api.js";
const base = "https://api-m.sandbox.paypal.com";

//? API Docs:  https://developer.paypal.com/docs/api/invoicing/v2/
// cancelled invoice: https://www.sandbox.paypal.com/invoice/s/pay/INV2-U2YT-XG7S-PC9K-VZC5
// sent invoice: https://www.sandbox.paypal.com/invoice/s/pay/INV2-XKWK-FJY6-JGMF-QPSY

// generate next invoice number
export async function genNextInvoiceNum() {
	const accessToken = await generateAccessToken();
	const url = `${base}/v2/invoicing/generate-next-invoice-number`;
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return handleResponse(response);
}

// list all invoices
export async function listInvoices() {
	const accessToken = await generateAccessToken();
	const url = `${base}/v2/invoicing/invoices`;
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return handleResponse(response);
}

// create an invoice draft
export async function createDraftInvoice() {
	const numObj = await genNextInvoiceNum();
	const num = numObj["invoice_number"];
	const accessToken = await generateAccessToken();
	const url = `${base}/v2/invoicing/invoices`;
	const response = await fetch(url, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			detail: {
				invoice_number: num,
				reference: "deal-ref",
				invoice_date: "2022-07-10",
				currency_code: "USD",
				note: "Thank you for your business.",
				term: "No refunds after 30 days.",
				memo: "This is a long contract",
				payment_term: {
					term_type: "NO_DUE_DATE",
				},
			},
			invoicer: {
				name: {
					given_name: "David",
					surname: "Larusso",
				},
				address: {
					address_line_1: "1234 First Street",
					address_line_2: "337673 Hillside Court",
					admin_area_2: "Anytown",
					admin_area_1: "CA",
					postal_code: "98765",
					country_code: "US",
				},
				email_address: "sb-uvnta17428690@business.example.com",
				phones: [
					{
						country_code: "001",
						national_number: "4085551234",
						phone_type: "MOBILE",
					},
				],
				website: "www.test.com",
				tax_id: "ABcNkWSfb5ICTt73nD3QON1fnnpgNKBy- Jb5SeuGj185MNNw6g",
				logo_url: "https://example.com/logo.PNG",
				additional_notes: "2-4",
			},
			primary_recipients: [
				{
					billing_info: {
						name: {
							given_name: "Stephanie",
							surname: "Meyers",
						},
						address: {
							address_line_1: "1234 Main Street",
							admin_area_2: "Anytown",
							admin_area_1: "CA",
							postal_code: "98765",
							country_code: "US",
						},
						email_address: "bill-me@example.com",
						phones: [
							{
								country_code: "001",
								national_number: "4884551234",
								phone_type: "HOME",
							},
						],
						additional_info_value: "add-info",
					},
					shipping_info: {
						name: {
							given_name: "Stephanie",
							surname: "Meyers",
						},
						address: {
							address_line_1: "1234 Main Street",
							admin_area_2: "Anytown",
							admin_area_1: "CA",
							postal_code: "98765",
							country_code: "US",
						},
					},
				},
			],
			items: [
				{
					name: "Yoga Mat",
					description: "Elastic mat to practice yoga.",
					quantity: "1",
					unit_amount: {
						currency_code: "USD",
						value: "50.00",
					},
					tax: {
						name: "Sales Tax",
						percent: "7.25",
					},
					discount: {
						percent: "5",
					},
					unit_of_measure: "QUANTITY",
				},
				{
					name: "Yoga t-shirt",
					quantity: "1",
					unit_amount: {
						currency_code: "USD",
						value: "10.00",
					},
					tax: {
						name: "Sales Tax",
						percent: "7.25",
					},
					discount: {
						amount: {
							currency_code: "USD",
							value: "5.00",
						},
					},
					unit_of_measure: "QUANTITY",
				},
			],
			configuration: {
				tax_calculated_after_discount: true,
				tax_inclusive: false,
			},
			amount: {
				breakdown: {
					custom: {
						label: "Packing Charges",
						amount: {
							currency_code: "USD",
							value: "10.00",
						},
					},
					shipping: {
						amount: {
							currency_code: "USD",
							value: "10.00",
						},
						tax: {
							name: "Sales Tax",
							percent: "7.25",
						},
					},
					discount: {
						invoice_discount: {
							percent: "5",
						},
					},
				},
			},
		}),
	});
	return handleResponse(response);
}

// get invoice data
export async function getInvoice(invoiceId) {
	const accessToken = await generateAccessToken();
	const url = `${base}/v2/invoicing/invoices/${invoiceId}`;
	const response = await fetch(url, {
		method: "get",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return handleResponse(response);
}

// delete an invoice
export async function deleteInvoice(invoiceId) {
	const accessToken = await generateAccessToken();
	const url = `${base}/v2/invoicing/invoices/${invoiceId}`;
	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return handleResponse(response);
}

// cancel a "sent" invoice
//? draft invoice cannot be cancelled!
//? Only DRAFT and UNPAID invoices can be sent.
export async function cancelSentInvoice(invoiceId) {
	const accessToken = await generateAccessToken();
	const url = `${base}/v2/invoicing/invoices/${invoiceId}/cancel`;
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return handleResponse(response);
}

// send an invoice
export async function sendInvoice(invoiceId) {
	const accessToken = await generateAccessToken();
	const url = `${base}/v2/invoicing/invoices/${invoiceId}/send`;
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			send_to_invoicer: true,
		}),
	});
	return handleResponse(response);
}

// send invoice reminder
export async function sendInvoiceReminder(invoiceId) {
	const accessToken = await generateAccessToken();
	const url = `${base}/v2/invoicing/invoices/${invoiceId}/remind`;
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			subject: "Reminder: Payment due for the invoice " + invoiceId,
			note: "Please pay before the due date to avoid incurring late payment charges which will be adjusted in the next bill generated.",
			send_to_invoicer: true,
			additional_recipients: ["customer-a@example.com", "customer@example.com"],
		}),
	});
	return handleResponse(response);
}

//  search for invoices, based on certain criteria
export async function searchInvoice(
	lowerAmount,
	upperAmount,
	currencyCode,
	startDate,
	endDate,
	pageNo = null,
	pageSize = null,
	totalReq = true
) {
	const accessToken = await generateAccessToken();
	const url = `${base}/v2/invoicing/search-invoices?${
		pageNo ? "page=" + pageNo + "&" : ""
	}${pageSize ? "page_size=" + pageSize + "&" : ""}${
		totalReq ? "total_required=" + totalReq + "&" : ""
	}`;
	console.log(url);
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		//* req body can have "more/different" options ofc. For all options, checkout docs!
		body: JSON.stringify({
			total_amount_range: {
				lower_amount: {
					currency_code: currencyCode,
					value: lowerAmount,
				},
				upper_amount: {
					currency_code: currencyCode,
					value: upperAmount,
				},
			},
			invoice_date_range: {
				start: startDate,
				end: endDate,
			},
		}),
	});
	return handleResponse(response);
}
