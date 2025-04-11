const { onCall} = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

try {
  require('dotenv').config();
} catch (error) {
  console.log("dotenv not found, using environment variables");
}

const stripe = require("stripe")(
  functions.config().stripe?.secret
);

admin.initializeApp();

console.log("Stripe initialized with key present:", !!process.env.STRIPE_SECRET_KEY || "Using fallback key");

exports.createPaymentIntent = onCall({
  enforceAppCheck: false,
}, async (data, context) => {
    try {
        const email = data.email || (data.data && data.data.email);
        const amount = data.amount || (data.data && data.data.amount);
        
        if (!email || amount === undefined) {
            throw new functions.https.HttpsError('invalid-argument', 'Email and amount are required');
        }
        
        const amountInCents = Number(amount);
        if (isNaN(amountInCents)) {
            throw new functions.https.HttpsError('invalid-argument', 'Amount must be a number');
        }
        
        let customerId;
        const customerList = await stripe.customers.list({
            email: email,
            limit: 1
        });

        if (customerList.data.length !== 0) {
            customerId = customerList.data[0].id;
        } else {
            const customer = await stripe.customers.create({
                email: email,
            });
            customerId = customer.id;
        }

        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customerId },
            { apiVersion: "2023-10-16" }
        );

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: "usd",
            customer: customerId,
        });
        
        const db = admin.firestore();
        await db.collection('payment_intents').add({
            paymentIntentId: paymentIntent.id,
            amount: amountInCents / 100, // Convert back to dollars for display
            email: email,
            status: 'created',
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });

        return {
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customerId: customerId,
            success: true
        };
    } catch (err) {
        console.error("Payment error:", err.message);
        throw new functions.https.HttpsError('internal', err.message);
    }
});