const AsyncerrorHandler = require("../middlewares/AsyncerrorHandler");
const { ErrorHandler } = require("../utils/Error.Handler");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
module.exports={
    PaymentProcess:AsyncerrorHandler(async(req,res,next)=>{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "inr",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
              enabled: true,
            },
          });
        
          res.send({
            clientSecret: paymentIntent.client_secret,
          });
    }),
    GetStripeCred:AsyncerrorHandler(async(req,res,next)=>{
        res.status(200).json({ STRIPE_PUBLISH_KEY: process.env.STRIPE_PUBLISH_KEY,clientSecret:process.env.STRIPE_API_KEY});
    })
}