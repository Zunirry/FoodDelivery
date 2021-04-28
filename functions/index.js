const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const stripe = require('stripe')
('sk_test_51INQWZATpJ4FgQVa8GbiDLpNiXFpj5dQogStf4hXoUQ4MgBLZ8mXCp28rlX98uc58oKRJY0rb5hdbMgfuVPm5YVv006cokBUsa');

exports.completePaymentWithStripe = functions.https.onRequest(
    (request, response) => {
        stripe.charges
        .create({
            amount: request.body.amount,
            currency: request.body.currency,
            source: 'tok_mastercard',
        })
        .then(charge => {
            response.send(charge)
        })
        .catch(error => {
            console.log(error);
        })
})
