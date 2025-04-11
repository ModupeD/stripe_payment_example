"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret);
exports.stripePaymentsIntentRequest = functions.https.onRequest(async (req, res) => {
    try {
        let customerId;
        const customerList = await stripe.customers.list({
            email: req.body.email,
            limit: 1
        });
        if (customerList.data.length !== 0) {
            customerId = customerList.data[0].id;
        }
        else {
            const customer = await stripe.customers.create({
                email: req.body.email,
            });
            customerId = customer.id;
        }
        const epemeralKey = await stripe.ephemeralKeys.create({ customer: customerId }, { stripe_version: '2020-08-27' });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',
            customer: customerId,
        });
        res.status(200).send({
            paymentIntent: paymentIntent.client_secret,
            epemeralKey: epemeralKey.secret,
            customerId: customerId,
            sucess: true
        });
    }
    catch (err) {
        res.status(404).send({ success: false, error: err.message });
    }
});
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//# sourceMappingURL=index.js.map