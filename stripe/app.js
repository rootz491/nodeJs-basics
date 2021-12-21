require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

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

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));

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

// POST /checkout
app.post('/checkout', async (req, res) => {
    const { items } = req.body;
    // stripe payment integration
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], //  payment method types
            mode: 'payment', // payment type -> one time or recurring (kinda like subscription)
            line_items: items.map(item => { //  items to be purchased
                const storeItem = store[item.id];
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
            }),
            success_url: `${process.env.HOST}/success.html`,
            cancel_url: `${process.env.HOST}/cancel.html`,
        });
        res.json({url: session.url});
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
})

app.listen(3333, () => {
    console.log('Server started on port 3333');
})