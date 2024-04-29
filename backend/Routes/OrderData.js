const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const { body, validationResult } = require('express-validator');

router.post('/orderData', async (req, res) => {
    const { order_data, order_date, email } = req.body;

    try {
        let data = order_data || [];
        if (order_date) {
            data.splice(0, 0, { Order_date: order_date });
        }

        let existingOrder = await Order.findOne({ email });
        if (!existingOrder) {
            await Order.create({ email, order_data: [data] });
        } else {
            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data: data } },
                { upsert: true }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: error.message });
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({'email':req.body.email})
        res.json({orderData: myData})
        
    } catch (error) {
        res.send("Server Error", error.message)
        
    }
})

module.exports = router;
