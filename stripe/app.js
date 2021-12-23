require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

const app = express();

let paymentDone = false;

// store items
const store = {
    1: {
        name: "Bread",
        price: 30,
        quantity: 500
    },
    2: {
        name: "Milk",
        price: 40,
        quantity: 300
    },
    3: {
        name: "Eggs",
        price: 5,
        quantity: 1000
    }
}

// to make `/webook` endpoint's body as raw buffer data which is sent from stripe, instead of JSON
app.use('/webhook', bodyParser.raw({type: "*/*"}))
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors());

/* ENDPOINTS */

//  GET /items
app.get('/items', (req, res) => {
    res.json(store);
});

//  GET /items/:id
app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    const item = store[id];
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.get('/status', (req, res) => {
    res.json({ status: paymentDone });
});

// POST /checkout
app.post('/checkout', async (req, res) => {
    const { items } = req.body;
    // stripe payment integration
    try {
        //  items to be purchased (in format of stripe)
        const line_items = items.map(item => { 
            const storeItem = store[item.id];

            if (storeItem.quantity < item.quantity) {
                throw new Error(`Not enough ${storeItem.name} in stock`);
            }

            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: storeItem.name
                    },
                    unit_amount: storeItem.price * 100    //  unit_amount = 100 * price_in_paise
                },
                quantity: item.quantity,
            }
        });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], //  payment method types
            mode: 'payment', // payment type -> one time or recurring (kinda like subscription)
            line_items,
            success_url: `${process.env.HOST}/success.html`,
            cancel_url: `${process.env.HOST}/cancel.html`,
            payment_intent_data: {    
                metadata: {
                    items: JSON.stringify(items)
                },
            },
        });
        res.json({url: session.url});
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

// app.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
app.post('/webhook', (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event = req.body, paymentIntent;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        const { metadata } = event.data.object
        // Handle the event
        switch (event.type) {
            case 'charge.succeeded':
                console.log(JSON.parse(metadata.items));
                console.log('💰 charge succeeded');
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
                return res.status(400).send(`Unhandled event type ${event.type}`);
        }
    
        // Return a response to acknowledge receipt of the event
        res.json({received: true});
    }
    catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
});
  
app.listen(3333, () => {
    console.log('Server started on port 3333');
});
